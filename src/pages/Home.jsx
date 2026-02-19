import React, { useState } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { 
  Home as HomeIcon, 
  Briefcase, 
  User, 
  Mail, 
  Award 
} from "lucide-react";

// Import Components
import Sidebar from "../components/home/Sidebar";
import { 
  HeroSection, 
  ProjectsSection, 
  AchievementsSection, 
  AboutSection, 
  ContactSection 
} from "../components/home/Sections";

// --- CONFIGURATION ---
const ITEM_HEIGHT = 100;
const PADDING_TOP = "calc(50vh - 50px)"; 

const items = [
  { id: "home", name: "HOME", tagline: "SYSTEMS ONLINE", icon: <HomeIcon size={28}/>, component: <HeroSection /> },
  { id: "projects", name: "PROJECTS", tagline: "RECENT MISSIONS", icon: <Briefcase size={28}/>, component: <ProjectsSection /> },
  { id: "achievements", name: "ACHIEVEMENTS", tagline: "HALL OF FAME", icon: <Award size={28}/>, component: <AchievementsSection /> },
  { id: "about", name: "ABOUT", tagline: "PILOT PROFILE", icon: <User size={28}/>, component: <AboutSection /> },
  { id: "contact", name: "CONTACT", tagline: "ESTABLISH LINK", icon: <Mail size={28}/>, component: <ContactSection /> },
];

const Home = () => {
  const y = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // --- PHYSICS ENGINE ---
  const handleDragEnd = () => {
    const currentY = y.get();
    const approximateIndex = Math.round(-currentY / ITEM_HEIGHT);
    const targetIndex = Math.max(0, Math.min(items.length - 1, approximateIndex));
    const targetY = -(targetIndex * ITEM_HEIGHT);
    
    // Smooth, premium spring physics
    animate(y, targetY, { type: "spring", stiffness: 300, damping: 30 });
    setActiveIndex(targetIndex);
  };

  return (
    // Advanced B&W Selection colors
    <div className="relative w-full h-screen bg-black text-white overflow-hidden font-sans flex selection:bg-white selection:text-black">
      
      {/* Background FX - Minimalist Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>

      {/* --- SIDEBAR COMPONENT --- */}
      <Sidebar 
        items={items} 
        y={y} 
        activeIndex={activeIndex} 
        handleDragEnd={handleDragEnd} 
        padding={PADDING_TOP}
      />

      {/* --- RIGHT SIDE: DYNAMIC CONTENT --- */}
      <div className="flex-1 h-full relative flex flex-col justify-center px-8 md:px-16 lg:px-24 z-10">
        
        {/* Background Giant Text - Lowered opacity for cleaner look */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none overflow-hidden z-0">
            <motion.h1 
                key={activeIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.02 }}
                className="text-[15vw] font-black text-white leading-none whitespace-nowrap tracking-tighter"
            >
                {items[activeIndex].name}
            </motion.h1>
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-5xl">
           
           {/* Minimalist Section Label */}
           <motion.div 
             key={`tag-${activeIndex}`}
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-white/30"></div>
              <span className="text-neutral-400 font-mono text-xs tracking-[0.3em] uppercase font-medium">
                {items[activeIndex].tagline}
              </span>
           </motion.div>

           {/* MAIN CONTENT RENDERER */}
           <AnimatePresence mode="wait">
             <motion.div
               key={activeIndex}
               initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
             >
                {items[activeIndex].component}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Footer Info - Subdued B&W styling */}
        <div className="absolute bottom-10 right-10 flex gap-6 text-[10px] text-neutral-600 font-mono tracking-widest z-20 uppercase">
            <span>Scroll_Y: {Math.round(y.get())}</span>
            <span>CPU: Optimal</span>
        </div>
      </div>
    </div>
  );
};

export default Home;