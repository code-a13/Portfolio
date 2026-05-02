import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Terminal } from "lucide-react";

export const HeroSection = () => (
  // THE FIX: "pointer-events-none" lets the mouse pass through the empty space to the circle behind!
  <section className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-0 z-20 pointer-events-none">
    
    {/* Soft center glow so text is readable, but it doesn't block the circle */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] md:w-[800px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_70%)] -z-10"></div>

    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} 
      className="z-10 w-full max-w-5xl relative flex flex-col items-center"
    >
      
      {/* 1. Techy Tag */}
      <div className="flex items-center gap-2 mb-6 text-green-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <Terminal size={14} />
        <span>Tech Enthusiast_</span>
      </div>

      {/* 2. Massive Minimalist Headline */}
      <h1 className="text-6xl sm:text-7xl md:text-[8rem] font-black tracking-tighter text-white leading-[0.9] uppercase mb-12 drop-shadow-xl">
        Software <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600">Developer</span>
      </h1>

      {/* 3. The Action Buttons */}
      {/* THE FIX: "pointer-events-auto" brings the mouse clicks back JUST for the buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mx-auto pointer-events-auto">
        <Link to="/projects" className="group relative w-full sm:w-auto px-8 md:px-12 py-4 bg-white text-black text-xs md:text-sm font-bold tracking-[0.15em] uppercase rounded-full overflow-hidden transition-transform duration-500 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Work <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"/>
          </span>
        </Link>
        <a href="./ADITYA.pdf" target="_blank" className="group w-full sm:w-auto px-8 md:px-12 py-4 border border-white/30 text-white text-xs md:text-sm font-bold tracking-[0.15em] uppercase rounded-full hover:bg-white hover:text-black transition-colors duration-500 flex items-center justify-center gap-2 bg-black/40 backdrop-blur-md">
          Resume <Download size={16} className="group-hover:translate-y-1 transition-transform duration-500" />
        </a>
      </div>

    </motion.div>
  </section>
);