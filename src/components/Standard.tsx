import React from 'react';
import { motion } from 'framer-motion';
import { STANDARD } from '../constants';
import SectionHeading from './SectionHeading';

const Standard: React.FC = () => (
  <section id="standard" className="py-28 md:py-40 bg-slate-950 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative">
      <SectionHeading
        dark
        eyebrow="Our standard"
        title="Production-grade means it still works in month six."
        intro="Plenty of AI pilots look good in a demo and quietly fall over a few weeks later. Every agent we ship meets these nine points, and they're written into your proposal."
      />

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800 rounded-3xl overflow-hidden border border-slate-800">
        {STANDARD.map((point, index) => (
          <motion.li
            key={point.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (index % 3) * 0.08, duration: 0.6 }}
            className="bg-slate-950 p-8 md:p-10"
          >
            <span className="block text-sm font-mono text-emerald-400 mb-5">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="text-xl font-bold tracking-tight mb-3">{point.title}</h3>
            <p className="text-slate-400 font-light leading-relaxed">{point.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default Standard;
