import type { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface MarqueeProps<T> {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite, seamless horizontal ribbon. Content is duplicated once and the
 * track translates by -50%, so the loop has no visible seam. Pauses on hover.
 */
export function Marquee<T>({ items, renderItem, duration = 40, reverse, className }: MarqueeProps<T>) {
  const style = {
    '--marquee-duration': `${duration}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
  } as CSSProperties;

  return (
    <div className={cn('group/marquee mask-fade-edges flex overflow-hidden', className)}>
      <div
        className="flex w-max shrink-0 animate-marquee gap-3 pr-3 group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none"
        style={style}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <div key={i}>{renderItem(item, i)}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
