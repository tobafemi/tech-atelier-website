import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

const SectionHeading: React.FC<Props> = ({ eyebrow, title, intro, dark, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className={`max-w-3xl mb-16 md:mb-20 ${className}`}
  >
    <span
      className={`text-[11px] font-bold tracking-[0.4em] uppercase mb-6 block ${
        dark ? 'text-emerald-400' : 'text-emerald-600'
      }`}
    >
      {eyebrow}
    </span>
    <h2
      className={`text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-balance leading-[1.02] ${
        dark ? 'text-white' : 'text-slate-950'
      }`}
    >
      {title}
    </h2>
    {intro && (
      <p className={`text-lg md:text-xl leading-relaxed font-light ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        {intro}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
