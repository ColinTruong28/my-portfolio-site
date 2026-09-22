import { useRef, type TouchEvent } from 'react';

/**
 * Horizontal swipe handlers for touch devices.
 *
 * Only fires when the gesture is clearly more horizontal than vertical, so
 * vertical page scrolling over a slider is never hijacked.
 */
export function useSwipe(onNext: () => void, onPrev: () => void, threshold = 45) {
  const start = useRef<{ x: number; y: number } | null>(null);

  return {
    onTouchStart: (e: TouchEvent) => {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    },
    onTouchEnd: (e: TouchEvent) => {
      const from = start.current;
      start.current = null;
      if (!from) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - from.x;
      const dy = t.clientY - from.y;
      if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}
