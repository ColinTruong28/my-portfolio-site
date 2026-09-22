import type Lenis from 'lenis';
import type Snap from 'lenis/snap';

let instance: Lenis | null = null;
let snapInstance: Snap | null = null;

type PendingTarget = { el: HTMLElement; align: string[] };
// Children's effects run before the parent's, so sections can ask to register
// before App has built the Snap instance. Hold them until it exists.
const pending = new Set<PendingTarget>();
const cleanups = new Map<HTMLElement, () => void>();

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

function attach(snap: Snap, el: HTMLElement, align: string[]) {
  // ignoreTransform: ScrollReveal translates these elements as they enter, and
  // snap points must come from the settled layout position, not the offset one.
  cleanups.set(el, snap.addElement(el, { align, ignoreTransform: true }));
}

export function setSnap(snap: Snap | null) {
  snapInstance = snap;
  if (snap) {
    pending.forEach((t) => attach(snap, t.el, t.align));
    pending.clear();
  } else {
    cleanups.clear();
  }
}

/** Marks an element as a soft snap target. Returns a cleanup function. */
export function registerSnapTarget(el: HTMLElement, align: string[] = ['center']) {
  const target: PendingTarget = { el, align };
  if (snapInstance) {
    attach(snapInstance, el, align);
  } else {
    pending.add(target);
  }
  return () => {
    pending.delete(target);
    const remove = cleanups.get(el);
    if (remove) {
      remove();
      cleanups.delete(el);
    }
  };
}

/**
 * Scrolls to a target, going through Lenis when it's active so its internal
 * scroll-target state stays in sync (a raw scrollIntoView/scrollTo gets
 * silently overridden by Lenis's next animation frame otherwise).
 */
export function smoothScrollTo(target: string | HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
