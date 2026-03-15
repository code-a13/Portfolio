import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

// Existing images
import mediflowImg from "../../assets/images/medi.png";
import alumniImg from "../../assets/images/ac.png";
import momentumImg from "../../assets/images/momentum.png";
import multiMartImg from "../../assets/images/multimart.png"; 

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)", scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const ProjectsSection = () => {

  const projects = [
    {
      title: "MediFlow SmartPad",
      description: "An AI-powered clinical assistant utilizing RAG. Features advanced prescription safety analysis.",
      tags: ["React", "FastAPI", "AI"],
      link: "https://github.com/code-a13/MediFlow", 
      github: "https://github.com/code-a13/MediFlow",
      type: "AI Healthcare",
      image: mediflowImg 
    },
    {
      title: "AlumniConnect",
      description: "A full-stack ecosystem bridging students and alumni with real-time socket chat.",
      tags: ["MERN", "Socket.io", "Redux"],
      link: "https://alumniconnect.me",
      github: "https://github.com/code-a13/AlumniConnect.git",
      type: "Full Stack Platform",
      image: alumniImg 
    },
    {
      title: "Momentum",
      description: "A lightweight, dependency-free productivity suite built purely on the DOM.",
      tags: ["Vanilla JS", "HTML5", "CSS3"],
      link: "https://momentum13.vercel.app/",
      github: "https://github.com/code-a13/MOMENTUM-JS_LAB_PROJECT.git",
      type: "Productivity App",
      image: momentumImg 
    },
    {
      title: "MultiMart",
      description: "A comprehensive multi-store e-commerce platform delivering a seamless shopping and vendor management experience.",
      tags: ["React", "Tailwind"],
      link: "https://reactproject201.vercel.app",
      github: "https://github.com/code-a13/MULTI_MART_REACT_PROJECT.git",
      type: "E-Commerce Platform",
      image: multiMartImg
    }
  ];

  // THE FIX: Completely removed the auto-scroll useEffect and the duplicated array.
  // It is now a highly performant, static list of exactly 4 cards.

  return (
    <section className="relative w-full h-full flex flex-col justify-center bg-transparent text-white overflow-hidden py-2 md:py-16">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 mb-4 md:mb-12 mt-2 md:mt-0 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end w-full pt-2 md:pt-12"
        >
           <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium text-white tracking-tighter uppercase text-right leading-none">
             Projects <span className="font-serif italic text-neutral-500">.</span>
           </h2>
           <div className="h-[1px] w-full max-w-[200px] md:max-w-md bg-white/20 mt-3 md:mt-8"></div>
        </motion.div>
      </div>

      {/* Swipeable Container */}
      <div className="relative w-full overflow-hidden flex group">
        
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

        {/* THE FIX: Purely native CSS horizontal scrolling. Clean, fast, no JS overhead. */}
        <div className="flex gap-4 md:gap-8 w-full overflow-x-auto hide-scrollbar px-6 md:px-8 pb-4 md:pb-8">
          {/* Mapping the ORIGINAL array, no duplication! */}
          {projects.map((project, i) => (
            <FlipCard key={`${project.title}-${i}`} project={project} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
};

// 3D Flip Card Component
const FlipCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-[85vw] sm:w-[350px] md:w-[400px] h-[320px] md:h-[450px] cursor-pointer perspective-[1000px] shrink-0 group/card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => window.open(project.link, "_blank")}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] group/inner"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-10 flex flex-col justify-between [backface-visibility:hidden]">
           
           <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent rounded-3xl pointer-events-none" />
           
           <div className="space-y-2 md:space-y-4 relative z-10">
              <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">{project.type}</span>
              <h3 className="text-xl md:text-3xl font-medium text-white tracking-tight leading-tight line-clamp-2">{project.title}</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light line-clamp-3 md:line-clamp-4">
                {project.description}
              </p>
           </div>

           <div className="flex flex-wrap gap-2 mt-3 md:mt-6 relative z-10">
             {project.tags.map((tag, idx) => (
               <span key={idx} className="px-3 py-1.5 text-[8px] md:text-[10px] font-mono tracking-widest text-neutral-300 border border-white/10 rounded-full uppercase bg-white/5">
                 {tag}
               </span>
             ))}
           </div>
           
           <div className="absolute top-5 right-5 md:top-8 md:right-8 text-white/20 group-hover/inner:text-white transition-colors duration-300 flex items-center gap-3 z-10">
              <Github size={18} className="hover:text-[#64ffda] transition-colors md:w-5 md:h-5" />
              <ArrowUpRight size={20} className="md:w-6 md:h-6" />
           </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col group/back">
           <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center p-3 md:p-4">
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full h-full object-contain rounded-xl opacity-80 group-hover/back:opacity-100 group-hover/back:scale-105 transition-all duration-700 pointer-events-none"
               />
           </div>
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
              <div className="px-6 md:px-8 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                Deploy Application <ArrowUpRight size={16} />
              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
};