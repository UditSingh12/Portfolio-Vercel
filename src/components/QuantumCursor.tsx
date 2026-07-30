import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, useTime, useTransform, AnimatePresence } from 'framer-motion';

// --- Default 3x3 Grid Dots ---
const SPACING = 24;
const gridConfig = [
  { id: 'tl', dx: -1, dy: -1, stiff: 100, damp: 15, mass: 1, size: 2, op: 0.3 },
  { id: 'tc', dx:  0, dy: -1, stiff: 200, damp: 20, mass: 0.8, size: 3, op: 0.5 },
  { id: 'tr', dx:  1, dy: -1, stiff: 100, damp: 15, mass: 1, size: 2, op: 0.3 },
  { id: 'ml', dx: -1, dy:  0, stiff: 200, damp: 20, mass: 0.8, size: 3, op: 0.5 },
  { id: 'mc', dx:  0, dy:  0, stiff: 600, damp: 30, mass: 0.2, size: 12, op: 0.1 },
  { id: 'mr', dx:  1, dy:  0, stiff: 200, damp: 20, mass: 0.8, size: 3, op: 0.5 },
  { id: 'bl', dx: -1, dy:  1, stiff: 100, damp: 15, mass: 1, size: 2, op: 0.3 },
  { id: 'bc', dx:  0, dy:  1, stiff: 200, damp: 20, mass: 0.8, size: 3, op: 0.5 },
  { id: 'br', dx:  1, dy:  1, stiff: 100, damp: 15, mass: 1, size: 2, op: 0.3 },
];

const DefaultGridDot = ({ targetX, targetY, config, shouldReduceMotion }: any) => {
  const springX = useSpring(targetX, { stiffness: config.stiff, damping: config.damp, mass: config.mass });
  const springY = useSpring(targetY, { stiffness: config.stiff, damping: config.damp, mass: config.mass });
  
  const time = useTime();
  const orbitX = useTransform(time, t => {
    const r = (t / 8000) * Math.PI * 2;
    return config.dx * SPACING * Math.cos(r) - config.dy * SPACING * Math.sin(r);
  });
  const orbitY = useTransform(time, t => {
    const r = (t / 8000) * Math.PI * 2;
    return config.dx * SPACING * Math.sin(r) + config.dy * SPACING * Math.cos(r);
  });

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        x: shouldReduceMotion ? targetX : springX,
        y: shouldReduceMotion ? targetY : springY,
        width: config.size,
        height: config.size,
        opacity: config.op,
        marginLeft: shouldReduceMotion ? config.dx * SPACING : orbitX,
        marginTop: shouldReduceMotion ? config.dy * SPACING : orbitY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

// --- Shape Shifting Payloads ---

const RadarLockHUD = () => (
  <motion.div 
    className="absolute w-64 h-64 flex items-center justify-center"
    style={{ translateX: '-50%', translateY: '-50%' }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 2 }}
    transition={{ duration: 0.4, type: 'spring' }}
  >
    {/* Inner Ring */}
    <motion.div className="absolute w-32 h-32 rounded-full border-2 border-green-500/50 border-dashed" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} />
    {/* Middle Ring */}
    <motion.div className="absolute w-48 h-48 rounded-full border border-green-400/30" animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
    {/* Outer Tech Ring */}
    <motion.div className="absolute w-56 h-56 rounded-full border-[1px] border-green-500/10" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
        <div className="absolute top-0 left-1/2 w-2 h-4 bg-green-500/50 -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-2 h-4 bg-green-500/50 -translate-x-1/2" />
        <div className="absolute left-0 top-1/2 h-2 w-4 bg-green-500/50 -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 h-2 w-4 bg-green-500/50 -translate-y-1/2" />
    </motion.div>
    {/* Center Dot */}
    <motion.div className="w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
  </motion.div>
);

