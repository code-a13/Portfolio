import React from "react";
import { motion } from "framer-motion";

const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVar = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)", scale: 0.98 },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export const AboutSection = () => {
  const skills = ['Java', 'Spring Boot', 'Spring AI', 'React', 'Node.js', 'MongoDB', 'SQL', 'AWS'];

  return (
    <section className="relative w-full h-full px-4 py-8 md:p-16 flex flex-col justify-center pointer-events-none">
      
      <motion.div
         variants={containerVar}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true }}
         className="relative z-10 max-w-5xl mx-auto w-full pointer-events-auto"
      >
        
        {/* Headline: Clean black text */}
        <motion.h2 
          variants={itemVar}
          className="text-4xl sm:text-5xl md:text-7xl font-medium mb-3 md:mb-12 border-b border-black/10 pb-3 md:pb-6 tracking-tighter text-black"
        >
          About <span className="font-serif italic text-neutral-500">Me.</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 md:gap-12 items-start mt-4 md:mt-8">
          
          <motion.div variants={itemVar}>
            {/* Paragraphs: Dark gray for reading comfort, black for emphasis */}
            <p className="text-neutral-600 text-xs sm:text-sm md:text-xl leading-relaxed font-light tracking-wide space-y-4">
              <span className="block mb-4">
                I'm a second-year Computer Science student currently locked in on one clear objective: breaking into a product company as a Software Development Engineer. 
              </span>
              <span className="block">
                I spend my time deep-diving into <span className="text-black font-semibold">Data Structures, Core CS principles, and System Design</span> from scratch. Whether I'm building heavy backend architectures with Java and Spring Boot or crafting fast interfaces with the MERN stack, my focus is always on putting in the hours, writing clean code, and actually understanding how systems work under the hood.
              </span>
            </p>
          </motion.div>

          <motion.div variants={itemVar} className="space-y-4 md:space-y-6 mt-4 md:mt-0">
            <div>
              {/* Stack Heading: Black pulsing dot */}
              <h3 className="text-[10px] md:text-xs font-mono font-bold text-black tracking-[0.2em] uppercase mb-4 md:mb-6 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                The Stack
              </h3>
              
              {/* Tech Stack Pills: Clean light borders, dark hover fill */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.map((skill) => (
                  <motion.div 
                    key={skill} 
                    whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(0,0,0,0.05)", borderColor: "rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="group flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 border border-black/10 rounded-full bg-transparent transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.1em] md:tracking-[0.15em] text-neutral-500 group-hover:text-black transition-colors duration-300 uppercase font-semibold">
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