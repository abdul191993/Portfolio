import { motion } from 'framer-motion';
import { Check, Lock, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import type { Project } from '@/data/types';
import { useScrollLock } from '@/hooks/useScrollLock';
import { springSoft, stagger } from '@/lib/motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/** Expanded case study. Morphs out of its card via shared `layoutId`s. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(true);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby={`title-${project.id}`}>
      <motion.div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.article
        layoutId={`project-${project.id}`}
        transition={springSoft}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)]"
      >
        <div className="relative h-56 shrink-0 overflow-hidden md:h-72">
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="glass absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-fg"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ rotate: 90 }}
            transition={{ delay: 0.15 }}
          >
            <X size={18} />
          </motion.button>
        </div>

        <div className="overflow-y-auto px-6 pb-8 md:px-10 md:pb-10">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{project.category}</p>
          <motion.h3
            id={`title-${project.id}`}
            layoutId={`project-title-${project.id}`}
            className="text-3xl font-semibold tracking-tight text-fg md:text-4xl"
          >
            {project.title}
          </motion.h3>

          <motion.div variants={stagger(0.06, 0.2)} initial="hidden" animate="visible" exit="hidden">
            <motion.ul variants={item} className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  {t}
                </li>
              ))}
            </motion.ul>

            <motion.p variants={item} className="mt-6 text-lg leading-relaxed text-fg-muted">
              {project.fullDescription}
            </motion.p>

            <motion.h4 variants={item} className="mt-8 mb-4 font-medium text-fg">
              Key contributions
            </motion.h4>
            <ul className="space-y-3">
              {project.features.map((f) => (
                <motion.li key={f} variants={item} className="flex gap-3 text-fg-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            {project.confidential && (
              <motion.p
                variants={item}
                className="mt-8 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-xs text-fg-subtle"
              >
                <Lock size={12} />
                Project details and visuals are generalized due to confidentiality constraints.
              </motion.p>
            )}
          </motion.div>
        </div>
      </motion.article>
    </div>
  );
}
