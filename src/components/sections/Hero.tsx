import { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Code2, Unlock } from 'lucide-react';

interface HeroProps {
  isUnlocked: boolean;
  setUnlocked: (val: boolean) => void;
}

export default function Hero({ isUnlocked, setUnlocked }: HeroProps) {
  const [systemState, setSystemState] = useState<'INITIALIZED' | 'ACCESS_GRANTED'>(isUnlocked ? 'ACCESS_GRANTED' : 'INITIALIZED');

  const handleSystemClick = () => {
    if (systemState === 'ACCESS_GRANTED') return;
    setSystemState('ACCESS_GRANTED');
    setUnlocked(true);
  };
  return (
    <section id="hero" className="relative min-h-[70vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-primary">
              {"UDIT PRATAP".split('').map((char, i) => (
                <span key={i} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-3 hover:scale-110 hover:shadow-red-500/50 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <br />
              {"SINGH".split('').map((char, i) => (
                <span key={i} className="inline-block transition-all duration-300 hover:text-red-500 hover:-translate-y-3 hover:scale-110 hover:shadow-red-500/50 cursor-default">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
            <p className="text-xl text-secondary">
              B.Tech CSE (Data Science) — Bennett University, '26
            </p>
            <p className="text-lg text-secondary/80 max-w-md">
              Engineering production-grade systems — from multi-tenant SaaS to AI pipelines — that ship, scale, and hold up under real usage.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2500}>
              <a href="https://drive.google.com/file/d/1TYbvznC8gMHQOAscGm0fg9CSRgeD2MX2/view" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full bg-white text-background font-semibold hover:bg-white/90 transition-colors inline-block">
                Download CV
              </a>
            </Tilt>
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2500}>
              <a href="#contact" className="px-8 py-3 rounded-full border border-border text-white font-semibold hover:bg-white hover:text-background transition-all inline-block">
                Say Hello
              </a>
            </Tilt>
          </div>

          {/* Tiny Links */}
          <div className="flex flex-wrap items-center gap-6 pt-12 text-sm text-secondary font-mono">
            <a href="https://github.com/UditSingh12" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/udit-pratap-singh-04737a25a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn ↗
            </a>
            <a href="https://leetcode.com/u/Udit_Singh04/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Code2 className="w-4 h-4" /> LeetCode ↗
            </a>
          </div>
        </div>

        {/* Right Content - Abstract Avatar/Graphic */}
        <div className="relative flex justify-center items-center mt-12 lg:mt-0">
          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1.02} transitionSpeed={2000}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
              {/* Abstract structural graphic to match the dark aesthetic */}
              <div className="absolute inset-0 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0.1)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.1)_360deg)] animate-[spin_8s_linear_infinite]" />
                <div 
                  onClick={handleSystemClick}
                  className={`w-[98%] h-[98%] bg-background rounded-full flex flex-col items-center justify-center p-8 text-center border z-10 group transition-all duration-700 cursor-pointer
                    ${systemState === 'ACCESS_GRANTED' 
                      ? 'border-green-500/50 shadow-[0_0_80px_rgba(34,197,94,0.3)]' 
                      : 'border-white/5 hover:shadow-[0_0_60px_rgba(220,38,38,0.25)] hover:border-red-500/20'
                    }`}
                >
                  {systemState === 'ACCESS_GRANTED' ? (
                    <Unlock className="w-16 h-16 text-green-500 mb-4 animate-pulse" />
                  ) : (
                    <Code2 className="w-16 h-16 text-white/50 mb-4 transition-colors duration-700 group-hover:text-red-500/80" />
                  )}
                  
                  <span className={`font-mono text-xs tracking-widest uppercase transition-colors duration-700
                    ${systemState === 'ACCESS_GRANTED' ? 'text-green-400 font-bold' : 'text-secondary group-hover:text-red-400'}`}
                  >
                    {systemState === 'ACCESS_GRANTED' ? 'Access Granted' : 'System Initialized'}
                  </span>
                </div>
              </div>
            </div>
          </Tilt>

          {/* Unlock Prompt */}
          {!isUnlocked && (
            <div className="absolute -bottom-16 text-center animate-pulse">
              <span className="font-mono text-xs text-green-500 tracking-widest uppercase">
                [ Click Graphic To Unlock System ]
              </span>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}
