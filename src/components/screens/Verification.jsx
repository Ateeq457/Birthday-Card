import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingParticles from '../common/FloatingParticles';

const Verification = ({ onVerify }) => {
  const [feedback, setFeedback] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");
  
  const moods = [
    "💰 Future Crorepati",
    "📱 Reel Scrolling Mode",
    "😎 Boss Banna Hai (but kal se)",
    "💭 Big Dreams, Zero Action",
    "🦉 Certified Ollu Energy"
  ];
  
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowLoading(true);
    setApprovalMessage(`😏 Ateeq approved... ${mood} detected. Access granted, Ollu 🦉`);
    
    setTimeout(() => {
      setShowLoading(false);
      setFeedback(approvalMessage);
      setTimeout(() => onVerify(), 1000);
    }, 6000);
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
      position: 'relative',
      overflow: 'hidden'
    }}>
      <FloatingParticles color="#ff9ecf" count={15} />
      
      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showLoading ? 0.3 : 1, y: showLoading ? 20 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          borderRadius: '48px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,158,207,0.5)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          transition: 'all 0.5s ease',
          filter: showLoading ? 'blur(4px)' : 'blur(0)'
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
              disabled={showLoading}
              style={{
                background: 'rgba(123,97,255,0.7)',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '100px',
                color: 'white',
                fontWeight: '600',
                cursor: showLoading ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.2s ease',
                opacity: showLoading ? 0.5 : 1
              }}
            >
              {mood}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={wrongAnswer}
            disabled={showLoading}
            style={{
              background: 'rgba(255,100,100,0.5)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '100px',
              color: 'white',
              cursor: showLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: showLoading ? 0.5 : 1
            }}
          >
            🙅‍♀️ I'm not Irraj
          </motion.button>
        </div>
        {feedback && !showLoading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#ffd966', fontWeight: 'bold', marginTop: '1rem' }}
          >
            {feedback}
          </motion.p>
        )}
      </motion.div>
      
      {/* Loading Overlay - Professional Design */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              flexDirection: 'column'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              style={{
                textAlign: 'center',
                maxWidth: '400px',
                padding: '2rem'
              }}
            >
              {/* Magical Spinner */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 2rem',
                  position: 'relative'
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '50%',
                    border: '3px solid rgba(255,158,207,0.3)',
                    borderTop: '3px solid #ff9ecf',
                    borderRight: '3px solid #b388ff'
                  }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '2rem'
                  }}
                >
                  ✨
                </motion.div>
              </motion.div>
              
              {/* Loading Text with dots animation */}
              <motion.h3
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  color: '#ffc2e2',
                  fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}
              >
                Verifying Identity
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  style={{ display: 'inline-block' }}
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  style={{ display: 'inline-block' }}
                >.</motion.span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  style={{ display: 'inline-block' }}
                >.</motion.span>
              </motion.h3>
              
              {/* Selected Mood Display */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  color: '#ffd700',
                  fontSize: '0.95rem',
                  marginBottom: '1.5rem',
                  background: 'rgba(255,215,0,0.1)',
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  backdropFilter: 'blur(8px)'
                }}
              >
                Selected: {selectedMood}
              </motion.p>
              
              {/* Approval Message */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
                style={{
                  background: 'linear-gradient(135deg, rgba(123,97,255,0.2), rgba(255,158,207,0.2))',
                  borderRadius: '20px',
                  padding: '1rem',
                  border: '1px solid rgba(255,158,207,0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <motion.p
                  animate={{
                    scale: [1, 1.02, 1],
                    textShadow: ['0 0 0px #ff9ecf', '0 0 10px #ff9ecf', '0 0 0px #ff9ecf']
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    color: '#ffd966',
                    fontWeight: 'bold',
                    fontSize: 'clamp(0.9rem, 4vw, 1rem)',
                    margin: 0
                  }}
                >
                  {approvalMessage}
                </motion.p>
              </motion.div>
              
              {/* Progress Bar */}
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, #ff9ecf, #b388ff, #ffd700)',
                  borderRadius: '3px',
                  marginTop: '2rem',
                  maxWidth: '300px',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Ambient Light Effect during loading */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              width: '150%',
              height: '150%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(123,97,255,0.15), transparent 70%)',
              pointerEvents: 'none',
              zIndex: 999
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Verification;