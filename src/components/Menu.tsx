import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {brand, pages} from '../content';
import {External, Link} from './Link';

/**
 * The menu: three slabs wipe in from the right one after another
 * (espresso, blush, pearl); the pearl one stays and holds the items. Hovering
 * an item ripples it like wet gel catching the light — an SVG turbulence +
 * displacement filter whose strength and phase are animated per frame.
 */
export function Menu({open, path, onClose}: {open: boolean; path: string; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Move focus into the menu once the slabs have arrived.
  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const id = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => window.clearTimeout(id);
  }, [open]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: espresso → blush → pearl, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" aria-hidden={!open} inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-espresso')} style={delay(0)} />
      <div className={slab('bg-blush')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-pearl px-8 pt-28 pb-28 text-ink md:pb-10')} style={delay(2)} aria-label="Main menu" data-lenis-prevent>
        <ul onMouseLeave={() => setHover(-1)}>
          {pages.map((p, i) => {
            const current = p.to === path;
            return (
              <li
                key={p.to}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <Link
                  ref={i === 0 ? first : undefined}
                  to={p.to}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onClick={() => {
                    if (current) onClose();
                  }}
                  className={`display relative inline-block py-1 text-[clamp(36px,3.4vw,54px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  } ${i % 2 ? 'it' : ''}`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {p.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-taupe">0{i + 1}</sup>
                  {current && <span aria-hidden className="absolute top-1/2 -left-5 size-2 -translate-y-1/2 rounded-full bg-gold-deep" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 space-y-5 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-taupe">Visit</p>
            <p className="prose-body mt-1 text-[15px] leading-snug text-ink/85">
              {brand.address[0]}
              <br />
              {brand.address[1]}, Cape Town
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <External href={brand.bookUrl} className="caps text-ink hover:text-gold-deep" label="opens Fresha booking in a new tab">
              Book on Fresha
            </External>
            <External href={brand.mapsUrl} className="caps text-ink hover:text-gold-deep" label="opens Google Maps in a new tab">
              Directions
            </External>
          </div>
        </div>
      </nav>
    </div>
  );
}
