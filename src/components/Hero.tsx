
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Hero: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative pt-48 pb-32 min-h-screen flex items-center bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7"
        >
          <motion.div variants={item} className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full text-[10px] font-bold tracking-[0.2em] text-slate-400 mb-10 border border-slate-100 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            NOW TAKING ON NEW CLIENTS — AVAILABLE NOW
          </motion.div>
          
          <motion.h1 variants={item} className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-950 leading-[0.95] text-balance mb-8">
            Technology solutions built to solve <span className="text-emerald-500">your business problems.</span>
          </motion.h1>
          
          <motion.p variants={item} className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-12 max-w-xl font-light">
            Tech Atelier is a workshop that builds different solutions to help your business thrive now and in the future. With support ranging from building websites, SEO optimisation for improved visibility to leveraging AI advancements that optimise your workflow and maximise your resources.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-5">
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="px-10 py-5 bg-slate-950 text-white rounded-full flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase transition-all shadow-xl shadow-slate-950/10 hover:shadow-slate-950/20"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03, y: -2, borderColor: '#000' }}
              whileTap={{ scale: 0.98 }}
              href="#work-showcase"
              className="px-10 py-5 bg-white text-slate-950 border border-slate-200 rounded-full flex items-center justify-center font-bold text-sm tracking-widest uppercase transition-all hover:bg-slate-50"
            >
              See Our Work
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
        >
          {/* Abstract Workshop Visual */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full border border-slate-100 rounded-full opacity-50"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[80%] h-[80%] border border-emerald-100 rounded-full opacity-50"
            />
            <div className="w-64 h-64 relative">
              <motion.div
                animate={{ 
                  borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-slate-950 flex items-center justify-center shadow-2xl overflow-hidden"
              >
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#334155_0%,#0f172a_100%)] flex items-center justify-center px-4">
                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 0.85, y: 0 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.25 }}
                      className="text-white text-3xl font-heading italic tracking-tighter"
                    >
                      atelier
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 0.95, y: 0 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: 0.45 }}
                      className="text-emerald-400 text-[9px] font-mono font-semibold uppercase tracking-[0.2em] mt-1"
                    >
                      [ workshop ]
                    </motion.span>
                  </div>
                </div>
              </motion.div>
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-10 px-4 py-2 bg-white rounded-lg shadow-xl border border-slate-50 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 tracking-tighter">OPTIMIZED.TS</span>
              </motion.div>
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-6 px-4 py-2 bg-white rounded-lg shadow-xl border border-slate-50 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-slate-950" />
                <span className="text-[10px] font-bold text-slate-500 tracking-tighter">SCALABLE.V2</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-slate-900" />
      </div>
    </section>
  );
};

export default Hero;
