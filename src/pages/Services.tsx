import type {CSSProperties} from 'react';
import {brand, portfolio, services} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {scrollToEl} from '../lib/scroll';
import {PageHero} from '../components/PageHero';
import {Eyebrow, Lines} from '../components/Lines';
import {External} from '../components/Link';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function Services() {
  const root = useReveals<HTMLDivElement>();
  usePageMeta(
    'Services & pricing · Indulura Beauty Studio',
    'Builder gel, hard gel, soft gel and hybrid gel extensions, rebalances, nail art tiers and soak-off removals at Indulura Beauty Studio, Parklands. Prices from R30.',
  );

  return (
    <div ref={root}>
      <PageHero
        n="01"
        eyebrow="Services & pricing"
        lines={[{t: 'The gel'}, {t: 'menu.', i: true}]}
        body="Every service is done by Christie, one client at a time. Prices are in South African Rand; times include prep and finishing."
        image={portfolio[0]}
        position="50% 60%"
      />

      <section className="bg-pearl text-ink">
        <div className="mx-auto max-w-[1680px] px-5 py-20 md:px-14 md:py-28">
          <nav aria-label="Service categories" className="flex flex-wrap gap-2">
            {services.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={(e) => {
                  const el = document.getElementById(c.id);
                  if (!el) return;
                  e.preventDefault();
                  scrollToEl(el);
                  el.focus({preventScroll: true});
                }}
                className="caps inline-flex min-h-11 items-center border border-ink/20 px-5 transition-colors hover:border-ink hover:bg-ink hover:text-pearl"
              >
                {c.title.join(' ')}
              </a>
            ))}
          </nav>

          {services.map((c, ci) => (
            <section
              key={c.id}
              id={c.id}
              tabIndex={-1}
              aria-labelledby={`${c.id}-t`}
              className="grid gap-10 border-t border-ink/15 pt-14 outline-none first-of-type:mt-16 lg:grid-cols-[1fr_2fr] [&:not(:first-of-type)]:mt-24"
            >
              <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
                <p className="caps text-gold-deep">0{ci + 1}</p>
                <h2 id={`${c.id}-t`} className="display mt-3 text-[clamp(44px,5vw,88px)]">
                  <Lines lines={[{t: c.title[0]}, {t: c.title[1], i: true}]} />
                </h2>
                {c.note && <p className="prose-body mt-6 max-w-[380px] text-[16px] text-taupe">{c.note}</p>}
              </div>

              <ul>
                {c.items.map((s, i) => (
                  <li key={s.name} data-reveal style={d(Math.min(i, 4) * 0.05)} className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-2 border-b border-ink/12 py-7 first:pt-0">
                    <h3 className="display text-[clamp(26px,2.3vw,38px)] leading-none">{s.name}</h3>
                    <p className="display text-right text-[clamp(26px,2.3vw,38px)] leading-none whitespace-nowrap">
                      {s.from && <span className="caps mr-2 align-middle text-[11px] text-taupe">from</span>}
                      {s.price}
                    </p>
                    {s.desc ? <p className="prose-body max-w-[560px] text-[16px] text-taupe">{s.desc}</p> : <span />}
                    <p className="caps text-right text-taupe">{s.time}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-espresso" aria-labelledby="good-t">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-14 lg:grid-cols-[1fr_2fr]">
          <div data-reveal>
            <Eyebrow>Before you book</Eyebrow>
            <h2 id="good-t" className="display mt-5 text-[clamp(40px,4.4vw,72px)]">
              <Lines lines={[{t: 'Good to'}, {t: 'know.', i: true}]} />
            </h2>
          </div>
          <ul className="grid gap-10 sm:grid-cols-3">
            {[
              ['Instant confirmation', 'Choose your service and time on Fresha and your booking is confirmed straight away.'],
              ['Nail art', 'Send your inspiration photo on WhatsApp first, so the right tier and time can be set aside.'],
              ['Coming from elsewhere?', 'Add a Foreign Gel / Acrylic Removal so there is time to take off previous work gently.'],
            ].map(([k, v], i) => (
              <li key={k} data-reveal style={d(i * 0.1)} className="border-t border-white/20 pt-6">
                <h3 className="display text-[28px]">{k}</h3>
                <p className="prose-body mt-3 text-[16px] text-white/75">{v}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto max-w-[1680px] px-5 pb-24 md:px-14">
          <External href={brand.bookUrl} label="opens Fresha booking in a new tab" className="caps inline-flex items-center bg-pearl px-8 py-4 text-ink transition-colors hover:bg-blush">
            Choose a service on Fresha
          </External>
        </div>
      </section>
    </div>
  );
}
