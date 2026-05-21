'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOFTWARE_IDS = [
  'software-iBank',
  'software-global-lab',
];

const ROBOT_IDS = [
  'project-robot-arm',
  'project-autonomous-robot',
  'project-five-bar',
];

export default function NextProjectButton({ category }: { category: 'software' | 'robotics' }) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [visible, setVisible] = useState(false);

  // Derive the active ID list from the prop — no useState needed
  const ids = category === 'software' ? SOFTWARE_IDS : ROBOT_IDS;

  // Reset whenever the category switches
  useEffect(() => {
    setCurrentIdx(-1);
    setVisible(false);
  }, [category]);

  const findCurrentProject = useCallback(() => {
    const viewportMid = window.scrollY + window.innerHeight * 0.5;
    let found = -1;

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      const absTop    = top    + window.scrollY;
      const absBottom = bottom + window.scrollY;
      if (viewportMid >= absTop && viewportMid < absBottom) found = i;
    });

    setCurrentIdx(found);
    setVisible(found >= 0 && found < ids.length - 1);
  }, [ids]); // re-runs whenever ids reference changes (i.e. category switches)

  useEffect(() => {
    window.addEventListener('scroll', findCurrentProject, { passive: true });
    findCurrentProject();
    return () => window.removeEventListener('scroll', findCurrentProject);
  }, [findCurrentProject]);

  function scrollToNext() {
    if (currentIdx < 0 || currentIdx >= ids.length - 1) return;
    const nextId = ids[currentIdx + 1];
    const el = document.getElementById(nextId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${nextId}`);
  }

  const nextLabel =
    currentIdx >= 0 && currentIdx < ids.length - 1
      ? `Next: ${ids[currentIdx + 1].replace(/^(project-|software-)/, '').replace(/-/g, ' ')}`
      : '';

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToNext}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border font-mono text-xs uppercase tracking-widest px-5 py-3 backdrop-blur-sm focus:outline-none group"
          style={{
            background: 'transparent',
            borderColor: 'rgba(255,202,248,1)',
            color: 'rgb(255,118,237)',
          }}
          aria-label="Scroll to next project"
        >
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            ↓
          </motion.span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 whitespace-nowrap">
            {nextLabel}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
