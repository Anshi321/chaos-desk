import { useState } from 'react';
import { PRESETS } from '../data/bosses';
import { generateBoss } from '../utils/chaosEngine';

const MAX = 140;

export default function WorkdayInput({ onGenerated, onBack }) {
  const [presetId, setPresetId] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    const clean = text.trim();
    if (!presetId && !clean) {
      setError('Pick a frustration or describe your day first.');
      return;
    }
    if (presetId === 'other' && !clean) {
      setError("Tell us what's bugging you so we can build your boss.");
      return;
    }
    setError('');
    setLoading(true);
    try {
      const boss = await generateBoss({ presetId: presetId || 'other', text: clean });
      onGenerated(boss);
    } catch {
      setError('The Chaos Engine tripped over a cable. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="screen fade-in">
      <button className="back-link" onClick={onBack} disabled={loading}>← BACK TO LOBBY</button>

      <h2 className="screen-title">WHAT'S BUGGING YOU?</h2>
      <p className="screen-sub">Pick one, describe it, or both. We'll turn it into a boss.</p>

      <div className="chips" role="group" aria-label="Pick a frustration">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            className={`chip ${presetId === p.id ? 'active' : ''}`}
            aria-pressed={presetId === p.id}
            disabled={loading}
            onClick={() => {
              setPresetId(presetId === p.id ? '' : p.id);
              setError('');
            }}
          >
            <span className="chip-emoji">{p.emoji}</span> {p.label}
          </button>
        ))}
      </div>

      <label className="field-label" htmlFor="story">Describe your situation</label>
      <textarea
        id="story"
        className="textarea"
        rows={4}
        maxLength={MAX}
        value={text}
        disabled={loading}
        placeholder="My application crashed five minutes before my presentation."
        onChange={(e) => {
          setText(e.target.value);
          setError('');
        }}
      />
      <div className="field-meta">
        <span className="error" role="alert">{error}</span>
        <span className="count">{text.length}/{MAX}</span>
      </div>

      <button className="btn btn-pink btn-xl" onClick={submit} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" /> SUMMONING BOSS...
          </>
        ) : (
          'GENERATE MY BOSS BATTLE'
        )}
      </button>
    </div>
  );
}
