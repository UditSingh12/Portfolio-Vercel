import MouseTracker from './components/MouseTracker';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Expertise from './components/sections/Expertise';

import ScrollReveal from './components/ScrollReveal';
import Footer from './components/sections/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen text-primary selection:bg-white selection:text-black">
      <MouseTracker />

      {/* Navigation - minimalist sticky top */}
      {isUnlocked && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-border/40"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-sm bg-white text-background flex items-center justify-center font-bold text-sm">UP</div>
            <span className="font-semibold tracking-tight">Udit Pratap Singh</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-sm text-secondary font-medium">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                className="hover:text-primary transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1TYbvznC8gMHQOAscGm0fg9CSRgeD2MX2/view"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              className="px-4 py-2 bg-white text-background rounded-full font-medium hover:scale-105 transition-transform"
            >
              Resume ↗
            </motion.a>
          </div>
        </motion.nav>
      )}

      <main className="max-w-[1440px] mx-auto px-8 md:px-16 pt-32 pb-24 space-y-40">
        <ScrollReveal><Hero isUnlocked={isUnlocked} setUnlocked={setIsUnlocked} /></ScrollReveal>

        {isUnlocked && (
          <>
            <ScrollReveal><About /></ScrollReveal>
            <ScrollReveal><Expertise /></ScrollReveal>
            <ScrollReveal><Skills /></ScrollReveal>
            <ScrollReveal><Experience /></ScrollReveal>
            <ScrollReveal><Projects /></ScrollReveal>
            <ScrollReveal><Certifications /></ScrollReveal>
            <ScrollReveal><Contact /></ScrollReveal>
          </>
        )}
      </main>

      {isUnlocked && <ScrollReveal><Footer /></ScrollReveal>}
    </div>
  );
}

export default App;
