import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface MagneticButtonProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children: ReactNode;
  variant?: Variant;
  /** How strongly the button is pulled towards the cursor (0 – 1). */
  strength?: number;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent-strong to-accent text-white shadow-[0_10px_40px_-10px] shadow-accent/60 hover:shadow-accent/80',
  secondary: 'glass text-fg hover:border-white/20',
  ghost: 'text-fg-muted hover:text-fg',
};

/** Anchor that magnetically follows the cursor and shows a sweeping shine on hover. */
export function MagneticButton({
  children,
  variant = 'primary',
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-[box-shadow,border-color,color] duration-300',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
