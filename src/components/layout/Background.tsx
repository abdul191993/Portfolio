import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Fixed ambient backdrop: drifting aurora blobs, a radial-masked grid and a
 * fine noise layer. Blobs parallax slightly with page scroll.
 */
export function Background() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />

      <motion.div style={{ y: y1 }} className="absolute -left-[15%] -top-[20%] h-[70vh] w-[70vw]">
        <div className="h-full w-full animate-aurora rounded-full bg-accent-strong/25 blur-[120px] motion-reduce:animate-none" />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -right-[10%] top-[10%] h-[60vh] w-[55vw]">
        <div
          className="h-full w-full animate-aurora rounded-full bg-accent-2/15 blur-[130px] motion-reduce:animate-none"
          style={{ animationDelay: '-6s', animationDuration: '22s' }}
        />
      </motion.div>
      <div className="absolute bottom-[-20%] left-[25%] h-[50vh] w-[50vw]">
        <div
          className="h-full w-full animate-aurora rounded-full bg-violet-500/10 blur-[140px] motion-reduce:animate-none"
          style={{ animationDelay: '-12s' }}
        />
      </div>

      <div className="bg-grid mask-radial absolute inset-0" />

      {/* Film grain to kill gradient banding */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
