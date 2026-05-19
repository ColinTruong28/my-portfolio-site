'use client';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Drop-in replacement for the motion.div wrapping "About Me"
// Usage: <NeonSign>About Me</NeonSign>
// Keep your existing className="about-neon-sign" on it

interface NeonSignProps {
  children: React.ReactNode;
  className?: string;
}

// A single random flicker sequence
function buildFlicker() {
  return {
    opacity:    [1, 0.15, 1, 0.6, 1, 0.05, 1],
    color:      ['#fff', '#888', '#fff', '#bbb', '#fff', '#555', '#fff'],
    textShadow: [
      '0 0 7px #fff, 0 0 20px #d4af37',
      '0 0 0px #fff, 0 0 0px #d4af37',
      '0 0 15px #fff, 0 0 30px #d4af37',
      '0 0 4px #fff, 0 0 8px #d4af37',
      '0 0 20px #fff, 0 0 40px #d4af37',
      '0 0 0px #fff, 0 0 0px #d4af37',
      '0 0 7px #fff, 0 0 20px #d4af37',
    ],
    transition: {
      duration: 0.45,
      times: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      ease: 'easeInOut' as const,
    },
  };
}

// The initial "power on" flicker
const initVisible = {
  opacity: [0, 1, 0.4, 1, 0.8, 1],
  color:   ['#444', '#fff', '#888', '#fff', '#aaa', '#fff'],
  textShadow: [
    '0 0 0px rgba(0,0,0,0)',
    '0 0 15px #fff, 0 0 30px #d4af37',
    '0 0 2px #fff, 0 0 5px #d4af37',
    '0 0 20px #fff, 0 0 40px #d4af37',
    '0 0 5px #fff, 0 0 10px #d4af37',
    '0 0 7px #fff, 0 0 20px #d4af37',
  ],
  transition: {
    duration: 0.8,
    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
    ease: 'easeInOut' as const,
  },
};

export default function NeonSign({ children, className }: NeonSignProps) {
  const controls = useAnimation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  function scheduleNextFlicker() {
    if (!mountedRef.current) return;
    // Random gap between 3 and 10 seconds
    const delay = 3000 + Math.random() * 7000;
    timerRef.current = setTimeout(async () => {
      if (!mountedRef.current) return;
      await controls.start(buildFlicker());
      scheduleNextFlicker();
    }, delay);
  }

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleAnimationComplete() {
    // Called after the initial whileInView animation fires
    scheduleNextFlicker();
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, color: '#444', textShadow: '0 0 0px rgba(0,0,0,0)' }}
      whileInView={initVisible}
      viewport={{ once: true, margin: '-350px 0px' }}
      animate={controls}
      onAnimationComplete={handleAnimationComplete}
    >
      {children}
    </motion.div>
  );
}
