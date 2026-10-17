export const ACHIEVEMENTS = [
  { id: 'bug_destroyer', icon: '🐛', name: 'BUG DESTROYER', desc: 'Squash 12 bugs in one game', check: (r) => r.bugs >= 12 },
  { id: 'deadline_ninja', icon: '🥷', name: 'DEADLINE NINJA', desc: 'Score 150 points in one game', check: (r) => r.score >= 150 },
  { id: 'coffee_survivor', icon: '☕', name: 'COFFEE SURVIVOR', desc: 'Grab a coffee power-up', check: (r) => r.coffee >= 1 },
  { id: 'chaos_conqueror', icon: '👑', name: 'CHAOS CONQUEROR', desc: 'Play 5 games', check: (_r, s) => s.gamesPlayed >= 5 },
  { id: 'last_minute_legend', icon: '⏱️', name: 'LAST-MINUTE LEGEND', desc: 'Hit a golden bug in the final 5 seconds', check: (r) => r.lastSecondGolden },
];
