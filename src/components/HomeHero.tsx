import {useEffect, useRef, useState} from 'react';
import {brand, heroSlides, home} from '../content';
import {usePullback} from '../hooks/usePullback';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {Lines} from './Lines';
import {Pause, Play, Stars} from './icons';

const SLIDE_MS = 6500;

/**
 * Home hero: a slow cross-fading run of close-ups (each drifting on its own
 * loop) under the big mixed-italic headline. Scrolling on, the whole stage
 * blurs, dims and pulls back. The slideshow can be paused, and never moves
 * with reduced motion.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  usePullback(root, stage);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <section ref={root} className="relative h-svh min-h-[620px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {heroSlides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={i === active ? s.alt : ''}
            aria-hidden={i !== active}
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`drift-loop absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
            style={{animationDelay: `${-i * 7}s`}}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_17_15/0.72),rgb(22_17_15/0.2)_62%,transparent),linear-gradient(0deg,rgb(22_17_15/0.55),transparent_40%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(110px,15vh,150px)] md:px-14">
          <h1 className="display text-[clamp(56px,8vw,146px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <span className="sr-only">{brand.name} {brand.sub}: </span>
            <Lines lines={home.lines} indentFirst />
          </h1>
          <p className="prose-body mt-9 ml-[clamp(0px,19vw,330px)] max-w-[380px] text-[16px] text-white/85 max-md:ml-0 md:text-[17px]">{home.body}</p>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-4 md:bottom-7 md:left-14">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="grid size-11 place-items-center border border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          hidden={reduced}
        >
          {paused ? <Play /> : <Pause />}
        </button>
        <div className="text-white max-sm:hidden">
          <Stars className="text-gold" />
          <p className="caps text-white/80">
            {brand.rating} · {brand.reviewCount} reviews on Fresha
          </p>
        </div>
      </div>
    </section>
  );
}
