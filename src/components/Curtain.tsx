import type {CSSProperties} from 'react';
import {brand} from '../content';

export type CurtainPhase = 'idle' | 'in' | 'out';

/**
 * The page change: blush then espresso wipe in from the right and cover the
 * screen; the page swaps underneath; both carry on out to the left. In 'idle'
 * the slabs jump back to the right with no transition, ready for next time.
 */
export function Curtain({phase}: {phase: CurtainPhase}) {
  const pos = phase === 'in' ? 'translate-x-0' : phase === 'out' ? '-translate-x-[101%]' : 'translate-x-[101%]';
  const anim = phase === 'idle' ? 'transition-none' : 'transition-transform duration-[700ms] ease-wipe';
  const delay = (k: number): CSSProperties => ({transitionDelay: `${phase === 'in' ? k * 0.09 : (1 - k) * 0.07}s`});

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[58] overflow-hidden ${phase === 'idle' ? 'invisible' : ''}`}>
      <div className={`absolute inset-0 bg-blush ${pos} ${anim}`} style={delay(0)} />
      <div className={`absolute inset-0 grid place-items-center bg-espresso ${pos} ${anim}`} style={delay(1)}>
        <span className={`script text-[clamp(56px,9vw,140px)] text-pearl transition-opacity duration-500 ${phase === 'in' ? 'opacity-100 delay-300' : 'opacity-0'}`}>
          {brand.name}
        </span>
      </div>
    </div>
  );
}
