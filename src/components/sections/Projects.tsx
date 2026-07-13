import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';

const projects = [
  {
    title: "Workgrid",
    description: "A multi-tenant B2B SaaS operations platform built around strict role-based access control — isolating tenant data while giving teams granular permission boundaries. Shipped with a full CI/CD pipeline for zero-friction deploys.",
    tags: ["React.js", "TypeScript", "Node.js", "MongoDB", "Docker"],
    githubUrl: "https://github.com/UditSingh12/Workgrid",
    liveUrl: "https://workgrid-82sw.onrender.com/"
  },
  {
    title: "IntelliChat",
    description: "A live AI-powered chatbot integrating the OpenAI API into a real-time conversational interface, built for responsive, low-latency exchanges rather than a static Q&A demo.",
    tags: ["Python", "Streamlit", "OpenAI API"],
    githubUrl: "https://github.com/UditSingh12/ChatBot-Using-python-streamlit-and-OpenAI",
    liveUrl: "https://intellichat-chat.streamlit.app/"
  },
  {
    title: "WEB-RTC Video Chat",
    description: "A peer-to-peer real-time video calling application powered by WebRTC for direct browser-to-browser communication with minimal latency. Features room-based connections and live media stream handling.",
    tags: ["WebRTC", "JavaScript", "Socket.io", "Node.js"],
    githubUrl: "https://github.com/UditSingh12/WEB-RTC-Video-Chat",
  },
  {
    title: "Banking Ledger",
    description: "A robust banking backend system handling core ledger operations — account management, transaction processing, and balance tracking with ACID-compliant data integrity and secure API endpoints.",
    tags: ["Node.js", "Express.js", "PostgreSQL", "REST API"],
    githubUrl: "https://github.com/UditSingh12/Banking-Ledger-Backend"
  },
  {
    title: "Anomaly Detection",
    description: "A machine learning pipeline for detecting anomalies in large-scale datasets, leveraging statistical modeling and predictive algorithms to identify outliers and irregular patterns.",
    tags: ["Python", "Machine Learning", "Pandas", "Scikit-Learn"],
    githubUrl: "https://github.com/UditSingh12/Anomaly-Detection-"
  },
  {
    title: "SaralSiksha",
    description: "An ERP system handling attendance, meal tracking, and scholarship administration for an educational institution — consolidating three previously manual workflows into one platform.",
    tags: ["Node.js", "Express.js", "MongoDB", "JavaScript"],
    githubUrl: "#"
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-full"
    >
      {/* Animated spinning border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden z-0">
        <div className={`absolute inset-0 transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(220,38,38,0.5)_60deg,transparent_120deg)] animate-[spin_3s_linear_infinite]" />
        </div>
      </div>

      {/* Card body */}
      <div
        className={`relative z-10 h-full rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden transition-all duration-700 ${
          isHovered 
            ? 'bg-[#0f0f15]' 
            : 'bg-surface border border-border'
        }`}
      >
        {/* Background index watermark */}
        <span className={`absolute -right-2 -top-4 text-[8rem] font-black leading-none select-none transition-all duration-700 ${
          isHovered ? 'text-red-500/5 scale-110' : 'text-white/[0.02] scale-100'
        }`}>{String(index + 1).padStart(2, '0')}</span>

        {/* Top */}
        <div className="relative z-10 flex-1">
          <div className="flex justify-between items-start mb-6">
            <motion.div 
              animate={isHovered ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all duration-500 ${
                isHovered 
                  ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                  : 'bg-white/5 text-secondary border border-white/10'
              }`}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            
            {/* Removed top right links to move them below */}
          </div>

          <h3 className={`text-2xl font-bold mb-3 tracking-tight transition-all duration-500 ${
            isHovered ? 'text-white' : 'text-primary'
          }`}>{project.title}</h3>

          <p className={`text-sm leading-relaxed mb-8 transition-colors duration-500 ${
            isHovered ? 'text-white/70' : 'text-secondary'
          }`}>
            {project.description}
          </p>
          
          {/* Action Links */}
          <div className="flex flex-wrap gap-4 relative z-20">
            {project.liveUrl && (
              <a 
                href={project.liveUrl !== '#' ? project.liveUrl : undefined} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all duration-500 border ${
                  isHovered 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-500 hover:border-red-400 hover:-translate-y-1 hover:shadow-[0_5px_25px_rgba(220,38,38,0.7)]' 
                    : 'bg-transparent border-white/10 text-secondary hover:border-white/30 hover:text-white'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl !== '#' ? project.githubUrl : undefined} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[11px] tracking-widest uppercase transition-all duration-500 border ${
                  isHovered 
                    ? 'bg-white/5 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(255,255,255,0.15)]' 
                    : 'bg-transparent border-transparent text-secondary hover:border-white/10 hover:bg-white/5 hover:text-white'
                }`}
              >
                <GitBranch className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom tech tags */}
        <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2"
              >
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="px-3 py-1.5 text-[10px] font-mono tracking-wider uppercase rounded-full border border-red-500/20 text-red-300/80 bg-red-500/5"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-secondary/50">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-0 right-0 w-16 h-16 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-gradient-to-b from-red-500/60 to-transparent" />
          <div className="absolute top-0 right-0 h-[1px] w-8 bg-gradient-to-l from-red-500/60 to-transparent" />
        </div>
        <div className={`absolute bottom-0 left-0 w-16 h-16 pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-gradient-to-t from-red-500/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[1px] w-8 bg-gradient-to-r from-red-500/60 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={sectionRef} className="relative z-10 scroll-mt-32">
      {/* Header */}
      <SectionHeader title="Projects" subtitle="featured work" />
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center justify-center gap-3 mt-14 text-secondary/30"
      >
        <div className="h-[1px] w-12 bg-white/5" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">{projects.length} projects deployed</span>
        <div className="h-[1px] w-12 bg-white/5" />
      </motion.div>
    </section>
  );
}
