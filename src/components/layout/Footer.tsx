import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

import { profile } from '@/data/portfolio';

const socials = [
  { href: profile.links.github, label: 'GitHub', icon: Github },
  { href: profile.links.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <p className="text-sm text-fg-subtle">
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with React, TypeScript &amp;
          Framer Motion.
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ href, label, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -3 }}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] text-fg-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              <Icon size={17} />
            </motion.a>
          ))}
          <motion.a
            href="#top"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-fg transition-colors hover:bg-accent/20"
          >
            <ArrowUp size={17} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
