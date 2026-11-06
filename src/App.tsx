import React, { useCallback, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectorTicker from './components/SectorTicker';
import Services from './components/Services';
import Agents from './components/Agents';
import AgentCheck from './components/AgentCheck';
import Standard from './components/Standard';
import Security from './components/Security';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import { ContactContext, type Topic } from './lib/contact';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [contactOpen, setContactOpen] = useState(false);
  const [topic, setTopic] = useState<Topic | undefined>();
  const [openCount, setOpenCount] = useState(0);
  const openContact = useCallback((t?: Topic) => {
    setTopic(t);
    setOpenCount((n) => n + 1);
    setContactOpen(true);
  }, []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <ContactContext.Provider value={openContact}>
      <div className="min-h-screen relative selection:bg-emerald-500 selection:text-white">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-[100] origin-left"
          style={{ scaleX }}
        />

        <Navbar />

        <main>
          <Hero />
          <SectorTicker />
          <Services />
          <Agents />
          <AgentCheck />
          <Standard />
          <Security />
          <About />
          <FeaturedWork />
          <CTA />
        </main>

        <Footer />
        <ContactModal key={openCount} isOpen={contactOpen} onClose={closeContact} initialTopic={topic} />
      </div>
    </ContactContext.Provider>
  );
};

export default App;
