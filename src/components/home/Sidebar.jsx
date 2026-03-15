import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ items, activeIndex }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* ========================================= */}
      {/* 1. DESKTOP VIEW: Unified macOS-Style Panel  */}
      {/* ========================================= */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 h-[85vh] w-[80px] rounded-full bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 flex-col items-center py-8">
        
        {/* Header Logo */}
        <div className="flex-none mb-12">
           <h1 className="text-lg font-black tracking-[0.2em] text-white [writing-mode:vertical-rl] rotate-180 opacity-90 select-none">
             ADITYA
           </h1>
        </div>

        {/* Navigation Icons (No more buggy dragging!) */}
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-6">
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={`desktop-${item.id}`}
                  onClick={() => navigate(item.path)}
                  className="relative w-12 h-12 flex items-center justify-center cursor-pointer group"
                >
                  {/* Sliding Active Background Bubble */}
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/20"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {/* Icon */}
                  <div className={`relative z-10 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-neutral-500 scale-100 group-hover:text-white group-hover:scale-110'}`}>
                    {item.icon}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ========================================= */}
      {/* 2. MOBILE VIEW: Centered Floating Island    */}
      {/* ========================================= */}
      {/* THE FIX: Fixed width and perfectly centered using left-1/2 and -translate-x-1/2 */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] h-[70px] rounded-full bg-[#0a0a0a]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] z-50 flex items-center justify-around px-2">
          {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                  <div
                      key={`mobile-${item.id}`}
                      onClick={() => navigate(item.path)}
                      className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-pointer"
                  >
                      {/* Sliding Active Background Bubble for Mobile */}
                      {isActive && (
                         <motion.div 
                            layoutId="mobile-active-bg" 
                            className="absolute inset-0 bg-white/10 rounded-full border border-white/20" 
                            transition={{ type: "spring", stiffness: 300, damping: 25 }} 
                         />
                      )}
                      {/* Icon */}
                      <div className={`relative z-10 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-neutral-500 scale-90'}`}>
                          {item.icon}
                      </div>
                  </div>
              )
          })}
      </div>
    </>
  );
};

export default Sidebar;