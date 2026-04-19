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

// --- THE ROBUST ICON ARRAY ---
const techStackIcons = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg", 
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", 
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", 
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg"
];

export const HeroSection = () => (
  <section className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-0">
    
    <motion.div variants={containerVar} initial="hidden" animate="visible" className="z-10 w-full max-w-4xl relative flex flex-col items-center">
      
      <motion.div variants={itemVar} className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-4 md:mb-8">
        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
        </span>
        <span className="text-[8px] md:text-[10px] font-mono font-medium text-white tracking-[0.15em] md:tracking-[0.2em] uppercase">Architecture • Running</span>
      </motion.div>

      <motion.div variants={itemVar} className="space-y-2 md:space-y-4 mb-4 md:mb-8">
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-white leading-[1] md:leading-[0.9]">
          Software <br />
          <span className="font-serif italic text-neutral-400">Developer</span>
        </h1>
      </motion.div>

      <motion.div variants={itemVar} className="w-full max-w-[90vw] md:max-w-2xl mx-auto mb-6 md:mb-10 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
        <motion.div 
          className="flex items-center w-max gap-4 md:gap-6 pr-4 md:pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {[...techStackIcons, ...techStackIcons].map((icon, index) => {
            const isGitHub = icon.includes("github");

            return (
              <div
                key={index}
                // THE FIX: Added 'aspect-square' and 'flex-none' to make the box indestructible
                className={`relative w-10 h-10 md:w-12 md:h-12 aspect-square flex-none flex items-center justify-center p-2 md:p-2.5 rounded-xl border transition-all duration-500 cursor-pointer hover:-translate-y-1 ${
                  isGitHub 
                    ? "border-white/60 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110 mx-2" 
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"                     
                }`}
              >
                <img 
                  src={icon} 
                  alt="Tech Tool" 
                  // THE FIX: Used max-w-full max-h-full instead of w-full h-full to stop the SVG from warping
                  className={`max-w-full max-h-full object-contain drop-shadow-md ${isGitHub ? "invert" : ""}`} 
                />
              </div>
            );
          })}
        </motion.div>
      </motion.div>

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