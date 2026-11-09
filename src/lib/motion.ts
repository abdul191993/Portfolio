import type { Transition, Variants } from 'framer-motion';

/** Expo-out: fast start, long graceful settle. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const springSoft: Transition = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 };
export const springSnappy: Transition = { type: 'spring', stiffness: 380, damping: 30 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: springSnappy },
};
