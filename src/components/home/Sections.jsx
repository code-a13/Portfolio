import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, Terminal, Cpu, Globe, Download, Sparkles, Code2
} from "lucide-react";

// [CRITICAL] Ensure 'hero.png' is in src/assets/
import heroImage from "../../assets/images/hero.png"; 

// --- ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

// --- HERO SECTION ---
export const HeroSection = () => (
  <section className="w-full min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
    
    {/* LEFT SIDE: TEXT CONTENT */}
    <motion.div 
      variants={containerVar}
      initial="hidden"
      animate="visible"
      className="flex-1 flex flex-col items-start gap-8 z-10 w-full lg:pr-10"
    >
      
      {/* 1. Status Pill */}
      <motion.div variants={itemVar} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-lg shadow-purple-500/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-mono font-medium text-gray-300 tracking-wider">OPEN TO WORK</span>
      </motion.div>

      {/* 2. Headline */}
      <motion.div variants={itemVar} className="space-y-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          JAVA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-brand animate-pulse">
            DEVELOPER.
          </span>
        </h1>
      </motion.div>

      {/* 3. Bio Card */}
      <motion.p variants={itemVar} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
        Crafting <span className="text-white font-semibold">scalable backends</span> & <span className="text-white font-semibold">immersive UIs</span>. 
        I bridge the gap between heavy Java architecture and modern React interactivity.
      </motion.p>

      {/* 4. Glass Tech Stack */}
      <motion.div variants={itemVar} className="flex flex-wrap gap-3">
         <TechBadge icon={<Cpu size={14}/>} text="Java Core" />
         <TechBadge icon={<Terminal size={14}/>} text="DSA" />
         <TechBadge icon={<Globe size={14}/>} text="MERN Stack" />
         <TechBadge icon={<Code2 size={14}/>} text="System Design" />
      </motion.div>

      {/* 5. Magnetic Buttons */}
      <motion.div variants={itemVar} className="flex flex-row items-center gap-4 mt-4 w-full sm:w-auto">
        <Link to="/projects" className="group relative px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded overflow-hidden">
          <span className="relative z-10 flex items-center gap-2">My Work <ArrowUpRight size={16}/></span>
          <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </Link>
        
        <a href="/resume.pdf" target="_blank" className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-white font-bold text-sm tracking-widest uppercase rounded hover:bg-white/10 transition-colors flex items-center gap-2">
          Resume <Download size={16} />
        </a>
      </motion.div>

    </motion.div>

    {/* RIGHT SIDE: AESTHETIC VISUALS */}
    <div className="flex-1 w-full flex justify-center lg:justify-end relative group mt-8 lg:mt-0">
        
        {/* Glow Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-accent/20 to-brand/20 blur-[100px] rounded-full animate-pulse"></div>
        
        {/* Character Image with Floating Animation */}
        <motion.img 
          src={heroImage} 
          alt="Aditya" 
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-auto h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[650px] object-contain drop-shadow-2xl"
        />

        {/* Floating Glass Stats Card */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1 }}
           className="absolute bottom-6 right-4 lg:bottom-20 lg:-left-8 lg:right-auto 
                      bg-black/40 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl z-20 
                      flex items-center gap-4 min-w-[240px] border-l-4 border-l-accent"
        >
            <div className="p-3 bg-white/5 rounded-xl text-accent">
                <Sparkles size={24} />
            </div>
            <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Current Focus</p>
                <p className="text-sm font-bold text-white">Exploring Tech</p>
            </div>
        </motion.div>

    </div>

  </section>
);

// Reusable Tech Badge with Glass Effect
const TechBadge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
    <span className="text-accent">{icon}</span>
    <span className="text-[11px] font-mono font-bold tracking-wide uppercase text-gray-300">{text}</span>
  </div>
);

// Placeholders
const Placeholder = ({ title }) => <div className="h-full flex items-center justify-center text-4xl font-black text-white/10">{title}</div>;
export const ProjectsSection = () => <Placeholder title="PROJECTS" />;
export const AchievementsSection = () => <Placeholder title="ACHIEVEMENTS" />;
export const AboutSection = () => <Placeholder title="ABOUT" />;
export const ContactSection = () => <Placeholder title="CONTACT" />;