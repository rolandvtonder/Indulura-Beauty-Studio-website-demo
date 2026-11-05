import type {CSSProperties} from 'react';
import {brand, heroSlides, hours} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {PageHero} from '../components/PageHero';
import {Eyebrow, Lines} from '../components/Lines';
import {External} from '../components/Link';
import {Pin} from '../components/icons';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

const steps = [
  ['Choose your service', 'Pick your set on Fresha: overlay, extensions or rebalance, plus any nail art, chrome or French.'],
  ['Pick a time', 'Monday to Saturday, 08:00 to 21:00. Your booking is confirmed instantly.'],
  ['Come to the studio', 'Arrive at 67 Chelsea Crescent, Parklands. Parking is available on site.'],
];

export function Book() {
  const root = useReveals<HTMLDivElement>();
  usePageMeta(
    'Book & visit · Indulura Beauty Studio',
    'Book your nail appointment at Indulura Beauty Studio, 67 Chelsea Crescent, Parklands, Cape Town. Open Monday to Saturday, 08:00 to 21:00, with instant confirmation on Fresha.',
  );
  // getDay(): 0 = Sunday; our list starts on Monday.
  const today = (new Date().getDay() + 6) % 7;

  return (
    <div ref={root}>
      <PageHero
        n="05"
        eyebrow="Book & visit"
        lines={[{t: 'Book your'}, {t: 'chair.', i: true}]}
        body="Bookings are made online through Fresha, with instant confirmation. Here is everything you need for your visit."
        image={heroSlides[2]}
        position="50% 50%"
      />

      <section className="bg-pearl text-ink" aria-labelledby="how-t">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div data-reveal>
              <Eyebrow n="01" tone="dark">
                How it works
              </Eyebrow>
              <h2 id="how-t" className="display mt-5 text-[clamp(40px,5vw,84px)]">
                <Lines lines={[{t: 'Three steps'}, {t: 'to your set.', i: true}]} />
              </h2>
            </div>
            <External href={brand.bookUrl} label="opens Fresha booking in a new tab" className="caps inline-flex items-center bg-ink px-9 py-5 text-pearl transition-colors hover:bg-tortoise">
              Book on Fresha
            </External>
          </div>
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {steps.map(([k, v], i) => (
              <li key={k} data-reveal style={d(i * 0.12)} className="border-t border-ink/20 pt-7">
                <p className="display text-[64px] leading-none text-gold-deep">0{i + 1}</p>
                <h3 className="display mt-4 text-[34px]">{k}</h3>
                <p className="prose-body mt-3 max-w-[380px] text-taupe">{v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink" aria-labelledby="visit-t">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-24 md:px-14 md:py-32 lg:grid-cols-2">
          <div>
            <div data-reveal>
              <Eyebrow n="02">Visit</Eyebrow>
              <h2 id="visit-t" className="display mt-5 text-[clamp(40px,5vw,84px)]">
                <Lines lines={[{t: 'Find the'}, {t: 'studio.', i: true}]} />
              </h2>
            </div>
            <address data-reveal className="prose-body mt-10 flex gap-4 text-[18px] not-italic text-white/85">
              <Pin width={22} height={22} className="mt-1 shrink-0 text-gold" />
              <span>
                {brand.address.map((a) => (
                  <span key={a} className="block">
                    {a}
                  </span>
                ))}
              </span>
            </address>
            <External href={brand.mapsUrl} label="opens Google Maps in a new tab" className="caps mt-8 inline-flex items-center border border-white/30 px-6 py-3 hover:bg-white/10">
              Get directions
            </External>

            <div data-reveal className="mt-16">
              <p className="caps text-gold">Opening hours</p>
              <dl className="mt-5 max-w-[420px]">
                {hours.map(([day, h], i) => (
                  <div key={day} className={`flex justify-between border-b border-white/12 py-3 ${i === today ? 'text-white' : 'text-white/70'}`}>
                    <dt className="prose-body text-[16px]">
                      {day}
                      {i === today && <span className="caps ml-3 text-gold">Today</span>}
                    </dt>
                    <dd className="prose-body text-[16px]">{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div data-reveal className="min-h-[420px] overflow-hidden bg-espresso lg:min-h-full">
            <iframe
              title="Map showing Indulura Beauty Studio at 67 Chelsea Crescent, Parklands"
              src={brand.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[420px] w-full border-0 [filter:grayscale(0.6)_sepia(0.25)_contrast(1.05)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-blush text-ink" aria-labelledby="note-t">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-14 lg:grid-cols-[1fr_2fr]">
          <h2 id="note-t" data-reveal className="display text-[clamp(40px,4.4vw,72px)]">
            <Lines lines={[{t: 'Before'}, {t: 'you arrive.', i: true}]} />
          </h2>
          <ul className="grid gap-10 sm:grid-cols-3">
            {[
              ['Nail art', 'Send your inspiration photo on WhatsApp before booking. Your tier and time are confirmed by the design.'],
              ['Rebalances', 'Book every 2 to 4 weeks. After 5+ weeks the price is confirmed once your nails are assessed.'],
              ['Removals', 'Wearing gel or acrylic from another salon? Add a Foreign Gel / Acrylic Removal to your booking.'],
            ].map(([k, v], i) => (
              <li key={k} data-reveal style={d(i * 0.1)} className="border-t border-ink/25 pt-6">
                <h3 className="display text-[28px]">{k}</h3>
                <p className="prose-body mt-3 text-[16px] text-ink/80">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
