import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative bg-surface mt-40 pt-20 pb-8 px-8 md:px-16 border-t border-border overflow-hidden">

      {/* Top Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs font-mono text-secondary mb-32 space-y-4 md:space-y-0">
        <div className="space-y-1">
          <p>Full-Stack & Systems Engineering</p>
          <p>MERN, DevOps, AI Pipelines</p>
        </div>
        <div className="text-center">
          <p>Available for New Opportunities</p>
          <a href="#projects" className="underline hover:text-white transition-colors">View Work</a>
        </div>
        <div className="text-right hidden md:block">
          <p>Based in India</p>
          <p>2026</p>
        </div>
      </div>

      {/* Giant Typography Centerpiece */}
      <div className="flex justify-center items-center w-full mb-32">
        <motion.h2
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -200px 0px" }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[12vw] md:text-[14vw] font-bold tracking-tighter text-white leading-none whitespace-nowrap text-center"
        >
          Udit Singh
        </motion.h2>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row justify-between items-end text-xs font-mono text-secondary space-y-4 md:space-y-0">
        <div>
          <p className="font-bold text-white mb-2">Contact</p>
          <p>© 2026 Udit Pratap Singh | Built with React</p>
        </div>

        <div className="text-center">
          <a href="mailto:uditbhadouriya@gmail.com" className="underline hover:text-white transition-colors text-sm md:text-base">
            uditbhadouriya@gmail.com
          </a>
        </div>

        <div className="text-right hidden md:block">
          <a href="#" className="hover:text-white transition-colors underline">Privacy Policy</a>
        </div>
      </div>

    </footer>
  );
}
