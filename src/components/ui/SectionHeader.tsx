import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-16 md:mb-24 relative group cursor-default z-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="h-[2px] w-12 bg-red-500 origin-left"
          />
          <span className="text-sm font-mono text-red-500 uppercase tracking-[0.2em]">
            {subtitle || title}
          </span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white relative inline-block transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-red-400 group-hover:to-red-600">
          {title}
          <div className="absolute -inset-x-8 -inset-y-4 bg-red-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full pointer-events-none" />
        </h2>
      </motion.div>
    </div>
  );
}
