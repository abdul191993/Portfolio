import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, Gauge, Radio, TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/cn';
import { EASE_OUT_EXPO } from '@/lib/motion';

const POINTS = 32;
const WIDTH = 320;
const HEIGHT = 110;
const TICK_MS = 1400;

interface Tick {
  series: number[];
  bars: number[];
}

function seedSeries(): number[] {
  const out: number[] = [];
  let v = 182;
  for (let i = 0; i < POINTS; i++) {
    v += (Math.random() - 0.45) * 3;
    out.push(v);
  }
  return out;
}

function nextTick(prev: Tick): Tick {
  const last = prev.series.at(-1) ?? 182;
  const next = last + (Math.random() - 0.46) * 3.2;
  return {
    series: [...prev.series.slice(1), next],
    bars: prev.bars.map((b) => Math.min(1, Math.max(0.15, b + (Math.random() - 0.5) * 0.35))),
  };
}

/** Maps the series into an SVG path. Always emits the same number of commands, so `d` can tween. */
function toPath(series: readonly number[]): { line: string; area: string } {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const step = WIDTH / (series.length - 1);
  const pts = series.map((v, i) => [i * step, HEIGHT - 8 - ((v - min) / range) * (HEIGHT - 20)] as const);
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return { line, area: `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z` };
}

/**
 * Decorative "real-time trading dashboard" that streams fake ticks — a nod to
 * the WebSocket dashboards built for trading teams. Freezes under reduced motion.
 */
export function LiveDashboard({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState<Tick>(() => ({
    series: seedSeries(),
    bars: Array.from({ length: 12 }, () => 0.3 + Math.random() * 0.6),
  }));

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setTick(nextTick), TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const { line, area } = useMemo(() => toPath(tick.series), [tick.series]);
  const price = tick.series.at(-1) ?? 0;
  const prevPrice = tick.series.at(-2) ?? price;
  const open = tick.series[0] ?? price;
  const change = ((price - open) / open) * 100;
  const up = price >= prevPrice;

  const ease = { duration: TICK_MS / 1000, ease: 'easeInOut' } as const;

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className="glass relative overflow-hidden rounded-3xl p-5 shadow-[0_40px_120px_-40px_rgb(91_103_245/0.55)]"
        initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: EASE_OUT_EXPO }}
        style={{ transformPerspective: 1200 }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fg-muted">
            <Activity size={14} className="text-accent" />
            Equities · Live
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 font-mono text-[10px] text-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-success opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            WS connected
          </div>
        </div>

        {/* Price */}
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="font-mono text-[11px] text-fg-subtle">EQUITY INDEX · DEMO</p>
            <div className="relative h-9 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={price.toFixed(2)}
                  className="font-mono text-3xl font-medium tabular-nums"
                  initial={{ y: up ? 24 : -24, opacity: 0, color: up ? '#34d399' : '#fb7185' }}
                  animate={{ y: 0, opacity: 1, color: '#e8ebf4', transition: { color: { duration: 1.2 } } }}
                  exit={{ y: up ? -24 : 24, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                >
                  {price.toFixed(2)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <motion.span
            key={change >= 0 ? 'pos' : 'neg'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              'flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs tabular-nums',
              change >= 0 ? 'bg-success/10 text-success' : 'bg-rose-500/10 text-rose-400',
            )}
          >
            {change >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {change >= 0 ? '+' : ''}
            {change.toFixed(2)}%
          </motion.span>
        </div>

        {/* Chart */}
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-28 w-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="area-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-stroke" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-accent-strong)" />
              <stop offset="100%" stopColor="var(--color-accent-2)" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={WIDTH} y1={HEIGHT * f} y2={HEIGHT * f} stroke="rgb(255 255 255 / 0.05)" strokeDasharray="3 5" />
          ))}
          <motion.path d={area} fill="url(#area-fill)" initial={false} animate={{ d: area }} transition={ease} />
          <motion.path
            d={line}
            fill="none"
            stroke="url(#line-stroke)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ d: line, pathLength: 1 }}
            transition={{ d: ease, pathLength: { duration: 1.8, delay: 1, ease: EASE_OUT_EXPO } }}
          />
        </svg>

        {/* Volume bars */}
        <div className="mt-4 flex h-12 items-end gap-1.5">
          {tick.bars.map((b, i) => (
            <motion.div
              key={i}
              className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent-strong/30 to-accent/70"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: b }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.02 }}
              style={{ height: '100%' }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating metric chips */}
      <motion.div
        className="glass absolute -left-2 -bottom-8 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-left-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, -8, 0] }}
        transition={{
          opacity: { delay: 1.3, duration: 0.6 },
          x: { delay: 1.3, duration: 0.8, ease: EASE_OUT_EXPO },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-success/15 text-success">
          <Gauge size={18} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">Core Web Vitals</p>
          <p className="font-mono text-sm font-medium text-fg">All green</p>
        </div>
      </motion.div>

      <motion.div
        className="glass absolute -right-2 -top-16 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-right-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.5, duration: 0.6 },
          x: { delay: 1.5, duration: 0.8, ease: EASE_OUT_EXPO },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2.2 },
        }}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
          <Radio size={18} />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">Micro-frontends</p>
          <p className="font-mono text-sm font-medium text-fg">Independent deploys</p>
        </div>
      </motion.div>
    </div>
  );
}
