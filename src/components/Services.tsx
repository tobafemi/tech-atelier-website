import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STEPS } from '../constants';
import { useContact, type Topic } from '../lib/contact';
import SectionHeading from './SectionHeading';

const topicFor: Record<string, Topic> = {
  audit: 'An AI audit',
  build: 'A specific agent',
  care: 'Support for an agent we built',
};

const Services: React.FC = () => {
  const openContact = useContact();

  return (
    <section id="services" className="py-28 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Start with an audit. Build what's worth building."
          intro="Every client starts with an audit. It shows where an agent would earn its keep and what it would cost, before you commit to anything bigger."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative flex flex-col p-8 md:p-10 rounded-3xl border ${
                index === 0 ? 'border-emerald-500/40 bg-emerald-50/40' : 'border-slate-100 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm font-mono font-semibold text-emerald-600">{step.number}</span>
                {index === 0 && (
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Start here
                  </span>
                )}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950 mb-2">{step.title}</h3>
              <p className="text-sm font-semibold text-emerald-700 mb-6">{step.price}</p>
              <p className="text-slate-500 leading-relaxed font-light mb-8">{step.summary}</p>
              <ul className="space-y-3 mb-10">
                {step.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                    {line}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openContact(topicFor[step.id])}
                className="mt-auto self-start text-[11px] font-bold tracking-widest uppercase text-slate-950 border-b-2 border-slate-950 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
              >
                {index === 0 ? 'Book an audit →' : 'Ask about this →'}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Need a website as well? We still build them, as an add-on from £399.{' '}
          <button
            onClick={() => openContact('A website')}
            className="font-semibold text-slate-900 underline underline-offset-4 hover:text-emerald-600"
          >
            Ask about a website
          </button>
        </p>
      </div>
    </section>
  );
};

export default Services;
