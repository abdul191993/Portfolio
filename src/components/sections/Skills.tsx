import { motion } from 'framer-motion';

import { Marquee } from '@/components/ui/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { marqueeSkills, skillGroups } from '@/data/portfolio';
import { EASE_OUT_EXPO, scaleIn, stagger } from '@/lib/motion';

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="04"
          eyebrow="Toolkit"
          title="A React-first stack, built for scale."
          description="Deep in the React ecosystem, comfortable across the stack, and increasingly building with AI."
        />
      </div>

      <div className="mb-16 space-y-3">
        <Marquee
          items={marqueeSkills}
          duration={45}
          renderItem={(skill) => (
            <span className="whitespace-nowrap text-3xl font-semibold tracking-tight text-fg/90 md:text-5xl">
              {skill}
              <span className="mx-6 text-accent">✦</span>
            </span>
          )}
        />
        <Marquee
          items={[...marqueeSkills].reverse()}
          duration={55}
          reverse
          renderItem={(skill) => (
            <span className="whitespace-nowrap text-3xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.25)] md:text-5xl">
              {skill}
              <span className="mx-6 text-white/20">✦</span>
            </span>
          )}
        />
      </div>

      <ul className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <motion.li
              key={group.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: EASE_OUT_EXPO }}
              className={i < 2 || i > 5 ? 'lg:col-span-2' : undefined}
            >
              <SpotlightCard className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <motion.span
                    className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent-strong/20 to-accent-2/10 text-accent"
                    whileHover={{ rotate: 12, scale: 1.08 }}
                  >
                    <Icon size={19} />
                  </motion.span>
                  <h3 className="font-medium text-fg">{group.title}</h3>
                </div>
                <motion.ul
                  className="flex flex-wrap gap-2"
                  variants={stagger(0.035, 0.2)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      variants={scaleIn}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </SpotlightCard>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
