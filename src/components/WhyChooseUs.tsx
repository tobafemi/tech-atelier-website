
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Proven delivery',
      text: 'Experience delivering AI and automation products that energise your business.',
    },
    {
      title: 'Fast and focused',
      text: 'Fast delivery, no bloat, real results.',
    },
    {
      title: 'With you all the way',
      text: 'Professional and collaborative approach supports you every step of the way.',
    },
  ];

  return (
    <section id="about" className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">The Atelier Way</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
                Built for small businesses like yours.
              </h2>
              <p className="text-lg text-gray-500 leading-relaxed font-light mb-12">
                We work especially with care agencies, barbershops, restaurants, law firms, accountants and owner-operated SMEs — bringing web and AI expertise without corporate overhead.
              </p>

              <div className="space-y-8">
                {points.map((point, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{point.title}</h4>
                      <p className="text-gray-500 font-light">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full aspect-square">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-full relative"
             >
                <img 
                  src="https://picsum.photos/seed/workshop/1000/1000" 
                  alt="Tech Atelier Workshop" 
                  className="w-full h-full object-cover rounded-2xl grayscale contrast-125"
                />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white p-8 shadow-xl rounded-xl hidden md:block">
                  <p className="text-3xl font-bold text-gray-900 mb-1">98%</p>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Retention</p>
                  <div className="mt-4 h-1 w-full bg-emerald-500 rounded-full"></div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
