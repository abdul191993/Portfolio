import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';

import { cn } from '@/lib/cn';

interface TiltCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  /** Maximum tilt in degrees. */
  maxTilt?: number;
}

/** 3D perspective tilt with a moving glare highlight, driven by cursor position. */
export function TiltCard({ children, maxTilt = 8, className, style, ...rest }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  // Normalised pointer position in the card: 0 → 1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), spring);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgb(255 255 255 / 0.14), transparent 55%)`;

  const handleMove = ({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = currentTarget.getBoundingClientRect();
    px.set((clientX - rect.left) / rect.width);
    py.set((clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1100px]">
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
        className={cn('group/tilt relative', className)}
        {...rest}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}
