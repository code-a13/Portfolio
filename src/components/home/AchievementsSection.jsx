import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- ADVANCED SLOW SPOTLIGHT GRID ---
const SpotlightGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <motion.div 
      animate={{ x: ["-20%", "120%", "-20%"], y: ["-20%", "120%", "-20%"] }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-[600px] h-[600px] bg-white opacity-[0.03] blur-[150px] rounded-full will-change-transform"
    />
  </div>
);

// --- CINEMATIC ANIMATION VARIANTS (Perfectly Synced with AboutSection) ---
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

export const AchievementsSection = () => {
  const achievements = [
    { 
      id: 1, 
      title: "Python Hackathon Winner", 
      desc: "Secured top position by architecting a scalable Python solution in 24 hours.", 
      year: "2024",
      image: "/assets/certificates/hackathon.png", 
      link: "https://your-verification-link.com"
    },
    { 
      id: 2, 
      title: "Algorithms Mastery", 
      desc: "Solved 300+ LeetCode problems, mastering Data Structures & System constraints.", 
      year: "Ongoing",
      image: "/assets/certificates/leetcode.png",
      link: "https://leetcode.com/your-profile"
    },
    { 
      id: 3, 
      title: "Coursera Certified", 
      desc: "Advanced Software Engineering principles bridging theory and industry standards.", 
      year: "2024",
      image: "/assets/certificates/coursera.png",
      link: "https://coursera.org/verify/..."
    },
    { 
      id: 4, 
      title: "Enterprise Architecture", 
      desc: "Integrating Spring Boot and Spring AI to build AI-powered microservices.", 
      year: "2026",
      image: "/assets/certificates/spring.png",
      link: "https://github.com/your-repo"
    }
  ];

  // Duplicate array for seamless infinite marquee loop
  const duplicatedAchievements = [...achievements, ...achievements];

  return (
    // FIX 1: Changed 'bg-black' to 'bg-transparent' so Layout text shows through perfectly
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-transparent text-white gap-8 overflow-hidden">
      
      <SpotlightGrid />
      
      {/* FIX 2: Removed the duplicate hardcoded "AWARDS" text here because your Layout.jsx already handles it perfectly */}

      <motion.div variants={containerVar} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="z-10 w-full relative flex flex-col">
        
        {/* Section Header */}
        <div className="max-w-6xl mx-auto w-full px-8 mb-10 md:mb-16">
          <motion.div variants={itemVar} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-[10px] font-mono font-medium text-white tracking-[0.2em] uppercase">Milestones • Verified</span>
          </motion.div>

          <motion.h2 variants={itemVar} className="text-5xl md:text-7xl font-medium tracking-tighter text-white">
            ACHIEVE<span className="font-serif italic text-neutral-500">MENTS.</span>
          </motion.h2>
        </div>

        {/* Marquee Carousel Container */}
        <motion.div variants={itemVar} className="relative w-full overflow-hidden flex group">
          
          {/* CSS Marquee for butter-smooth mobile performance */}
          <style>
            {`
              @keyframes smoothMarquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: smoothMarquee 40s linear infinite;
                will-change: transform;
              }
              .group:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}
          </style>

          <div className="flex gap-6 md:gap-8 w-max px-4 animate-marquee" style={{ paddingLeft: "2rem" }}>
            {duplicatedAchievements.map((item, index) => (
              
              // 3D FLIP CARD CONTAINER
              <div 
                key={`${item.id}-${index}`} 
                className="group/card relative w-[300px] md:w-[400px] h-[400px] md:h-[450px] cursor-pointer perspective-[1000px] shrink-0"
              >
                {/* 3D HINGE */}
                <div className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                  
                  {/* --- FRONT OF CARD (Text UI) --- */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white/[0.02] backdrop-blur-md border border-white/10 p-8 md:p-10 flex flex-col rounded-3xl overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                     <span className="relative z-10 text-[10px] md:text-xs font-mono font-medium text-neutral-500 mb-4 md:mb-6 block tracking-[0.2em] uppercase">
                        {item.year}
                     </span>
                     <h3 className="relative z-10 text-2xl md:text-3xl font-medium mb-3 md:mb-4 tracking-tight text-white leading-tight">
                        {item.title}
                     </h3>
                     <p className="relative z-10 text-neutral-400 text-xs md:text-sm leading-relaxed mt-auto font-light line-clamp-4">
                        {item.desc}
                     </p>
                     <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase">
                        Hover to view <ArrowUpRight size={14} />
                     </div>
                  </div>

                  {/* --- BACK OF CARD (Image & Link) --- */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden flex flex-col group/back">
                     <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center p-3 md:p-4">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded-xl opacity-80 group-hover/back:opacity-100 group-hover/back:scale-105 transition-all duration-700"
                        />
                     </div>
                     
                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 md:px-8 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                        >
                          Verify Credential <ArrowUpRight size={16} />
                        </a>
                     </div>
                  </div>

                </div>
              </div>

            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};