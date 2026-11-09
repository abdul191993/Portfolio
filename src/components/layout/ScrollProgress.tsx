import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the top of the viewport that tracks reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-strong via-accent to-accent-2"
      style={{ scaleX }}
    />
  );
}
