import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Loader2, Send } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import { cn } from '@/lib/cn';
import { EASE_OUT_EXPO } from '@/lib/motion';

/** EmailJS keys are public by design; they're overridable via Vite env vars. */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'service_s7hvflb',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'template_gviwuue',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '5eAdg9tyO2lkorXji',
} as const;

type Status = 'idle' | 'sending' | 'success' | 'error';

interface Field {
  name: 'user_name' | 'user_email' | 'message';
  label: string;
  type: 'text' | 'email' | 'textarea';
  autoComplete?: string;
}

const fields: readonly Field[] = [
  { name: 'user_name', label: 'Your name', type: 'text', autoComplete: 'name' },
  { name: 'user_email', label: 'Email address', type: 'email', autoComplete: 'email' },
  { name: 'message', label: 'Tell me about the role or project', type: 'textarea' },
];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (status !== 'success') return;
    const id = window.setTimeout(() => setStatus('idle'), 5000);
    return () => window.clearTimeout(id);
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, {
        publicKey: EMAILJS.publicKey,
      });
      form.reset();
      setStatus('success');
    } catch (error) {
      console.error('EmailJS send failed', error);
      setStatus('error');
    }
  };

  const busy = status === 'sending' || status === 'success';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {fields.map((field, i) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT_EXPO }}
        >
          <FloatingField field={field} disabled={busy} />
        </motion.div>
      ))}

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={busy ? undefined : { scale: 1.01 }}
        whileTap={busy ? undefined : { scale: 0.98 }}
        className={cn(
          'relative flex h-14 w-full items-center justify-center overflow-hidden rounded-xl font-medium text-white transition-colors duration-500',
          status === 'success'
            ? 'bg-success/90'
            : 'bg-gradient-to-r from-accent-strong to-accent shadow-[0_10px_40px_-12px] shadow-accent/60',
          status === 'sending' && 'cursor-wait',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status === 'error' ? 'idle' : status}
            className="flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending…
              </>
            ) : status === 'success' ? (
              <>
                <Check size={18} /> Message sent — I&apos;ll reply soon
              </>
            ) : (
              <>
                Send message <Send size={16} />
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            role="alert"
            className="flex items-center gap-2 rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle size={16} />
            Something went wrong. Please try again or email me directly.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function FloatingField({ field, disabled }: { field: Field; disabled: boolean }) {
  const id = `contact-${field.name}`;
  const shared = cn(
    'peer w-full rounded-xl border border-white/[0.08] bg-ink-950/60 px-4 pb-2.5 pt-6 text-fg outline-none transition-[border-color,box-shadow] duration-300',
    'placeholder-transparent focus:border-accent/60 focus:shadow-[0_0_0_4px_rgb(124_134_255/0.12)] disabled:opacity-60',
  );

  return (
    <div className="relative">
      {field.type === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          required
          rows={5}
          placeholder={field.label}
          disabled={disabled}
          className={cn(shared, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          required
          autoComplete={field.autoComplete}
          placeholder={field.label}
          disabled={disabled}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-fg-subtle transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent"
      >
        {field.label}
      </label>
    </div>
  );
}
