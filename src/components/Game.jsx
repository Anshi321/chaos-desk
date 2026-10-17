import { useEffect, useRef, useState } from 'react';

const DIFF = {
  easy: { gap: 750, ttl: 1900, bombChance: 0.12 },
  medium: { gap: 600, ttl: 1550, bombChance: 0.2 },
  hard: { gap: 480, ttl: 1250, bombChance: 0.28 },
};
const POINTS = { bug: 10, golden: 50, coffee: 5, bomb: -5 };
const OB_ICON = { error_messages: '⚠️', spam_emails: '📧', meeting_invites: '📅' };
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

let uid = 0;

export default function Game({ boss, target, onFinish, onBack }) {
  const cfg = DIFF[boss.difficulty] || DIFF.medium;
  const total = boss.duration * 1000;

  const [phase, setPhase] = useState('ready');
  const [count, setCount] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(total);
  const [targets, setTargets] = useState([]);
  const [pops, setPops] = useState([]);

  const scoreRef = useRef(0);
  const statsRef = useRef({ bugs: 0, golden: 0, coffee: 0, bombs: 0, lastSecondGolden: false });
  const remainingRef = useRef(total);
  const endedRef = useRef(false);
  const hitIds = useRef(new Set());
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // 3-2-1-GO
  useEffect(() => {
    if (phase !== 'ready') return;
    const id = setInterval(() => setCount((c) => c - 1), 800);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === 'ready' && count < 0) setPhase('play');
  }, [count, phase]);

  // Main game loop
  useEffect(() => {
    if (phase !== 'play') return;

    const makeTarget = (now) => {
      let kind = 'bug';
      const r = Math.random();
      if (boss.obstacles.length && r < cfg.bombChance) kind = 'bomb';
      else if (boss.powerUps.includes('golden_bug') && r < cfg.bombChance + 0.12) kind = 'golden';
      else if (boss.powerUps.includes('coffee') && r < cfg.bombChance + 0.22) kind = 'coffee';

      const icon =
        kind === 'bomb' ? OB_ICON[pick(boss.obstacles)] : kind === 'golden' ? '🐞' : kind === 'coffee' ? '☕' : '🐛';

      return { id: ++uid, kind, icon, x: rand(2, 80), y: rand(3, 78), expires: now + cfg.ttl };
    };

    const endAt = Date.now() + total;
    let nextSpawn = Date.now();

    const id = setInterval(() => {
      const now = Date.now();
      const remaining = endAt - now;
      remainingRef.current = Math.max(0, remaining);

      if (remaining <= 0) {
        clearInterval(id);
        endedRef.current = true;
        setTimeLeft(0);
        setTargets([]);
        onFinishRef.current({ score: scoreRef.current, ...statsRef.current });
        return;
      }

      setTimeLeft(remaining);

      let spawn = null;
      if (now >= nextSpawn) {
        spawn = makeTarget(now);
        nextSpawn = now + cfg.gap;
      }
      setTargets((prev) => {
        const alive = prev.filter((t) => t.expires > now);
        return spawn ? [...alive, spawn] : alive;
      });
    }, 100);

    return () => clearInterval(id);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const hit = (e, t) => {
    e.preventDefault();
    if (endedRef.current || hitIds.current.has(t.id)) return;
    hitIds.current.add(t.id);

    const before = scoreRef.current;
    scoreRef.current = Math.max(0, before + POINTS[t.kind]);
    const delta = scoreRef.current - before;
    setScore(scoreRef.current);

    const s = statsRef.current;
    if (t.kind === 'bug') s.bugs += 1;
    if (t.kind === 'golden') {
      s.bugs += 1;
      s.golden += 1;
      if (remainingRef.current <= 5000) s.lastSecondGolden = true;
    }
    if (t.kind === 'coffee') s.coffee += 1;
    if (t.kind === 'bomb') s.bombs += 1;

    setTargets((prev) => prev.filter((x) => x.id !== t.id));

    const popId = ++uid;
    setPops((p) => [...p, { id: popId, x: t.x, y: t.y, text: delta > 0 ? `+${delta}` : `${delta}`, good: delta > 0 }]);
    setTimeout(() => setPops((p) => p.filter((x) => x.id !== popId)), 700);
  };

  const secs = Math.ceil(timeLeft / 1000);
  const pct = Math.max(0, (timeLeft / total) * 100);

  return (
    <div className="screen game fade-in">
      <button className="back-link" onClick={onBack}>← QUIT</button>

      <div className="hud">
        <div className="hud-box">
          <span className="hud-label">SCORE</span>
          <span className="hud-score">{String(score).padStart(4, '0')}</span>
        </div>
        <div className="hud-mid">
          <div className="hud-boss">{boss.bossName}</div>
          <div className="hud-goal">Goal: {target} pts</div>
        </div>
        <div className={`hud-box ${secs <= 5 && phase === 'play' ? 'urgent' : ''}`}>
          <span className="hud-label">TIME</span>
          <span className="hud-time">{secs}</span>
        </div>
      </div>

      <div className="timebar"><div className="timebar-fill" style={{ width: `${pct}%` }} /></div>

      <div className="arena" role="application" aria-label="Bug Blaster game area">
        {phase === 'ready' && (
          <div className="countdown" key={count}>{count > 0 ? count : 'GO!'}</div>
        )}

        {targets.map((t) => (
          <button
            key={t.id}
            className={`target target-${t.kind}`}
            style={{ left: `${t.x}%`, top: `${t.y}%`, '--ttl': `${cfg.ttl}ms` }}
            onPointerDown={(e) => hit(e, t)}
            onClick={(e) => e.preventDefault()}
            aria-label={t.kind}
          >
            {t.icon}
          </button>
        ))}

        {pops.map((p) => (
          <span key={p.id} className={`pop ${p.good ? 'good' : 'bad'}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {p.text}
          </span>
        ))}
      </div>

      <div className="legend">
        <span>🐛 +10</span>
        <span>🐞 +50</span>
        {boss.powerUps.includes('coffee') && <span>☕ +5</span>}
        <span className="legend-bad">{boss.obstacles.map((o) => OB_ICON[o]).join(' ')} −5</span>
      </div>
    </div>
  );
}
