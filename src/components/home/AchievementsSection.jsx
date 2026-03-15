import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)", scale: 0.98 },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const AchievementsSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const achievements = [
    { 
      id: 1, 
      title: "Python Hackathon", 
      desc: "Built and deployed a voice-controlled task management application during an 8-hour hackathon, enabling users to manage tasks through natural voice commands.", 
      year: "2024",
      image: "/assets/hackathons/pyh.png", 
      link: ""
    },
    { 
      id: 2, 
      title: "HackSpora 2025 - KAHE", 
      desc: "Participated in Hackspora, a collaborative hackathon focused on building innovative software solutions within a limited time frame. Worked on brainstorming ideas, rapid prototyping, and implementing functional features under tight deadlines.", 
      year: "2025",
      image: "/assets/hackathons/kahe.png", 
      link: ""
    },
    { 
      id: 3, 
      title: "Smart X Hackathon - Participant", 
      desc: "Presented a technical project/paper at the Smart X Hackathon, a national-level innovation event organized by the IoT Incubation Centre, Erode Sengunthar Engineering College.", 
      year: "2025",
      image: "/assets/hackathons/ehs.png", 
      link: ""
    },
    { 
      id: 4, 
      title: "NPTEL: GOOGLE CLOUD COMPUTING", 
      desc: "An 8-week certification program offered by IIT Kharagpur through NPTEL, focused on the fundamentals of modern cloud infrastructure and scalable computing systems.", 
      year: "2024",
      image: "/assets/certificates/nptel.png",
      link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs131/Course/NPTEL24CS131S15240051104198596.pdf"
    },
    { 
      id: 5, 
      title: "Data Structures & Algorithms", 
      desc: "Completed a course focused on implementing fundamental data structures and algorithms using the C programming language, strengthening problem-solving and computational thinking skills.", 
      year: "2025",
      image: "/assets/certificates/dsa.png",
      link: "https://coursera.org/share/8f5d38b4e4ac07d50a09073b48235f9f"
    },
    { 
      id: 6, 
      title: "JavaScript Essentials for Beginners", 
      desc: "A foundational course focused on mastering the fundamentals of JavaScript programming and understanding the role of JavaScript in modern web applications.", 
      year: "2025",
      image: "/assets/certificates/jsb.png",
      link: "https://coursera.org/share/9c0e313436bee0431f4ab75c6e06b14c"
    },
    { 
      id: 7, 
      title: "Modern JS: OOP, DOM & Events", 
      desc: "Completed an advanced JavaScript course focused on building dynamic and interactive web applications using modern JavaScript concepts.", 
      year: "2025",
      image: "/assets/certificates/jsm.png",
      link: "https://coursera.org/share/74aa094480d0ce5e1026d3eaffcd57d5"
    },
    { 
      id: 8, 
      title: "Advanced JavaScript", 
      desc: "Completed an advanced-level JavaScript course focused on writing scalable, efficient, and maintainable client-side applications using modern JavaScript features.", 
      year: "2025",
      image: "/assets/certificates/ajs.png",
      link: "https://coursera.org/share/8bfe86b26f833d9d9a8b00c0a7c01d8c"
    },
    { 
      id: 9, 
      title: "Introduction to Git and GitHub", 
      desc: "Completed a course by Google focused on mastering version control and collaborative software development using Git and GitHub.", 
      year: "2025",
      image: "/assets/certificates/git.png",
      link: "https://coursera.org/verify/..."
    },
    { 
      id: 10, 
      title: "MongoDB and AI Fundamentals", 
      desc: "Completed a certification focused on the fundamentals of NoSQL databases and AI-driven data applications using MongoDB technologies.", 
      year: "2025",
      image: "/assets/certificates/mongo.png",
      link: "https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/6175487a-e827-497a-addb-ba732246f87a-aditya-k-2e12aeb6-bda4-407b-90bd-a39f98937139-certificate.pdf"
    },
    { 
      id: 11, 
      title: "Intermediate OOP with Java", 
      desc: "Completed a project-based course focused on applying Object-Oriented Programming (OOP) principles using Java to build structured and maintainable software applications.", 
      year: "2025",
      image: "/assets/certificates/ioop.png",
      link: "https://coursera.org/share/0c9150f2f8ec36d0fbbb426b1fa6838d"
    },
    { 
      id: 12, 
      title: "Front-End Web Development", 
      desc: "Completed a course focused on building responsive and visually structured web interfaces using core frontend technologies.", 
      year: "2025",
      image: "/assets/certificates/fwd.png",
      link: "https://www.coursera.org/account/accomplishments/verify/QZMTC4FFLNVT?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course"
    },
    { 
      id: 13, 
      title: "Microsoft Azure Fundamentals", 
      desc: "Completed a course focused on understanding the core concepts of Microsoft Azure cloud services and infrastructure fundamentals.", 
      year: "2025",
      image: "/assets/certificates/ma.png",
      link: "https://coursera.org/share/3e788c65d8d77a1641906ebd8ac4ab75"
    }
  ];

  const duplicatedAchievements = [...achievements, ...achievements];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;
    
    const scroll = () => {
      if (!isPaused) {
        el.scrollLeft += 1; 
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    // THE FIX: Changed to `h-full`. Removed `py-12` on mobile so it centers naturally within the Layout's safe zone.
    <section className="relative w-full h-full flex flex-col items-center justify-center text-white gap-4 md:gap-8 py-2 md:py-16">
      
      <motion.div variants={containerVar} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="z-10 w-full relative flex flex-col items-center">
        
        {/* THE FIX: Compressed mobile margin from mb-8 to mb-4. */}
        <div className="max-w-6xl mx-auto w-full px-6 md:px-8 mb-4 md:mb-12 mt-2 md:mt-0">
          <motion.div variants={itemVar} className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-3 md:mb-6">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
            </span>
            <span className="text-[10px] md:text-xs font-mono font-medium text-white tracking-[0.2em] uppercase">Milestones • Verified</span>
          </motion.div>

          <motion.h2 variants={itemVar} className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tighter text-white leading-none">
            ACHIEVE<span className="font-serif italic text-neutral-500">MENTS.</span>
          </motion.h2>
        </div>

        <motion.div variants={itemVar} className="relative w-full flex group">
          
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="flex gap-4 md:gap-8 w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-8 pb-4 md:pb-8 touch-pan-y" 
          >
            {duplicatedAchievements.map((item, index) => (
              
              // THE FIX: Mobile card height reduced slightly to h-[320px] to ensure it clears the bottom dock entirely.
              <div 
                key={`${item.id}-${index}`} 
                className="group/card relative w-[85vw] sm:w-[350px] md:w-[400px] h-[320px] md:h-[450px] cursor-pointer perspective-[1000px] shrink-0"
              >
                <div className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                  
                  {/* --- FRONT OF CARD --- */}
                  {/* THE FIX: Padding reduced from p-6 to p-5 on mobile to fit the smaller height */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white/[0.02] backdrop-blur-md border border-white/10 p-5 md:p-10 flex flex-col rounded-[2rem] overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                     
                     <span className="relative z-10 text-[10px] md:text-xs font-mono font-medium text-neutral-500 mb-3 md:mb-6 block tracking-[0.2em] uppercase">
                        {item.year}
                     </span>
                     
                     {/* Tightened leading on title to save space */}
                     <h3 className="relative z-10 text-xl md:text-3xl font-medium mb-2 md:mb-4 tracking-tight text-white leading-tight line-clamp-2">
                        {item.title}
                     </h3>
                     
                     <p className="relative z-10 text-neutral-400 text-xs md:text-sm leading-relaxed mt-auto font-light line-clamp-3 md:line-clamp-none">
                        {item.desc}
                     </p>
                     
                     <div className="relative z-10 mt-3 md:mt-6 flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase">
                        Hover to view <ArrowUpRight size={14} />
                     </div>
                  </div>

                  {/* --- BACK OF CARD --- */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] border border-white/20 rounded-[2rem] overflow-hidden flex flex-col group/back">
                     <div className="relative w-full h-full bg-neutral-900 flex items-center justify-center p-3 md:p-4">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain rounded-xl opacity-80 group-hover/back:opacity-100 group-hover/back:scale-105 transition-all duration-700 pointer-events-none"
                        />
                     </div>
                     
                     {item.link && (
                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/back:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-6 md:px-8 py-3 bg-white text-black text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase rounded-full flex items-center gap-2 hover:scale-105 transition-transform duration-300"
                          >
                            Verify <ArrowUpRight size={16} />
                          </a>
                       </div>
                     )}
                  </div>

                </div>
              </div>

            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};