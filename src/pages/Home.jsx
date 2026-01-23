import React, { useState } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { 
  Home as HomeIcon, 
  Briefcase, 
  User, 
  Mail, 
  Award // New Icon for Achievements
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

// --- DATA MAPPING ---
// Connects the ID to the Icon and the Component
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
    
    animate(y, targetY, { type: "spring", stiffness: 400, damping: 30 });
    setActiveIndex(targetIndex);
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-space flex selection:bg-red-500 selection:text-white">
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* --- SIDEBAR COMPONENT --- */}
      <Sidebar 
        items={items} 
        y={y} 
        activeIndex={activeIndex} 
        handleDragEnd={handleDragEnd} 
        padding={PADDING_TOP}
      />

      {/* --- RIGHT SIDE: DYNAMIC CONTENT --- */}
      <div className="flex-1 h-full relative flex flex-col justify-center px-8 md:px-24">
        
        {/* Background Giant Text */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none overflow-hidden">
            <motion.h1 
                key={activeIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.05 }}
                className="text-[15vw] font-black text-white leading-none whitespace-nowrap"
            >
                {items[activeIndex].name}
            </motion.h1>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl">
           
           {/* Section Label */}
           <motion.div 
             key={`tag-${activeIndex}`}
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-[1px] bg-red-500"></div>
              <span className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase">
                {items[activeIndex].tagline}
              </span>
           </motion.div>

           {/* MAIN CONTENT RENDERER */}
           <AnimatePresence mode="wait">
             <motion.div
               key={activeIndex}
               initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
               animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, x: -20, filter: "blur(5px)" }}
               transition={{ duration: 0.4, ease: "easeOut" }}
             >
                {items[activeIndex].component}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-10 right-10 flex gap-6 text-[10px] text-gray-600 font-mono tracking-widest">
            <span>SCROLL_Y: {Math.round(y.get())}</span>
            <span>CPU: OPTIMAL</span>
        </div>
      </div>
    </div>
  );
};

export default Home;