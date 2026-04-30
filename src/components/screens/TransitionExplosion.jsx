import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';

const TransitionExplosion = ({ onComplete }) => {
  const { triggerHeavyConfetti } = useConfetti();
  
  useEffect(() => {
    setTimeout(() => triggerHeavyConfetti(), 500);
    const timer = setTimeout(() => onComplete(), 2800);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #ff9ecf, #7b61ff, #4a3a9e)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      flexDirection: 'column',
      gap: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      >
        <h1 style={{
          fontSize: 'clamp(2rem, 10vw, 4rem)',
          color: 'white',
          textShadow: '0 0 20px gold, 0 0 40px #ff69b4',
          fontWeight: 'bold'
        }}>
          “Access Granted… but only for Irraj 🦉”
        </h1>
      </motion.div>
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        style={{
          color: '#fff9e0',
          fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
          textShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
      >
        Welcome, Irraj 💜
      </motion.h2>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        pointerEvents: 'none'
      }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100, -20],
              x: [0, (i % 2) * 30 - 15, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut"
            }}
            style={{ fontSize: '2.5rem' }}
          >
            {['💜', '🦉', '🎂', '📱', '💰'][i % 5]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TransitionExplosion;