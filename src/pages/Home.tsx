import type {CSSProperties} from 'react';
import {brand, home, portfolio, reviews} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {HomeHero} from '../components/HomeHero';
import {Signature} from '../components/Signature';
import {Eyebrow, Lines} from '../components/Lines';
import {Link} from '../components/Link';
import {ArrowRight, Stars} from '../components/icons';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Home() {
  const root = useReveals<HTMLDivElement>();
  usePageMeta(
    'Indulura Beauty Studio · Structured gel nails in Parklands, Cape Town',
    'Indulura Beauty Studio by Tissy: structured gel and natural-nail specialist in Parklands, Cape Town. Builder gel, hard gel, soft gel and hybrid gel extensions in a private one-on-one studio.',
  );
  const teaser = [portfolio[0], portfolio[2], portfolio[3], portfolio[5]];
  const quote = reviews[1];

  return (
    <div ref={root}>
      <HomeHero />

      {/* The studio */}
      <section className="bg-pearl text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:px-14 md:py-36 lg:grid-cols-[1fr_2.2fr]">
          <div data-reveal>
            <Eyebrow n="01" tone="dark">
              The studio
            </Eyebrow>
          </div>
          <div>
            <p data-reveal className="font-serif text-[clamp(28px,3.3vw,54px)] leading-[1.08] tracking-[-0.01em]">
              {home.intro}
            </p>
            <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-ink/15 pt-10 sm:grid-cols-3">
              {[
                [`${brand.years}`, 'Years of practice'],
                [brand.rating, `Rating · ${brand.reviewCount} reviews`],
                ['1:1', 'Private, unhurried appointments'],
              ].map(([v, k], i) => (
                <div key={k} data-reveal style={d(i * 0.1)} className="flex flex-col-reverse">
                  <dt className="caps mt-2 text-taupe">{k}</dt>
                  <dd className="display text-[clamp(56px,6vw,96px)] text-tortoise">{v}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" data-reveal className="caps group mt-12 inline-flex min-h-11 items-center gap-3 text-ink hover:text-gold-deep">
              Meet Christie (Tissy)
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <Signature />

      {/* Portfolio teaser */}
      <section className="bg-ink pt-28 pb-24 md:pt-36" aria-labelledby="work-title">
        <div className="mx-auto max-w-[1680px] px-5 md:px-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div data-reveal>
              <Eyebrow n="03">Portfolio</Eyebrow>
              <h2 id="work-title" className="display mt-5 text-[clamp(40px,5vw,84px)]">
                <Lines lines={[{t: 'Fine lines,'}, {t: 'gold leaf,', i: true}, {t: 'clean French.'}]} />
              </h2>
            </div>
            <Link to="/portfolio" className="caps group inline-flex min-h-11 items-center gap-3 text-white hover:text-blush">
              See all work
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="mt-14 grid grid-cols-2 gap-[3px] lg:grid-cols-4">
            {teaser.map((p, i) => (
              <li key={p.src} data-reveal style={d(i * 0.08)} className="group relative aspect-[4/5] overflow-hidden bg-espresso">
                <Link to="/portfolio" aria-label={`${p.alt}, view portfolio`} className="block h-full">
                  <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Review */}
      <section className="bg-blush text-ink" aria-labelledby="love-title">
        <div className="mx-auto max-w-[1280px] px-5 py-28 text-center md:px-14 md:py-36">
          <h2 id="love-title" className="sr-only">
            What clients say
          </h2>
          <Stars className="justify-center text-tortoise" size={18} />
          <blockquote data-reveal className="mt-8">
            <p className="font-serif text-[clamp(32px,4.4vw,72px)] leading-[1.02] italic">“{quote.text}”</p>
            <footer className="caps mt-8 text-taupe">
              {quote.name} · {quote.service}
            </footer>
          </blockquote>
          <Link to="/reviews" className="caps group mt-10 inline-flex min-h-11 items-center gap-3 text-ink hover:text-tortoise">
            Read more reviews
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
