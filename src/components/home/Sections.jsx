import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, Terminal, Cpu, Globe, Download, Sparkles, Code2, 
  Github, ExternalLink, Layers, Database 
} from "lucide-react";

// [CRITICAL] Ensure 'hero.png' is in src/assets/images/
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
      {/* Status Pill */}
      <motion.div variants={itemVar} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-lg shadow-purple-500/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span className="text-xs font-mono font-medium text-gray-300 tracking-wider">OPEN TO WORK</span>
      </motion.div>

      {/* Headline */}
      <motion.div variants={itemVar} className="space-y-2">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          JAVA <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-brand animate-pulse">
            DEVELOPER.
          </span>
        </h1>
      </motion.div>

      {/* Bio */}
      <motion.p variants={itemVar} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">
        Crafting <span className="text-white font-semibold">scalable backends</span> & <span className="text-white font-semibold">immersive UIs</span>. 
        I bridge the gap between heavy Java architecture and modern React interactivity.
      </motion.p>

      {/* Tech Stack */}
      <motion.div variants={itemVar} className="flex flex-wrap gap-3">
         <TechBadge icon={<Cpu size={14}/>} text="Java Core" />
         <TechBadge icon={<Terminal size={14}/>} text="DSA" />
         <TechBadge icon={<Globe size={14}/>} text="MERN Stack" />
         <TechBadge icon={<Code2 size={14}/>} text="System Design" />
      </motion.div>

      {/* Buttons */}
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

    {/* RIGHT SIDE: VISUALS */}
    <div className="flex-1 w-full flex justify-center lg:justify-end relative group mt-8 lg:mt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-accent/20 to-brand/20 blur-[100px] rounded-full animate-pulse"></div>
        <motion.img 
          src={heroImage} 
          alt="Aditya" 
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-auto h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[650px] object-contain drop-shadow-2xl"
        />
    </div>
  </section>
);


// --- PROJECTS SECTION (NO NUMBERING) ---
export const ProjectsSection = () => {
  const projects = [
    {
      title: "AlumniConnect",
      description: "A full-stack ecosystem bridging students and alumni. Features real-time socket chat, job portals, and event orchestration.",
      tags: ["MERN Stack", "Socket.io", "JWT", "Redux"],
      link: "https://alumniconnect.me",
      github: "https://github.com/code-a13/AlumniConnect.git",
      type: "Full Stack Platform"
    },
    {
      title: "Momentum",
      description: "A lightweight, dependency-free productivity suite built purely on the DOM. Optimized for zero-latency performance and instant load times.",
      tags: ["Vanilla JS (ES6+)", "HTML5", "CSS3", "Local Storage"],
      link: "https://momentum13.vercel.app/",
      github: "https://github.com/code-a13/MOMENTUM-JS_LAB_PROJECT.git",
      type: "Productivity App"
    }
  ];

  return (
    <section className="w-full h-full flex flex-col gap-8 pb-10">
      <motion.div 
        variants={containerVar} 
        initial="hidden" 
        animate="visible"
        className="w-full"
      >
        {/* Title */}
        <motion.div variants={itemVar} className="flex items-end gap-4 mb-10">
           <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
             PROJECTS<span className="text-accent">.</span>
           </h2>
           <div className="h-[2px] flex-1 bg-white/10 mb-2 relative overflow-hidden">
             <div className="absolute inset-0 bg-accent/50 w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
           </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// --- PRO STANDARD PROJECT CARD (UPDATED) ---
const ProjectCard = ({ project }) => (
  <motion.div 
    variants={itemVar}
    className="group relative w-full"
  >
    {/* Card Container with Gradient Border */}
    <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_40px_-10px_rgba(0,229,255,0.15)]">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
      
      {/* Hover Gradient Splash */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 blur-[80px] rounded-full group-hover:bg-accent/20 transition-all duration-700"></div>

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start justify-between">
        
        {/* Left: Project Info */}
        <div className="flex-1 space-y-4">
          
          {/* UPDATED: Top Label (Removed Numbering) */}
          <div className="flex items-center gap-3">
             <span className="text-xs font-mono font-bold text-accent/80 tracking-widest uppercase">
                {project.type}
             </span>
             <div className="h-[1px] w-8 bg-accent/20"></div>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-[11px] font-mono font-medium text-gray-300 bg-white/5 border border-white/5 rounded hover:border-accent/30 hover:text-accent transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Actions (Buttons) */}
        <div className="flex md:flex-col gap-3 shrink-0 mt-2 md:mt-0">
          <a href={project.github} className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:scale-110 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <Github size={20} />
          </a>
          <a href={project.link} className="h-12 w-12 flex items-center justify-center rounded-full border border-accent/20 bg-accent/5 text-accent hover:scale-110 hover:bg-accent hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">
            <ArrowUpRight size={20} />
          </a>
        </div>

      </div>
    </div>
  </motion.div>
);
// Reusable Tech Badge
const TechBadge = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-lg bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
    <span className="text-accent">{icon}</span>
    <span className="text-[11px] font-mono font-bold tracking-wide uppercase text-gray-300">{text}</span>
  </div>
);

// Placeholders for other sections
const Placeholder = ({ title }) => <div className="h-full flex items-center justify-center text-4xl font-black text-white/10">{title}</div>;
export const AchievementsSection = () => <Placeholder title="ACHIEVEMENTS" />;
export const AboutSection = () => <Placeholder title="ABOUT" />;
export const ContactSection = () => <Placeholder title="CONTACT" />;