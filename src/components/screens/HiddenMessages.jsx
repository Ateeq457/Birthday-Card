import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useConfetti } from '../../hooks/useConfetti';

const HiddenMessages = ({ onNext }) => {
  const [revealed, setRevealed] = useState({});
  const { triggerMiniConfetti } = useConfetti();
  
  const messages = {
  card1: {
    title: "Open this 😏",
    secret: "You act like you don’t care… but you care about everything deep down 😄💜\nAteeq knows."
  },
  card2: {
    title: "Don’t click this 👀",
    secret: "Too late 😏\nYou’re one of those people who want success but hate boring effort… still, somehow you make it work 💰✨"
  },
  card3: {
    title: "Secret message 💀",
    secret: "If confidence had a face, it would look like you…\nbut you still overthink like a full-time job 😭💜"
  },
  card4: {
    title: "Last one... 🤫",
    secret: "You don’t need to change who you are… just upgrade the version a little 😏\nAteeq believes in you, Ollu 🦉💜"
  }
};
  
  const reveal = (id) => {
    if (!revealed[id]) {
      setRevealed(prev => ({ ...prev, [id]: true }));
      triggerMiniConfetti(0.5, 0.7);
    }
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #fed7e5, #ffe6f0, #fce4ec)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h2 style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)', color: '#b84c8c', marginBottom: '0.5rem' }}>
          💌 Mysterious Cards 💌
        </h2>
        <p style={{ color: '#9b4d6e' }}>Each card holds a special message... tap to reveal!</p>
      </motion.div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.2rem',
        justifyContent: 'center',
        maxWidth: '1000px',
        marginBottom: '3rem'
      }}>
        {Object.entries(messages).map(([key, val], idx) => (
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={key}
            style={{
              background: 'white',
              borderRadius: '32px',
              padding: '1.5rem',
              width: '220px',
              minHeight: '180px',
              boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              border: revealed[key] ? '2px solid #ff9ecf' : 'none'
            }}
            onClick={() => reveal(key)}
          >
            {!revealed[key] ? (
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#7b61ff' }}>
                {val.title}
              </div>
            ) : (
              <div style={{ color: '#9b4d6e', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.4 }}>
                {val.secret}
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(123,97,255,0.4)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        style={{
          background: 'linear-gradient(95deg, #b388ff, #ff9ecf)',
          padding: '14px 42px',
          borderRadius: '60px',
          border: 'none',
          color: 'white',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}
      >
        ✨ Continue Your Story ✨
      </motion.button>
    </div>
  );
};

export default HiddenMessages;