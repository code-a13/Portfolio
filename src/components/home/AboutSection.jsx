import React from "react";
import { motion } from "framer-motion";

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
    <section className="relative w-full text-white px-4 py-12 md:p-16 flex flex-col justify-center">
      
      <motion.div 
        variants={containerVar} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-4xl mx-auto w-full"
      >
        
        <motion.h2 
          variants={itemVar}
          className="text-5xl md:text-7xl font-medium mb-8 md:mb-12 border-b border-white/10 pb-6 tracking-tighter text-white"
        >
          About <span className="font-serif italic text-neutral-400">Me.</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 items-start mt-4 md:mt-8">
          
          <motion.div variants={itemVar}>
            {/* THE FIX: Authentic, human-sounding text detailing the actual grind */}
            <p className="text-neutral-400 text-sm md:text-xl leading-relaxed font-light tracking-wide space-y-4">
              <span className="block mb-4">
                I'm a second-year Computer Science student currently locked in on one clear objective: breaking into a  product company as a Software Development Engineer. 
              </span>
              <span className="block">
                I don't just rely on university coursework. I spend my time deep-diving into <span className="text-white font-medium">Data Structures, Core CS principles, and System Design</span> from scratch. Whether I'm building heavy backend architectures with Java and Spring Boot or crafting fast interfaces with the MERN stack, my focus is always on putting in the hours, writing clean code, and actually understanding how systems work under the hood.
              </span>
            </p>
          </motion.div>

          <motion.div variants={itemVar} className="space-y-6">
            <div>
              <h3 className="text-[10px] md:text-xs font-mono font-medium text-white tracking-[0.2em] uppercase mb-4 md:mb-6 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                The Stack
              </h3>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.map((skill) => (
                  // THE FIX: Added whileHover magnetic pop to make the skills feel creative and interactive
                  <motion.div 
                    key={skill} 
                    whileHover={{ scale: 1.1, y: -4, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="group flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.1em] md:tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-300 uppercase">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};