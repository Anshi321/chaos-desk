export const ALLOWED = {
  difficulty: ['easy', 'medium', 'hard'],
  obstacles: ['error_messages', 'spam_emails', 'meeting_invites'],
  powerUps: ['coffee', 'golden_bug'],
  monsters: ['demon', 'inbox', 'bug'],
};

const clip = (value, max, fallback) => {
  if (typeof value !== 'string') return fallback;
  const s = value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
  return s ? s.slice(0, max) : fallback;
};

const pickAllowed = (list, allowed, fallback) => {
  if (!Array.isArray(list)) return fallback;
  const out = [...new Set(list.filter((x) => allowed.includes(x)))];
  return out.length ? out.slice(0, 3) : fallback;
};

export function sanitizeBoss(raw, fallback) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const duration = Number(r.duration);

  return {
    bossName: clip(r.bossName, 40, fallback.bossName),
    monster: ALLOWED.monsters.includes(r.monster) ? r.monster : fallback.monster,
    difficulty: ALLOWED.difficulty.includes(r.difficulty) ? r.difficulty : fallback.difficulty,
    description: clip(r.description, 200, fallback.description),
    mission: clip(r.mission, 60, fallback.mission),
    duration: Number.isFinite(duration) ? Math.min(30, Math.max(15, Math.round(duration))) : fallback.duration,
    obstacles: pickAllowed(r.obstacles, ALLOWED.obstacles, fallback.obstacles),
    powerUps: pickAllowed(r.powerUps, ALLOWED.powerUps, fallback.powerUps),
    victoryMessage: clip(r.victoryMessage, 60, fallback.victoryMessage),
  };
}
