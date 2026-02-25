import React from "react";
import { motion } from "framer-motion";

const MagicBackground = ({ 
  color1 = "bg-white/5", 
  color2 = "bg-gray-500/10", 
  reverse = false,
  blendMode = "mix-blend-screen" // Added default blend mode here!
}) => {
  
  const variant1 = {
    animate: { scale: [1, 1.2, 1], x: [0, 100, -50, 0], y: [0, -50, 50, 0], rotate: [0, 45, 0] },
    transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
  };

  const variant2 = {
    animate: { scale: [1, 1.5, 1.2, 1], x: [0, -100, 50, 0], y: [0, 80, -40, 0], rotate: [0, -30, 0] },
    transition: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <motion.div
        variants={variant1}
        animate="animate"
        // Notice we injected {blendMode} dynamically here
        className={`absolute ${reverse ? 'bottom-[-10%] right-[-10%]' : '-top-[10%] -left-[10%]'} w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] rounded-full blur-[120px] opacity-70 ${blendMode} ${color1}`}
      />
      <motion.div
        variants={variant2}
        animate="animate"
        // And here!
        className={`absolute ${reverse ? '-top-[10%] -left-[10%]' : 'bottom-[-20%] right-[-10%]'} w-[50vw] h-[50vw] min-w-[500px] min-h-[500px] rounded-full blur-[150px] opacity-60 ${blendMode} ${color2}`}
      />
    </div>
  );
};

export default MagicBackground;