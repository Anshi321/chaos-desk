import Monster from './Monster';
import VoiceButton from './VoiceButton';
import { ACHIEVEMENTS } from '../data/achievements';

export default function Result({ result, boss, stats, onAgain, onNewBoss, onHome }) {
  const { score, won, target, isNewBest, newlyUnlocked } = result;

  const announcement = won
    ? `Congratulations! ${boss.victoryMessage} Final score: ${score}.`
    : `${boss.bossName} survives this round. You scored ${score}. Try again!`;

  return (
    <div className="screen fade-in">
      <div className={`boss-card result ${won ? 'won' : 'lost'}`}>
        <p className="insert-coin">{won ? '★ YOU WIN ★' : '★ GAME OVER ★'}</p>

        <Monster type={boss.monster} className={`boss-card-mon ${won ? 'defeated' : ''}`} />

        <h2 className="boss-card-name">
          {won ? boss.victoryMessage : `${boss.bossName.toUpperCase()} SURVIVES... FOR NOW`}
        </h2>

        <div className="final-score">
          <div className="stat-label">FINAL SCORE</div>
          <div className="stat-value">{String(score).padStart(4, '0')}</div>
          {isNewBest && <div className="new-best">★ NEW BEST SCORE! ★</div>}
          <div className="goal-note">{won ? 'Goal reached' : `You needed ${target} points`}</div>
        </div>

        <VoiceButton text={announcement} />

        <div className="meta-grid">
          <div className="meta"><div className="meta-title">BUGS SQUASHED</div><div className="meta-body">{result.bugs}</div></div>
          <div className="meta"><div className="meta-title">GOLDEN BUGS</div><div className="meta-body">{result.golden}</div></div>
          <div className="meta"><div className="meta-title">COFFEES</div><div className="meta-body">{result.coffee}</div></div>
          <div className="meta"><div className="meta-title">BOMBS HIT</div><div className="meta-body">{result.bombs}</div></div>
        </div>

        {newlyUnlocked.length > 0 && (
          <div className="unlocks">
            <div className="meta-title">ACHIEVEMENT UNLOCKED</div>
            {newlyUnlocked.map((a) => (
              <div key={a.id} className="ach unlocked">
                <span className="ach-icon">{a.icon}</span>
                <div>
                  <div className="ach-name">{a.name}</div>
                  <div className="ach-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="goal-note">
          Best: {stats.bestScore} · Games: {stats.gamesPlayed} · Achievements: {stats.achievements.length}/{ACHIEVEMENTS.length}
        </p>

        <div className="actions boss-actions">
          <button className="btn btn-lime btn-xl" onClick={onAgain}>▶ PLAY AGAIN</button>
          <button className="btn btn-cyan" onClick={onNewBoss}>NEW BOSS</button>
          <button className="btn btn-ghost" onClick={onHome}>LOBBY</button>
        </div>
      </div>
    </div>
  );
}
