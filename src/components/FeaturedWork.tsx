import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Code2 } from 'lucide-react';
import { PROJECTS } from '../constants';

const FeaturedWork: React.FC = () => (
  <section id="work" className="py-24 md:py-32 bg-[#fafafa] border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="max-w-2xl mb-12">
        <span className="text-[11px] font-bold tracking-[0.4em] text-emerald-600 uppercase mb-5 block">
          Also from the studio
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-950">Other things we've built</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden"
          >
            {project.videoUrl ? (
              <video
                className="w-full aspect-video object-cover bg-slate-900"
                src={project.videoUrl}
                poster={project.posterUrl}
                controls
                preload="metadata"
                playsInline
              />
            ) : (
              <div className="aspect-video bg-slate-950 flex items-center justify-center text-emerald-400">
                {project.category === 'Brand & web' ? <Palette className="w-8 h-8" /> : <Code2 className="w-8 h-8" />}
              </div>
            )}
            <div className="p-7">
              <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-2 block">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">{project.title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedWork;
