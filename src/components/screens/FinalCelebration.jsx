import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// ADVANCED CONFETTI SYSTEM WITH CANVAS
// ============================================
const useAdvancedConfetti = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lastExplosionRef = useRef(Date.now());
  
  const createParticle = (x, y, isExplosion = false) => {
    const shapes = ['circle', 'heart', 'star'];
    const colors = ['#ff9ecf', '#ffc2e2', '#b388ff', '#7b61ff', '#ffd700', '#ffffff'];
    return {
      x: x || Math.random() * window.innerWidth,
      y: y || -10,
      vx: (Math.random() - 0.5) * (isExplosion ? 8 : 3),
      vy: Math.random() * (isExplosion ? 12 : 5) + (isExplosion ? 5 : 2),
      gravity: 0.2,
      size: Math.random() * 8 + 4,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 5,
      life: 1,
      fade: 0.02 + Math.random() * 0.03
    };
  };
  
  const triggerExplosion = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 3;
    const explosionCount = 60;
    for (let i = 0; i < explosionCount; i++) {
      particlesRef.current.push(createParticle(centerX, centerY, true));
    }
    lastExplosionRef.current = Date.now();
  }, []);
  
  const drawHeart = (ctx, x, y, size) => {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size * 0.7), x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size * 0.7), x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.fill();
  };
  
  const drawStar = (ctx, x, y, size) => {
    const spikes = 5;
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    for (let i = 0; i < spikes; i++) {
      const x1 = x + Math.cos(rot) * outerRadius;
      const y1 = y + Math.sin(rot) * outerRadius;
      ctx.lineTo(x1, y1);
      rot += step;
      const x2 = x + Math.cos(rot) * innerRadius;
      const y2 = y + Math.sin(rot) * innerRadius;
      ctx.lineTo(x2, y2);
      rot += step;
    }
    ctx.closePath();
    ctx.fill();
  };
  
  const animate = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Continuous rain of confetti
    if (Math.random() < 0.3) {
      particlesRef.current.push(createParticle());
    }
    
    // Regular explosions
    if (Date.now() - lastExplosionRef.current > 2000) {
      triggerExplosion();
    }
    
    particlesRef.current = particlesRef.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.spin;
      p.life -= p.fade;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      
      if (p.shape === 'heart') {
        drawHeart(ctx, 0, 0, p.size);
      } else if (p.shape === 'star') {
        drawStar(ctx, 0, 0, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
      return p.life > 0 && p.y < canvas.height + 100;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [triggerExplosion]);
  
  useEffect(() => {
    animate();
    // Trigger initial explosions
    const initialExplosions = setInterval(() => triggerExplosion(), 500);
    setTimeout(() => clearInterval(initialExplosions), 3000);
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      clearInterval(initialExplosions);
    };
  }, [animate, triggerExplosion]);
  
  return { canvasRef, triggerExplosion };
};

// ============================================
// FLOATING PARTICLES SYSTEM
// ============================================
const FloatingElements = () => {
  const elements = [];
  const items = ['🎈', '🎂', '🎁', '💜', '✨', '⭐', '🌸', '🦄'];
  
  for (let i = 0; i < 40; i++) {
    const delay = Math.random() * 5;
    const duration = 8 + Math.random() * 7;
    const startX = Math.random() * 100;
    const size = 1 + Math.random();
    elements.push(
      <motion.div
        key={i}
        initial={{ x: `${startX}vw`, y: '100vh', opacity: 0, scale: 0 }}
        animate={{
          y: '-20vh',
          opacity: [0, 1, 1, 0],
          scale: [0, size, size, 0],
          rotate: [0, 360, 720],
          x: [`${startX}vw`, `${startX + (Math.random() - 0.5) * 30}vw`]
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          ease: 'easeOut'
        }}
        style={{
          position: 'absolute',
          fontSize: `${24 + Math.random() * 20}px`,
          pointerEvents: 'none',
          zIndex: 10,
          filter: 'drop-shadow(0 0 10px rgba(255,158,207,0.6))'
        }}
      >
        {items[Math.floor(Math.random() * items.length)]}
      </motion.div>
    );
  }
  return <>{elements}</>;
};

