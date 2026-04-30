import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from '../common/FloatingParticles';

const AnimatedStory = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [showButton, setShowButton] = useState(false);
  
  const story =
"There are people...\n" +
"Who don’t even realize how special they are...\n" +
"And you? 😏 You are one of them.\n" +
"You act like everything is normal, but you leave impact everywhere you go 💜\n" +
"You talk about big dreams, success, money, and future...\n" +
"But sometimes you forget that you're already capable of all of it ✨\n" +
"And yeah... I noticed that too 🦉\n" +
"So on your birthday, just one reminder:\n" +
"Don't become someone else, just become a better version of YOU 💜\n\n" +
"Happy Birthday, Irraj ✨";
  
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setDisplayText(story.slice(0, idx + 1));
      idx++;
      if (idx >= story.length) {
        clearInterval(interval);
        setShowButton(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 30% 10%, #ffdde1, #e0c3ff, #d4b8ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      position: 'relative'
    }}>
      <FloatingParticles color="#ff9ecf" count={25} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255,245,250,0.85)',
          backdropFilter: 'blur(12px)',
          borderRadius: '64px',
          padding: '3rem 2rem',
          maxWidth: '650px',
          width: '100%',
          boxShadow: '0 40px 60px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,158,207,0.5)'
        }}
      >
        <pre style={{
          fontFamily: "'Quicksand', 'Poppins', sans-serif",
          fontSize: 'clamp(1.1rem, 5vw, 1.7rem)',
          whiteSpace: 'pre-wrap',
          color: '#3d2b56',
          lineHeight: 1.5,
          fontWeight: '500',
          textAlign: 'center'
        }}>
          {displayText}
        </pre>
        {showButton && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            style={{
              marginTop: '2rem',
              background: 'linear-gradient(135deg, #ff79b0, #b388ff)',
              border: 'none',
              padding: '12px 35px',
              borderRadius: '50px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            💜 Feel the Magic 💜
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedStory;