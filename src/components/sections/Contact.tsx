import { motion } from 'framer-motion';
import { Check, Copy, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { profile } from '@/data/portfolio';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title="Let's build something that ships."
        description="Open to senior frontend and full stack roles in Berlin or remote. Available immediately — Chancenkarte holder, Blue Card eligible."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-3">
          <CopyRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <CopyRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
          <ContactRow icon={Linkedin} label="LinkedIn" value="abdul-quddoos" href={profile.links.linkedin} external />
          <ContactRow icon={MapPin} label="Based in" value={profile.location} />
        </Reveal>

        <Reveal delay={0.15}>
          <SpotlightCard className="p-6 md:p-8">
            <ContactForm />
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

interface RowProps {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function RowBody({ icon: Icon, label, value }: Pick<RowProps, 'icon' | 'label' | 'value'>) {
  return (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-accent transition-colors duration-300 group-hover:bg-accent/15">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{label}</span>
        <span className="block truncate text-fg">{value}</span>
      </span>
    </>
  );
}

const rowClass =
  'group flex w-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-ink-900/50 p-4 transition-colors duration-300 hover:border-white/[0.15]';

function ContactRow({ href, external, ...body }: RowProps) {
  if (!href) {
    return (
      <div className={rowClass}>
        <RowBody {...body} />
      </div>
    );
  }
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 4 }}
      className={rowClass}
    >
      <RowBody {...body} />
    </motion.a>
  );
}

/** Contact row with a one-click copy button that morphs into a check mark. */
function CopyRow({ href, ...body }: RowProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body.value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable (e.g. insecure context) — the link still works. */
    }
  };

  return (
    <div className="relative">
      <ContactRow href={href} {...body} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? `${body.label} copied` : `Copy ${body.label.toLowerCase()}`}
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-fg-subtle transition-colors hover:bg-white/[0.06] hover:text-fg"
      >
        <motion.span key={copied ? 'y' : 'n'} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        </motion.span>
      </button>
    </div>
  );
}
