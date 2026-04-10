import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)", scale: 0.98 },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
};

// --- OFFICIAL LEETCODE LOGO SVG ---
const LeetCodeLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.513-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.473 3.835-1.452l2.609-2.636c.514-.514.498-1.366-.037-1.901-.536-.535-1.387-.552-1.902-.038z"/>
    <path d="M20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
  </svg>
);

// --- DYNAMIC LEETCODE COMPONENT (RESPONSIVE & COMPACT ON MOBILE) ---
const LeetCodeStatCard = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await res.json();
        if (data.status === "success") {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch LeetCode stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [username]);

  return (
    // THE FIX: Removed massive fixed heights on mobile. Uses flex-col xl:w-[350px] for layout matching.
    <div className="relative w-full xl:w-[350px] shrink-0 bg-[#050505] border border-[#ffa116]/20 p-5 md:p-8 flex flex-col rounded-[2rem] overflow-hidden group hover:border-[#ffa116]/50 transition-colors duration-500">
      
      {/* Background Watermark */}
      <div className="absolute top-[-20%] right-[-10%] p-8 opacity-5 pointer-events-none">
        <LeetCodeLogo className="w-48 h-48 md:w-64 md:h-64" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 border border-white/10 rounded-lg group-hover:bg-[#ffa116]/10 transition-colors">
            <LeetCodeLogo className="w-5 h-5 text-[#ffa116]" />
          </div>
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white">LeetCode</h3>
        </div>
        <a href={`https://leetcode.com/u/${username}/`} target="_blank" rel="noreferrer" className="text-[10px] md:text-xs font-mono text-neutral-500 hover:text-[#ffa116] flex items-center gap-1 transition-colors">
          Profile <ArrowUpRight size={14} />
        </a>
      </div>

      {loading ? (
        // THE FIX: Crazy Pattern Data Loader instead of basic circle!
        <div className="flex-1 flex flex-col items-center justify-center py-8 gap-4 z-10">
          <div className="flex gap-1.5 items-end h-8">
             {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-[#ffa116] rounded-full"
                  animate={{ height: ["10px", "32px", "10px"] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                />
             ))}
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#ffa116] uppercase animate-pulse">Syncing...</span>
        </div>
      ) : stats ? (
        // THE FIX: Flex-row on mobile screens so it fits compactly, Flex-col on Desktop!
        <div className="relative z-10 flex-1 flex flex-col sm:flex-row xl:flex-col gap-4 md:gap-8 justify-between">
          
          <div className="flex-1 grid grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 md:p-4">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block mb-1">Total_Solved</span>
              <span className="text-2xl md:text-4xl font-light text-white">{stats.totalSolved}</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 md:p-4">
              <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest block mb-1">Global_Rank</span>
              <span className="text-lg md:text-2xl font-light text-white">#{stats.ranking.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex-1 space-y-3 md:space-y-4 font-mono text-[10px] md:text-xs flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <span className="w-12 md:w-14 text-[#00b8a3]">Easy</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#00b8a3]" style={{ width: `${(stats.easySolved / stats.totalEasy) * 100}%` }}></div>
              </div>
              <span className="w-8 text-right text-white">{stats.easySolved}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 md:w-14 text-[#ffc01e]">Medium</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffc01e]" style={{ width: `${(stats.mediumSolved / stats.totalMedium) * 100}%` }}></div>
              </div>
              <span className="w-8 text-right text-white">{stats.mediumSolved}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 md:w-14 text-[#ff375f]">Hard</span>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#ff375f]" style={{ width: `${(stats.hardSolved / stats.totalHard) * 100}%` }}></div>
              </div>
              <span className="w-8 text-right text-white">{stats.hardSolved}</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-red-400 text-xs font-mono py-8">
          [ API Connection Failed ]
        </div>
      )}
    </div>
  );
};

export const AchievementsSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // FIXED USERNAME (Your actual github handle)
  const LEETCODE_USERNAME = "codea13"; 

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
      desc: "Participated in Hackspora, a collaborative hackathon focused on building innovative software solutions within a limited time frame.", 
      year: "2025",
      image: "/assets/hackathons/kahe.png", 
      link: ""
    },
    { 
      id: 3, 
      title: "Smart X Hackathon - Participant", 
      desc: "Presented a technical project/paper at the Smart X Hackathon, a national-level innovation event organized by the IoT Incubation Centre.", 
      year: "2025",
      image: "/assets/hackathons/ehs.png", 
      link: ""
    },
    { 
      id: 4, 
      title: "NPTEL: GOOGLE CLOUD", 
      desc: "An 8-week certification program offered by IIT Kharagpur through NPTEL, focused on the fundamentals of modern cloud infrastructure.", 
      year: "2024",
      image: "/assets/certificates/nptel.png",
      link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs131/Course/NPTEL24CS131S15240051104198596.pdf"
    },
    { 
      id: 5, 
      title: "Data Structures & Algorithms", 
      desc: "Completed a course focused on implementing fundamental data structures and algorithms using the C programming language.", 
      year: "2025",
      image: "/assets/certificates/dsa.png",
      link: "https://coursera.org/share/8f5d38b4e4ac07d50a09073b48235f9f"
    },
    { 
      id: 6, 
      title: "JavaScript Essentials", 
      desc: "A foundational course focused on mastering the fundamentals of JavaScript programming and modern web applications.", 
      year: "2025",
      image: "/assets/certificates/jsb.png",
      link: "https://coursera.org/share/9c0e313436bee0431f4ab75c6e06b14c"
    },
    { 
      id: 7, 
      title: "Modern JS: OOP, DOM", 
      desc: "Completed an advanced JavaScript course focused on building dynamic and interactive web applications.", 
      year: "2025",
      image: "/assets/certificates/jsm.png",
      link: "https://coursera.org/share/74aa094480d0ce5e1026d3eaffcd57d5"
    },
    { 
      id: 8, 
      title: "Advanced JavaScript", 
      desc: "Completed an advanced-level JavaScript course focused on writing scalable, efficient, and maintainable client-side applications.", 
      year: "2025",
      image: "/assets/certificates/ajs.png",
      link: "https://coursera.org/share/8bfe86b26f833d9d9a8b00c0a7c01d8c"
    },
    { 
      id: 9, 
      title: "Intro to Git and GitHub", 
      desc: "Completed a course by Google focused on mastering version control and collaborative software development.", 
      year: "2025",
      image: "/assets/certificates/git.png",
      link: "https://coursera.org/verify/..."
    },
    { 
      id: 10, 
      title: "MongoDB & AI", 
      desc: "Completed a certification focused on the fundamentals of NoSQL databases and AI-driven data applications.", 
      year: "2025",
      image: "/assets/certificates/mongo.png",
      link: "#"
    },
    { 
      id: 11, 
      title: "Intermediate OOP with Java", 
      desc: "Completed a project-based course focused on applying Object-Oriented Programming principles using Java.", 
      year: "2025",
      image: "/assets/certificates/ioop.png",
      link: "https://coursera.org/share/0c9150f2f8ec36d0fbbb426b1fa6838d"
    },
    { 
      id: 12, 
      title: "Front-End Development", 
      desc: "Completed a course focused on building responsive and visually structured web interfaces using core technologies.", 
      year: "2025",
      image: "/assets/certificates/fwd.png",
      link: "#"
    },
    { 
      id: 13, 
      title: "Azure Fundamentals", 
      desc: "Completed a course focused on understanding the core concepts of Microsoft Azure cloud services.", 
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
    <section className="relative w-full h-full flex flex-col items-center justify-center text-white gap-4 md:gap-8 py-2 md:py-16 overflow-hidden">
      
      <motion.div variants={containerVar} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="z-10 w-full relative flex flex-col items-center">
        
        <div className="max-w-[1600px] mx-auto w-full px-6 md:px-8 mb-4 md:mb-12 mt-2 md:mt-0">
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

        <motion.div variants={itemVar} className="relative w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row gap-6 md:gap-8 px-6 md:px-8">
          
          {/* THE FIX: Highly compact LeetCode bar on mobile */}
          <LeetCodeStatCard username={LEETCODE_USERNAME} />

          <div className="flex-1 overflow-hidden relative group rounded-[2rem]">
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
              className="flex gap-4 md:gap-8 w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4" 
            >
              {duplicatedAchievements.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="group/card relative w-[85vw] sm:w-[350px] md:w-[400px] h-[400px] md:h-[450px] cursor-pointer perspective-[1000px] shrink-0"
                >
                  <div className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                    
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white/[0.02] backdrop-blur-md border border-white/10 p-6 md:p-10 flex flex-col rounded-[2rem] overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                       <span className="relative z-10 text-[10px] md:text-xs font-mono font-medium text-neutral-500 mb-3 md:mb-6 block tracking-[0.2em] uppercase">
                          {item.year}
                       </span>
                       <h3 className="relative z-10 text-xl md:text-3xl font-medium mb-3 md:mb-4 tracking-tight text-white leading-tight">
                          {item.title}
                       </h3>
                       <p className="relative z-10 text-neutral-400 text-xs md:text-sm leading-relaxed mt-auto font-light">
                          {item.desc}
                       </p>
                       <div className="relative z-10 mt-4 md:mt-6 flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase">
                          Hover to view <ArrowUpRight size={14} />
                       </div>
                    </div>

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
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};