import type {CSSProperties} from 'react';
import {about, brand} from '../content';
import {useReveals} from '../hooks/useReveals';
import {usePageMeta} from '../hooks/usePageMeta';
import {PageHero} from '../components/PageHero';
import {Eyebrow, Lines} from '../components/Lines';
import {Check} from '../components/icons';

const d = (s: number) => ({'--d': `${s}s`}) as CSSProperties;

export function About() {
  const root = useReveals<HTMLDivElement>();
  usePageMeta(
    'About Christie (Tissy) · Indulura Beauty Studio',
    'Meet Christie, known as Tissy: 12+ years of structured gel, Capri Pro Nails Brand Ambassador, and owner of a private one-on-one nail studio in Parklands, Cape Town.',
  );

  return (
    <div ref={root}>
      <PageHero
        n="03"
        eyebrow="About the artist"
        lines={[{t: 'Twelve years'}, {t: 'of detail.', i: true}]}
        body="Christie, known as Tissy, is a structured gel and natural-nail specialist working from her private studio in Parklands."
        image={about.studio}
        position="50% 45%"
      />

      <section className="bg-pearl text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-16 px-5 py-24 md:px-14 md:py-36 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div data-reveal className="flex flex-col items-start">
            <div className="relative w-[min(78vw,340px)]">
              <div className="aspect-[3/4] overflow-hidden rounded-t-full bg-blush">
                <img src={about.portrait.src} alt={about.portrait.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <span aria-hidden className="absolute -inset-3 -z-0 rounded-t-full border border-gold/60" />
            </div>
            <p className="display mt-10 text-[clamp(44px,4.4vw,72px)]">{brand.owner}</p>
            <p className="script -mt-1 text-[38px] leading-none text-gold-deep">known as {brand.ownerAka}</p>
            <p className="caps mt-5 text-taupe">{brand.role}</p>
            <p className="caps mt-1 text-taupe">{brand.credential}</p>
          </div>

          <div>
            <Eyebrow n="01" tone="dark">
              Her story
            </Eyebrow>
            <p data-reveal className="mt-8 font-serif text-[clamp(28px,2.9vw,46px)] leading-[1.1]">
              {about.story[0]}
            </p>
            {about.story.slice(1).map((s, i) => (
              <p key={i} data-reveal style={d(0.1)} className="prose-body mt-7 max-w-[640px] text-ink/80">
                {s}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink" aria-labelledby="ph-t">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <div data-reveal>
            <Eyebrow n="02">Philosophy</Eyebrow>
            <h2 id="ph-t" className="display mt-5 text-[clamp(40px,5vw,84px)]">
              <Lines lines={[{t: 'Natural-nail'}, {t: 'integrity first.', i: true}]} />
            </h2>
          </div>
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {about.principles.map((p, i) => (
              <li key={p.k} data-reveal style={d(i * 0.12)} className="border-t border-white/20 pt-7">
                <p className="caps text-gold">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(34px,3vw,48px)]">{p.k}</h3>
                <p className="prose-body mt-4 max-w-[420px] text-white/75">{p.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-pearl text-ink" aria-labelledby="st-t">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <figure data-reveal className="overflow-hidden">
            <img src={about.studio.src} alt={about.studio.alt} loading="lazy" className="aspect-[16/9] w-full object-cover max-md:aspect-[4/3]" />
          </figure>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div data-reveal>
              <Eyebrow n="03" tone="dark">
                The studio
              </Eyebrow>
              <h2 id="st-t" className="display mt-5 text-[clamp(40px,4.4vw,72px)]">
                <Lines lines={[{t: 'One chair,'}, {t: 'no rush.', i: true}]} />
              </h2>
            </div>
            <ul className="grid content-start gap-x-10 gap-y-5 sm:grid-cols-2">
              {about.facts.map((f, i) => (
                <li key={f} data-reveal style={d(i * 0.05)} className="flex items-center gap-4 border-b border-ink/12 pb-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blush text-tortoise">
                    <Check width={15} height={15} />
                  </span>
                  <span className="prose-body text-[17px]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
