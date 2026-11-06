import React from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, ScrollText, Globe2, ShieldOff, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';

const POINTS = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Encrypted throughout',
    text: 'Your data is encrypted in transit and at rest, including anything the agent stores between runs.',
  },
  {
    icon: <KeyRound className="w-5 h-5" />,
    title: 'Least-privilege access',
    text: 'The agent reaches only the systems and records its job needs, using credentials you can revoke at any time.',
  },
  {
    icon: <ScrollText className="w-5 h-5" />,
    title: 'Complete audit logs',
    text: 'Every action is recorded, so you can see what the agent did, when, and who approved it.',
  },
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: 'Data kept in your region',
    text: 'We host in your region wherever the services allow, and in your own cloud account if you prefer.',
  },
  {
    icon: <ShieldOff className="w-5 h-5" />,
    title: 'Not used for training',
    text: "We use model providers' business terms, so your data is never used to train their models.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: 'Protected against misuse',
    text: 'Defences against prompt injection and data leaks, with inputs and outputs checked before anything is acted on.',
  },
];

const Security: React.FC = () => (
  <section id="security" className="py-28 md:py-40 bg-[#fafafa]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Security"
        title="Secure by design, from the first line of code."
        intro="An agent works with your customer records, your finances and your internal systems. We build every one with the controls you'd expect of any system trusted with that access."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {POINTS.map((point, index) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: (index % 3) * 0.08, duration: 0.6 }}
            className="flex gap-5"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-100 text-emerald-600 flex items-center justify-center">
              {point.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-950 mb-2">{point.title}</h3>
              <p className="text-slate-500 font-light leading-relaxed">{point.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Security;
