import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, FileCheck2, Inbox } from 'lucide-react';
import { AGENTS } from '../constants';
import SectionHeading from './SectionHeading';

const icons: Record<string, React.ReactNode> = {
  enquiry: <MessageSquareText className="w-6 h-6" />,
  compliance: <FileCheck2 className="w-6 h-6" />,
  'back-office': <Inbox className="w-6 h-6" />,
};

const Agents: React.FC = () => (
  <section id="agents" className="py-28 md:py-40 bg-[#fafafa] border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Agents we build"
        title="Three agents most businesses can put to work straight away."
        intro="Each one starts from a proven base and is set up around your systems, your rules and the way you talk to customers. Anything else worth automating comes out of the audit."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {AGENTS.map((agent, index) => (
          <motion.article
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-shadow duration-500"
          >
            <div className="w-14 h-14 bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-400 mb-8">
              {icons[agent.id]}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-slate-950 mb-4">{agent.name}</h3>
            <p className="text-slate-500 leading-relaxed font-light mb-8">{agent.description}</p>
            <dl className="mt-auto space-y-4 pt-6 border-t border-slate-100 text-sm">
              <div>
                <dt className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">Good for</dt>
                <dd className="text-slate-700">{agent.goodFor}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-1">Measured by</dt>
                <dd className="text-slate-700">{agent.measuredBy}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Agents;
