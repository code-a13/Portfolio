import React from "react";
import { motion } from "framer-motion";
// Import the new reusable component
import MagicBackground from "../ui/MagicBackground"; 

export const AboutSection = () => {
  const skills = ['Java', 'Spring Boot', 'Spring AI', 'React', 'Node.js', 'MongoDB', 'SQL', 'AWS'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    // Ensure relative and overflow-hidden are here
    <div className="relative min-h-screen bg-dark text-white p-8 md:p-16 font-sans flex flex-col justify-center overflow-hidden">
      
      {/* --- USE THE REUSABLE COMPONENT HERE --- */}
      {/* We pass very subtle white/gray colors for the dark theme */}
      <MagicBackground color1="bg-white/5" color2="bg-gray-400/10" />

      {/* --- CONTENT (Wrapped in relative z-10 to stay above magic) --- */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
         {/* ... (Rest of your existing About Section code remains exactly the same) ... */}
        <motion.h2 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black mb-8 border-b border-white/20 pb-4 tracking-tighter"
        >
          ABOUT ME.
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-space">
              I am a passionate Computer Science student and aspiring Software Development Engineer. 
              I focus on building clean, efficient, and scalable enterprise applications. My journey involves 
              mastering the theoretical core concepts and leveraging powerful ecosystems like Spring and modern JavaScript to solve real-world problems.
            </p>
          </motion.div>

          <div className="space-y-6">
            <div>
              <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xl font-bold mb-4 border-l-2 border-white pl-3"
              >
                The Stack
              </motion.h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {skills.map((skill) => (
                  <motion.span 
                    key={skill} 
                    variants={itemVariants}
                    className="px-4 py-1.5 text-sm border border-white/20 rounded-full text-gray-200 hover:bg-white hover:text-dark transition-colors duration-300 cursor-pointer font-space"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};