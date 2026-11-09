import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Radius of the spotlight in px. */
  size?: number;
}

/**
 * Card with a soft radial spotlight and a lit border that both track the cursor.
 * Pure motion values — no React state on mouse move.
 */
export function SpotlightCard({ children, className, size = 380 }: SpotlightCardProps) {
  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const handleMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  };

  const fill = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, rgb(124 134 255 / 0.12), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(${size * 0.7}px circle at ${mouseX}px ${mouseY}px, rgb(124 134 255 / 0.55), transparent 70%)`;

  return (
    <div
      onMouseMove={handleMove}
      className={cn(
        'group/spot relative overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/60',
        className,
      )}
    >
      {/* Lit border: a masked gradient layer that only shows in the 1px ring. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 [mask-composite:exclude] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]"
        style={{ background: border }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: fill }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
