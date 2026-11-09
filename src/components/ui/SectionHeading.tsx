import { motion } from 'framer-motion';

import { EASE_OUT_EXPO } from '@/lib/motion';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

/** Numbered eyebrow with a drawing rule, a split-text title and an optional lede. */
export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-14 max-w-3xl md:mb-20">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span>{index}</span>
        <motion.span
          aria-hidden
          className="h-px w-12 origin-left bg-gradient-to-r from-accent to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO }}
        />
        <span className="text-fg-muted">{eyebrow}</span>
      </div>
      <SplitText
        as="h2"
        text={title}
        className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg md:text-6xl"
      />
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted">{description}</p>
        </Reveal>
      )}
    </header>
  );
}
