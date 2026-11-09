import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_OUT_EXPO } from '@/lib/motion';
import { cn } from '@/lib/cn';

interface TextRotatorProps {
  words: readonly string[];
  interval?: number;
  className?: string;
}

/** Cycles through `words`, rolling each one up and out with a blur. */
export function TextRotator({ words, interval = 2800, className }: TextRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn('relative inline-grid overflow-hidden align-bottom', className)} aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
