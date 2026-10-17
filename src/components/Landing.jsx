import { ACHIEVEMENTS } from '../data/achievements';
import Monster from './Monster';

const NEWS = [
  'BREAKING: Semicolon requests permanent residency',
  'Inbox reaches 9,999 unread. Send help',
  'Coffee levels critical',
  'A meeting that could have been an email has spawned',
  'New high score available: your patience',
  'Warning: Deadline Demon spotted nearby',
];

const ROSTER = [
  { type: 'demon', name: 'Deadline Demon', note: 'Hits hardest at 4:59 PM' },
  { type: 'inbox', name: 'Inbox Hydra', note: 'Cut one email, two grow back' },
  { type: 'bug', name: 'Bug Swarm', note: 'Works on my machine' },
];

const pad = (n) => String(n).padStart(4, '0');

export default function Landing({ stats, onNavigate }) {
  const ticker = [...NEWS, ...NEWS];

  return (
    <div className="fade-in">
      <div className="marquee" aria-label="Chaos news">
        <div className="marquee-track">
          {ticker.map((n, i) => (
            <span key={i}>★ {n}</span>
          ))}
        </div>
      </div>

      <section className="hero">
        <div className="hero-text">
          <p className="insert-coin">★ INSERT COIN ★</p>
          <h1 className="title">
            <span className="t1">CHAOS</span>
            <span className="t2">DESK</span>
          </h1>
          <p className="tagline">Your deadlines are real. Your enemies are fictional.</p>

          <div className="actions">
            <button className="btn btn-pink btn-xl" onClick={() => onNavigate('arcade')}>
              ▶ ENTER THE ARCADE
            </button>
            <button className="btn btn-cyan" onClick={() => onNavigate('roast')}>
              ROAST MY WORKDAY
            </button>
            <button className="btn btn-lime" onClick={() => onNavigate('challenge')}>
              CHALLENGE A FRIEND
            </button>
          </div>
        </div>

        <div className="hero-boss">
          <div className="boss-glow" />
          <Monster type="demon" className="boss-big" />
          <div className="boss-tag">FEATURED BOSS</div>
          <div className="boss-title">The Deadline Demon</div>
          <div className="hp">
            <span className="hp-label">BOSS HP</span>
            <div className="hp-bar"><div className="hp-fill" /></div>
          </div>
        </div>
      </section>

      <div className="grid">
        <section className="panel">
          <h2 className="panel-title">HIGH SCORES</h2>
          <div className="stats">
            <div className="stat stat-big">
              <div className="stat-label">Best score</div>
              <div className="stat-value">{pad(stats.bestScore)}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Games</div>
              <div className="stat-value sm">{pad(stats.gamesPlayed)}</div>
            </div>
            <div className="stat">
              <div className="stat-label">Total pts</div>
              <div className="stat-value sm">{pad(stats.totalPoints)}</div>
            </div>
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">BOSS ROSTER</h2>
          <div className="roster">
            {ROSTER.map((b) => (
              <div key={b.type} className="roster-item">
                <Monster type={b.type} className="roster-mon" />
                <div>
                  <div className="roster-name">{b.name}</div>
                  <div className="roster-note">{b.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            ACHIEVEMENTS {stats.achievements.length}/{ACHIEVEMENTS.length}
          </h2>
          <div className="ach-list">
            {ACHIEVEMENTS.map((a) => {
              const unlocked = stats.achievements.includes(a.id);
              return (
                <div key={a.id} className={`ach ${unlocked ? 'unlocked' : 'locked'}`}>
                  <span className="ach-icon">{a.icon}</span>
                  <div>
                    <div className="ach-name">{a.name}</div>
                    <div className="ach-desc">{a.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
