import {useEffect, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {useReducedMotion} from './useReducedMotion';

/**
 * The hero transition is a camera move, not a fade: as you scroll past a
 * hero, its stage blurs, dims and shrinks back together. Runs on the shared
 * rAF loop and writes styles directly — no React state while scrolling.
 */
export function usePullback(root: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    return onFrame(() => {
      const el = root.current;
      const s = stage.current;
      if (!el || !s) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / r.height);
      s.style.transform = `translate3d(0, ${(p * r.height * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
      s.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
    });
  }, [reduced, root, stage]);
}
