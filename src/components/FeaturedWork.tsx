
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ArrowRight } from 'lucide-react';

const FeaturedWork: React.FC = () => {
  return (
    <section id="work-showcase" className="py-40 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-[0.4em] text-emerald-500 uppercase mb-6 block">Capabilities</span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-950">Selected Projects</h2>
          </div>
          <motion.a 
            whileHover={{ x: 5 }}
            href="mailto:hello@tech-atelier.co.uk" 
            className="flex items-center gap-3 text-slate-950 font-bold uppercase tracking-[0.1em] text-xs pb-2 border-b-2 border-slate-950 transition-all"
          >
            Discuss a project <ArrowRight size={14} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative"
            >
              <div className="overflow-hidden rounded-3xl mb-8 aspect-[4/5] shadow-sm group-hover:shadow-2xl transition-all duration-700">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                   <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-3">{project.category}</span>
                   <p className="text-slate-200 font-light leading-relaxed mb-6">{project.description}</p>
                   <button className="px-6 py-3 bg-white text-slate-950 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors">
                     Case Study
                   </button>
                </div>
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-500">
                <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-slate-950 tracking-tight">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
