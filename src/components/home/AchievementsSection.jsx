import React from "react";
import { motion } from "framer-motion";
// Import the component
import MagicBackground from "../ui/MagicBackground";

export const AchievementsSection = () => {
  const achievements = [
      // ... (your achievements data)
    { id: 1, title: "Problem Solving", desc: "Building a strong algorithmic foundation through daily hands-on problem solving.", year: "Ongoing" },
    { id: 2, title: "Enterprise Architecture", desc: "Integrating Spring Boot and Spring AI to build robust, AI-powered backend microservices.", year: "2026" },
    { id: 3, title: "Full-Stack Mastery", desc: "Mastering the Java and MERN stacks from scratch to deliver complete, scalable software solutions.", year: "2025" },
  ];

  return (
    // Ensure relative and overflow-hidden
    <div className="relative min-h-screen bg-white text-dark p-8 md:p-16 flex flex-col justify-center overflow-hidden">
      
      <MagicBackground 
            color1="bg-dark/5" 
            color2="bg-gray-500/10" 
            reverse={true} 
            blendMode="mix-blend-multiply" 
        />

      {/* --- CONTENT (Wrapped in relative z-10) --- */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
         {/* ... (Rest of your existing Achievements code) ... */}
        <motion.h2 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black mb-12 tracking-tighter text-right border-b border-dark/20 pb-4"
        >
          ACHIEVEMENTS.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {achievements.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group bg-white/50 backdrop-blur-sm border border-dark p-8 hover:bg-dark hover:text-white transition-all duration-500 ease-out flex flex-col h-full"
            >
              <span className="text-sm font-bold text-gray-400 mb-4 block tracking-widest uppercase">
                {item.year}
              </span>
              <h3 className="text-2xl font-bold mb-4 font-space">{item.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mt-auto transition-colors duration-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};