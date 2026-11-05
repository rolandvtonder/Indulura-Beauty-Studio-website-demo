import type {CSSProperties} from 'react';
import {brand, footerNote, hours, pages} from '../content';
import {useFitText} from '../hooks/useFitText';
import {useReveals} from '../hooks/useReveals';
import {Lines} from './Lines';
import {External, Link} from './Link';

/** Shared footer: the booking call, visit details, and the edge-to-edge wordmark. */
export function Footer() {
  const word = useFitText<HTMLSpanElement>();
  const root = useReveals<HTMLElement>();

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1680px] px-5 pt-24 md:px-14 md:pt-32">
        <div className="flex flex-wrap items-end justify-between gap-10 border-b border-white/15 pb-16">
          <h2 data-reveal className="display text-[clamp(44px,6.4vw,112px)]">
            <Lines lines={[{t: 'Ready for'}, {t: 'your next set?', i: true}]} />
          </h2>
          <div data-reveal style={{'--d': '0.15s'} as CSSProperties} className="flex flex-wrap gap-3">
            <External href={brand.bookUrl} label="opens Fresha booking in a new tab" className="caps inline-flex items-center bg-pearl px-8 py-4 text-ink transition-colors duration-300 hover:bg-blush">
              Book on Fresha
            </External>
            <Link to="/book" className="caps inline-flex items-center border border-white/30 px-8 py-4 text-white transition-colors duration-300 hover:border-white hover:bg-white/10">
              Plan your visit
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 xl:grid-cols-[1fr_1.25fr_0.8fr_1fr]">
          <div>
            <p className="caps text-gold">Visit</p>
            <address className="prose-body mt-4 text-[16px] not-italic text-white/80">
              {brand.address.map((a) => (
                <span key={a} className="block">
                  {a}
                </span>
              ))}
            </address>
            <External href={brand.mapsUrl} label="opens Google Maps in a new tab" className="caps mt-4 inline-flex items-center text-white hover:text-gold">
              Get directions
            </External>
          </div>
          <div>
            <p className="caps text-gold">Hours</p>
            <dl className="mt-4 space-y-1 text-[15px]">
              {hours.map(([d, h]) => (
                <div key={d} className="prose-body flex max-w-[260px] justify-between gap-6 text-[15px] text-white/80">
                  <dt>{d}</dt>
                  <dd className={`whitespace-nowrap ${h === 'Closed' ? 'text-white/50' : ''}`}>{h}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="caps text-gold">Explore</p>
            <ul className="mt-4 space-y-1">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to} className="display inline-block py-1 text-[26px] text-white/85 transition-colors hover:text-blush">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="caps text-gold">The studio</p>
            <p className="prose-body mt-4 text-[16px] text-white/80">
              Private, one-on-one and by appointment. {brand.rating} stars from {brand.reviewCount} verified Fresha reviews.
            </p>
            <p className="caps mt-5 text-white/60">{brand.credential}</p>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-8" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.8] text-white/[0.07]">
          {brand.name}
        </span>
      </div>
      <p className="caps mx-auto max-w-[1680px] px-5 pt-6 pb-28 text-white/50 md:px-14">
        © {new Date().getFullYear()} {brand.name} {brand.sub} · {footerNote}
      </p>
    </footer>
  );
}
