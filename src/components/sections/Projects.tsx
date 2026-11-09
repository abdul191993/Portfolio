import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects } from '@/data/portfolio';
import type { Project } from '@/data/types';
import { EASE_OUT_EXPO } from '@/lib/motion';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title="Products used by banks, regulators and global shippers."
        description="Visuals are generalized due to confidentiality — the engineering is real."
      />

      <LayoutGroup>
        <ul className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.li
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: (i % 2) * 0.12 }}
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} index={i} />
            </motion.li>
          ))}
        </ul>

        <AnimatePresence>
          {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </AnimatePresence>
      </LayoutGroup>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <TiltCard className="rounded-3xl">
      <motion.button
        type="button"
        layoutId={`project-${project.id}`}
        onClick={onOpen}
        className="group block w-full overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/70 text-left transition-colors duration-500 hover:border-white/[0.16]"
        aria-label={`Open case study: ${project.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            layoutId={`project-image-${project.id}`}
            src={project.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
          <span className="absolute left-5 top-5 font-mono text-xs text-fg/70">0{index + 1}</span>
          <span className="absolute right-5 top-5 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-fg text-ink-950 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={18} />
          </span>
        </div>

        <div className="p-6 md:p-7" style={{ transform: 'translateZ(30px)' }}>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{project.category}</p>
          <motion.h3
            layoutId={`project-title-${project.id}`}
            className="text-2xl font-semibold tracking-tight text-fg"
          >
            {project.title}
          </motion.h3>
          <p className="mt-2 text-fg-muted">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-fg-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.button>
    </TiltCard>
  );
}
