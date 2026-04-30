import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '../common/FloatingParticles';

const HackerIntro = ({ onAccess }) => {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const fullText = "Accessing Irraj's Birthday System...\nScanning green eyes signature...\nERROR ❌ Unauthorized Access";  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i+1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowButton(true);
          setGlitch(true);
          setTimeout(() => setGlitch(false), 300);
        }, 400);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0c10',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'monospace',
      position: 'relative'
    }}>
      <FloatingParticles color="#b388ff" count={8} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          background: '#000000aa',
          backdropFilter: 'blur(8px)',
          padding: '2rem',
          borderRadius: '32px',
          border: '1px solid #ff9ecf33',
          boxShadow: '0 0 30px rgba(255,158,207,0.2)'
        }}
      >
        <pre style={{
          color: '#0f0',
          fontSize: 'clamp(14px, 5vw, 20px)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          textShadow: glitch ? '2px 0 red, -2px 0 blue' : 'none',
          animation: glitch ? 'glitch 0.1s infinite' : 'none'
        }}>
          {text}
        </pre>
        {showButton && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px #ff9ecf' }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccess}
            style={{
              marginTop: '2rem',
              background: 'linear-gradient(135deg, #ff9ecf, #b388ff)',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '60px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'inherit',
              transition: 'all 0.3s ease'
            }}
          >
            I am Irraj 😎
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default HackerIntro;