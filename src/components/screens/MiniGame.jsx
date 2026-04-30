import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '../common/FloatingParticles';
import { useConfetti } from '../../hooks/useConfetti';

const MiniGame = ({ onFinish }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(12);
  const [cakePos, setCakePos] = useState({ x: 50, y: 50 });
  const [message, setMessage] = useState("");
  const gameAreaRef = useRef(null);

  const { triggerMiniConfetti } = useConfetti();

  const emojis = ['🍰', '🎂', '💜', '🎁', '✨'];

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // SAFE MOVEMENT INSIDE CONTAINER
  const moveCake = () => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();

    const cakeSize = 60; // approximate emoji size
    const padding = 10;

    const maxX = rect.width - cakeSize - padding;
    const maxY = rect.height - cakeSize - padding;

    const x = Math.random() * maxX + padding;
    const y = Math.random() * maxY + padding;

    setCakePos({ x, y });
  };

  // Start movement loop
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        moveCake();
      }, 700);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const catchCake = () => {
    if (timeLeft <= 0) return;

    const newScore = score + 1;
    setScore(newScore);

    setMessage(`🎉 +1! Nice catch! (${newScore})`);

    triggerMiniConfetti(0.5, 0.5);

    setTimeout(() => setMessage(""), 500);

    moveCake();
  };

  const getFeedbackMessage = () => {
  if (score >= 10) return "💜 Irraj approved: Elite Reflex Master!";
  if (score >= 7) return "✨ That was seriously impressive!";
  if (score >= 4) return "🍰 Not bad! You're getting there!";
  return "🎂 Keep trying… magic takes practice 💜";
};
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // GAME OVER SCREEN
  if (timeLeft === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2b1a3a, #110b1f)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <FloatingParticles count={20} />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            background: 'rgba(255,255,240,0.2)',
            backdropFilter: 'blur(16px)',
            borderRadius: '40px',
            padding: '2rem',
            textAlign: 'center',
            maxWidth: '420px'
          }}
        >
          <h2 style={{ fontSize: '2rem', color: '#ffd966' }}>
            🎮 Game Over 🎮
          </h2>

          <p style={{ fontSize: '3rem', margin: '1rem 0', color: '#ff9ecf' }}>
            {score} 🍰
          </p>

          <p style={{ color: 'white', fontSize: '1.2rem' }}>
            {getFeedbackMessage()}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFinish(score)}
            style={{
              marginTop: '1.5rem',
              background: 'linear-gradient(135deg, #b388ff, #ff9ecf)',
              padding: '14px 40px',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Continue →
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // GAME SCREEN
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2b1a3a, #110b1f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <FloatingParticles count={15} />

      <div style={{
        background: 'rgba(255,255,240,0.15)',
        backdropFilter: 'blur(12px)',
        borderRadius: '40px',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#ffd966', fontSize: '1.8rem' }}>
          🎂 Catch the Magic!
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '1rem 0',
          fontSize: '1.4rem',
          fontWeight: 'bold'
        }}>
          <span>⭐ {score}</span>
          <span>⏱️ {timeLeft}s</span>
        </div>

        {/* GAME AREA */}
        <div
          ref={gameAreaRef}
          style={{
            position: 'relative',
            height: '350px',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '30px',
            overflow: 'hidden',
            border: '2px solid #ff9ecf66'
          }}
        >
          <motion.button
            onClick={catchCake}
            animate={{
              x: cakePos.x,
              y: cakePos.y
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            whileTap={{ scale: 0.85 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              border: 'none',
              background: 'transparent',
              fontSize: '3rem',
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {randomEmoji}
          </motion.button>
        </div>

        {/* MESSAGE */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ffc85a', marginTop: '1rem' }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default MiniGame;