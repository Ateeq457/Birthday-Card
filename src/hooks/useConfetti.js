import { useCallback } from 'react';

export const useConfetti = () => {
  const triggerConfetti = useCallback((options = {}) => {
    if (typeof window !== 'undefined' && window.canvasConfetti) {
      window.canvasConfetti({
        particleCount: options.particleCount || 100,
        spread: options.spread || 70,
        origin: options.origin || { y: 0.6 },
        startVelocity: options.startVelocity || 15,
        colors: options.colors || ['#ff9ecf', '#ffc2e2', '#b388ff', '#7b61ff', '#ffffff'],
        ...options
      });
    }
  }, []);
  
  const triggerHeavyConfetti = useCallback(() => {
    triggerConfetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    setTimeout(() => {
      triggerConfetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }, 150);
    setTimeout(() => {
      triggerConfetti({ particleCount: 100, spread: 120, origin: { y: 0.4 } });
    }, 300);
  }, [triggerConfetti]);
  
  const triggerMiniConfetti = useCallback((x = 0.5, y = 0.7) => {
    triggerConfetti({
      particleCount: 30,
      spread: 45,
      origin: { x, y },
      startVelocity: 10
    });
  }, [triggerConfetti]);
  
  return { triggerConfetti, triggerHeavyConfetti, triggerMiniConfetti };
};