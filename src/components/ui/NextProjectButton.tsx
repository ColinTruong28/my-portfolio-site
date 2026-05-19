'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── PROJECT IDs ───────────────────────────────────────────────────────────────
// Add the id prop to each <ProjectShowcase> wrapper div in App.tsx like:
//   <div id="project-robot-arm">   <ProjectShowcase ... />   </div>
//
// Then list those ids here in order:

export const PROJECT_IDS = [
  'project-robot-arm',
  'project-autonomous-robot',
  'project-five-bar',
];

// ── NextProjectButton ─────────────────────────────────────────────────────────
// Sticky button fixed to bottom-right. Scrolls to the next project.
// Disappears after the last project, reappears when you scroll back up.

export default function NextProjectButton() {
  const [currentIdx, setCurrentIdx] = useState(-1); // -1 = not in projects section
  const [visible, setVisible] = useState(false);

  const findCurrentProject = useCallback(() => {
    const viewportMid = window.scrollY + window.innerHeight * 0.5;
    let found = -1;

    PROJECT_IDS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      const absTop    = top    + window.scrollY;
      const absBottom = bottom + window.scrollY;
      if (viewportMid >= absTop && viewportMid < absBottom) found = i;
    });

    setCurrentIdx(found);
    setVisible(found >= 0 && found < PROJECT_IDS.length - 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', findCurrentProject, { passive: true });
    findCurrentProject();
    return () => window.removeEventListener('scroll', findCurrentProject);
  }, [findCurrentProject]);

  function scrollToNext() {
    if (currentIdx < 0 || currentIdx >= PROJECT_IDS.length - 1) return;
    const nextId = PROJECT_IDS[currentIdx + 1];
    const el = document.getElementById(nextId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Update URL hash without jumping
    history.pushState(null, '', `#${nextId}`);
  }

  const nextLabel =
    currentIdx >= 0 && currentIdx < PROJECT_IDS.length - 1
      ? `Next: ${PROJECT_IDS[currentIdx + 1].replace('project-', '').replace(/-/g, ' ')}`
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
            background: 'rgba(0,0,0,0.7)',
            borderColor: 'rgba(237,207,122,0.35)',
            color: 'rgba(237,207,122,0.85)',
            boxShadow: '0 0 20px rgba(237,207,122,0.08)',
          }}
          aria-label={`Scroll to next project`}
        >
          {/* Animated chevron */}
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
