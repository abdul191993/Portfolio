import { MotionConfig } from 'framer-motion';

import { Background } from '@/components/layout/Background';
import { CursorGlow } from '@/components/layout/CursorGlow';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';

export default function App() {
  return (
    // Honour the OS "reduce motion" setting across every motion component.
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 overflow-x-clip">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
