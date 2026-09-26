import type Lenis from 'lenis';
import type Snap from 'lenis/snap';

let instance: Lenis | null = null;
let snapInstance: Snap | null = null;

type SnapTarget = { el: HTMLElement; align: string[]; detach?: () => void };

// Every registered target, kept for the lifetime of its component rather than
// of any one Snap instance. The Snap instance can be torn down and rebuilt
// without the sections re-registering (App's effect re-runs on hot reload, and
// sections live in other modules whose effects don't), so each new instance
// has to re-adopt the full set. Also covers sections that mount before App's
// effect has created the first instance, since child effects run first.
const targets = new Set<SnapTarget>();

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

function attach(snap: Snap, t: SnapTarget) {
  // ignoreTransform: ScrollReveal translates these elements as they enter, and
  // snap points must come from the settled layout position, not the offset one.
  t.detach = snap.addElement(t.el, { align: t.align, ignoreTransform: true });
}

export function setSnap(snap: Snap | null) {
  snapInstance = snap;
  targets.forEach((t) => {
    // The previous instance is being destroyed, which drops its elements.
    t.detach = undefined;
    if (snap) attach(snap, t);
  });
}

/** Marks an element as a soft snap target. Returns a cleanup function. */
export function registerSnapTarget(el: HTMLElement, align: string[] = ['center']) {
  const target: SnapTarget = { el, align };
  targets.add(target);
  if (snapInstance) attach(snapInstance, target);
  return () => {
    targets.delete(target);
    target.detach?.();
  };
}

/**
 * Scrolls to a target, going through Lenis when it's active so its internal
 * scroll-target state stays in sync (a raw scrollIntoView/scrollTo gets
 * silently overridden by Lenis's next animation frame otherwise).
 */
export function smoothScrollTo(target: string | HTMLElement | number, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Fraction of the viewport height to leave above the neon sign. The sign's
// flicker completes once its top reaches 18% (see App.tsx), so 15% lands on it
// fully lit.
const NEON_LANDING = 0.15;

/**
 * "About Me" navigation. The section opens with a tall clearance above the
 * neon sign, so jumping to its top edge shows only black. Instead:
 *  - arriving from above (or on page load): land with the neon sign lit;
 *  - arriving from below the tech-stack/timeline block: stop at that block
 *    (matching its snap position) rather than scrolling past it to the text.
 */
export function scrollToAboutMe() {
  const neon = document.getElementById('about-neon');
  const block = document.getElementById('about-block');
  if (!neon || !block) return;

  const y = window.scrollY;
  const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + y;
  const blockTop = docTop(block);

  const target = y > blockTop + 2
    ? blockTop
    : docTop(neon) - window.innerHeight * NEON_LANDING;

  smoothScrollTo(Math.max(0, Math.round(target)));
}
