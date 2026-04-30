import { useState, useRef, useEffect } from 'react';

export const useSoundToggle = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const clickAudio = useRef(null);
  const bgAudio = useRef(null);
  
  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      // Web Audio API friendly silent sounds (optional - actual sound requires external files)
      clickAudio.current = new Audio();
      bgAudio.current = new Audio();
      bgAudio.current.loop = true;
      bgAudio.current.volume = 0.2;
      
      // For demo purposes we don't load actual sounds to avoid CORS
      // In production, add actual sound files
    }
    return () => {
      if (bgAudio.current) bgAudio.current.pause();
    };
  }, []);
  
  const toggleSound = () => {
    setIsSoundEnabled(prev => !prev);
    if (bgAudio.current) {
      if (!isSoundEnabled) {
        bgAudio.current.play().catch(e => console.log("Audio play requires user interaction"));
      } else {
        bgAudio.current.pause();
      }
    }
  };
  
  const playClick = () => {
    if (isSoundEnabled && clickAudio.current) {
      // In production, implement actual click sound
      console.log("Click sound would play here");
    }
  };
  
  return { isSoundEnabled, toggleSound, playClick };
};