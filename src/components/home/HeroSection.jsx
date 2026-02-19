import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Cpu, Download, Database } from "lucide-react";
import { JavaCodeBackground } from "./JavaCodeBackground"; // Make sure to import it!

// --- ADVANCED SLOW SPOTLIGHT GRID ---
const SpotlightGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <motion.div 
      animate={{ 
        x: ["-20%", "120%", "-20%"],
        y: ["-20%", "120%", "-20%"] 
      }}
      // SLOW MOTION TWEAK: 25s to 45s for imperceptible ambient movement
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[150px] rounded-full"
    />
  </div>
);

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    // SLOW MOTION TWEAK: Staggered entrance by 0.25s
    transition: { staggerChildren: 0.25, delayChildren: 0.1 } 
  }
};

const itemVar = {
  // SLOW MOTION TWEAK: Added blur and subtle scale down for starting point
  hidden: { y: 40, opacity: 0, filter: "blur(15px)", scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const TechBadge = ({ icon, text }) => (
  <div className="group flex items-center gap-3 px-5 py-2.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-700 cursor-default">
    <span className="text-white/50 group-hover:text-white transition-colors duration-700">{icon}</span>
    <span className="text-xs font-mono tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-700 uppercase">{text}</span>
  </div>
);

export const HeroSection = () => (
  <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center text-center gap-8 rounded-[2rem] overflow-hidden border border-white/10 bg-black p-8 lg:p-16">
    <JavaCodeBackground />
    <SpotlightGrid />

    <motion.div variants={containerVar} initial="hidden" animate="visible" className="z-10 w-full max-w-4xl relative flex flex-col items-center">
      
      <motion.div variants={itemVar} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
        <span className="relative flex h-2 w-2">
          {/* SLOW MOTION TWEAK: Animation duration inside tailwind needs to be handled via custom class, but ping is fine */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="text-[10px] font-mono font-medium text-white tracking-[0.2em] uppercase">Architecture • Running</span>
      </motion.div>

      <motion.div variants={itemVar} className="space-y-4 mb-8">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[0.9]">
          Software <br />
          <span className="font-serif italic text-neutral-400">Developer</span>
        </h1>
      </motion.div>

      <motion.p variants={itemVar} className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl font-light tracking-wide mb-10">
        Engineering high-performance backends and intelligent systems. 
        Focusing on pure, scalable <span className="text-white font-medium">Java infrastructure</span> and modern web interfaces.
      </motion.p>

      <motion.div variants={itemVar} className="flex flex-wrap justify-center gap-3 mb-12">
         <TechBadge icon={<Cpu size={14}/>} text="Java Core" />
         <TechBadge icon={<Database size={14}/>} text="System Design" />
         <TechBadge icon={<Terminal size={14}/>} text="Algorithms" />
      </motion.div>

      <motion.div variants={itemVar} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link to="/projects" className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black text-sm tracking-[0.15em] uppercase rounded-full overflow-hidden transition-transform duration-700 hover:scale-105">
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">View Work <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"/></span>
        </Link>
        <a href="./ADITYA.pdf" target="_blank" className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-700 flex items-center justify-center gap-2 font-semibold">
          Resume <Download size={16} />
        </a>
      </motion.div>

    </motion.div>
  </section>
);