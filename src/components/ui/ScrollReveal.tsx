'use client';
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  children: ReactNode;
  from?: 'left' | 'right';
  distance?: number;
  className?: string;
};

/**
 * Slides content in from a side as a pure function of scroll position.
 *
 * Deliberately not whileInView/IntersectionObserver: because the transform is
 * derived from where the element sits in the viewport, it is reversible and
 * lands at the correct visual state when a visitor deep-links partway down the
 * page, instead of firing once on an entry event.
 */
export default function ScrollReveal({
  children,
  from = 'left',
  distance = 90,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Begins as the element reaches the middle of the screen and resolves as it
  // travels up from there, so nothing animates down in the bottom margin
  // (and the About paragraphs never get ahead of the neon sign above them).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.6', 'start 0.3'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [from === 'left' ? -distance : distance, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
}
