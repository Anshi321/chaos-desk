import { FALLBACK_BOSSES } from '../data/bosses';
import { sanitizeBoss } from './bossConfig';
import { postJSON } from './api';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateBoss({ presetId, text }) {
  const base = FALLBACK_BOSSES[presetId] || FALLBACK_BOSSES.other;
  const userText = (text || '').slice(0, 140);

  // 1. Try the LLM through our server. Output is always sanitized.
  try {
    const raw = await postJSON('/api/boss', { presetId, text: userText });
    return { ...sanitizeBoss(raw, base), source: 'ai' };
  } catch {
    /* fall through to offline */
  }

  // 2. Offline fallback: the game must always work.
  await wait(700);
  const boss = sanitizeBoss(
    { ...base, description: userText ? `You reported: "${userText}"` : base.description },
    base
  );
  return { ...boss, source: 'offline' };
}
