import { speakHandler } from '../server/handlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });
  try {
    const audio = await speakHandler(req.body);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(audio);
  } catch (err) {
    console.warn('[api]', err.message);
    res.status(502).json({ error: 'unavailable' });
  }
}
