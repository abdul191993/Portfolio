import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

import { useFinePointer } from '@/hooks/useFinePointer';

/** A large, soft light that trails the cursor. Mouse/trackpad only. */
export function CursorGlow() {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const x = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 20, mass: 0.6 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 90, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(124_134_255/0.09),transparent_60%)]"
      style={{ x, y }}
    />
  );
}
