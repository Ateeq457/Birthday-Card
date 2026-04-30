import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HackerIntro from './components/screens/HackerIntro';
import Verification from './components/screens/Verification';
import TransitionExplosion from './components/screens/TransitionExplosion';
import MiniGame from './components/screens/MiniGame';
import HiddenMessages from './components/screens/HiddenMessages';
import AnimatedStory from './components/screens/AnimatedStory';
import FinalCelebration from './components/screens/FinalCelebration';
import EasterEgg from './components/common/EasterEgg';
import { useSoundToggle } from './hooks/useSoundToggle';
import './index.css';

function App() {
  const [screen, setScreen] = useState('hacker');
  const [gameScore, setGameScore] = useState(0);
  const [easterMessage, setEasterMessage] = useState(null);
  const { playClick } = useSoundToggle();

  const handleNext = (nextScreen) => {
    playClick();
    setScreen(nextScreen);
  };

  const onGameFinish = (score) => {
    setGameScore(score);
    playClick();
    setScreen('hiddenMessages');
  };

  const showEaster = () => {
    setEasterMessage("✨💖 SECRET: Irraj, your laugh is the most beautiful melody. Stay fierce! 💖✨");
    setTimeout(() => setEasterMessage(null), 4000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {screen === 'hacker' && <HackerIntro key="hack" onAccess={() => handleNext('verify')} />}
        {screen === 'verify' && <Verification key="ver" onVerify={() => handleNext('transition')} />}
        {screen === 'transition' && <TransitionExplosion key="trans" onComplete={() => handleNext('miniGame')} />}
        {screen === 'miniGame' && <MiniGame key="game" onFinish={onGameFinish} />}
        {screen === 'hiddenMessages' && <HiddenMessages key="msg" onNext={() => handleNext('story')} />}
        {screen === 'story' && <AnimatedStory key="storyAnim" onComplete={() => handleNext('final')} />}
        {screen === 'final' && <FinalCelebration key="final" onReplay={() => { setScreen('hacker'); setGameScore(0); }} />}
      </AnimatePresence>
      <EasterEgg onTrigger={showEaster} />
      {easterMessage && (
        <div style={{
          position: 'fixed',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #2e1b3c, #1a0f2a)',
          color: '#ffe6f0',
          padding: '16px 32px',
          borderRadius: '80px',
          zIndex: 9999,
          backdropFilter: 'blur(8px)',
          fontWeight: 'bold',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid #ff9ecf',
          animation: 'pulse-glow 1s infinite'
        }}>
          {easterMessage}
        </div>
      )}
    </div>
  );
}

export default App;