import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { Terminal, Briefcase, User, Mail, Award } from "lucide-react"; 
import Sidebar from "./home/Sidebar";

// --- CONFIG ---
const ITEM_HEIGHT = 80;
const PADDING_TOP = "calc(50vh - 40px)"; 

export const navItems = [
  { id: "home", path: "/", name: "ADITYA", tagline: "Software Developer", icon: <Terminal size={24}/> },
  { id: "projects", path: "/projects", name: "WORK", tagline: "BUILDS", icon: <Briefcase size={24}/> },
  { id: "achievements", path: "/achievements", name: "AWARDS", tagline: "TROPHIES", icon: <Award size={24}/> },
  { id: "about", path: "/about", name: "ABOUT", tagline: "BIO", icon: <User size={24}/> },
  { id: "contact", path: "/contact", name: "CONTACT", tagline: "LINK", icon: <Mail size={24}/> },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const y = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
      animate(y, -(currentIndex * ITEM_HEIGHT), { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [location.pathname, y]);

  const handleDragEnd = (event, info) => {
    const currentY = y.get();
    const approximateIndex = Math.round(-currentY / ITEM_HEIGHT);
    const targetIndex = Math.max(0, Math.min(navItems.length - 1, approximateIndex));
    const targetY = -(targetIndex * ITEM_HEIGHT);
    animate(y, targetY, { type: "spring", stiffness: 400, damping: 30 });
    const targetPath = navItems[targetIndex].path;
    if (location.pathname !== targetPath) navigate(targetPath);
  };

  return (
    // CHANGE 1: Used 'fixed inset-0' and 'h-[100dvh]' to lock screen
    <div className="fixed inset-0 flex h-[100dvh] w-screen bg-dark text-white overflow-hidden font-sans selection:bg-accent selection:text-black">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Noise Texture */}
      <div className="bg-noise"></div>

      {/* --- SIDEBAR --- */}
      <div className="w-[70px] md:w-[80px] h-full flex-shrink-0 relative z-50 transition-all duration-300 border-r border-white/5 bg-black/20 backdrop-blur-md">
        <Sidebar 
            items={navItems} 
            y={y} 
            activeIndex={activeIndex} 
            handleDragEnd={handleDragEnd} 
            padding={PADDING_TOP} 
        />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 h-full relative flex flex-col z-10 overflow-hidden">
        
        {/* Background Big Text */}
        <div className="absolute right-[-5%] bottom-[-5%] select-none pointer-events-none opacity-[0.03] overflow-hidden">
            <motion.h1 
                key={activeIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-[20vw] font-black text-white leading-none whitespace-nowrap font-space"
            >
                {navItems[activeIndex].name}
            </motion.h1>
        </div>

        {/* Top Tagline */}
        <div className="absolute top-8 left-8 md:left-16 flex items-center gap-4 z-20 opacity-80">
           <div className="w-12 h-[1px] bg-accent"></div>
           <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase">
             {navItems[activeIndex].tagline}
           </span>
        </div>

        {/* CHANGE 2: Scrollable Content - Added 'pb-24' for mobile space */}

<div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden pt-24 md:pt-0">
   <div className="min-h-full w-full max-w-7xl mx-auto p-6 md:p-16 flex items-center justify-center">
     <AnimatePresence mode="wait">
       <motion.div
         key={location.pathname}
         initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
         animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
         exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
         transition={{ duration: 0.5, ease: "easeOut" }}
         className="w-full"
       >
          <Outlet /> 
       </motion.div>
     </AnimatePresence>
   </div>
</div>

      </div>
    </div>
  );
};

export default Layout;