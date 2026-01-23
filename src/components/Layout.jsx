import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Briefcase, User, Mail, Award } from "lucide-react";
import Sidebar from "./home/Sidebar";

// --- CONFIGURATION ---
const ITEM_HEIGHT = 80;
const PADDING_TOP = "calc(50vh - 40px)"; 

export const navItems = [
  { id: "home", path: "/", name: "HOME", tagline: "SOFTWARE DEVELOPER", icon: <HomeIcon size={24}/> },
  { id: "projects", path: "/projects", name: "PROJECTS", tagline: "RECENT MISSIONS", icon: <Briefcase size={24}/> },
  { id: "achievements", path: "/achievements", name: "ACHIEVEMENTS", tagline: "HALL OF FAME", icon: <Award size={24}/> },
  { id: "about", path: "/about", name: "ABOUT", tagline: "PILOT PROFILE", icon: <User size={24}/> },
  { id: "contact", path: "/contact", name: "CONTACT", tagline: "ESTABLISH LINK", icon: <Mail size={24}/> },
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
    // ALWAYS ROW LAYOUT (Mobile & Desktop)
    <div className="flex h-screen w-screen bg-[#050505] text-white overflow-hidden font-space selection:bg-red-500 selection:text-white">
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* --- SIDEBAR (ALWAYS VISIBLE) --- */}
      {/* Width: 70px on Mobile, 80px on Desktop */}
      <div className="w-[70px] md:w-[80px] h-full flex-shrink-0 relative z-50 transition-all duration-300">
        <Sidebar 
            items={navItems} 
            y={y} 
            activeIndex={activeIndex} 
            handleDragEnd={handleDragEnd} 
            padding={PADDING_TOP} 
        />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 h-full relative flex flex-col relative z-10 overflow-hidden">
        
        {/* Background Text */}
        <div className="absolute right-0 bottom-0 select-none pointer-events-none opacity-5 overflow-hidden w-full h-full flex items-end justify-end">
            <motion.h1 
                key={activeIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-[25vw] md:text-[18vw] font-black text-white leading-none whitespace-nowrap translate-y-[10%]"
            >
                {navItems[activeIndex].name}
            </motion.h1>
        </div>

        {/* Top Tagline */}
        <div className="absolute top-6 left-6 md:top-8 md:left-16 flex items-center gap-4 z-20">
           <div className="w-6 md:w-8 h-[2px] bg-red-500"></div>
           <span className="text-red-500 font-mono text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase">
             {navItems[activeIndex].tagline}
           </span>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden flex items-start md:items-center justify-center p-5 pt-20 md:p-16">
           <div className="w-full max-w-5xl">
             <AnimatePresence mode="wait">
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                 className="w-full"
               >
                  <Outlet /> 
               </motion.div>
             </AnimatePresence>
           </div>
        </div>

        {/* Footer Info (Hidden on very small mobiles to save space) */}
        <div className="absolute bottom-4 right-6 flex gap-4 text-[9px] md:text-[10px] text-gray-600 font-mono tracking-widest z-20 hidden sm:flex">
            <span>Y: {Math.round(y.get())}</span>
            <span>SYS: OPTIMAL</span>
        </div>

      </div>
    </div>
  );
};

export default Layout;