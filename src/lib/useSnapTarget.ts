import { useEffect, type RefObject } from 'react';
import { registerSnapTarget } from './lenis';

/**
 * Registers the referenced element as a soft snap target.
 *
 * `align` defaults to centring. Use 'start' for blocks taller than the space
 * under the fixed navbar, where centring would push their top off-screen.
 */
export function useSnapTarget(
  ref: RefObject<HTMLElement | null>,
  align: 'center' | 'start' = 'center'
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerSnapTarget(el, [align]);
  }, [ref, align]);
}
