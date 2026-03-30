
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedWork from './components/FeaturedWork';
import AdvisoryTool from './components/AdvisoryTool';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative selection:bg-emerald-500 selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Industry ticker */}
        <div className="bg-white border-y border-slate-100 py-16 overflow-hidden">
           <div className="flex whitespace-nowrap animate-[marquee_15s_linear_infinite] hover:[animation-play-state:paused] gap-20 items-center px-10">
              {['CARE AGENCIES', 'BARBERSHOPS', 'RESTAURANTS', 'STARTUPS', 'CHURCHES', 'ESTATE AGENTS', 'TRADES', 'RETAIL'].map((tag) => (
                <React.Fragment key={tag}>
                  <span className="text-slate-200 text-xl font-bold tracking-[0.4em] select-none">{tag}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-20" />
                </React.Fragment>
              ))}
              {/* Duplicate for seamless marquee */}
              {['CARE AGENCIES', 'BARBERSHOPS', 'RESTAURANTS', 'STARTUPS', 'CHURCHES', 'ESTATE AGENTS', 'TRADES', 'RETAIL'].map((tag) => (
                <React.Fragment key={tag + '-2'}>
                  <span className="text-slate-200 text-xl font-bold tracking-[0.4em] select-none">{tag}</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 opacity-20" />
                </React.Fragment>
              ))}
           </div>
        </div>

        <Services />
        <WhyChooseUs />
        <FeaturedWork />
        <AdvisoryTool />
        <CTA />
      </main>
      
      <Footer />
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default App;
