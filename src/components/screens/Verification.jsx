import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '../common/FloatingParticles';

const Verification = ({ onVerify }) => {
  const [feedback, setFeedback] = useState("");
  const moods = [
  "💰 Future Crorepati",
  "📱 Reel Scrolling Mode",
  "😎 Boss Banna Hai (but kal se)",
  "💭 Big Dreams, Zero Action",
  "🦉 Certified Ollu Energy"
];
  
  const handleMoodSelect = (mood) => {
    setFeedback(`😏 Ateeq approved... ${mood} detected. Access granted, Ollu 🦉`);
    setTimeout(() => onVerify(), 4000);
  };
  
  const wrongAnswer = () => {
    setFeedback("❌ Fake detected! Real Irraj to reels dekh rahi hoti 😆");
    setTimeout(() => setFeedback(""), 5000);
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #1e1a2f, #0f0c1f)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      position: 'relative'
    }}>
      <FloatingParticles color="#ff9ecf" count={15} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '48px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,158,207,0.5)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}
      >
        <h2 style={{ fontSize: 'clamp(1.8rem, 8vw, 2.4rem)', color: '#ffc2e2', marginBottom: '1rem' }}>
          ✨ Identity Check ✨
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#ddd' }}>
          Are you REALLY Irraj... ya bas acting kar rahi ho? 😏
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {moods.map((mood) => (
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              style={{
                background: 'rgba(123,97,255,0.7)',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '100px',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '1rem',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s ease'
              }}
            >
              {mood}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={wrongAnswer}
            style={{
              background: 'rgba(255,100,100,0.5)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '100px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🙅‍♀️ I'm not Irraj
          </motion.button>
        </div>
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#ffd966', fontWeight: 'bold', marginTop: '1rem' }}
          >
            {feedback}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Verification;