import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { AGENTS } from '../constants';

const AgentDemos: React.FC = () => {
  const [active, setActive] = useState(0);
  const agent = AGENTS[active];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play the demo while it's on screen, to save data on mobile
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [active]);

  return (
    <section id="agents" className="py-32 md:py-40 bg-slate-950 text-white text-left relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.4em] text-emerald-400 uppercase mb-6 block">
              Agents in action
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-balance text-white" style={{ color: '#fff' }}>
              See an agent at work
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mt-6">
              Real agents we build, shown with example data. Each one is tailored to the business it works for,
              and nothing important happens without a person saying yes.
            </p>
          </div>

          {AGENTS.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {AGENTS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => setActive(i)}
                  className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all ${
                    i === active
                      ? 'bg-emerald-500 text-slate-950'
                      : 'border border-white/15 text-slate-300 hover:border-emerald-400/60'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-8">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10 bg-black aspect-video">
              <video
                ref={videoRef}
                key={agent.video}
                className="w-full h-full object-cover"
                src={agent.video}
                poster={agent.poster}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label={`Demo video: ${agent.name}`}
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <span className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full mb-6">
              {agent.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 text-white" style={{ color: '#fff' }}>{agent.name}</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-8">{agent.description}</p>

            <ul className="space-y-4 mb-8">
              {agent.points.map((point) => (
                <li key={point} className="flex gap-3 text-slate-200">
                  <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-slate-500 leading-relaxed mb-10">
              <span className="text-slate-300 font-semibold">Works well for: </span>
              {agent.goodFor}
            </p>

            <motion.a
              whileHover={{ x: 5 }}
              href="#contact"
              className="inline-flex items-center gap-3 px-7 py-4 bg-emerald-500 text-slate-950 text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
            >
              Get one built for you <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentDemos;
