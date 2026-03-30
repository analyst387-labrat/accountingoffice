'use client';

import { motion, type MotionProps } from 'framer-motion';

/** Sophisticated spring — low mass, high damping, no bounce */
export const spring = {
  type: 'spring',
  mass: 0.4,
  damping: 28,
  stiffness: 90,
} as const;

/** Standard ease for load-time (non-scroll) animations */
export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** 'up' (default), 'left', 'right', 'fade' */
  direction?: 'up' | 'left' | 'right' | 'fade';
  margin?: string;
} & Omit<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'>;

const VARIANTS = {
  up:    { hidden: { opacity: 0, y: 28 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 },  visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },          visible: { opacity: 1 } },
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
  margin = '-48px',
  ...rest
}: RevealProps) {
  const { hidden, visible } = VARIANTS[direction];
  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin }}
      transition={{ ...spring, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Overline label — Inter, uppercase, wide tracking, mono-style numerals.
 * Usage: <SectionLabel index="02" color="slate-light">Services</SectionLabel>
 */
export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-[10px] font-semibold tracking-[0.28em] uppercase mb-5 font-sans ${
        light ? 'text-gold/55' : 'text-slate-light'
      }`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {children}
    </p>
  );
}

/** Section h2 — keeps Playfair for editorial contrast against Inter H1 */
export function SectionHeading({
  children,
  className = '',
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`font-serif font-bold leading-tight tracking-tight ${
        light ? 'text-offwhite' : 'text-navy'
      } ${className}`}
      style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)' }}
    >
      {children}
    </h2>
  );
}