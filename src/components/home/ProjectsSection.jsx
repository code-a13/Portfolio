import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

// Existing images
import mediflowImg from "../../assets/images/medi.png";
import alumniImg from "../../assets/images/ac.png";
import momentumImg from "../../assets/images/momentum.png";
import multiMartImg from "../../assets/images/multimart.png"; 

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

  // Duplicate the array for the infinite loop illusion
  const duplicatedProjects = [...projects, ...projects];

  return (
    // FIX 1: Changed 'bg-black' to 'bg-transparent'
    // FIX 2: Changed 'min-h-screen py-24' to 'h-[100dvh]' for perfect mobile lock
    <section className="relative w-full h-[100dvh] flex flex-col justify-center bg-transparent text-white overflow-hidden px-4">
      
      {/* Header Container */}
      <div className="max-w-7xl mx-auto w-full px-8 mb-10 md:mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end w-full pt-12"
        >
           <h2 className="text-4xl md:text-7xl font-medium text-white tracking-tighter uppercase text-right">
             Projects <span className="font-serif italic text-neutral-500">.</span>
           </h2>
           <div className="h-[1px] w-full max-w-md bg-white/20 mt-6 md:mt-8"></div>
        </motion.div>
      </div>

      {/* Marquee Carousel Container (Left to Right) */}
      <div className="relative w-full overflow-hidden flex group">
        
        {/* CSS Marquee for butter-smooth mobile performance (Left to Right direction) */}
        <style>
          {`
            @keyframes smoothMarqueeReverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .animate-marquee-reverse {
              animation: smoothMarqueeReverse 45s linear infinite;
              will-change: transform;
            }
            .group:hover .animate-marquee-reverse {
              animation-play-state: paused;
            }
          `}
        </style>

        {/* FIX 3: Using CSS animation class for performance */}
        <div className="flex gap-6 md:gap-8 w-max px-4 animate-marquee-reverse">
          {duplicatedProjects.map((project, i) => (
            <FlipCard key={`${project.title}-${i}`} project={project} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
};

// 3D Flip Card Component tailored for Carousel
const FlipCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      // shrink-0 prevents the flexbox from crushing the cards
      className="relative w-[300px] md:w-[400px] h-[400px] md:h-[450px] cursor-pointer [perspective:1000px] group shrink-0"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => window.open(project.link, "_blank")}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT FACE (Text Details) */}
        <div className="absolute inset-0 w-full h-full bg-[#080808] border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between [backface-visibility:hidden]">
           <div className="space-y-4">
              <span className="text-[10px] md:text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">{project.type}</span>
              <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">{project.title}</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light line-clamp-4">
                {project.description}
              </p>
           </div>

           <div className="flex flex-wrap gap-2 mt-6">
             {project.tags.map((tag, idx) => (
               <span key={idx} className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-neutral-300 border border-white/10 rounded-full uppercase bg-white/5">
                 {tag}
               </span>
             ))}
           </div>
           
           <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors duration-300 flex items-center gap-3">
              <Github size={20} className="hover:text-accent transition-colors" />
              <ArrowUpRight size={24} />
           </div>
        </div>

        {/* BACK FACE (Image Overlay) */}
        <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
           <img 
             src={project.image} 
             alt={project.title}
             className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-sm tracking-widest uppercase font-bold">Deploy Application</span>
                <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <ArrowUpRight size={20} />
                </div>
              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
};