import React from "react";
import { motion } from "framer-motion";
import MagicBackground from "../ui/MagicBackground"; 

// --- CINEMATIC ANIMATION VARIANTS (Synced with Hero) ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)", scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const AboutSection = () => {
  const skills = ['Java', 'Spring Boot', 'Spring AI', 'React', 'Node.js', 'MongoDB', 'SQL', 'AWS'];

  return (
    <section className="relative min-h-screen bg-transparent text-white p-8 md:p-16 flex flex-col justify-center overflow-hidden">
      
      {/* Keeping your subtle magic background but lowering opacity to fit the deep dark theme */}
      <MagicBackground color1="bg-white/[0.03]" color2="bg-neutral-500/[0.03]" />

      <motion.div 
        variants={containerVar} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-4xl mx-auto w-full"
      >
        
        {/* Synced with Hero H1 typography */}
        <motion.h2 
          variants={itemVar}
          className="text-5xl md:text-7xl font-medium mb-12 border-b border-white/10 pb-6 tracking-tighter text-white"
        >
          About <span className="font-serif italic text-neutral-400">Me.</span>
        </motion.h2>
        
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 mt-8 items-start">
          
          <motion.div variants={itemVar}>
            {/* Synced with Hero Paragraph typography */}
            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-light tracking-wide">
              I am a passionate Computer Science student and aspiring Software Development Engineer. 
              I focus on building clean, efficient, and scalable <span className="text-white font-medium">enterprise applications</span>. 
              My journey involves mastering theoretical core concepts and leveraging powerful ecosystems like <span className="text-white font-medium">Spring and modern JavaScript</span> to solve real-world problems.
            </p>
          </motion.div>

          <motion.div variants={itemVar} className="space-y-6">
            <div>
              {/* Synced with Hero Small uppercase labels */}
              <h3 className="text-[10px] font-mono font-medium text-white tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                The Stack
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  // Synced entirely with the Hero TechBadge component
                  <div 
                    key={skill} 
                    className="group flex items-center gap-2 px-5 py-2.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-700 cursor-default"
                  >
                    <span className="text-xs font-mono tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-700 uppercase">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};