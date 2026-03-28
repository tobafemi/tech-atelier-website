
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactModal from './ContactModal';

const CTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="py-48 bg-slate-950 text-white overflow-hidden relative">
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-emerald-400 text-[11px] font-bold tracking-[0.5em] uppercase mb-10 block">Contact</span>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-16 leading-[0.9] text-balance">
              Ready to build something that <span className="text-emerald-500 italic">actually</span> works?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-slate-950 rounded-full font-bold text-lg uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl shadow-white/5"
              >
                hello@tech-atelier.co.uk
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              <motion.a 
                whileHover={{ scale: 1.05, borderColor: '#10b981' }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/447481802985"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-12 py-6 border border-white/20 rounded-full font-bold text-lg uppercase tracking-widest hover:text-emerald-400 transition-all"
              >
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Background Visual */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-[35vw] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap leading-none tracking-tighter italic">
        ATELIER.V5
      </div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default CTA;
