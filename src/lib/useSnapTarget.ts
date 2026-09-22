import { useEffect, type RefObject } from 'react';
import { registerSnapTarget } from './lenis';

/** Registers the referenced element as a soft vertical-centering snap target. */
export function useSnapTarget(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerSnapTarget(el);
  }, [ref]);
}
