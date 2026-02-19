import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVar = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project }) => (
  <motion.div variants={itemVar} className="group relative w-full">
    <div className="relative overflow-hidden rounded-[2rem] bg-[#050505] border border-white/10 hover:border-white/40 transition-all duration-700 p-8 md:p-12 flex flex-col md:flex-row gap-8 justify-between">
      
      {/* Subtle background glow on hover */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      <div className="flex-1 space-y-6 relative z-10">
        <div className="flex items-center gap-4">
           <span className="text-[10px] font-mono text-neutral-500 tracking-[0.2em] uppercase">{project.type}</span>
           <div className="h-[1px] w-12 bg-white/20"></div>
        </div>
        <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-base leading-relaxed max-w-2xl font-light">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-4">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-4 py-1.5 text-[10px] font-mono tracking-widest text-neutral-300 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-default uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex md:flex-col gap-4 shrink-0 relative z-10">
        <a href={project.github} target="_blank" rel="noreferrer" className="h-14 w-14 flex items-center justify-center rounded-full border border-white/20 text-neutral-400 hover:bg-white hover:text-black transition-all duration-500">
          <Github size={20} />
        </a>
        <a href={project.link} target="_blank" rel="noreferrer" className="h-14 w-14 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition-transform duration-500">
          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  </motion.div>
);

// --- MAIN SECTION ---
export const ProjectsSection = () => {
  // ALL 3 PROJECTS RESTORED HERE
  const projects = [
    {
      title: "MediFlow SmartPad",
      description: "An AI-powered clinical assistant utilizing RAG. Features advanced prescription safety analysis, drug interaction mapping, and automated charting.",
      tags: ["React", "Python/FastAPI", "ChromaDB", "AI"],
      link: "https://github.com/code-a13/rag_ai", 
      github: "https://github.com/code-a13/rag_ai",
      type: "AI Healthcare Platform"
    },
    {
      title: "AlumniConnect",
      description: "A full-stack ecosystem bridging students and alumni. Features real-time socket chat, job portals, and event orchestration.",
      tags: ["MERN Stack", "Socket.io", "Redux"],
      link: "https://alumniconnect.me",
      github: "https://github.com/code-a13/AlumniConnect.git",
      type: "Full Stack Platform"
    },
    {
      title: "Momentum",
      description: "A lightweight, dependency-free productivity suite built purely on the DOM. Optimized for zero-latency performance and instant load times.",
      tags: ["Vanilla JS", "HTML5", "CSS3"],
      link: "https://momentum13.vercel.app/",
      github: "https://github.com/code-a13/MOMENTUM-JS_LAB_PROJECT.git",
      type: "Productivity App"
    }
  ];

  return (
    <section className="w-full h-full flex flex-col gap-12 pb-16 pt-10">
      <motion.div variants={containerVar} initial="hidden" animate="visible" className="w-full">
        
        {/* Section Header */}
        <motion.div variants={itemVar} className="flex items-center justify-between mb-16">
           <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tighter">
             Selected Works.
           </h2>
           <div className="h-[1px] flex-1 bg-white/10 ml-8"></div>
        </motion.div>
        
        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
             <ProjectCard key={index} project={project} />
          ))}
        </div>
        
      </motion.div>
    </section>
  );
};