import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const background = [
  'Engineering: agents, integrations, cloud infrastructure and security',
  'Product: scoping, testing and adoption, with roots in regulated clinical software',
  'Business: process mapping, return on investment and change management',
];

const promises = [
  'A fixed price before any build starts',
  'Plain-English updates, no jargon',
  'A named person to talk to, not a ticket queue',
  "If nothing is worth automating, we'll say so",
];

const About: React.FC = () => (
  <section id="about" className="py-28 md:py-40 bg-white">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-[11px] font-bold tracking-[0.4em] text-emerald-600 uppercase mb-6 block">
          Who we are
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-950 mb-8 leading-[1.05] text-balance">
          A team of engineers and business specialists.
        </h2>
        <p className="text-lg text-slate-500 leading-relaxed font-light mb-10">
          Tech Atelier brings together people from software engineering, clinical product and business strategy.
          Some of us have built software where patients depend on every release being tested and traceable. We
          apply that discipline to every agent we build: a clear scope, proper testing and nothing shipped on hope.
        </p>
        <ul className="space-y-4">
          {background.map((line) => (
            <li key={line} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-slate-700">{line}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="bg-[#fafafa] border border-slate-100 rounded-3xl p-8 md:p-12"
      >
        <h3 className="text-xl font-bold tracking-tight text-slate-950 mb-8">What you can expect from us</h3>
        <ul className="divide-y divide-slate-200">
          {promises.map((line, i) => (
            <li key={line} className="flex items-baseline gap-5 py-5 first:pt-0 last:pb-0">
              <span className="text-sm font-mono text-emerald-600">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-lg text-slate-800">{line}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default About;
