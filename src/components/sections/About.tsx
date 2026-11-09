import { motion } from 'framer-motion';
import { GraduationCap, Languages as LanguagesIcon, ShieldCheck } from 'lucide-react';

import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { education, languages, profile, stats } from '@/data/portfolio';
import { EASE_OUT_EXPO, fadeUp, stagger } from '@/lib/motion';

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Interfaces that stay fast when the data never stops."
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <p className="text-pretty text-xl leading-relaxed text-fg md:text-2xl md:leading-relaxed">
            {profile.summary}
          </p>
          <p className="mt-6 text-pretty leading-relaxed text-fg-muted">
            I ship performant, well-tested UIs with Jest and Playwright, use WebSockets and data
            visualization for live data, and work closely with backend and design teams. Lately I&apos;ve
            been building agentic AI workflows on Claude and MCP.
          </p>
        </Reveal>

        <motion.div
          className="grid gap-4"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp}>
            <SpotlightCard className="p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <p className="font-medium text-fg">{education.degree}</p>
                  <p className="text-sm text-fg-muted">
                    {education.school} · {education.location}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SpotlightCard className="p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <p className="font-medium text-fg">Work authorization</p>
                  <p className="text-sm text-fg-muted">{profile.workAuthorization.join(' · ')}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <SpotlightCard className="p-5">
              <div className="mb-4 flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-2/10 text-accent-2">
                  <LanguagesIcon size={20} />
                </span>
                <p className="font-medium text-fg">Languages</p>
              </div>
              <ul className="space-y-3">
                {languages.map((lang, i) => (
                  <li key={lang.name}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-fg">{lang.name}</span>
                      <span className="font-mono text-xs text-fg-subtle">{lang.level}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-accent-strong to-accent-2"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: lang.proficiency / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.3 + i * 0.12, ease: EASE_OUT_EXPO }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>

      <motion.dl
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] md:grid-cols-4"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp} className="bg-ink-900/90 p-6 md:p-8">
            <dt className="order-2 mt-2 text-sm leading-snug text-fg-muted">{stat.label}</dt>
            <dd className="order-1 text-4xl font-semibold tracking-tight md:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} className="text-gradient" />
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
