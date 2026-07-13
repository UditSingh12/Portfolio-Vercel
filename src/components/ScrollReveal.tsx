import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Check if the section is roughly in the center of the viewport
  const isFocused = useInView(ref, { margin: "-20% 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom Apple-like easing
        delay: delay 
      }}
      className={`relative transition-all duration-1000 group/reveal ${
        isFocused 
          ? 'opacity-100 scale-100' 
          : 'opacity-40 scale-[0.98] hover:opacity-100 hover:scale-100'
      }`}
    >
      {/* Subtle ambient glow behind the active section */}
      <div 
        className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-1000 bg-gradient-to-b from-transparent via-red-900/5 to-transparent blur-3xl ${
          isFocused ? 'opacity-100' : 'opacity-0 group-hover/reveal:opacity-100'
        }`}
      />
      
      {/* Side accent lines that appear when focused */}
      <div className={`absolute left-[-2rem] md:left-[-4rem] top-1/2 -translate-y-1/2 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-red-500/30 to-transparent transition-all duration-1000 ${
        isFocused ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover/reveal:opacity-100 group-hover/reveal:scale-y-100'
      }`} />
      <div className={`absolute right-[-2rem] md:right-[-4rem] top-1/2 -translate-y-1/2 w-[2px] h-1/2 bg-gradient-to-b from-transparent via-red-500/30 to-transparent transition-all duration-1000 ${
        isFocused ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 group-hover/reveal:opacity-100 group-hover/reveal:scale-y-100'
      }`} />

      {children}
    </motion.div>
  );
}
