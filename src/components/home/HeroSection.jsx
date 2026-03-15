import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Download, Database } from "lucide-react";

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.25, delayChildren: 0.1 } 
  }
};

const itemVar = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)", scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const TechBadge = ({ icon, text }) => (
  <div className="group flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-2.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-700 cursor-default">
    <span className="text-white/50 group-hover:text-white transition-colors duration-700 scale-75 md:scale-100">{icon}</span>
    <span className="text-[10px] md:text-xs font-mono tracking-[0.1em] md:tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-700 uppercase">{text}</span>
  </div>
);

export const HeroSection = () => (
  // THE FIX: Purely h-full so it strictly obeys the Layout boundaries without forcing an overflow scroll.
  <section className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-0">
    
    {/* THE FIX: Removed mt-[-5vh] because pure flex centering inside h-full handles it perfectly now */}
    <motion.div variants={containerVar} initial="hidden" animate="visible" className="z-10 w-full max-w-4xl relative flex flex-col items-center">
      
      {/* THE FIX: mb-6 changed to mb-4 on mobile */}
      <motion.div variants={itemVar} className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-4 md:mb-8">
        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
        </span>
        <span className="text-[8px] md:text-[10px] font-mono font-medium text-white tracking-[0.15em] md:tracking-[0.2em] uppercase">Architecture • Running</span>
      </motion.div>

      {/* THE FIX: mb-6 changed to mb-4 on mobile */}
      <motion.div variants={itemVar} className="space-y-2 md:space-y-4 mb-4 md:mb-8">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[1] md:leading-[0.9]">
          Software <br />
          <span className="font-serif italic text-neutral-400">Developer</span>
        </h1>
      </motion.div>

      {/* THE FIX: mb-8 changed to mb-6, and max-w increased to 95% to save a line break */}
      <motion.p variants={itemVar} className="text-neutral-400 text-sm md:text-xl leading-relaxed max-w-[95%] md:max-w-2xl font-light tracking-wide mb-6 md:mb-10 mx-auto">
        Engineering high-performance backends and intelligent systems. 
        Focusing on pure, scalable <span className="text-white font-medium">Java infrastructure</span> and modern web interfaces.
      </motion.p>

      {/* THE FIX: mb-10 changed to mb-8 on mobile */}
      <motion.div variants={itemVar} className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
         <TechBadge icon={<Cpu size={14}/>} text="Java Core" />
         <TechBadge icon={<Database size={14}/>} text="System Design" />
         <TechBadge icon={<Terminal size={14}/>} text="Algorithms" />
      </motion.div>

      <motion.div variants={itemVar} className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-[85%] sm:w-auto mx-auto">
        <Link to="/projects" className="group relative w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-white text-black text-xs md:text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden transition-transform duration-700 hover:scale-105">
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            View Work <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 md:w-4 md:h-4"/>
          </span>
        </Link>
        <a href="./ADITYA.pdf" target="_blank" className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 border border-white/20 text-white text-xs md:text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-2 font-semibold">
          Resume <Download size={14} className="md:w-4 md:h-4" />
        </a>
      </motion.div>

    </motion.div>
  </section>
);