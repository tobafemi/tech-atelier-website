import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { asset } from '../lib/asset';
import { useContact } from '../lib/contact';

const navLinks = [
  { name: 'How it works', href: '#services' },
  { name: 'Agents', href: '#agents' },
  { name: 'Free check', href: '#check' },
  { name: 'Our standard', href: '#standard' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openContact = useContact();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled || mobileMenuOpen ? 'py-4 glass border-b border-slate-200/50' : 'py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#top" className="flex items-center shrink-0" aria-label="Tech Atelier home">
          <img src={asset('tech-atelier-logo.svg')} alt="Tech Atelier" className="h-7 sm:h-9 w-auto" />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-7 px-6 py-2 rounded-full border border-slate-100 bg-white/60">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-semibold text-slate-500 hover:text-slate-950 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openContact('An AI audit')}
            className="px-6 py-3 bg-slate-950 text-white text-[12px] font-bold uppercase tracking-[0.15em] rounded-full hover:bg-emerald-600 transition-colors"
          >
            Book an audit
          </motion.button>
        </div>

        <button
          className="lg:hidden text-slate-900 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="lg:hidden absolute top-full left-0 right-0 glass border-b border-slate-200/60 px-6 py-8 flex flex-col gap-6 shadow-2xl"
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
            <button
              className="w-full py-4 bg-slate-950 text-white text-center rounded-xl font-bold text-lg"
              onClick={() => {
                setMobileMenuOpen(false);
                openContact('An AI audit');
              }}
            >
              Book an audit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
