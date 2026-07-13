import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

type SubCategory = {
  name: string;
  items: string[];
};

type SkillCategory = {
  category: string;
  items?: string[];
  subcategories?: SubCategory[];
};

const skillData: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Vite", "React Router", "Redux", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST API", "GraphQL", "JWT", "OAuth", "RBAC", "Zod", "Django", "Python"]
  },
  {
    category: "Databases",
    subcategories: [
      {
        name: "SQL",
        items: ["MySQL", "PostgreSQL"]
      },
      {
        name: "NoSQL",
        items: ["MongoDB", "Atlas"]
      }
    ],
    items: ["Schema Design", "Optimization"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Docker", "Docker Compose", "GitHub Actions", "AWS", "Render", "Cloud Deploy", "Linux", "Git", "GitHub", "Postman"]
  },
  {
    category: "AI/ML",
    items: ["Python", "Machine Learning", "Deep Learning", "Scikit-learn", "TensorFlow", "NLP", "Computer Vision", "OpenCV", "OpenAI API", "LLMs"]
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++", "Java", "SQL"]
  }
];

function SkillLeaf({ item, index, delayOffset = 0 }: { item: string, index: number, delayOffset?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: delayOffset + index * 0.05, duration: 0.4, type: "spring", stiffness: 100 }}
      className="relative flex flex-col items-center group shrink-0"
    >
      {/* Vertical line dropping into the node */}
      <div className="absolute top-[-2rem] w-[2px] h-8 bg-red-500/40 group-hover:bg-red-400 group-hover:shadow-[0_0_15px_rgba(220,38,38,1)] transition-all duration-300 z-0 origin-top" />
      
      {/* Interactive Node */}
      <div className="relative min-w-[120px] px-6 py-4 bg-surface border border-border rounded-xl flex flex-col items-center justify-center text-center cursor-default transition-all duration-500 group-hover:border-red-500 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.25)] group-hover:-translate-y-2 group-hover:bg-[#1a1515] z-10">
        <span className="relative z-10 font-bold text-sm tracking-wide text-white group-hover:text-red-400 transition-colors duration-300 whitespace-nowrap">
          {item}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-transparent transition-colors duration-500 rounded-xl" />
      </div>
    </motion.div>
  );
}

function SubCategoryBranch({ sub, index }: { sub: SubCategory, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
      className="relative flex flex-col items-center shrink-0 mx-4"
    >
      {/* Vertical line dropping into the subcategory node */}
      <div className="absolute top-[-2rem] w-[2px] h-8 bg-red-500/40 z-0" />
      
      {/* Subcategory Label Node */}
      <div className="relative px-6 py-2 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center z-10 mb-8 shadow-[0_0_20px_rgba(220,38,38,0.1)]">
        <span className="font-mono text-xs text-red-400 uppercase tracking-widest whitespace-nowrap">{sub.name}</span>
      </div>

      {/* Subcategory Tree Logic */}
      <div className="relative flex justify-center w-full">
        {/* Subcategory vertical trunk */}
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="absolute left-1/2 top-[-2rem] w-[2px] h-[2rem] bg-red-500/40 -translate-x-1/2 origin-top z-0" 
        />
        {/* Subcategory horizontal branch */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-10 right-10 h-[2px] bg-red-500/40 origin-center z-0" 
        />

        {/* Leaves for this subcategory */}
        <div className="flex flex-nowrap justify-center gap-6 pt-8 relative z-10">
          {sub.items.map((item, leafIndex) => (
            <SkillLeaf key={item} item={item} index={leafIndex} delayOffset={1.0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>(skillData[0].category);

  return (
    <section id="skills" className="relative z-10 scroll-mt-32 min-h-[900px] flex flex-col">
      <SectionHeader title="Skills" subtitle="technical arsenal" />
      
      <div className="flex flex-col items-center mt-4 w-full flex-1">
        {/* Top Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 relative z-20 max-w-5xl">
          {skillData.map((data) => {
            const isActive = activeCategory === data.category;
            return (
              <button
                key={data.category}
                onClick={() => setActiveCategory(data.category)}
                className={`relative px-5 py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest rounded-full transition-all duration-300 border ${
                  isActive 
                    ? 'text-white border-red-500/50 bg-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]' 
                    : 'text-secondary border-white/5 hover:border-white/20 hover:text-white bg-surface/50'
                }`}
              >
                {data.category}
              </button>
            )
          })}
        </div>

        {/* Tree Area */}
        <div className="relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="w-full max-w-[100vw] overflow-x-auto pb-12 pt-4 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent text-center"
              >
                <div className="inline-flex flex-col items-center min-w-full px-4 md:px-12 mx-auto">
                  {/* 1. The Root Node that drops down */}
                  <motion.div 
                    initial={{ y: -40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative px-10 py-4 bg-surface border border-red-500 shadow-[0_0_40px_rgba(220,38,38,0.2)] rounded-2xl z-20 mb-8 flex items-center justify-center min-w-[200px]"
                  >
                    <span className="font-bold text-white text-lg tracking-widest uppercase">{activeCategory}</span>
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl pointer-events-none" />
                  </motion.div>

                {/* Container for the branching lines and leaves */}
                <div className="relative flex justify-center min-w-max">
                  {/* 2. Main vertical trunk dropping from Root Node */}
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute top-[-2rem] w-[2px] h-[2rem] bg-gradient-to-b from-red-500 to-red-500/40 origin-top z-0" 
                  />
                  
                  {/* 3. Horizontal branch line */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                    // Line stretches between the centers of the first and last items roughly
                    className="absolute top-0 left-12 right-12 h-[2px] bg-red-500/40 origin-center z-0 shadow-[0_0_10px_rgba(220,38,38,0.5)]" 
                  />

                  {/* 4. Leaves and Subcategories Row */}
                  <div className="flex flex-nowrap justify-center gap-6 pt-8 relative z-10">
                    
                    {/* Render standard items if any */}
                    {skillData.find(d => d.category === activeCategory)?.items?.map((item, index) => (
                      <SkillLeaf key={item} item={item} index={index} delayOffset={0.7} />
                    ))}

                    {/* Render subcategories if any */}
                    {skillData.find(d => d.category === activeCategory)?.subcategories?.map((sub, index) => (
                      <SubCategoryBranch key={sub.name} sub={sub} index={index} />
                    ))}

                  </div>
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
