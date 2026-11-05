import type {CSSProperties} from 'react';
import {brand, portfolio, reviews} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {PageHero} from '../components/PageHero';
import {Eyebrow} from '../components/Lines';
import {External} from '../components/Link';
import {Stars} from '../components/icons';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Reviews() {
  const root = useReveals<HTMLDivElement>();
  usePageMeta(
    'Reviews · Indulura Beauty Studio',
    'Indulura Beauty Studio is rated 5.0 from 71 verified Fresha reviews. Read what clients say about their nails by Christie (Tissy).',
  );
  const [lead, ...rest] = reviews;

  return (
    <div ref={root}>
      <PageHero
        n="04"
        eyebrow="Reviews"
        lines={[{t: 'Five stars,'}, {t: 'every time.', i: true}]}
        body={`Every one of ${brand.reviewCount} verified Fresha reviews is five stars. Here is what clients say.`}
        image={portfolio[2]}
        position="50% 35%"
      />

      <section className="bg-pearl text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-24 md:px-14 md:py-32 lg:grid-cols-[1fr_2fr]">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow tone="dark">Overall rating</Eyebrow>
            <p className="display mt-6 text-[clamp(110px,13vw,220px)] leading-[0.8] text-tortoise">{brand.rating}</p>
            <Stars className="mt-4 text-tortoise" size={20} />
            <p className="caps mt-3 text-taupe">{brand.reviewCount} verified reviews on Fresha</p>
            <dl className="mt-10 max-w-[340px] space-y-2">
              {[5, 4, 3, 2, 1].map((n) => {
                const count = n === 5 ? brand.reviewCount : 0;
                return (
                  <div key={n} className="flex items-center gap-4">
                    <dt className="caps w-14 text-taupe">{n} star</dt>
                    <dd className="flex flex-1 items-center gap-3">
                      <span className="h-1.5 flex-1 bg-ink/10" aria-hidden>
                        <span className="block h-full bg-tortoise" style={{width: `${(count / brand.reviewCount) * 100}%`}} />
                      </span>
                      <span className="caps w-6 text-right">{count}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
            <External href={brand.reviewsUrl} label="opens Fresha in a new tab" className="caps mt-10 inline-flex items-center border border-ink/25 px-6 py-3 hover:bg-ink hover:text-pearl">
              Read all {brand.reviewCount} on Fresha
            </External>
          </div>

          <div>
            <figure data-reveal className="border-b border-ink/15 pb-14">
              <Stars className="text-tortoise" size={16} />
              <blockquote className="mt-6 font-serif text-[clamp(30px,3.4vw,56px)] leading-[1.06] italic">“{lead.text}”</blockquote>
              <figcaption className="caps mt-8 text-taupe">
                {lead.name} · {lead.service} · {lead.when}
              </figcaption>
            </figure>
            <ul className="grid gap-x-12 sm:grid-cols-2">
              {rest.map((r, i) => (
                <li key={i} data-reveal style={d((i % 2) * 0.1)} className="border-b border-ink/15 py-12">
                  <figure>
                    <Stars className="text-tortoise" size={14} />
                    <blockquote className="prose-body mt-5 text-[19px] leading-[1.6] text-ink/90">“{r.text}”</blockquote>
                    <figcaption className="caps mt-6 text-taupe">
                      {r.name} · {r.service}
                      <br />
                      {r.when} · with {brand.owner}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
