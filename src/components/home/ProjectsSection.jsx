import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Terminal, Command, GitMerge } from "lucide-react";

import mediflowImg from "../../assets/images/medi.png";
import alumniImg from "../../assets/images/ac.png";
import momentumImg from "../../assets/images/momentum.png";
import multiMartImg from "../../assets/images/multimart.png"; 

// --- ANIMATION VARIANTS FOR STAGGERED LIST ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const projects = [
    {
      title: "MediFlow SmartPad",
      description: "An AI-powered clinical assistant utilizing RAG. Features advanced prescription safety analysis and seamless data retrieval.",
      tags: ["React", "FastAPI", "AI Models", "Tailwind"],
      systemDesign: [
        "Client: React UI for real-time interaction",
        "API Gateway: FastAPI handling concurrent requests",
        "AI Engine: RAG Architecture with Vector DB",
        "Security: Encrypted patient data transmission"
      ],
      link: "https://github.com/code-a13/MediFlow", 
      github: "https://github.com/code-a13/MediFlow",
      type: "AI Healthcare",
      image: mediflowImg 
    },
    {
      title: "AlumniConnect",
      description: "A full-stack ecosystem bridging students and alumni with real-time socket chat, event management, and networking.",
      tags: ["MERN", "Socket.io", "Redux", "JWT"],
      systemDesign: [
        "Frontend: React with Redux for state management",
        "Backend: Node/Express micro-services",
        "Database: MongoDB with Mongoose aggregation",
        "Real-time: Socket.io for bidirectional chat"
      ],
      link: "https://alumniconnect.me",
      github: "https://github.com/code-a13/AlumniConnect.git",
      type: "Full Stack Platform",
      image: alumniImg 
    },
    {
      title: "Momentum",
      description: "A lightweight, dependency-free productivity suite built purely on the DOM for maximum performance.",
      tags: ["Vanilla JS", "HTML5", "CSS3"],
      systemDesign: [
        "Core: Vanilla JavaScript ES6+",
        "Storage: LocalStorage API for persistence",
        "Rendering: Direct DOM manipulation (Zero libraries)",
        "Styling: Pure CSS3 with Flexbox/Grid"
      ],
      link: "https://momentum13.vercel.app/",
      github: "https://github.com/code-a13/MOMENTUM-JS_LAB_PROJECT.git",
      type: "Productivity App",
      image: momentumImg 
    },
    {
      title: "MultiMart",
      description: "A comprehensive multi-store e-commerce platform delivering a seamless shopping and vendor management experience.",
      tags: ["React", "Tailwind", "Context API"],
      systemDesign: [
        "Architecture: Component-based modular design",
        "State: React Context API for global cart state",
        "Styling: Tailwind CSS for responsive utility classes",
        "Routing: React Router for SPA navigation"
      ],
      link: "https://reactproject201.vercel.app",
      github: "https://github.com/code-a13/MULTI_MART_REACT_PROJECT.git",
      type: "E-Commerce Platform",
      image: multiMartImg
    }
  ];

  return (
    <section className="relative w-full h-full flex flex-col justify-center bg-transparent text-white overflow-hidden py-2 md:py-16">
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.5); }
        `}
      </style>

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

      <div className="relative w-full overflow-hidden flex group">
        {/* MOBILE FIX: Added snap-x and snap-mandatory for smooth mobile carousel feel */}
        <div className="flex gap-4 md:gap-8 w-full overflow-x-auto hide-scrollbar px-6 md:px-8 pb-4 md:pb-8 snap-x snap-mandatory">
          {projects.map((project, i) => (
            <FlipCard 
              key={`${project.title}-${i}`} 
              project={project} 
              index={i} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/80"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-6xl max-h-[90vh] md:h-[80vh] bg-[#050505] border border-white/20 flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.05)] rounded-lg md:rounded-none"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white z-50"></div>

              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 p-2 text-neutral-400 hover:text-black hover:bg-white transition-all duration-300 border border-transparent hover:border-white rounded-full md:rounded-none bg-black/50 md:bg-transparent"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>

              <div className="w-full h-[30vh] md:w-3/5 md:h-full relative bg-black group/img order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none z-10"></div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover object-center grayscale opacity-60 group-hover/img:grayscale-0 group-hover/img:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50 pointer-events-none"></div>
              </div>

              <div className="w-full h-[60vh] md:w-2/5 md:h-full flex flex-col p-5 md:p-10 relative bg-[#0a0a0a] z-10 order-2 md:order-1 overflow-y-auto custom-scroll">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 text-neutral-400 mb-6 border-b border-white/10 pb-4">
                    <Terminal size={16} />
                    <span className="text-[10px] tracking-[0.3em] font-mono uppercase">System_Override</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-none mb-2">
                    {selectedProject.title}
                  </h3>
                  <span className="text-[10px] md:text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-6">
                    // {selectedProject.type}
                  </span>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 md:px-3 md:py-1.5 border border-white/20 text-[10px] md:text-xs font-mono text-neutral-300 uppercase hover:bg-white hover:text-black transition-colors duration-300 cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 p-4 rounded-sm">
                      <div className="flex items-center gap-2 text-white mb-3">
                        <GitMerge size={14} />
                        <span className="text-[10px] uppercase font-mono tracking-widest">System_Architecture</span>
                      </div>
                      <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
                        {selectedProject.systemDesign.map((step, idx) => (
                          <motion.li key={idx} variants={itemVariants} className="text-xs text-neutral-400 font-mono leading-relaxed flex items-start gap-2">
                            <span className="text-white mt-0.5">{">"}</span> {step}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest block mb-2 mt-4">
                        [ Core_Description ]
                      </span>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed font-light">
                        {selectedProject.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2 font-mono text-[10px] md:text-xs uppercase tracking-widest shrink-0">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-between w-full p-3 md:p-4 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group">
                    <span className="flex items-center gap-3"><Github size={14} /> Source_Code</span>
                    <Command size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" 
                    className="flex items-center justify-between w-full p-3 md:p-4 bg-white text-black hover:bg-transparent hover:text-white border border-white transition-all duration-300 group">
                    <span className="flex items-center gap-3"><ArrowUpRight size={14} /> Initialize_App</span>
                    <Command size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// --- ADVANCED LIGHTING CARD COMPONENT ---
const FlipCard = ({ project, index, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // GAMIFIED LIGHTING FIX: Calculate mouse position for the glow effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set CSS variables dynamically without causing React re-renders!
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative w-[85vw] sm:w-[350px] md:w-[400px] h-[320px] md:h-[450px] cursor-pointer perspective-[1000px] shrink-0 group/card snap-center"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d] group/inner rounded-3xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* LIGHT GLOW OVERLAY - Tracks the cursor using CSS variables */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
             }}
        />

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
              <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Select</span>
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
           <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
              <div className="px-6 md:px-8 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                View System Specs <ArrowUpRight size={16} />
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
};