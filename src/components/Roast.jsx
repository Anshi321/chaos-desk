import { useState } from 'react';
import { PRESETS } from '../data/bosses';
import { ROASTS, CHEERS, detectTopic } from '../data/roasts';
import { postJSON } from '../utils/api';
import VoiceButton from './VoiceButton';

const MAX = 140;

export default function Roast({ onBack }) {
  const [mode, setMode] = useState('roast');
  const [presetId, setPresetId] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [lastLine, setLastLine] = useState('');

  const generate = async (chosenMode = mode) => {
    const clean = text.trim();
    if (!presetId && !clean) {
      setError('Pick a frustration or describe your day first.');
      return;
    }
    setError('');
    setLoading(true);

    let line = '';
    let source = 'offline';

    try {
      const data = await postJSON('/api/roast', { mode: chosenMode, presetId, text: clean });
      if (typeof data.line === 'string' && data.line.trim()) {
        line = data.line.replace(/[<>]/g, '').trim().slice(0, 260);
        source = 'ai';
      }
    } catch {
      /* use offline library */
    }

    if (!line) {
      const topic = detectTopic(clean, presetId);
      const pool = (chosenMode === 'roast' ? ROASTS : CHEERS)[topic];
      const options = pool.filter((l) => l !== lastLine);
      line = options[Math.floor(Math.random() * options.length)] || pool[0];
    }

    setLastLine(line);
    setResult({ mode: chosenMode, line, input: clean, source, key: Date.now() });
    setLoading(false);
  };

  const switchMode = (m) => {
    setMode(m);
    if (result && !loading) generate(m);
  };

  return (
    <div className="screen fade-in">
      <button className="back-link" onClick={onBack}>← BACK TO LOBBY</button>

      <h2 className="screen-title">ROAST & RESCUE</h2>
      <p className="screen-sub">Tell us about your workday. Friendly fire only.</p>

      <div className="mode-toggle" role="group" aria-label="Choose mode">
        <button className={`mode ${mode === 'roast' ? 'active-roast' : ''}`} aria-pressed={mode === 'roast'} onClick={() => switchMode('roast')}>
          🔥 ROAST ME
        </button>
        <button className={`mode ${mode === 'cheer' ? 'active-cheer' : ''}`} aria-pressed={mode === 'cheer'} onClick={() => switchMode('cheer')}>
          💪 ENCOURAGE ME
        </button>
      </div>

      <div className="chips">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            className={`chip ${presetId === p.id ? 'active' : ''}`}
            aria-pressed={presetId === p.id}
            onClick={() => {
              setPresetId(presetId === p.id ? '' : p.id);
              setError('');
            }}
          >
            <span className="chip-emoji">{p.emoji}</span> {p.label}
          </button>
        ))}
      </div>

      <label className="field-label" htmlFor="roast-story">Describe your workday</label>
      <textarea
        id="roast-story"
        className="textarea"
        rows={3}
        maxLength={MAX}
        value={text}
        placeholder="I've been staring at one semicolon for three hours."
        onChange={(e) => {
          setText(e.target.value);
          setError('');
        }}
      />
      <div className="field-meta">
        <span className="error" role="alert">{error}</span>
        <span className="count">{text.length}/{MAX}</span>
      </div>

      <button className={`btn btn-xl ${mode === 'roast' ? 'btn-pink' : 'btn-lime'}`} onClick={() => generate()} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" /> COOKING...
          </>
        ) : mode === 'roast' ? (
          '🔥 ROAST MY WORKDAY'
        ) : (
          '💪 RESCUE MY WORKDAY'
        )}
      </button>

      {result && (
        <div key={result.key} className={`roast-card fade-in ${result.mode}`}>
          <div className="meta-title">{result.mode === 'roast' ? 'THE ROAST' : 'THE RESCUE'}</div>
          {result.input && <p className="roast-input">Case file: "{result.input}"</p>}
          <p className="roast-line">{result.line}</p>
          {result.source === 'ai' && <span className="source-tag">✨ AI-GENERATED</span>}
          <VoiceButton text={result.line} />
          <button className="btn btn-ghost" onClick={() => generate()} disabled={loading}>↻ ANOTHER ONE</button>
        </div>
      )}
    </div>
  );
}
