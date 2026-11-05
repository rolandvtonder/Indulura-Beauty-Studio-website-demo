import {useSyncExternalStore} from 'react';

/**
 * A tiny History-API router — five pages don't need a routing library.
 * `navigate()` hands the change to whoever registered a transition (the
 * curtain in App), which calls `commit()` once the screen is covered.
 */

const listeners = new Set<() => void>();
let transition: ((to: string) => void) | null = null;

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  const onPop = () => fn();
  window.addEventListener('popstate', onPop);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('popstate', onPop);
  };
};

export function usePath(): string {
  return useSyncExternalStore(subscribe, () => normalise(window.location.pathname));
}

export function setTransition(fn: ((to: string) => void) | null) {
  transition = fn;
}

export function commit(to: string) {
  if (normalise(to) !== normalise(window.location.pathname)) history.pushState(null, '', to);
  listeners.forEach((l) => l());
}

export function navigate(to: string) {
  if (transition) transition(to);
  else commit(to);
}
