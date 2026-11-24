
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Agents', href: '#agents' },
    { name: 'Philosophy', href: '#about' },
    { name: 'Work', href: '#work-showcase' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'py-4 glass border-b border-gray-200/40' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center shrink-0 group"
        >
          <img
            src="/tech-atelier-logo.svg"
            alt="Tech Atelier"
            className="h-7 w-auto sm:h-9 max-w-[min(100%,240px)] object-left object-contain group-hover:opacity-90 transition-opacity"
          />
        </motion.a>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 px-6 py-2 rounded-full border border-gray-100 bg-white/50">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-[13px] font-semibold text-slate-500 hover:text-slate-950 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact" 
            className="px-6 py-3 bg-slate-950 text-white text-[13px] font-bold uppercase tracking-[0.15em] rounded-full hover:shadow-xl hover:shadow-emerald-500/10 transition-all"
          >
            Book a Call
          </motion.a>
        </div>

        <button className="md:hidden text-slate-900 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 glass border-b border-gray-200/50 p-8 flex flex-col gap-8 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-xl font-bold text-slate-900" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="w-full py-5 bg-slate-950 text-white text-center rounded-xl font-bold text-lg" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
