import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useState } from 'react';

import cvPdf from '@/assets/Abdul_React_CV.pdf';
import { navItems, profile } from '@/data/portfolio';
import type { SectionId } from '@/data/types';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn } from '@/lib/cn';
import { EASE_OUT_EXPO, springSnappy } from '@/lib/motion';

const sectionIds: readonly SectionId[] = navItems.map((item) => item.id);

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useScrollLock(open);

  // Hide on scroll down, reveal on scroll up.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240 && !open);
    setScrolled(latest > 24);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            'flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500',
            scrolled ? 'glass shadow-[0_8px_32px_-12px_rgb(0_0_0/0.6)]' : 'border border-transparent',
          )}
        >
          <a href="#top" className="group flex items-center gap-2.5 pl-2" aria-label="Back to top">
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent-strong to-accent-2 font-mono text-xs font-semibold text-white">
              AQ
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-strong to-accent-2 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70" />
            </span>
            <span className="hidden text-sm font-medium text-fg sm:inline">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'relative block rounded-full px-4 py-2 text-sm transition-colors duration-300',
                    active === item.id ? 'text-fg' : 'text-fg-muted hover:text-fg',
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                      transition={springSnappy}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={cvPdf}
              download="Abdul_Quddoos_CV.pdf"
              className="hidden items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-ink-950 transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              <Download size={15} />
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-950/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { ease: EASE_OUT_EXPO, duration: 0.6 } },
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 text-4xl font-semibold tracking-tight text-fg"
                  >
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <motion.a
              href={cvPdf}
              download="Abdul_Quddoos_CV.pdf"
              className="mt-12 inline-flex w-fit items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm font-medium text-ink-950"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55 } }}
            >
              <Download size={16} />
              Download résumé
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
