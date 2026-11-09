import { motion, type Variants } from 'framer-motion';
import type { ElementType } from 'react';

import { EASE_OUT_EXPO } from '@/lib/motion';
import { cn } from '@/lib/cn';

type SplitBy = 'words' | 'chars';

interface SplitTextProps {
  text: string;
  as?: ElementType;
  by?: SplitBy;
  className?: string;
  /** Class applied to each animated token (e.g. a gradient). */
  tokenClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const token: Variants = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  visible: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/**
 * Masked, staggered text reveal. Each word (or character) slides up from
 * behind an overflow mask. The full string stays available to screen readers.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  by = 'words',
  className,
  tokenClassName,
  delay = 0,
  stagger = by === 'chars' ? 0.03 : 0.06,
  immediate = false,
}: SplitTextProps) {
  const words = text.split(' ');
  const trigger = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: { once: true, amount: 0.6 } };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        aria-hidden
        className="inline"
        variants={container(stagger, delay)}
        initial="hidden"
        {...trigger}
      >
        {words.map((word, wi) => (
          <span key={`${word}-${wi}`} className="inline-block whitespace-nowrap">
            {(by === 'chars' ? [...word] : [word]).map((part, pi) => (
              <span
                key={`${part}-${pi}`}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
              >
                <motion.span className={cn('inline-block', tokenClassName)} variants={token}>
                  {part}
                </motion.span>
              </span>
            ))}
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
