import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {signature} from '../content';
import {Eyebrow, Lines} from './Lines';
import {Link} from './Link';
import {ArrowRight} from './icons';

/**
 * Signature sets: three tall panels slide in from the right one after
 * another, each showing its own third of ONE photograph (so three panels cost
 * one image and can never disagree). All three slices run the same drift
 * animation from the same moment, so the picture stays continuous.
 */
export function Signature() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {threshold: 0.2},
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="sig-title" className="relative bg-ink">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-6 px-5 pt-24 pb-10 md:px-14">
        <div>
          <Eyebrow n="02">Signature sets</Eyebrow>
          <h2 id="sig-title" className="display mt-5 text-[clamp(40px,5vw,84px)]">
            <Lines lines={[{t: 'Structure,'}, {t: 'three ways.', i: true}]} />
          </h2>
        </div>
        <Link to="/services" className="caps group inline-flex min-h-11 items-center gap-3 text-white hover:text-blush">
          Full menu & prices
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {signature.items.map((b, i) => (
          <article
            key={b.id}
            className={`relative overflow-hidden transition-transform duration-[1100ms] ease-wipe max-md:h-[80svh] ${shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'}`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: b.tint} as CSSProperties}
          >
            {/* One slice of the shared photograph: three panels wide, shifted per panel. */}
            <div className="absolute top-0 h-full max-w-none" style={{width: '300%', left: `${-100 * i}%`}} aria-hidden>
              <img src={signature.image.src} alt="" loading="lazy" className="drift-loop h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(22_17_15/0.65),transparent_42%,transparent_70%,rgb(22_17_15/0.55))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <h3 className="display text-[clamp(34px,3.3vw,58px)] text-white">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block">{b.name[1]}</span>
                </h3>
                <dl className={`mt-6 flex gap-10 transition-opacity delay-[1400ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-white/70">{k}</dt>
                      <dd className="display text-[28px] text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <Link
                to="/services"
                className={`caps inline-flex min-h-11 items-center gap-3 self-start text-white transition-opacity delay-[1600ms] duration-700 hover:text-blush ${shown ? 'opacity-100' : 'opacity-0'}`}
              >
                See details <span className="sr-only">for {b.name.join(' ')}</span>
                <ArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
