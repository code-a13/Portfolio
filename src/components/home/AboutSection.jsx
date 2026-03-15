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
    // THE FIX: Removed 'min-h-screen' and 'overflow-hidden'. 
    // Now it flows naturally and allows the Layout component to scroll it smoothly!
    <section className="relative w-full text-white px-4 py-12 md:p-16 flex flex-col justify-center">
      
      {/* THE FIX: Deleted the MagicBackground completely. The global Three.js background will shine through perfectly. */}

      <motion.div 
        variants={containerVar} 
        initial="hidden" 
        whileInView="visible" 
        // Reduced amount to 0.1 so the animation triggers smoothly even if mobile screen is small
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-4xl mx-auto w-full"
      >
        
        {/* Synced with Hero H1 typography */}
        <motion.h2 
          variants={itemVar}
          className="text-5xl md:text-7xl font-medium mb-8 md:mb-12 border-b border-white/10 pb-6 tracking-tighter text-white"
        >
          About <span className="font-serif italic text-neutral-400">Me.</span>
        </motion.h2>
        
        {/* Changed gap for mobile and forced single column on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 items-start mt-4 md:mt-8">
          
          <motion.div variants={itemVar}>
            {/* THE FIX: Text size scaled for mobile (text-sm) vs desktop (text-xl) */}
            <p className="text-neutral-400 text-sm md:text-xl leading-relaxed font-light tracking-wide">
              I am a passionate Computer Science student and aspiring Software Development Engineer. 
              I focus on building clean, efficient, and scalable <span className="text-white font-medium">enterprise applications</span>. 
              My journey involves mastering theoretical core concepts and leveraging powerful ecosystems like <span className="text-white font-medium">Spring and modern JavaScript</span> to solve real-world problems.
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
                  // THE FIX: Adjusted padding and font sizes specifically for mobile
                  <div 
                    key={skill} 
                    className="group flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-700 cursor-default"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.1em] md:tracking-[0.15em] text-neutral-400 group-hover:text-white transition-colors duration-700 uppercase">
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