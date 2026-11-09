import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

import { fadeUp } from '@/lib/motion';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  /** Fraction of the element that must be visible before it animates. */
  amount?: number;
}

/** Fades, de-blurs and lifts its children into place once scrolled into view. */
export function Reveal({ children, delay = 0, amount = 0.3, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
