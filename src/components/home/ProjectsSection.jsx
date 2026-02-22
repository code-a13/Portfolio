import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import mediflowImg from "../../assets/images/medi.png";
import alumniImg from "../../assets/images/ac.png";
import momentumImg from "../../assets/images/momentum.png";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "MediFlow SmartPad",
      description: "An AI-powered clinical assistant utilizing RAG. Features advanced prescription safety analysis.",
      tags: ["React", "FastAPI", "AI"],
      link: "https://github.com/code-a13/rag_ai", 
      github: "https://github.com/code-a13/rag_ai",
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
    }
  ];

  return (
    <section className="w-full relative min-h-screen py-20 px-4 md:px-16 overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full mb-16 flex flex-col items-center md:items-start"
      >
         <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase">
           Selected Works
         </h2>
         <div className="h-[2px] w-24 bg-white/20 mt-4"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, i) => (
          <FlipCard key={i} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

const FlipCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full aspect-square cursor-pointer [perspective:1000px] group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => window.open(project.link, "_blank")}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT FACE */}
        <div className="absolute inset-0 w-full h-full bg-[#080808] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between [backface-visibility:hidden]">
           <div className="space-y-4">
              <span className="text-xs font-mono text-neutral-500 tracking-[0.2em] uppercase">{project.type}</span>
              <h3 className="text-3xl font-medium text-white tracking-tight">{project.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light line-clamp-4">
                {project.description}
              </p>
           </div>

           <div className="flex flex-wrap gap-2">
             {project.tags.map((tag, idx) => (
               <span key={idx} className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-neutral-300 border border-white/10 rounded-full uppercase bg-white/5">
                 {tag}
               </span>
             ))}
           </div>
           
           <div className="absolute top-8 right-8 text-white/20 group-hover:text-white transition-colors duration-300">
              <ArrowUpRight size={24} />
           </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)]">
           <img 
             src={project.image} 
             alt={project.title}
             className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-end p-8">
              <div className="flex items-center justify-between">
                <span className="text-white font-mono text-sm tracking-widest uppercase font-bold">Redirect to App</span>
                <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
           </div>
        </div>

      </motion.div>
    </motion.div>
  );
};