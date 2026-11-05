import {useRef} from 'react';
import type {Line, Media} from '../content';
import {usePullback} from '../hooks/usePullback';
import {Eyebrow, Lines} from './Lines';

/** Inner-page hero: one drifting photograph, the eyebrow, mixed-italic headline and a short intro. */
export function PageHero({
  n,
  eyebrow,
  lines,
  body,
  image,
  position = 'center',
}: {
  n: string;
  eyebrow: string;
  lines: Line[];
  body: string;
  image: Media;
  position?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  usePullback(root, stage);

  return (
    <section ref={root} className="relative h-[82svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img
          src={image.src}
          alt={image.alt}
          className="drift-loop h-full w-full object-cover"
          style={{objectPosition: position}}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_17_15/0.78),rgb(22_17_15/0.25)_60%,transparent),linear-gradient(0deg,rgb(22_17_15/0.6),transparent_45%)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(56px,10vh,110px)] md:px-14">
          <Eyebrow n={n}>{eyebrow}</Eyebrow>
          <h1 className="display mt-6 text-[clamp(52px,8.4vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            <Lines lines={lines} />
          </h1>
          <p className="prose-body mt-7 max-w-[440px] text-white/85 max-md:text-[16px]">{body}</p>
        </div>
      </div>
    </section>
  );
}
