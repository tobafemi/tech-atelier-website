import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CONTACT_EMAIL, WHATSAPP_URL } from '../constants';
import { useContact } from '../lib/contact';

const CTA: React.FC = () => {
  const openContact = useContact();

  return (
    <section id="contact" className="py-32 md:py-44 bg-slate-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="text-emerald-400 text-[11px] font-bold tracking-[0.5em] uppercase mb-8 block">Next step</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95] text-balance">
            Find out where an agent would <span className="text-emerald-500">pay for itself.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
            Book an audit and we'll come back with your options ranked by what they'd save. If nothing is worth
            building, we'll tell you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openContact('An AI audit')}
              className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-white text-slate-950 rounded-full font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors"
            >
              Book an AI audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-400 transition-colors"
            >
              WhatsApp us
            </motion.a>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Or email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-300 underline underline-offset-4 hover:text-white">
              {CONTACT_EMAIL}
            </a>
          </p>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default CTA;
