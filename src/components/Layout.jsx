import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, animate, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Terminal, Briefcase, User, Mail, Award } from "lucide-react"; 
import Sidebar from "./home/Sidebar"; 
import { ThreeBackground } from "./home/ThreeBackground";

// --- OPTIMIZED SPOTLIGHT GRID ---

// CSS Blurs are the #1 cause of GPU lag. Gradients are natively optimized.
const SpotlightGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    <motion.div 
      animate={{ x: ["-20%", "120%", "-20%"], y: ["-20%", "120%", "-20%"] }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      // Use radial gradient instead of blur, add will-change for GPU acceleration
      className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)"
      }}
    />
  </div>
);

const ITEM_HEIGHT = 80;

export const navItems = [
  { id: "home", path: "/", name: "ADITYA", tagline: "Software Developer", icon: <Terminal size={24}/> },
  { id: "projects", path: "/projects", name: "WORK", tagline: "BUILDS", icon: <Briefcase size={24}/> },
  { id: "achievements", path: "/achievements", name: "AWARDS", tagline: "TROPHIES", icon: <Award size={24}/> },
  { id: "about", path: "/about", name: "ABOUT", tagline: "BIO", icon: <User size={24}/> },
  { id: "contact", path: "/contact", name: "CONTACT", tagline: "LINK", icon: <Mail size={24}/> },
];

const useMouseScrollNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const routes = navItems.map(item => item.path);

    const handleNavigation = (direction) => {
        if (isScrolling.current) return;
        const currentIndex = routes.indexOf(location.pathname);
        if (currentIndex === -1) return;

        if (direction === "DOWN" && currentIndex < routes.length - 1) {
            isScrolling.current = true;
            navigate(routes[currentIndex + 1]);
            setTimeout(() => (isScrolling.current = false), 1200); 
        } else if (direction === "UP" && currentIndex > 0) {
            isScrolling.current = true;
            navigate(routes[currentIndex - 1]);
            setTimeout(() => (isScrolling.current = false), 1200);
        }
    };

    const handleWheel = (e) => {
        if (e.deltaY > 50) handleNavigation("DOWN");
        else if (e.deltaY < -50) handleNavigation("UP");
    };

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY; 
        
        if (deltaY > 100) handleNavigation("DOWN");
        else if (deltaY < -100) handleNavigation("UP");
    };

    // Added { passive: false } for touch events to properly manage scroll hijacking safely
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    
    return () => {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, navigate]);
};

const Layout = () => {
  const location = useLocation();
  const y = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useMouseScrollNavigation();

  // Keep mouse tracking logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
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

  return (
    <div onMouseMove={handleMouseMove} className="fixed inset-0 flex h-[100dvh] w-screen bg-black text-white overflow-hidden font-sans selection:bg-white selection:text-black">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeBackground />
        <SpotlightGrid />
      </div>

      <Sidebar items={navItems} activeIndex={activeIndex} />

      <div className="w-full h-full relative flex flex-col z-10 overflow-hidden">
        
        {/* Background Tracking Text */}
        <div className="absolute right-[-5%] bottom-[-5%] select-none pointer-events-none overflow-hidden z-0">
            <motion.div style={{ x: moveX, y: moveY }} className="flex flex-col items-end will-change-transform">
                <motion.h1 key={activeIndex} initial={{ y: 50, opacity: 0, skewX: -10 }} animate={{ y: 0, opacity: 0.03, skewX: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="text-[20vw] font-black text-white leading-none whitespace-nowrap tracking-tighter uppercase">
                    {navItems[activeIndex].name}
                </motion.h1>
                <motion.h1 key={`outline-${activeIndex}`} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 0.01 }} transition={{ duration: 1.5, delay: 0.1 }} className="text-[18vw] font-black leading-none whitespace-nowrap tracking-tighter uppercase" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)", color: "transparent" }}>
                    {navItems[activeIndex].name}
                </motion.h1>
            </motion.div>
        </div>

        <div className="absolute top-8 left-6 md:left-[120px] flex items-center gap-4 z-20">
           <div className="w-12 h-[1px] bg-white/30"></div>
           <span className="text-neutral-400 font-mono text-xs tracking-[0.4em] uppercase font-medium">
             {navItems[activeIndex].tagline}
           </span>
        </div>

        {/* Main Content Area */}
        <div className="w-full h-full overflow-y-auto relative z-10 pt-20 pb-[120px] md:pt-0 md:pb-0 md:pl-[120px] scrollbar-hide">
           <div className="min-h-full w-full mx-auto flex flex-col justify-center px-6 md:px-12 py-10 md:py-0">
             <AnimatePresence mode="wait">
               {/* FIX: Removed 'filter: blur()' for a perfect 60FPS transition. Used subtle scaling instead. */}
               <motion.div
                 key={location.pathname}
                 initial={{ opacity: 0, y: 30, scale: 0.98 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: -30, scale: 0.98 }}
                 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                 className="w-full h-full will-change-transform"
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