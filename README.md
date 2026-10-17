# CHAOS DESK

> Your deadlines are real. Your enemies are fictional.

An arcade game that turns everyday work frustrations into funny boss battles.
Describe your bad workday, get a personalized boss, play a 20-second Bug Blaster
round, and hear a voice announcer celebrate (or roast) the result.

Built solo for the Hacktoberfest Hack Day, theme: *Building for Human Happiness & Connection*.

**Live demo:** YOUR-VERCEL-URL
**Source:** https://github.com/YOUR-USERNAME/chaos-desk

## Features

- **Arcade landing page** with score panel, featured boss, boss roster and achievements
- **Workday Chaos input**: pick a frustration chip and/or describe your day
- **AI Chaos Engine**: an LLM turns your text into a boss configuration (JSON)
- **Bug Blaster**: a playable 20-second game (mouse and touch)
  - Bug +10, golden bug +50, coffee +5, error/spam/meeting bombs -5
  - The boss changes the title, difficulty, target types and victory message
- **Roast & Rescue**: a friendly roast or an encouraging message about your day
- **Voice announcer** via ElevenLabs (browser voice fallback)
- **Scores and achievements** saved in local storage and unlocked by real gameplay
- **Challenge a Friend**: clearly labeled "coming soon" (no fake multiplayer)

## How the AI is kept safe

- The LLM only returns a JSON config. It never writes or runs code.
- Every field is validated and clamped in `src/utils/bossConfig.js` to a fixed set of
  supported obstacles, power-ups, monsters and difficulties.
- User text is length-limited, stripped of angle brackets, and treated as data in the prompt.
- API keys live only on the server (`server/` locally, `api/` on Vercel), never in the browser.

## Fallbacks (the game always works)

| Feature | Primary | Fallback |
|---|---|---|
| Boss generation | LLM via `/api/boss` | Six offline boss presets |
| Roast / encourage | LLM via `/api/roast` | Offline joke library with topic detection |
| Voice | ElevenLabs via `/api/speak` | Browser speech synthesis, then text only |

## Tech stack

React, Vite, plain CSS, a tiny Express server for local development, Vercel
serverless functions for deployment, ElevenLabs text-to-speech, and any one of
Anthropic, OpenAI or Gemini for the LLM.

## Local setup

Requires Node 20+.

```bash
npm install
cp .env.example .env     # Windows PowerShell: Copy-Item .env.example .env
```

Add only the keys you have to `.env`. Every key is optional.

```bash
# terminal 1: API server (http://localhost:8787)
npm run server

# terminal 2: the website (http://localhost:5173)
npm run dev
```

Check which integrations are active: `http://localhost:8787/api/health`
returns `{"llm": true/false, "voice": true/false}`.

### Environment variables

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `GEMINI_API_KEY` | LLM (set one) |
| `LLM_MODEL` | Optional model override |
| `ELEVENLABS_API_KEY` | Voice narration |
| `ELEVENLABS_VOICE_ID` | Optional voice override |

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, choose **Add New Project** and import the repo (Vite is detected automatically).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Deploy. The `api/` folder becomes serverless functions automatically.

## Project structure

```
api/        Vercel serverless wrappers
server/     Express server and shared handlers (LLM + ElevenLabs)
src/
  components/   Screens: Landing, WorkdayInput, BossIntro, Game, Result, Roast
  data/         Fallback bosses, roasts, achievements
  utils/        Boss validation, chaos engine, storage, voice, api helper
```

## Integration status

Update this section honestly before submitting.

- Offline game, achievements, browser voice: tested
- LLM boss and roast generation: NOT YET TESTED with a live key
- ElevenLabs voice: NOT YET TESTED with a live key

## License

MIT
