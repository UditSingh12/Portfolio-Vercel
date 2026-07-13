import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

interface TagCardProps {
  number: string;
  title: string;
  text: string;
  className?: string;
  delay: number;
  pathLength: any;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const TagCard = ({ number, title, text, className, delay, pathLength, containerRef }: TagCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, "change", (latest: number) => {
    if (!ref.current || !containerRef.current) return;

    const cardRect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const cardTopRelativeToContainer = cardRect.top - containerRect.top;
    const containerHeight = containerRect.height;

    const triggerY = cardTopRelativeToContainer + 50;
    const lineTipY = latest * containerHeight;

    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: delay * 0.08 }}
      className={`w-72 sm:w-80 rounded-[1.5rem] p-1 relative z-10 transition-all duration-700 cursor-default ${className} ${
        isActive
          ? 'bg-surface shadow-[0_0_50px_rgba(220,38,38,0.15)] scale-[1.03] border border-red-500/50'
          : 'bg-surface border border-border shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)] hover:border-white/15'
      }`}
    >
      {/* Punch hole at top center */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
        <div className={`w-4 h-4 rounded-full transition-all duration-700 ${
          isActive 
            ? 'bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.8)] border border-red-400' 
            : 'bg-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] border border-white/10'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full bg-black/40 mx-auto mt-1" />
        </div>
      </div>

      {/* Inner card */}
      <div className={`rounded-[1.25rem] mt-6 p-7 min-h-[230px] flex flex-col transition-all duration-700 relative overflow-hidden ${
        isActive ? 'bg-[#120a0a]' : 'bg-background'
      }`}>
        {/* Subtle radial glow when active */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-red-500/10 blur-[40px] rounded-full transition-opacity duration-700 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Number */}
        <span className={`text-xl font-black mb-2 font-mono transition-colors duration-700 ${
          isActive ? 'text-red-200' : 'text-white/10'
        }`}>{number}</span>

        <h3 className={`text-xl font-bold mb-3 tracking-tight transition-colors duration-700 ${
          isActive ? 'text-white' : 'text-primary'
        }`}>{title}</h3>

        <p className={`text-sm leading-relaxed font-medium transition-colors duration-700 ${
          isActive ? 'text-red-100/80' : 'text-secondary'
        }`}>
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <section id="expertise" ref={containerRef} className="relative py-24 overflow-visible">

      <div className="relative md:min-h-[1400px]">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:absolute top-0 left-0 md:w-[450px] z-20 mb-16 md:mb-0"
        >
          <span className="text-sm font-mono text-secondary uppercase tracking-widest">// what i do</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] mt-4 mb-6 tracking-tighter">
            Building Modern
            <br />
            <span className="text-secondary">Digital Solutions</span>
          </h2>
          <p className="text-secondary text-base max-w-sm leading-relaxed">
            Combining full-stack development, artificial intelligence, and cloud technologies to create scalable digital experiences.
          </p>
        </motion.div>

        {/* Desktop SVG Animated Path */}
        <svg
          className="hidden md:block absolute top-0 left-0 w-full h-[1400px] pointer-events-none z-0"
          viewBox="0 0 1000 1400"
          preserveAspectRatio="none"
        >
          {/* Faint ghost path */}
          <path
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,1000 C 650,1200 400,1200 300,1250"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="2"
            strokeDasharray="8 10"
          />

          {/* Scroll-reveal mask */}
          <mask id="expertise-path-mask">
            <motion.path
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,1000 C 650,1200 400,1200 300,1250"
              fill="none"
              stroke="white"
              strokeWidth="20"
              style={{ pathLength }}
            />
          </mask>

          {/* Revealed dashed line */}
          <path
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,1000 C 650,1200 400,1200 300,1250"
            fill="none"
            stroke="rgba(220,38,38,0.5)"
            strokeWidth="2"
            strokeDasharray="8 10"
            mask="url(#expertise-path-mask)"
          />

          {/* Soft glow trail */}
          <mask id="expertise-glow-mask">
            <motion.path
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,1000 C 650,1200 400,1200 300,1250"
              fill="none"
              stroke="white"
              strokeWidth="6"
              style={{ pathLength }}
            />
          </mask>
          <path
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,1000 C 650,1200 400,1200 300,1250"
            fill="none"
            stroke="rgba(220,38,38,0.25)"
            strokeWidth="10"
            mask="url(#expertise-glow-mask)"
            filter="blur(5px)"
          />
        </svg>

        {/* Mobile Vertical Line */}
        <svg
          className="md:hidden absolute top-0 left-[50%] -translate-x-1/2 w-4 h-[100%] pointer-events-none z-0"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
        >
          <path d="M 2,0 L 2,100" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
          <mask id="expertise-path-mask-mobile">
            <motion.path d="M 2,0 L 2,100" fill="none" stroke="white" strokeWidth="4" style={{ pathLength }} vectorEffect="non-scaling-stroke" />
          </mask>
          <path d="M 2,0 L 2,100" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="2" strokeDasharray="4 6" mask="url(#expertise-path-mask-mobile)" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Cards */}
        <div className="flex flex-col gap-8 md:gap-12 items-center md:block relative z-10 w-full pt-4 md:pt-0 pb-12 md:pb-0">

          <TagCard
            number="01"
            title="Frontend Development"
            text="Crafting responsive and interactive user interfaces using React, TypeScript, Tailwind CSS, and modern frontend frameworks to deliver seamless experiences."
            className="md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] md:rotate-[4deg]"
            delay={1}
            pathLength={pathLength}
            containerRef={containerRef}
          />
          <TagCard
            number="02"
            title="Backend & APIs"
            text="Building secure REST/GraphQL APIs, authentication systems, and scalable server-side architectures with Node.js, Python, and databases."
            className="md:absolute md:top-[450px] md:left-[5%] lg:left-[10%] md:-rotate-[4deg]"
            delay={2}
            pathLength={pathLength}
            containerRef={containerRef}
          />
          <TagCard
            number="03"
            title="AI & Machine Learning"
            text="Developing intelligent applications using NLP, Generative AI, Computer Vision, LLMs, and data-driven machine learning solutions."
            className="md:absolute md:top-[750px] md:right-[5%] lg:right-[15%] md:rotate-[3deg]"
            delay={3}
            pathLength={pathLength}
            containerRef={containerRef}
          />
          <TagCard
            number="04"
            title="Cloud & DevOps"
            text="Deploying and managing applications using Docker, GitHub Actions, CI/CD pipelines, cloud platforms, and infrastructure automation."
            className="md:absolute md:top-[1100px] md:left-[15%] lg:left-[25%] md:-rotate-[3deg]"
            delay={4}
            pathLength={pathLength}
            containerRef={containerRef}
          />

          {/* End text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block absolute top-[1300px] left-[60%] font-mono text-xs text-secondary/30 tracking-widest uppercase"
          >
            ← system.capabilities.loaded
          </motion.div>

        </div>
      </div>
    </section>
  );
}
