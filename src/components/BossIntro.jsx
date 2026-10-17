import Monster from './Monster';
import VoiceButton from './VoiceButton';

const OBSTACLE_LABEL = {
  error_messages: '⚠️ Error messages',
  spam_emails: '📧 Spam emails',
  meeting_invites: '📅 Meeting invites',
};
const POWERUP_LABEL = {
  coffee: '☕ Coffee',
  golden_bug: '✨ Golden bugs',
};

export default function BossIntro({ boss, onStart, onReroll, onBack }) {
  const announcement = `Incoming! ${boss.bossName}. ${boss.mission}`;

  return (
    <div className="screen fade-in">
      <button className="back-link" onClick={onBack}>← BACK TO LOBBY</button>

      <div className="boss-card">
        <p className="insert-coin">★ BOSS INCOMING ★</p>
        <Monster type={boss.monster} className="boss-card-mon" />
        <h2 className="boss-card-name">{boss.bossName}</h2>
        <span className={`badge badge-${boss.difficulty}`}>{boss.difficulty.toUpperCase()}</span>
        {boss.source === 'ai' && <span className="source-tag">✨ AI-GENERATED</span>}

        <p className="boss-card-desc">{boss.description}</p>
        <p className="boss-card-mission">MISSION: {boss.mission}</p>

        <div className="meta-grid">
          <div className="meta">
            <div className="meta-title">TIME</div>
            <div className="meta-body">{boss.duration}s</div>
          </div>
          <div className="meta">
            <div className="meta-title">AVOID</div>
            <div className="meta-body">{boss.obstacles.map((o) => OBSTACLE_LABEL[o]).join(', ')}</div>
          </div>
          <div className="meta">
            <div className="meta-title">COLLECT</div>
            <div className="meta-body">{boss.powerUps.map((p) => POWERUP_LABEL[p]).join(', ')}</div>
          </div>
        </div>

        <VoiceButton text={announcement} />

        <div className="actions boss-actions">
          <button className="btn btn-lime btn-xl" onClick={onStart}>▶ START BATTLE</button>
          <button className="btn btn-ghost" onClick={onReroll}>↻ NEW BOSS</button>
        </div>
      </div>
    </div>
  );
}
