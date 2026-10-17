import { bossHandler } from '../server/handlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    res.status(200).json(await bossHandler(req.body));
  } catch (err) {
    console.warn('[api]', err.message);
    res.status(502).json({ error: 'unavailable' });
  }
}
