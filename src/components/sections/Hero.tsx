import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Github, Linkedin, MapPin } from 'lucide-react';
import { useRef } from 'react';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { SplitText } from '@/components/ui/SplitText';
import { TextRotator } from '@/components/ui/TextRotator';
import { profile } from '@/data/portfolio';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { LiveDashboard } from './LiveDashboard';

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Content drifts up and fades as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center pt-28 pb-20">
      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]"
      >
        <div>
          <motion.div {...enter(0.1)} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-fg-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-success opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Available immediately
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-fg-subtle">
              <MapPin size={13} />
              {profile.location}
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            <SplitText text={profile.firstName} by="chars" immediate delay={0.2} className="block text-fg" />
            <SplitText
              text={profile.lastName}
              by="chars"
              immediate
              delay={0.45}
              className="block"
              tokenClassName="text-gradient animate-shimmer motion-reduce:animate-none"
            />
          </h1>

          <motion.p {...enter(0.9)} className="mt-8 text-xl font-medium text-fg md:text-2xl">
            {profile.role} crafting{' '}
            <TextRotator words={profile.taglines} className="text-accent" />
          </motion.p>

          <motion.p {...enter(1.05)} className="mt-5 max-w-xl text-pretty leading-relaxed text-fg-muted">
            8+ years building real-time React &amp; TypeScript interfaces for fintech and enterprise teams —
            from 0-to-1 builds to platforms serving trading desks at scale.
          </motion.p>

          <motion.div {...enter(1.2)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="#projects">
              View my work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Get in touch
            </MagneticButton>
            <div className="ml-1 flex items-center gap-1">
              {[
                { href: profile.links.github, label: 'GitHub', Icon: Github },
                { href: profile.links.linkedin, label: 'LinkedIn', Icon: Linkedin },
              ].map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, rotate: -6 }}
                  className="grid h-11 w-11 place-items-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
                >
                  <Icon size={19} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.ul {...enter(1.35)} className="mt-10 flex flex-wrap gap-2">
            {profile.workAuthorization.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-fg-subtle"
              >
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <LiveDashboard className="mx-auto w-full max-w-md lg:max-w-none" />
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-subtle md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