// ============================================
// TWINKLING STARS BACKGROUND
// ============================================
const StarBackground = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    stars.push(
      <motion.div
        key={i}
        initial={{ opacity: 0.2, scale: 0 }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.5, 1.5, 0.5]
        }}
        transition={{
          duration: 2 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3
        }}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          background: `radial-gradient(circle, #fff, ${['#ff9ecf', '#b388ff', '#ffd700'][Math.floor(Math.random() * 3)]})`,
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255,255,255,0.8)'
        }}
      />
    );
  }
  return <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>{stars}</div>;
};

// ============================================
// DRIFTING CLOUDS
// ============================================
const DriftingClouds = () => {
  const clouds = [
    { left: '-10%', size: 300, duration: 60, delay: 0, top: '10%' },
    { left: '20%', size: 250, duration: 75, delay: 10, top: '30%' },
    { left: '50%', size: 350, duration: 65, delay: 20, top: '15%' },
    { left: '70%', size: 200, duration: 80, delay: 5, top: '50%' },
    { left: '-5%', size: 280, duration: 70, delay: 15, top: '70%' }
  ];
  
  return (
    <>
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            left: cloud.left,
            top: cloud.top,
            width: cloud.size,
            height: cloud.size * 0.6,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3), rgba(255,255,255,0.05))',
            borderRadius: '50%',
            filter: 'blur(30px)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </>
  );
};

