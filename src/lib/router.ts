import {useSyncExternalStore} from 'react';

/**
 * A tiny History-API router — five pages don't need a routing library.
 * `navigate()` hands the change to whoever registered a transition (the
 * curtain in App), which calls `commit()` once the screen is covered.
 *
 * Routes are written root-relative ('/services'). When the site is served
 * from a sub-folder (GitHub Pages: /<repo>/), Vite's BASE_URL is prefixed on
 * the way out (`href`) and stripped on the way in (`currentPath`).
 */

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

const listeners = new Set<() => void>();
let transition: ((to: string) => void) | null = null;

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';

/** Route ('/services') → real URL path ('/<base>/services'). */
export const href = (to: string) => `${BASE}${to}`;

/** The current route, without the base folder. */
export function currentPath(): string {
  const p = window.location.pathname;
  return normalise(BASE && p.startsWith(BASE) ? p.slice(BASE.length) : p);
}

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
  return useSyncExternalStore(subscribe, currentPath);
}

export function setTransition(fn: ((to: string) => void) | null) {
  transition = fn;
}

export function commit(to: string) {
  if (normalise(to) !== currentPath()) history.pushState(null, '', href(to));
  listeners.forEach((l) => l());
}

export function navigate(to: string) {
  if (transition) transition(to);
  else commit(to);
}
