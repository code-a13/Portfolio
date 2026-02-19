import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ items, y, activeIndex, handleDragEnd, padding }) => {
  const navigate = useNavigate();

  return (
    // Pure Black matching the Layout wrapper
    <div className="relative w-full h-full border-r border-white/10 bg-[#020202] z-30 flex flex-col items-center shadow-2xl overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="absolute top-0 w-full h-[100px] md:h-[120px] flex items-center justify-center border-b border-white/5 bg-[#050505] z-40 backdrop-blur-md">
         <h1 className="text-lg md:text-2xl font-black tracking-[0.2em] text-white [writing-mode:vertical-rl] rotate-180 opacity-90">
           ADITYA
         </h1>
      </div>

      {/* --- ACTIVE GLASS INDICATOR ZONE (Monochrome) --- */}
      <div className="absolute top-1/2 left-0 w-full h-[80px] -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center">
          {/* Subtle white glass background */}
          <div className="w-full h-full bg-white/[0.02] backdrop-blur-[2px]"></div>
          {/* Crisp white left border glow */}
          <div className="absolute left-0 w-[2px] h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"></div>
          {/* Right side notch */}
          <div className="absolute right-0 w-1 h-2 bg-white/50 rounded-l-full"></div>
      </div>

      {/* --- DRAGGABLE TAPE --- */}
      <motion.div
        style={{ y }}
        drag="y"
        dragConstraints={{ top: -((items.length - 1) * 80), bottom: 0 }} 
        dragElastic={0.05} // Tighter elasticity for a heavier, premium feel
        onDragEnd={handleDragEnd}
        className="absolute top-0 w-full cursor-grab active:cursor-grabbing z-20"
      >
        <div style={{ height: padding }}></div>

        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={item.id}
              onClick={() => navigate(item.path)} // ADDED CLICK LOGIC
              className={`h-[80px] w-full flex items-center justify-center relative transition-all duration-500 cursor-pointer group ${isActive ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
              animate={{ scale: isActive ? 1.1 : 0.8 }}
            >
              {/* Active Minimalist Glow */}
              {isActive && (
                 <motion.div
                   layoutId="sidebar-active-glow"
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   className="absolute inset-0 bg-white/10 blur-xl rounded-full"
                 />
              )}
              
              {/* Icon */}
              <div className="relative z-10 scale-90 md:scale-100 text-white transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Bottom Decor */}
      <div className="absolute bottom-10 w-[1px] h-20 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  );
};

export default Sidebar;