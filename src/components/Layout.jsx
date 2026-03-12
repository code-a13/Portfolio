import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate, AnimatePresence, useSpring, useTransform } from "framer-motion";
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

// --- CUSTOM SCROLL HOOK (Built directly into the layout) ---
const useMouseScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);

  useEffect(() => {
    // Get all the paths in exact order from navItems
    const routes = navItems.map(item => item.path);

    const handleWheel = (e) => {
      if (isScrolling.current) return;

      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex === -1) return;

      // Scrolling Down (Next Page)
      if (e.deltaY > 50) {
        if (currentIndex < routes.length - 1) {
          isScrolling.current = true;
          navigate(routes[currentIndex + 1]);
          setTimeout(() => (isScrolling.current = false), 1200); 
        }
      } 
      // Scrolling Up (Previous Page)
      else if (e.deltaY < -50) {
        if (currentIndex > 0) {
          isScrolling.current = true;
          navigate(routes[currentIndex - 1]);
          setTimeout(() => (isScrolling.current = false), 1200);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
    
  }, [location.pathname, navigate]);
};


// --- MAIN LAYOUT COMPONENT ---
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const y = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // ACTIVATE SCROLL NAVIGATION HERE!
  useMouseScrollNavigation();

  // --- MOUSE TRACKING FOR BACKGROUND TEXT ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement with Spring physics
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Map mouse position to subtle movement (-30px to 30px)
  const moveX = useTransform(springX, [0, window.innerWidth], [30, -30]);
  const moveY = useTransform(springY, [0, window.innerHeight], [20, -20]);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

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
    <div 
      onMouseMove={handleMouseMove} 
      className="fixed inset-0 flex h-[100dvh] w-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black"
    >
      
      {/* --- MINIMALIST AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-white/[0.02] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white/[0.02] rounded-full blur-[120px]"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* --- SIDEBAR --- */}
      <div className="w-[70px] md:w-[80px] h-full flex-shrink-0 relative z-50 transition-all duration-300 border-r border-white/10 bg-[#050505] backdrop-blur-md">
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
        
        {/* IMPROVED BACKGROUND TEXT: Now reacts to mouse movement */}
        <div className="absolute right-[-5%] bottom-[-5%] select-none pointer-events-none overflow-hidden z-0">
            <motion.div style={{ x: moveX, y: moveY }} className="flex flex-col items-end">
                <motion.h1 
                    key={activeIndex}
                    initial={{ y: 50, opacity: 0, skewX: -10 }}
                    animate={{ y: 0, opacity: 0.03, skewX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-[20vw] font-black text-white leading-none whitespace-nowrap tracking-tighter uppercase"
                >
                    {navItems[activeIndex].name}
                </motion.h1>
                {/* Hollow version for extra "next-level" style */}
                <motion.h1 
                    key={`outline-${activeIndex}`}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.01 }}
                    transition={{ duration: 1.5, delay: 0.1 }}
                    className="text-[18vw] font-black leading-none whitespace-nowrap tracking-tighter uppercase"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" }}
                >
                    {navItems[activeIndex].name}
                </motion.h1>
            </motion.div>
        </div>

        {/* Top Tagline */}
        <div className="absolute top-8 left-8 md:left-16 flex items-center gap-4 z-20">
           <div className="w-12 h-[1px] bg-white/30"></div>
           <span className="text-neutral-400 font-mono text-xs tracking-[0.4em] uppercase font-medium">
             {navItems[activeIndex].tagline}
           </span>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden pt-24 md:pt-0 scrollbar-hide relative z-10">
           <div className="min-h-full w-full mx-auto flex flex-col">
             <AnimatePresence mode="wait">
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, y: -30, filter: "blur(15px)" }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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