// ============================================
// ANIMATED BIRTHDAY CAKE
// ============================================
const AnimatedCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCandlesLit(prev => prev.map(() => Math.random() > 0.3));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotateZ: [-1, 1, -1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        bottom: '15%',
        left: '15%',
        zIndex: 15,
        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
        cursor: 'pointer'
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div style={{ position: 'relative', fontSize: '120px' }}>
        🎂
        <div style={{ position: 'absolute', top: '-30px', left: '30px', display: 'flex', gap: '20px' }}>
          {candlesLit.map((lit, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
              style={{ fontSize: '30px' }}
            >
              {lit ? '🕯️' : '💨'}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{ position: 'absolute', top: '-50px', left: '60px', fontSize: '40px' }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN CELEBRATION COMPONENT
// ============================================
const FinalCelebration = ({ onReplay }) => {
  const { canvasRef, triggerExplosion } = useAdvancedConfetti();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = "Happy Birthday Irraj 💜";
  
  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypewriterText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowSubtitle(true);
          setTimeout(() => setShowButton(true), 800);
        }, 500);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);
  
  // Auto confetti explosions
  useEffect(() => {
    const autoExplode = setInterval(() => {
      triggerExplosion();
    }, 2500);
    return () => clearInterval(autoExplode);
  }, [triggerExplosion]);
  
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 25%, #6b3a7d 50%, #ff6b9d 75%, #ffd700 100%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 10s ease infinite'
    }}>
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes floatGlow {
            0%, 100% { filter: drop-shadow(0 0 10px rgba(255,158,207,0.5)); }
            50% { filter: drop-shadow(0 0 30px rgba(255,158,207,0.9)); }
          }
          @keyframes ripple {
            0% { transform: scale(0); opacity: 0.8; }
            100% { transform: scale(4); opacity: 0; }
          }
        `}
      </style>
      
      {/* Canvas for advanced confetti */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 20
        }}
      />
      
      {/* Background layers */}
      <StarBackground />
      <DriftingClouds />
      
      {/* Floating magical elements */}
      <FloatingElements />
      
      {/* Animated Cake */}
      <AnimatedCake />
      
      {/* Floating gift boxes that open */}
      <FloatingGiftBoxes />
      
      {/* Parallax light rays */}
      <ParallaxLights />
      
      {/* Floating hearts line */}
      <FloatingHeartLine />
      
      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 100,
          duration: 1.2
        }}
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem'
        }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            boxShadow: [
              '0 30px 60px rgba(0,0,0,0.3)',
              '0 40px 80px rgba(255,158,207,0.5)',
              '0 30px 60px rgba(0,0,0,0.3)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(25px) saturate(180%)',
            borderRadius: '72px',
            padding: '3rem 4rem',
            maxWidth: '90%',
            width: '650px',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated border gradient */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: 'linear-gradient(90deg, #ff9ecf, #b388ff, #ffd700, #ff9ecf)',
              borderRadius: '72px',
              zIndex: -1,
              opacity: 0.5
            }}
          />
          
          {/* Light reflection effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'skewX(-20deg)',
              pointerEvents: 'none'
            }}
          />
          
          {/* Main title with typewriter effect */}
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px #ff9ecf',
                '0 0 40px #b388ff',
                '0 0 20px #ff9ecf'
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '1rem',
              fontFamily: "'Poppins', 'Quicksand', sans-serif",
              letterSpacing: '2px'
            }}
          >
            {typewriterText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ display: 'inline-block', width: '4px', height: '1em', background: 'white', marginLeft: '4px' }}
            />
          </motion.h1>
          
          {/* Subtitle with stagger animation */}
          <AnimatePresence>
            {showSubtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                    color: '#ffd700',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}
                >
                  ✨ Stay amazing. Stay real. ✨
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: 'clamp(0.9rem, 3.5vw, 1.2rem)',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '2rem'
                  }}
                >
                  You made it through the magical journey! 🎉
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Replay Button with magical portal effect */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(123,97,255,0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerExplosion();
                    setTimeout(() => onReplay(), 300);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #7b61ff, #ff9ecf, #ffd700)',
                    border: 'none',
                    padding: '16px 48px',
                    borderRadius: '60px',
                    color: 'white',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                >
                  ⟳ Relive the Magic
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
                      borderRadius: '60px'
                    }}
                  />
                </motion.button>
                {/* Ripple effect on click */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.2, 0]
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, #ff9ecf, transparent)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      
      {/* Sound placeholder comments */}
      {/*
        === SOUND/MOOD EFFECTS PLACEHOLDER ===
        
        1. Birthday Music Autoplay:
           const audio = new Audio('/birthday-music.mp3');
           audio.loop = true;
           audio.volume = 0.3;
           audio.play().catch(e => console.log('Autoplay prevented'));
        
        2. Confetti Sound on Explosion:
           const confettiSound = new Audio('/confetti-pop.mp3');
           confettiSound.volume = 0.2;
           confettiSound.play();
        
        3. Magical Chime on Entrance:
           const chimeSound = new Audio('/magical-chime.mp3');
           chimeSound.play();
        
        Note: Add these to useEffect for best results.
      */}
    </div>
  );
};

// ============================================
// FLOATING GIFT BOXES
// ============================================
const FloatingGiftBoxes = () => {
  const [openedGifts, setOpenedGifts] = useState({});
  const gifts = [
    { id: 1, x: '80%', y: '20%', delay: 0 },
    { id: 2, x: '10%', y: '60%', delay: 2 },
    { id: 3, x: '85%', y: '70%', delay: 4 }
  ];
  
  const openGift = (id) => {
    setOpenedGifts(prev => ({ ...prev, [id]: true }));
  };
  
  return (
    <>
      {gifts.map(gift => (
        <motion.div
          key={gift.id}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: gift.delay, type: 'spring' }}
          style={{
            position: 'absolute',
            left: gift.x,
            top: gift.y,
            cursor: 'pointer',
            zIndex: 15,
            fontSize: '50px'
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => openGift(gift.id)}
        >
          {!openedGifts[gift.id] ? '🎁' : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              🎀✨
            </motion.div>
          )}
        </motion.div>
      ))}
    </>
  );
};

// ============================================
// PARALLAX LIGHTS
// ============================================
const ParallaxLights = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 5 }}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: mousePos.x * 50 * (i + 1) * -1,
            y: mousePos.y * 30 * (i + 1) * -1
          }}
          transition={{ type: 'spring', stiffness: 50 }}
          style={{
            position: 'absolute',
            left: `${10 + i * 10}%`,
            top: `${20 + i * 8}%`,
            width: '150px',
            height: '150px',
            background: `radial-gradient(circle, rgba(255,158,207,0.15), rgba(179,136,255,0.05))`,
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// FLOATING HEART LINE
// ============================================
const FloatingHeartLine = () => {
  const hearts = [];
  for (let i = 0; i < 20; i++) {
    hearts.push(
      <motion.div
        key={i}
        initial={{ x: `${i * 5}%`, y: '100vh', opacity: 0 }}
        animate={{
          y: '-20vh',
          opacity: [0, 1, 1, 0],
          x: [`${i * 5}%`, `${i * 5 + (Math.random() - 0.5) * 20}%`]
        }}
        transition={{
          duration: 5 + Math.random() * 3,
          delay: i * 0.3,
          repeat: Infinity,
          ease: 'easeOut'
        }}
        style={{
          position: 'absolute',
          fontSize: '24px',
          pointerEvents: 'none',
          zIndex: 12
        }}
      >
        {['❤️', '💜', '💖', '💗', '💓'][i % 5]}
      </motion.div>
    );
  }
  return <>{hearts}</>;
};

export default FinalCelebration;