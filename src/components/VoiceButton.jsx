import { useState } from 'react';
import { speak } from '../utils/voice';

const STATUS = {
  elevenlabs: '🎙️ ElevenLabs announcer',
  browser: '🔈 Browser voice (ElevenLabs not available)',
  none: 'Voice unavailable. Read the announcement above.',
};

export default function VoiceButton({ text }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const play = async () => {
    setLoading(true);
    setStatus('');
    const how = await speak(text);
    setStatus(how);
    setLoading(false);
  };

  return (
    <div className="announce">
      <p className="announce-text">📣 "{text}"</p>
      <button className="btn btn-cyan voice-btn" onClick={play} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" /> LOADING VOICE...
          </>
        ) : (
          '🔊 PLAY ANNOUNCER'
        )}
      </button>
      {status && <p className="voice-status">{STATUS[status]}</p>}
    </div>
  );
}
