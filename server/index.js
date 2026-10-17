import express from 'express';
import { health, bossHandler, roastHandler, speakHandler } from './handlers.js';

const app = express();
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => res.json(health()));

const json = (fn) => async (req, res) => {
  try {
    res.json(await fn(req.body));
  } catch (err) {
    console.warn('[api]', err.message);
    res.status(502).json({ error: 'unavailable' });
  }
};

app.post('/api/boss', json(bossHandler));
app.post('/api/roast', json(roastHandler));

app.post('/api/speak', async (req, res) => {
  try {
    const audio = await speakHandler(req.body);
    res.set('Content-Type', 'audio/mpeg').send(audio);
  } catch (err) {
    console.warn('[api]', err.message);
    res.status(502).json({ error: 'unavailable' });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => console.log(`Chaos API on http://localhost:${port}`));
