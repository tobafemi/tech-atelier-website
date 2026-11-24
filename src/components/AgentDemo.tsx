import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useContact } from '../lib/contact';
import { asset } from '../lib/asset';

const POINTS = [
  'Finds new referral partners every week and scores each one for fit',
  'Writes a personal email to each, checked against UK email law first',
  'You approve every email before anything is sent',
  'Reads replies, flags warm leads straight away and handles opt-outs',
  'Sends one polite follow-up, then a summary every Monday',
];

/** Featured demo: the referral outreach agent, shown working for a law firm (example data). */
const AgentDemo: React.FC = () => {
  const openContact = useContact();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only play while the video is on screen, to save data on phones
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
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 bg-slate-950 text-white rounded-3xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-hidden relative"
    >
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="lg:col-span-7 relative">
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl shadow-emerald-500/10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={asset('videos/referral-outreach-agent.mp4')}
            poster={asset('videos/referral-outreach-agent-poster.jpg')}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label="Demo video of the Referral Outreach Agent"
          />
        </div>
        <p className="mt-3 text-xs text-slate-500">Shown working for a private client law firm, with example data.</p>
      </div>

      <div className="lg:col-span-5 relative">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full inline-block mb-6">
          See one at work · Lead generation
        </span>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Referral Outreach Agent</h3>
        <p className="text-slate-400 font-light leading-relaxed mb-7">
          Finds the businesses most likely to send you clients, writes to each one personally, and turns their
          replies into warm leads.
        </p>
        <ul className="space-y-3 mb-8">
          {POINTS.map((point) => (
            <li key={point} className="flex gap-3 text-slate-200 text-[15px]">
              <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-4 pt-6 border-t border-white/10 text-sm mb-8">
          <div>
            <dt className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-1">Good for</dt>
            <dd className="text-slate-300">Law firms, care providers, mortgage brokers, clinics, accountants</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-1">Measured by</dt>
            <dd className="text-slate-300">Warm replies, meetings booked, referrals received</dd>
          </div>
        </dl>
        <button
          onClick={() => openContact('A specific agent')}
          className="inline-flex items-center gap-3 px-7 py-4 bg-emerald-500 text-slate-950 text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-emerald-400 transition-colors"
        >
          Get one built for you <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default AgentDemo;
