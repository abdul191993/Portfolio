import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

import { EASE_OUT_EXPO } from '@/lib/motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Counts up from 0 to `value` once visible. Writes straight to the DOM node
 * so the tween never triggers React re-renders.
 */
export function AnimatedCounter({ value, suffix = '', duration = 2, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    if (reduceMotion) {
      node.textContent = format(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- format is derived from the deps below
  }, [inView, value, duration, reduceMotion, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  );
}
