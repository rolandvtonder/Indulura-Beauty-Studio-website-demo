import type {ComponentProps, ReactNode} from 'react';
import {navigate} from '../lib/router';
import {ArrowUpRight} from './icons';

type Props = Omit<ComponentProps<'a'>, 'href'> & {to: string};

/** In-site link: a real <a href> (so it works without JS and in new tabs) routed client-side. */
export function Link({to, onClick, ...rest}: Props) {
  return (
    <a
      href={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      }}
    />
  );
}

/** Off-site link (Fresha, Google Maps) — opens a new tab and says so to screen readers. */
export function External({
  href,
  children,
  className = '',
  icon = true,
  label = 'opens in a new tab',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: boolean;
  label?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> ({label})</span>
      {icon && <ArrowUpRight className="ml-2 inline-block shrink-0 align-[-2px]" width={14} height={14} />}
    </a>
  );
}