const HighlighterPill = ({ width, height }: { width: any, height: any }) => (
  <motion.div 
    className="absolute"
    style={{ translateX: '-50%', translateY: '-50%', width, height }}
  >
    <motion.div
      className="absolute -inset-x-4 -inset-y-2 border-2 border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
      style={{ borderRadius: 9999 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  </motion.div>
);

const AtomCore = () => (
  <motion.div 
    className="absolute w-16 h-16 flex items-center justify-center"
    style={{ translateX: '-50%', translateY: '-50%', perspective: '400px' }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
  >
    <div className="absolute w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]" />
    <motion.div className="absolute w-full h-full border border-purple-500/60 rounded-full" animate={{ rotateX: 360, rotateZ: 180 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} />
    <motion.div className="absolute w-full h-full border border-purple-400/40 rounded-full" animate={{ rotateY: 360, rotateX: 180 }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} />
    <motion.div className="absolute w-full h-full border border-purple-300/30 rounded-full" animate={{ rotateZ: 360, rotateY: 180 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} />
  </motion.div>
);

const CyberBrackets = ({ width, height }: { width: any, height: any }) => (
  <motion.div 
    className="absolute"
    style={{ translateX: '-50%', translateY: '-50%', width, height }}
    initial={{ opacity: 0, padding: 30 }}
    animate={{ opacity: 1, padding: 12 }}
    exit={{ opacity: 0, padding: 30 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {/* TL */}
    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
    {/* TR */}
    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
    {/* BL */}
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
    {/* BR */}
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
  </motion.div>
);



const WarpArrow = () => (
  <motion.div 
    className="absolute w-12 h-12 flex items-center justify-center"
    style={{ translateX: '-50%', translateY: '-50%' }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
  >
    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-white border-b-[6px] border-b-transparent z-10" />
    {/* Particle Trails */}
    <motion.div className="absolute top-4 right-6 w-8 h-[1px] bg-white/40" animate={{ x: [-10, 10, -10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} />
    <motion.div className="absolute bottom-4 right-4 w-12 h-[1px] bg-white/30" animate={{ x: [-5, 15, -5], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} />
    <motion.div className="absolute top-1/2 right-5 w-6 h-[2px] bg-white/50 -translate-y-1/2" animate={{ x: [-15, 5, -15], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.4 }} />
  </motion.div>
);

export default function QuantumCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string>('SEEN');
  
  const [shockwaves, setShockwaves] = useState<{id: number, x: number, y: number}[]>([]);
  const shockwaveId = useRef(0);

  // Raw pointer coordinates
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  // Magnetic lock-on coordinates and dimensions
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetW = useMotionValue(0);
  const targetH = useMotionValue(0);

  // Physics springs for ultra-smooth movement between elements
  const centerX = useSpring(targetX, { stiffness: 800, damping: 35, mass: 0.1 });
  const centerY = useSpring(targetY, { stiffness: 800, damping: 35, mass: 0.1 });
  const centerW = useSpring(targetW, { stiffness: 400, damping: 30 });
  const centerH = useSpring(targetH, { stiffness: 400, damping: 30 });

  const currentHoverTarget = useRef<HTMLElement | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isVisible) setIsVisible(true);
    pointerX.set(e.clientX);
    pointerY.set(e.clientY);
    
    // If not hovering, update target coordinates instantly to mouse
    if (!currentHoverTarget.current || shouldReduceMotion) {
      targetX.set(e.clientX);
      targetY.set(e.clientY);
      targetW.set(0);
      targetH.set(0);
    }
  }, [isVisible, pointerX, pointerY, targetX, targetY, targetW, targetH, shouldReduceMotion]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest('[data-stamp]');
    
    if (interactive) {
      setIsHovered(true);
      const stampValue = interactive.getAttribute('data-stamp') || 'SEEN';
      setHoverType(stampValue);
      currentHoverTarget.current = interactive as HTMLElement;
      // Initial lock-on is handled by RAF loop
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactive = target.closest('[data-stamp]');
    if (interactive) {
      setIsHovered(false);
      currentHoverTarget.current = null;
      targetX.set(pointerX.get());
      targetY.set(pointerY.get());
      targetW.set(0);
      targetH.set(0);
    }
  }, [pointerX, pointerY, targetX, targetY, targetW, targetH]);

  const handleClick = useCallback(() => {
    if (shouldReduceMotion) return;
    const newId = shockwaveId.current++;
    const x = targetX.get();
    const y = targetY.get();
    setShockwaves(prev => [...prev, { id: newId, x, y }]);
    setTimeout(() => {
      setShockwaves(prev => prev.filter(sw => sw.id !== newId));
    }, 600);
  }, [targetX, targetY, shouldReduceMotion]);

  // Continuous tracking loop for moving/animating targets
  useEffect(() => {
    let rafId: number;
    const trackTarget = () => {
      if (currentHoverTarget.current && !shouldReduceMotion) {
        const rect = currentHoverTarget.current.getBoundingClientRect();
        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
        targetW.set(rect.width);
        targetH.set(rect.height);
      }
      rafId = requestAnimationFrame(trackTarget);
    };
    rafId = requestAnimationFrame(trackTarget);
    return () => cancelAnimationFrame(rafId);
  }, [targetX, targetY, targetW, targetH, shouldReduceMotion]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut, handleClick]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] hidden sm:block mix-blend-screen">
      
      {/* Shockwaves */}
      {shockwaves.map(sw => (
        <motion.div
          key={sw.id}
          className="absolute w-4 h-4 rounded-full border border-red-500/50"
          style={{ left: sw.x, top: sw.y, x: '-50%', y: '-50%' }}
          initial={{ scale: 1, opacity: 1, borderWidth: '2px' }}
          animate={{ scale: 6, opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!isHovered && !shouldReduceMotion && (
          <motion.div key="grid-cluster" className="absolute top-0 left-0 w-0 h-0" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }}>
            {gridConfig.map(config => (
              <DefaultGridDot key={config.id} targetX={targetX} targetY={targetY} config={config} shouldReduceMotion={false} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container for Shape Shifters that follows the Target (Mouse or Element) */}
      <motion.div 
        className="absolute top-0 left-0 w-0 h-0"
        style={{
          x: shouldReduceMotion ? pointerX : centerX,
          y: shouldReduceMotion ? pointerY : centerY,
        }}
      >
        <AnimatePresence mode="wait">
          {isHovered && hoverType === 'INITIALIZED' && <RadarLockHUD key="initialized" />}
          {isHovered && hoverType === 'SEEN' && <HighlighterPill key="seen" width={centerW} height={centerH} />}
          {isHovered && hoverType === 'CONNECTED' && <AtomCore key="connected" />}
          {isHovered && hoverType === 'REVIEWED' && <CyberBrackets key="reviewed" width={centerW} height={centerH} />}
          {isHovered && hoverType === 'SENT' && <WarpArrow key="sent" />}
        </AnimatePresence>

        {/* Fallback/Base Dot when not hovered, or if reduced motion is on */}
        <AnimatePresence>
          {(!isHovered || shouldReduceMotion) && (
            <motion.div
              key="base-dot"
              className="absolute w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8)]"
              style={{ translateX: '-50%', translateY: '-50%' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            />
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
