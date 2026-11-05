import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useContact } from '../lib/contact';

const ease = [0.22, 1, 0.36, 1] as const;

const LOG = [
  { time: '09:02', task: 'Website enquiry', result: 'Qualified and booked in for a call at 2pm', status: 'done' },
  { time: '09:14', task: 'Right-to-work checks', result: 'Two documents due next week. Reminders sent', status: 'done' },
  { time: '09:31', task: 'Supplier invoice', result: 'Matched to the order. Waiting for your approval', status: 'review' },
  { time: '09:47', task: 'Shared inbox', result: '12 routine replies drafted, 3 passed to the team', status: 'done' },
] as const;

const Hero: React.FC = () => {
  const openContact = useContact();

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  };

  return (
    <section
      id="top"
      className="relative pt-36 md:pt-44 pb-24 md:pb-32 lg:min-h-screen flex items-center bg-[#fcfcfc] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div variants={container} initial="hidden" animate="visible" className="lg:col-span-7">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full text-[10px] font-bold tracking-[0.2em] text-slate-500 mb-10 border border-slate-100 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            AI AGENTS FOR UK BUSINESSES
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter text-slate-950 leading-[0.95] text-balance mb-8"
          >
            AI agents that take the admin <span className="text-emerald-500">off your team.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-2xl text-slate-500 leading-relaxed mb-12 max-w-xl font-light"
          >
            We find the work that's quietly costing you money, put an agent on it and prove the saving in pounds.
            Tested before launch and looked after once it's live.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openContact('An AI audit')}
              className="px-9 py-5 bg-slate-950 text-white rounded-full flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase shadow-xl shadow-slate-950/10 hover:bg-emerald-600 transition-colors"
            >
              Book an AI audit
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#check"
              className="px-9 py-5 bg-white text-slate-950 border border-slate-200 rounded-full flex items-center justify-center font-bold text-sm tracking-widest uppercase hover:border-slate-950 transition-colors"
            >
              Try the free check
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative bg-slate-950 rounded-3xl p-6 md:p-8 shadow-2xl shadow-slate-950/20 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Example agent log
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Tuesday</span>
              </div>

              <ul className="space-y-3">
                {LOG.map((row, i) => (
                  <motion.li
                    key={row.time}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.35 }}
                    className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800"
                  >
                    <span className="text-[11px] font-mono text-slate-500 pt-0.5">{row.time}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">{row.task}</span>
                        {row.status === 'review' ? (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300">
                            Needs you
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-300">
                            Done
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-slate-400 leading-snug">{row.result}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
