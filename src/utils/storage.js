import { ACHIEVEMENTS } from '../data/achievements';

const KEY = 'chaosdesk_v1';

const DEFAULTS = { bestScore: 0, gamesPlayed: 0, totalPoints: 0, achievements: [] };

export function getStats() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    /* storage unavailable: game still works */
  }
}

// Takes previous stats + one game's result, returns updated stats and what changed.
export function recordGame(prev, result) {
  const next = {
    ...prev,
    gamesPlayed: prev.gamesPlayed + 1,
    totalPoints: prev.totalPoints + result.score,
    bestScore: Math.max(prev.bestScore, result.score),
  };

  const newlyUnlocked = ACHIEVEMENTS.filter(
    (a) => !prev.achievements.includes(a.id) && a.check(result, next)
  );
  next.achievements = [...prev.achievements, ...newlyUnlocked.map((a) => a.id)];

  return { stats: next, newlyUnlocked, isNewBest: result.score > prev.bestScore };
}
