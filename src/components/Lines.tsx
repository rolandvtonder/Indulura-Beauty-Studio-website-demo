import type {Line} from '../content';

/** Display lines that mix upright and italic, as data. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={`${l.t}-${i}`} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'pl-[1.6em] max-sm:pl-[0.8em]' : ''}`}>
          {l.t}
        </span>
      ))}
    </>
  );
}

/** Small section label: "01 — Services" */
export function Eyebrow({n, children, tone = 'light'}: {n?: string; children: string; tone?: 'light' | 'dark'}) {
  return (
    <p className={`caps flex items-center gap-3 ${tone === 'light' ? 'text-white/75' : 'text-taupe'}`}>
      {n && <span className={tone === 'light' ? 'text-gold' : 'text-gold-deep'}>{n}</span>}
      <span aria-hidden className={`h-px w-8 ${tone === 'light' ? 'bg-white/40' : 'bg-ink/30'}`} />
      {children}
    </p>
  );
}
