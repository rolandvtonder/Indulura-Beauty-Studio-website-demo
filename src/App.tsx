import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {brand} from './content';
import {useReducedMotion} from './hooks/useReducedMotion';
import {commit, currentPath, setTransition, usePath} from './lib/router';
import {lockScroll, resetScroll, startScroll} from './lib/scroll';
import {Curtain, type CurtainPhase} from './components/Curtain';
import {Footer} from './components/Footer';
import {External, Link} from './components/Link';
import {Menu} from './components/Menu';
import {Home} from './pages/Home';
import {Services} from './pages/Services';
import {Portfolio} from './pages/Portfolio';
import {About} from './pages/About';
import {Reviews} from './pages/Reviews';
import {Book} from './pages/Book';
import {NotFound} from './pages/NotFound';

const routes: Record<string, () => ReactNode> = {
  '/': () => <Home />,
  '/services': () => <Services />,
  '/portfolio': () => <Portfolio />,
  '/about': () => <About />,
  '/reviews': () => <Reviews />,
  '/book': () => <Book />,
};

// Curtain timing: slabs take 700ms (+90ms stagger) to cover; swap; 700ms to clear.
const COVER_MS = 820;
const CLEAR_MS = 900;

export default function App() {
  const reduced = useReducedMotion();
  const path = usePath();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<CurtainPhase>('idle');
  const busy = useRef(false);
  const main = useRef<HTMLElement>(null);
  const firstPath = useRef(true);

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);

  // Page changes run behind the curtain (or instantly with reduced motion).
  useEffect(() => {
    setTransition((to) => {
      if (busy.current) return;
      if (to === currentPath()) {
        setOpen(false);
        return;
      }
      if (reduced) {
        setOpen(false);
        commit(to);
        return;
      }
      busy.current = true;
      setPhase('in');
      window.setTimeout(() => {
        setOpen(false);
        commit(to);
        setPhase('out');
        window.setTimeout(() => {
          setPhase('idle');
          busy.current = false;
        }, CLEAR_MS);
      }, COVER_MS);
    });
    return () => setTransition(null);
  }, [reduced]);

  // Every new page (including back/forward) starts at the top with focus on its content.
  useEffect(() => {
    resetScroll();
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    main.current?.focus({preventScroll: true});
  }, [path]);

  const close = useCallback(() => setOpen(false), []);
  const page = routes[path] ?? (() => <NotFound />);

  return (
    <>
      <a href="#main" className="caps sr-only z-[70] bg-pearl px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>

      <Link
        to="/"
        aria-label={`${brand.name} ${brand.sub}, home`}
        className="fixed top-4 left-5 z-[55] flex flex-col items-start text-white mix-blend-difference md:top-6 md:left-14"
      >
        <span className="script text-[34px] leading-none md:text-[40px]">{brand.name}</span>
        <span className="caps -mt-0.5 text-[9px] tracking-[0.42em]">{brand.sub}</span>
      </Link>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-pearl' : 'bg-ink/45 text-white hover:bg-ink/70'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <External
        href={brand.bookUrl}
        icon={false}
        label="opens Fresha booking in a new tab"
        className={`caps fixed right-5 bottom-5 z-[55] px-8 py-4 shadow-[0_10px_40px_rgb(0_0_0/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 ${
          open ? 'bg-blush text-ink' : 'bg-pearl text-ink hover:bg-blush'
        }`}
      >
        Book your <em className="normal-case">appointment</em>
      </External>

      <main id="main" ref={main} tabIndex={-1} className="outline-none" key={path}>
        {page()}
      </main>
      <Footer key={`f-${path}`} />

      <Menu open={open} path={path} onClose={close} />
      <Curtain phase={phase} />
      <div className="grain" aria-hidden />
    </>
  );
}
