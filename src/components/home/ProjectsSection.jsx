import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Terminal } from "lucide-react";

import mediflowImg from "../../assets/images/medi.png";
import alumniImg from "../../assets/images/ac.png";
import momentumImg from "../../assets/images/momentum.png";
import multiMartImg from "../../assets/images/multimart.png"; 

// --- HELPER FUNCTION: Maps your project tags to beautiful tech logos ---
const getTechIcon = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes("react") || t.includes("context")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
  if (t.includes("fastapi")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg";
  if (t.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg";
  if (t.includes("mern") || t.includes("mongo")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg";
  if (t.includes("socket")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg";
  if (t.includes("redux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg";
  if (t.includes("vanilla js") || t.includes("javascript")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
  if (t.includes("html5")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg";
  if (t.includes("css3")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg";
  if (t.includes("ai")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg";
  if (t.includes("jwt")) return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
  
  return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg"; // Fallback icon
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
      link: "https://github.com/code-a13/MediFlow", 
      github: "https://github.com/code-a13/MediFlow",
      type: "AI Healthcare",
      image: mediflowImg 
    },
    {
      title: "AlumniConnect",
      description: "A full-stack ecosystem bridging students and alumni with real-time socket chat, event management, and networking.",
      tags: ["MERN", "Socket.io", "Redux", "JWT"],
      link: "https://alumniconnect.me",
      github: "https://github.com/code-a13/AlumniConnect.git",
      type: "Full Stack Platform",
      image: alumniImg 
    },
    {
      title: "Momentum",
      description: "A lightweight, dependency-free productivity suite built purely on the DOM for maximum performance.",
      tags: ["Vanilla JS", "HTML5", "CSS3"],
      link: "https://momentum13.vercel.app/",
      github: "https://github.com/code-a13/MOMENTUM-JS_LAB_PROJECT.git",
      type: "Productivity App",
      image: momentumImg 
    },
    {
      title: "MultiMart",
      description: "A comprehensive multi-store e-commerce platform delivering a seamless shopping and vendor management experience.",
      tags: ["React", "Tailwind", "Context API"],
      link: "https://reactproject201.vercel.app",
      github: "https://github.com/code-a13/MULTI_MART_REACT_PROJECT.git",
      type: "E-Commerce Platform",
      image: multiMartImg
    }
  ];

  return (
    <section className="relative w-full h-full flex flex-col justify-center bg-transparent text-black overflow-hidden py-2 md:py-16">
      
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.5); }
        `}
      </style>

      <div className="max-w-7xl mx-auto w-full px-6 md:px-8 mb-4 md:mb-12 mt-2 md:mt-0 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end w-full pt-2 md:pt-12"
        >
           <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium text-black tracking-tighter uppercase text-right leading-none">
             Projects <span className="font-serif italic text-neutral-500">.</span>
           </h2>
           <div className="h-[1px] w-full max-w-[200px] md:max-w-md bg-black/20 mt-3 md:mt-8"></div>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden flex group">
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
          // THE BOX FIX: inset-[-100%] forces the overlay to be 300% the size of the screen, escaping all containers!
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-[-100%] z-50 flex items-center justify-center p-4 sm:p-8 bg-white/80"
          >
            {/* THE CIRCLE FIX: aspect-square and shrink-0 force a perfect circle even on tiny phones */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: -45 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[90vw] max-w-[550px] aspect-square shrink-0 bg-white/95 backdrop-blur-2xl border border-black/10 shadow-[0_0_100px_rgba(0,0,0,0.15)] rounded-full grid grid-cols-2 grid-rows-2 overflow-hidden"
            >
              
              {/* Central Aesthetic Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border border-black/10 rounded-full z-20 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.1)]">
                <Terminal size={20} className="text-black opacity-50" />
              </div>

              {/* QUADRANT 1 - ORBITAL LAYOUT */}
              <div className="relative border-r border-b border-black/10 hover:bg-black/[0.02] transition-colors group min-h-0 min-w-0 overflow-hidden">
                 {/* Invisible anchor pinned exactly to the mathematical center of the circle */}
                 <div className="absolute bottom-0 right-0 w-0 h-0">
                   {selectedProject.tags.map((tag, idx) => {
                     const total = selectedProject.tags.length;
                     
                     // THE SPACING FIX: Spread angles from 15 to 75 degrees for wide, even spacing
                     const startAngle = 15;
                     const endAngle = 75;
                     const angleRange = endAngle - startAngle;
                     const angle = total === 1 ? 45 : startAngle + (idx * (angleRange / (total - 1)));
                     
                     return (
                       <div 
                         key={idx} 
                         title={tag}
                         className="absolute flex items-center justify-center"
                         style={{
                           // THE RADIUS FIX: Pushes icons perfectly towards the outer edge based on screen size
                           transform: `rotate(-${angle}deg) translateY(calc(-1 * clamp(80px, 29vw, 178px))) rotate(${angle}deg)`,
                         }}
                       >
                         {/* The actual icon, perfectly centered at its orbital coordinate */}
                         <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full p-1.5 sm:p-2 border border-black/10 shadow-[0_4px_15px_rgba(0,0,0,0.06)] flex items-center justify-center hover:scale-125 transition-all duration-300 cursor-help">
                           <img src={getTechIcon(tag)} alt={tag} className="w-full h-full object-contain" />
                         </div>
                       </div>
                     );
                   })}
                 </div>
              </div>

              {/* QUADRANT 2: Source Code */}
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 border-b border-black/10 hover:bg-black/[0.02] transition-colors group text-neutral-500 hover:text-black relative min-h-0 min-w-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Github size={28} className="mb-2 md:mb-4 md:w-12 md:h-12 group-hover:scale-125 transition-transform duration-500" />
                <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest relative z-10 text-center">Source Code</span>
              </a>

              {/* QUADRANT 3: Live Link */}
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noreferrer" 
                className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 border-r border-black/10 bg-black text-white hover:bg-neutral-800 transition-colors duration-500 group relative min-h-0 min-w-0 overflow-hidden"
              >
                <ArrowUpRight size={28} className="mb-2 md:mb-4 md:w-12 md:h-12 group-hover:scale-125 transition-transform duration-500" />
                <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest relative z-10 text-center">Live Link</span>
              </a>

              {/* QUADRANT 4: Close Button */}
              <button 
                onClick={() => setSelectedProject(null)} 
                className="flex flex-col items-center justify-center p-4 sm:p-8 md:p-16 hover:bg-red-500/10 hover:text-red-600 transition-colors group text-neutral-500 relative min-h-0 min-w-0 overflow-hidden"
              >
                <X size={28} className="mb-2 md:mb-4 md:w-12 md:h-12 group-hover:scale-125 group-hover:rotate-90 transition-transform duration-500" />
                <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest relative z-10 text-center">Close</span>
              </button>

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

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
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
        className="w-full h-full relative [transform-style:preserve-3d] group/inner rounded-3xl shadow-sm"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
             style={{
               background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0,0,0,0.04), transparent 40%)`
             }}
        />

        <div className="absolute inset-0 w-full h-full bg-transparent backdrop-blur-md border border-black/10 rounded-3xl p-5 md:p-10 flex flex-col justify-between [backface-visibility:hidden]">
           <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent rounded-3xl pointer-events-none" />
           
           <div className="space-y-2 md:space-y-4 relative z-10">
              <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">{project.type}</span>
              <h3 className="text-xl md:text-3xl font-medium text-black tracking-tight leading-tight line-clamp-2">{project.title}</h3>
              <p className="text-neutral-600 text-xs md:text-sm leading-relaxed font-light line-clamp-3 md:line-clamp-4">
                {project.description}
              </p>
           </div>
           
           <div className="flex flex-wrap gap-2 mt-3 md:mt-6 relative z-10">
             {project.tags.map((tag, idx) => (
               <span key={idx} className="px-3 py-1.5 text-[8px] md:text-[10px] font-mono tracking-widest text-neutral-500 border border-black/10 rounded-full uppercase bg-transparent">
                 {tag}
               </span>
             ))}
           </div>

           <div className="absolute top-5 right-5 md:top-8 md:right-8 text-black/30 group-hover/inner:text-black transition-colors duration-300 flex items-center gap-3 z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest hidden md:block">Select</span>
              <ArrowUpRight size={20} className="md:w-6 md:h-6" />
           </div>
        </div>

        <div className="absolute inset-0 w-full h-full bg-white rounded-3xl overflow-hidden border border-black/10 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col group/back shadow-md">
           <div className="relative w-full h-full bg-neutral-100 flex items-center justify-center p-3 md:p-4">
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="w-full h-full object-contain rounded-xl opacity-90 group-hover/back:opacity-100 group-hover/back:scale-105 transition-all duration-700 pointer-events-none"
               />
           </div>
           
           <div className="absolute inset-0 bg-white/80 flex items-center justify-center opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
              <div className="px-6 md:px-8 py-3 bg-black text-white text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-xl">
                Open Dashboard <ArrowUpRight size={16} />
              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
};