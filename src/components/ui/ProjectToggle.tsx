'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ProjectCategory = 'robotics' | 'software';

// ── VARIANT 1: Bookshelf toggle ───────────────────────────────────────────────
// Two book spines side by side. The active one "stands up" (scale + glow),
// the inactive one leans/dims. Very tactile and thematic.

interface BookshelfToggleProps {
  active: ProjectCategory;
  onChange: (cat: ProjectCategory) => void;
}

export function BookshelfToggle({ active, onChange }: BookshelfToggleProps) {
  const books: { id: ProjectCategory; label: string; spine: string; color: string; accent: string }[] = [
    {
      id: 'robotics',
      label: 'Robotics',
      spine: 'ROBOTICS',
      color: '#1a0a00',
      accent: 'rgba(237,207,122,1)',
    },
    {
      id: 'software',
      label: 'Software',
      spine: 'SOFTWARE ENG.',
      color: '#000d1a',
      accent: '#60a5fa',
    },
  ];

  return (
    <div className="flex items-end gap-3" aria-label="Project category">
      {books.map((book) => {
        const isActive = active === book.id;
        return (
          <button
            key={book.id}
            onClick={() => onChange(book.id)}
            aria-pressed={isActive}
            className="relative focus:outline-none"
            style={{ perspective: '400px' }}
          >
            <motion.div
              animate={{
                rotateY: isActive ? 0 : 8,
                scaleY: isActive ? 1 : 0.92,
                scaleX: isActive ? 1 : 0.93,
                y: isActive ? -8 : 0,
                filter: isActive ? 'brightness(1)' : 'brightness(0.45)',
                boxShadow: isActive
                  ? `4px 0 0 0 ${book.accent}40, 8px 8px 24px rgba(0,0,0,0.6), inset -2px 0 6px rgba(0,0,0,0.4)`
                  : '2px 2px 8px rgba(0,0,0,0.4)',
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-sm cursor-pointer"
              style={{
                width: '52px',
                height: '140px',
                backgroundColor: book.color,
                border: `1px solid ${book.accent}30`,
                transformOrigin: 'bottom center',
              }}
            >
              {/* Spine texture lines */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
                }}
              />

              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-sm"
                style={{ background: `linear-gradient(to right, ${book.accent}80, ${book.accent}20)` }}
              />

              {/* Spine text — rotated vertically */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
              >
                <span
                  className="text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: isActive ? book.accent : `${book.accent}70` }}
                >
                  {book.spine}
                </span>
              </div>

              {/* Active glow on left edge (the "visible" face) */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full"
                  style={{ background: book.accent, boxShadow: `0 0 8px ${book.accent}` }}
                />
              )}
            </motion.div>

            {/* Label below the book */}
            <motion.p
              animate={{ color: isActive ? book.accent : 'rgba(255,255,255,0.25)' }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-mono tracking-widest uppercase text-center mt-2"
            >
              {book.label}
            </motion.p>
          </button>
        );
      })}

      {/* Shelf plank */}
      <div
        className="absolute -bottom-2 left-0 right-0 h-[6px] rounded-sm"
        style={{
          background: 'linear-gradient(to bottom, #5c3a1a, #2d1a0a)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  );
}

// ── VARIANT 2: Pill menu toggle ───────────────────────────────────────────────
// Clean sliding pill with icon glyphs. More conventional, easier to scan.

interface PillToggleProps {
  active: ProjectCategory;
  onChange: (cat: ProjectCategory) => void;
}

export function PillToggle({ active, onChange }: PillToggleProps) {
  const options: { id: ProjectCategory; label: string; icon: string }[] = [
    { id: 'robotics',  label: 'Robotics',  icon: '⚙' },
    { id: 'software',  label: 'Software',  icon: '{ }' },
  ];

  return (
    <div
      className="relative flex rounded-xl p-1 gap-1"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {options.map((opt) => {
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            aria-pressed={isActive}
            className="relative px-5 py-2 rounded-lg text-sm font-mono flex items-center gap-2 transition-colors focus:outline-none z-10"
            style={{ color: isActive ? '#000' : 'rgba(255,255,255,0.4)' }}
          >
            {isActive && (
              <motion.div
                layoutId="pill-bg"
                className="absolute inset-0 rounded-lg -z-10"
                style={{ background: 'rgba(237,207,122,1)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="text-xs">{opt.icon}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Demo wrapper showing both (delete this, use one in App.tsx) ───────────────
export default function ProjectToggleDemo() {
  const [cat, setCat] = useState<ProjectCategory>('robotics');
  return (
    <div className="flex flex-col gap-16 p-12 items-start">
      <div>
        <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">Option A — Bookshelf</p>
        <div className="relative pb-8">
          <BookshelfToggle active={cat} onChange={setCat} />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-widest">Option B — Pill Menu</p>
        <PillToggle active={cat} onChange={setCat} />
      </div>
      <p className="text-white font-mono text-sm">Active: {cat}</p>
    </div>
  );
}
