import { useState } from 'react';
import Landing from './components/Landing';
import Background from './components/Background';
import WorkdayInput from './components/WorkdayInput';
import BossIntro from './components/BossIntro';
import Game from './components/Game';
import Result from './components/Result';
import Roast from './components/Roast';
import { getStats, saveStats, recordGame } from './utils/storage';

const WIN_SCORE = { easy: 80, medium: 100, hard: 120 };

function Placeholder({ onBack }) {
  return (
    <div className="placeholder fade-in">
      <h2>CHALLENGE A FRIEND</h2>
      <p>Multiplayer is coming soon. Single-player boss battles are ready now.</p>
      <button className="btn btn-ghost" onClick={onBack}>← BACK TO LOBBY</button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [boss, setBoss] = useState(null);
  const [result, setResult] = useState(null);
  const [gameKey, setGameKey] = useState(0);
  const [stats, setStats] = useState(getStats);

  const home = () => setScreen('landing');
  const target = boss ? WIN_SCORE[boss.difficulty] || 100 : 100;

  const handleFinish = (raw) => {
    const { stats: next, newlyUnlocked, isNewBest } = recordGame(getStats(), raw);
    saveStats(next);
    setStats(next);
    setResult({ ...raw, won: raw.score >= target, target, newlyUnlocked, isNewBest });
    setScreen('result');
  };

  const startGame = () => {
    setGameKey((k) => k + 1);
    setScreen('game');
  };

  let content;
  if (screen === 'landing') {
    content = <Landing stats={stats} onNavigate={setScreen} />;
  } else if (screen === 'arcade') {
    content = (
      <WorkdayInput
        onBack={home}
        onGenerated={(b) => {
          setBoss(b);
          setScreen('boss');
        }}
      />
    );
  } else if (screen === 'boss' && boss) {
    content = <BossIntro boss={boss} onStart={startGame} onReroll={() => setScreen('arcade')} onBack={home} />;
  } else if (screen === 'game' && boss) {
    content = <Game key={gameKey} boss={boss} target={target} onFinish={handleFinish} onBack={home} />;
  } else if (screen === 'result' && boss && result) {
    content = (
      <Result
        result={result}
        boss={boss}
        stats={stats}
        onAgain={startGame}
        onNewBoss={() => setScreen('arcade')}
        onHome={home}
      />
    );
  } else if (screen === 'roast') {
    content = <Roast onBack={home} />;
  } else {
    content = <Placeholder onBack={home} />;
  }

  return (
    <>
      <Background />
      <div className="scanlines" aria-hidden="true" />
      <main className="app">{content}</main>
    </>
  );
}
