'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { smoothScrollTo } from '../../lib/lenis';

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

  // Track which project section is centered in the viewport via a zero-height
  // observation line at the vertical middle of the viewport (rootMargin trick),
  // instead of polling getBoundingClientRect on every scroll event.
  useEffect(() => {
    setCurrentIdx(-1);
    setVisible(false);

    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const intersecting = new Set<string>();

    const recompute = () => {
      let found = -1;
      ids.forEach((id, i) => {
        if (intersecting.has(id)) found = i;
      });
      setCurrentIdx(found);
      setVisible(found >= 0 && found < ids.length - 1);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        recompute();
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  function scrollToNext() {
    if (currentIdx < 0 || currentIdx >= ids.length - 1) return;
    const nextId = ids[currentIdx + 1];
    const el = document.getElementById(nextId);
    if (!el) return;
    smoothScrollTo(el);
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
