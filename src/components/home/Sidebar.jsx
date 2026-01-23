import React from "react";
import { motion } from "framer-motion";

const Sidebar = ({ items, y, activeIndex, handleDragEnd, padding }) => {
  return (
    // Takes full width of the parent container (70px mobile / 80px PC)
    <div className="relative w-full h-full border-r border-white/10 bg-[#080808] z-30 flex flex-col items-center shadow-2xl overflow-hidden">
      
      {/* --- HEADER --- */}
      <div className="absolute top-0 w-full h-[100px] md:h-[120px] flex items-center justify-center border-b border-white/5 bg-[#0a0a0a] z-40">
         <h1 className="text-lg md:text-2xl font-bold tracking-[0.2em] text-white [writing-mode:vertical-rl] rotate-180 opacity-90">
           ADITYA
         </h1>
      </div>

      {/* --- ACTIVE LASER ZONE --- */}
      <div className="absolute top-1/2 left-0 w-full h-[80px] -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full bg-red-500/5 backdrop-blur-[2px]"></div>
          <div className="absolute left-0 w-[2px] h-full bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
          <div className="absolute right-0 w-1 h-2 bg-red-500"></div>
      </div>

      {/* --- DRAGGABLE TAPE --- */}
      <motion.div
        style={{ y }}
        drag="y"
        dragConstraints={{ top: -((items.length - 1) * 80), bottom: 0 }} 
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className="absolute top-0 w-full cursor-grab active:cursor-grabbing z-20"
      >
        <div style={{ height: padding }}></div>

        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={item.id}
              className={`h-[80px] w-full flex items-center justify-center relative transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30 grayscale"}`}
              animate={{ scale: isActive ? 1.1 : 0.8 }}
            >
              {/* Active Glow */}
              {isActive && (
                 <motion.div
                    layoutId="glow"
                    className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"
                 />
              )}
              {/* Icon */}
              <div className="relative z-10 scale-90 md:scale-100">
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