import {useState, type CSSProperties} from 'react';
import {brand, portfolio} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {PageHero} from '../components/PageHero';
import {Lightbox} from '../components/Lightbox';
import {External} from '../components/Link';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Portfolio() {
  const root = useReveals<HTMLDivElement>();
  const [open, setOpen] = useState(-1);
  usePageMeta(
    'Portfolio · Indulura Beauty Studio',
    'Recent nail work by Tissy at Indulura Beauty Studio, Cape Town: structured gel, French, chrome, gold leaf and hand-painted nail art.',
  );

  return (
    <div ref={root}>
      <PageHero
        n="02"
        eyebrow="Portfolio"
        lines={[{t: 'Recent'}, {t: 'work.', i: true}]}
        body="Pearl chrome, gold leaf, crisp French and hand-painted florals, all built on a structured gel base. Tap any photo to see it larger."
        image={portfolio[4]}
        position="50% 40%"
      />

      <section className="bg-ink" aria-label="Photo gallery">
        <ul className="mx-auto max-w-[1680px] columns-1 gap-[6px] px-[6px] py-[6px] sm:columns-2 lg:columns-3">
          {portfolio.map((p, i) => (
            <li key={p.src} data-reveal style={d((i % 3) * 0.08)} className="mb-[6px] break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden bg-espresso"
                aria-label={`Open photo: ${p.alt}`}
              >
                <img
                  src={p.src}
                  alt=""
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105 ${p.wide ? 'aspect-video' : 'aspect-square'}`}
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" aria-hidden />
                <span className="caps absolute bottom-3 left-4 text-white/0 transition-colors duration-500 group-hover:text-white/90" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mx-auto flex max-w-[1680px] flex-wrap items-center justify-between gap-6 px-5 py-16 md:px-14">
          <p className="prose-body max-w-[520px] text-white/75">Have a design in mind? Send your inspiration photo on WhatsApp before you book so the right time is set aside.</p>
          <External href={brand.profileUrl} label="opens Fresha in a new tab" className="caps inline-flex items-center text-white hover:text-blush">
            More on our Fresha profile
          </External>
        </div>
      </section>

      {open >= 0 && <Lightbox items={portfolio} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </div>
  );
}
