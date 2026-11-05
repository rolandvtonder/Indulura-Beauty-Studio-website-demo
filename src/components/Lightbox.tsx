import {useEffect, useRef} from 'react';
import type {Media} from '../content';
import {lockScroll} from '../lib/scroll';
import {ChevronLeft, ChevronRight, Close} from './icons';

/** Full-screen photo viewer: arrows / swipe-free buttons, Esc to close, focus returned on close. */
export function Lightbox({items, index, onIndex, onClose}: {items: Media[]; index: number; onIndex: (i: number) => void; onClose: () => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const item = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    lockScroll(true);
    closeBtn.current?.focus();
    return () => {
      lockScroll(false);
      prev?.focus({preventScroll: true});
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const btn = 'grid size-12 place-items-center bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25';

  return (
    <div role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${items.length}`} className="fixed inset-0 z-[57] flex flex-col bg-ink/95">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caps text-white/70" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className={btn} aria-label="Close photo viewer">
          <Close width={20} height={20} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
        <img key={item.src} src={item.src} alt={item.alt} className="max-h-full max-w-full object-contain" />
        <button type="button" onClick={() => go(-1)} className={`${btn} absolute left-3 top-1/2 -translate-y-1/2 md:left-8`} aria-label="Previous photo">
          <ChevronLeft width={20} height={20} />
        </button>
        <button type="button" onClick={() => go(1)} className={`${btn} absolute right-3 top-1/2 -translate-y-1/2 md:right-8`} aria-label="Next photo">
          <ChevronRight width={20} height={20} />
        </button>
      </div>
      <p className="prose-body mx-auto max-w-[640px] px-5 py-5 text-center text-[15px] text-white/75">{item.alt}</p>
    </div>
  );
}
