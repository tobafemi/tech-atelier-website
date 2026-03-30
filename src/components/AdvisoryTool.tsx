
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const AdvisoryTool: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setIsLoading(true);
    setResponse('');
    const result = await geminiService.getAdvisoryAdvice(problem);
    setResponse(result || '');
    setIsLoading(false);
  };

  return (
    <section className="py-40 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-bold tracking-[0.4em] text-emerald-500 uppercase mb-6 block"
          >
            Try it
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-950 mb-6"
          >
            Ask the Atelier
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto font-light text-lg"
          >
            Describe your biggest business challenge. Get an instant perspective on how technology could help.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-16 shadow-inner"
        >
          <form onSubmit={handleSubmit} className="relative mb-12">
            <input 
              type="text" 
              placeholder="e.g. We lose an hour a day scheduling staff across WhatsApp..." 
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full py-6 px-8 pr-20 bg-white border border-slate-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm text-lg font-light text-slate-900"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-4 top-4 bottom-4 w-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:bg-slate-300"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Analyzing Infrastructure...</span>
              </motion.div>
            )}

            {response && !isLoading && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-10 bg-white border border-emerald-100 rounded-3xl shadow-xl shadow-emerald-500/5 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-6 text-emerald-600">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Atelier Insight Engine</span>
                </div>
                <p className="text-slate-800 leading-relaxed text-xl font-light italic">"{response}"</p>
                {/* Decorative glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              </motion.div>
            )}
          </AnimatePresence>

          {!response && !isLoading && (
            <div className="text-center text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-4">
              Enter a real business challenge to begin
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Background shape */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default AdvisoryTool;
