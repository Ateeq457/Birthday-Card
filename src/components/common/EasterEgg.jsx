import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EasterEgg = ({ onTrigger }) => {
  const [clickCount, setClickCount] = useState(0);
  
  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      onTrigger();
      setClickCount(0);
    }
    // Reset after 2 seconds if not enough clicks
    setTimeout(() => setClickCount(0), 2000);
  };
  
  return (
    <div
      onClick={handleSecretClick}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        opacity: 0.01,
        zIndex: 9999,
        cursor: 'pointer',
        background: 'transparent',
        borderRadius: '50%'
      }}
      title="Secret area (click 3 times)"
    />
  );
};

export default EasterEgg;