import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { SERVICES } from '../constants';
import type { Service } from '../types';

// Define props interface for TiltCard to resolve 'key' property errors in JSX
interface TiltCardProps {
  service: Service;
  index: number;
}

// Use React.FC with TiltCardProps for proper type checking of React component props
const TiltCard: React.FC<TiltCardProps> = ({ service, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative bg-white border border-slate-100 p-10 md:p-14 hover:border-emerald-500/20 transition-colors duration-500 cursor-default shadow-sm hover:shadow-2xl hover:shadow-slate-200/50"
    >
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-950 mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-sm">
          {service.icon}
        </div>
        <h3
          className={`text-2xl font-bold tracking-tight leading-tight text-slate-950 ${service.price ? 'mb-2' : 'mb-5'}`}
        >
          {service.title}
        </h3>
        {service.price && (
          <p className="text-sm font-bold tracking-wide text-emerald-600 mb-5">{service.price}</p>
        )}
        <p className="text-slate-500 leading-relaxed font-light text-base">
          {service.description}
        </p>
        {service.guarantee && (
          <p className="mt-4 text-sm font-medium leading-relaxed text-emerald-600">
            {service.guarantee}
          </p>
        )}
        <div className="mt-8 pt-8 border-t border-slate-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
          <a
            href="#contact"
            className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase cursor-pointer inline-flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 rounded-sm"
          >
            Book a call →
          </a>
        </div>
      </div>
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-gradient-to-br from-emerald-500 to-slate-900 transition-opacity duration-500" />
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold tracking-[0.4em] text-emerald-500 uppercase mb-6 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-950 mb-8"
          >
            Tech solutions that drive business growth
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 leading-relaxed font-light"
          >
            Technology solutions built to solve your business problems — from fast website delivery to looking at how AI agents can energise your business. We provide full technology audits for SMEs and let you know exactly what levers are available to your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {SERVICES.map((service, index) => (
            <TiltCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
