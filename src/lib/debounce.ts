/**
 * Trailing-edge debounce. Used for resize handlers, which fire in bursts and
 * trigger layout reads/canvas re-allocation that are wasteful mid-drag.
 */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, wait = 150) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };
  return debounced;
}
