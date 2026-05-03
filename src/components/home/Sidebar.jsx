import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

// ADVANCED ANIMATION VARIANTS FOR ROUTE CHANGES
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const iconVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 20 }
  }
};

const Sidebar = ({ items, activeIndex }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // THE FIX: Now checks BOTH About and Projects pages for the Light Theme
  const isLight = location.pathname === '/about' || location.pathname === '/projects';

  return (
    <>
      {/* ========================================= */}
      {/* 1. DESKTOP VIEW: Unified macOS-Style Panel  */}
      {/* ========================================= */}
      <div className={`hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 h-[85vh] w-[80px] rounded-full backdrop-blur-2xl border shadow-2xl z-50 flex-col items-center py-8 transition-all duration-700 ${isLight ? 'bg-white/40 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' : 'bg-[#0a0a0a]/60 border-white/10'}`}>
        
        {/* Header Logo */}
        <div className="flex-none mb-12">
           <h1 className={`text-lg font-black tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 opacity-90 select-none transition-colors duration-700 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
             ADITYA
           </h1>
        </div>

        {/* THE FIX: Advanced Route Animation Wrapper */}
        <motion.div 
          key={location.pathname} // Forces re-animation on page change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 w-full flex flex-col items-center justify-center gap-6"
        >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  variants={iconVariants}
                  key={`desktop-${item.id}`}
                  onClick={() => navigate(item.path)}
                  className="relative w-12 h-12 flex items-center justify-center cursor-pointer group"
                >
                  {/* Sliding Active Background Bubble */}
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className={`absolute inset-0 rounded-full border ${isLight ? 'bg-white/60 border-black/10 shadow-sm' : 'bg-white/10 border-white/20'}`}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {/* Icon */}
                  <div className={`relative z-10 transition-all duration-300 ${
                    isActive 
                      ? (isLight ? 'text-black scale-110' : 'text-white scale-110') 
                      : (isLight ? 'text-neutral-500 scale-100 group-hover:text-black group-hover:scale-110' : 'text-neutral-500 scale-100 group-hover:text-white group-hover:scale-110')
                  }`}>
                    {item.icon}
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>

      {/* ========================================= */}
      {/* 2. MOBILE VIEW: Centered Floating Island    */}
      {/* ========================================= */}
      <div className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] h-[70px] rounded-full backdrop-blur-2xl border z-50 flex items-center justify-around px-2 transition-all duration-700 ${isLight ? 'bg-white/60 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' : 'bg-[#0a0a0a]/85 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'}`}>
          <motion.div 
            key={location.pathname}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-around w-full"
          >
            {items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                    <motion.div
                        variants={iconVariants}
                        key={`mobile-${item.id}`}
                        onClick={() => navigate(item.path)}
                        className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                    >
                        {/* Sliding Active Background Bubble for Mobile */}
                        {isActive && (
                           <motion.div 
                              layoutId="mobile-active-bg" 
                              className={`absolute inset-0 rounded-full border ${isLight ? 'bg-white/80 border-black/10 shadow-sm' : 'bg-white/10 border-white/20'}`} 
                              transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                           />
                        )}
                        {/* Icon */}
                        <div className={`relative z-10 transition-all duration-300 ${
                          isActive 
                            ? (isLight ? 'text-black scale-110' : 'text-white scale-110') 
                            : (isLight ? 'text-neutral-500 scale-90 group-hover:text-black scale-100' : 'text-neutral-500 scale-90 group-hover:text-white scale-100')
                        }`}>
                            {item.icon}
                        </div>
                    </motion.div>
                )
            })}
          </motion.div>
      </div>
    </>
  );
};

export default Sidebar;