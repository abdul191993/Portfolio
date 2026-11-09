import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, ChevronDown } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { experiences } from '@/data/portfolio';
import type { Experience as ExperienceItem } from '@/data/types';
import { cn } from '@/lib/cn';
import { EASE_OUT_EXPO } from '@/lib/motion';

const PREVIEW_COUNT = 3;

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        index="02"
        eyebrow="Experience"
        title="Eight years across fintech, enterprise & AI."
        description="From POS and logistics platforms to real-time trading dashboards for a national bank — and now agentic AI tooling."
      />

      <ol ref={listRef} className="relative space-y-6 md:space-y-8">
        {/* Timeline rail + scroll-driven fill */}
        <div aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.07] md:left-[calc(11rem+19px)]" />
        <motion.div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent-2 via-accent to-accent-strong md:left-[calc(11rem+19px)]"
          style={{ scaleY: progress }}
        />

        {experiences.map((exp, i) => (
          <TimelineItem key={exp.id} exp={exp} index={i} />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({ exp, index }: { exp: ExperienceItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const visible = expanded ? exp.highlights : exp.highlights.slice(0, PREVIEW_COUNT);
  const hiddenCount = exp.highlights.length - PREVIEW_COUNT;

  return (
    <motion.li
      className="relative grid gap-4 pl-14 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: index * 0.05 }}
    >
      {/* Date column (desktop) */}
      <div className="hidden pr-8 pt-5 text-right md:block">
        <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{exp.start}</p>
        <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">— {exp.end}</p>
      </div>

      {/* Node */}
      <motion.span
        className={cn(
          'absolute left-0 top-4 grid h-10 w-10 place-items-center rounded-full border bg-ink-900 md:left-[11rem]',
          exp.current ? 'border-accent/60 text-accent' : 'border-white/10 text-fg-muted',
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
      >
        {exp.current && <span className="absolute inset-0 animate-ping-slow rounded-full bg-accent/20 motion-reduce:animate-none" />}
        <Briefcase size={16} />
      </motion.span>

      {/* Card */}
      <article className="group rounded-2xl border border-white/[0.07] bg-ink-900/60 p-6 transition-colors duration-500 hover:border-white/[0.14] hover:bg-ink-900/90 md:ml-16 md:p-8">
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-wider text-fg-subtle md:hidden">
              {exp.start} — {exp.end}
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{exp.role}</h3>
            <p className="mt-1 text-fg-muted">
              <span className="text-fg">{exp.company}</span>
              {exp.context && <span className="text-fg-subtle"> · {exp.context}</span>}
              <span className="text-fg-subtle"> · {exp.location}</span>
            </p>
          </div>
          {exp.current && (
            <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent">
              Current
            </span>
          )}
        </header>

        <ul id={panelId} className="space-y-3">
          <AnimatePresence initial={false}>
            {visible.map((point, i) => (
              <motion.li
                key={point}
                className="flex gap-3 text-[15px] leading-relaxed text-fg-muted"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: i >= PREVIEW_COUNT ? (i - PREVIEW_COUNT) * 0.05 : 0 }}
              >
                <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-fg"
          >
            {expanded ? 'Show less' : `Show ${hiddenCount} more`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={15} />
            </motion.span>
          </button>
        )}

        <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
          {exp.stack.map((tech) => (
            <li key={tech} className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-fg-muted">
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}
