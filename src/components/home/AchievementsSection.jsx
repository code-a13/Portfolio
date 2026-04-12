import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)", scale: 0.98 },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
};

// --- UPDATED VERTICAL LEETCODE COMPONENT ---
const LeetCodeStatCard = ({ username }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const CACHE_KEY = `leetcode_data_v3_${username}`;
      const CACHE_EXPIRY = 1000 * 60 * 60; // 1 Hour

      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_EXPIRY) {
          setStats(data);
          setLoading(false);
          return; 
        }
      }

      try {
        const [solvedRes, profileRes, badgesRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/badges`)
        ]);

        if (solvedRes.status === 429 || profileRes.status === 429) {
            throw new Error("Rate Limited. Cached data shown if available.");
        }
        if (!solvedRes.ok || !profileRes.ok) throw new Error("API Issue");

        const solvedData = await solvedRes.json();
        const profileData = await profileRes.json();
        const badgesData = badgesRes.ok ? await badgesRes.json() : { badges: [] };

        if (solvedData.errors || profileData.errors) throw new Error("User not found");

        const newStats = {
          totalSolved: solvedData.solvedProblem || 0,
          ranking: profileData.ranking || 0,
          easySolved: solvedData.easySolved || 0,
          totalEasy: solvedData.totalEasy || 800,
          mediumSolved: solvedData.mediumSolved || 0,
          totalMedium: solvedData.totalMedium || 1600,
          hardSolved: solvedData.hardSolved || 0,
          totalHard: solvedData.totalHard || 700,
          totalQuestions: solvedData.totalQuestions || 3100,
          badges: badgesData.badges || []
        };

        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: newStats,
            timestamp: Date.now()
        }));

        setStats(newStats);
      } catch (error) {
        if (cachedData) {
            setStats(JSON.parse(cachedData).data);
        } else {
            setErrorMsg(error.message || "Sync Failed");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  // --- SVG Ring Math ---
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const getDashArray = (solved, totalQ) => {
      if (!totalQ) return `0 ${circumference}`;
      const percentage = solved / totalQ;
      // Multiplying by a scale factor purely for visual pop if they haven't solved thousands yet, 
      // but keeping it proportional to the real numbers.
      const scaledPercentage = Math.min(percentage * 2, 1); 
      return `${scaledPercentage * circumference} ${circumference}`;
  };

  const getOffset = (previousSolved, totalQ) => {
      if (!totalQ) return 0;
      const percentage = previousSolved / totalQ;
      const scaledPercentage = Math.min(percentage * 2, 1);
      return -(scaledPercentage * circumference);
  };

  return (
    // Fixed vertical stack for BOTH mobile and desktop
    <div className="flex flex-col w-full max-w-[340px] xl:w-[320px] gap-4 shrink-0">
      
      {/* --- RECTANGLE 1: Circular Progress (Screenshot 2 Match) --- */}
      <div className="w-full bg-[#1c1c1e] border border-white/5 p-4 flex items-center justify-between rounded-2xl md:rounded-3xl shadow-lg relative overflow-hidden group hover:border-white/10 transition-colors duration-500">
        
        {loading ? (
           <div className="w-full h-[140px] flex items-center justify-center">
             <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : stats ? (
          <>
            {/* Left Side: Doughnut Chart */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="-rotate-90 w-full h-full" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#2c2c2e" strokeWidth="6" />
                
                {/* Easy Ring */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#00b8a3" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={getDashArray(stats.easySolved, stats.totalQuestions)}
                  strokeDashoffset="0"
                  className="transition-all duration-1000 ease-out"
                />
                
                {/* Medium Ring */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#ffc01e" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={getDashArray(stats.mediumSolved, stats.totalQuestions)}
                  strokeDashoffset={getOffset(stats.easySolved, stats.totalQuestions)}
                  className="transition-all duration-1000 ease-out delay-150"
                />
                
                {/* Hard Ring */}
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#ff375f" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={getDashArray(stats.hardSolved, stats.totalQuestions)}
                  strokeDashoffset={getOffset(stats.easySolved + stats.mediumSolved, stats.totalQuestions)}
                  className="transition-all duration-1000 ease-out delay-300"
                />
              </svg>
              
              {/* Inner Center Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-2xl text-white font-bold tracking-tighter">{stats.totalSolved}</span>
                  <span className="text-[10px] text-neutral-400">/{stats.totalQuestions}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Check size={10} className="text-[#00b8a3]" />
                  <span className="text-[10px] text-white">Solved</span>
                </div>
              </div>
            </div>

            {/* Right Side: Stat Boxes */}
            <div className="flex flex-col gap-1.5 w-[110px]">
              {/* Easy Box */}
              <div className="bg-[#2c2c2e] rounded-lg px-3 py-1.5 flex flex-col items-center justify-center">
                <span className="text-[#00b8a3] text-[11px] font-medium mb-0.5">Easy</span>
                <span className="text-white text-xs font-bold">{stats.easySolved}<span className="text-neutral-400 font-normal">/{stats.totalEasy}</span></span>
              </div>
              {/* Medium Box */}
              <div className="bg-[#2c2c2e] rounded-lg px-3 py-1.5 flex flex-col items-center justify-center">
                <span className="text-[#ffc01e] text-[11px] font-medium mb-0.5">Med.</span>
                <span className="text-white text-xs font-bold">{stats.mediumSolved}<span className="text-neutral-400 font-normal">/{stats.totalMedium}</span></span>
              </div>
              {/* Hard Box */}
              <div className="bg-[#2c2c2e] rounded-lg px-3 py-1.5 flex flex-col items-center justify-center">
                <span className="text-[#ff375f] text-[11px] font-medium mb-0.5">Hard</span>
                <span className="text-white text-xs font-bold">{stats.hardSolved}<span className="text-neutral-400 font-normal">/{stats.totalHard}</span></span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-center text-red-400 text-xs font-mono py-10">{errorMsg}</div>
        )}
      </div>

      {/* --- RECTANGLE 2: Badges (Screenshot 3 Match) --- */}
      <div className="w-full h-[180px] bg-[#1c1c1e] border border-white/5 p-4 flex flex-col rounded-2xl md:rounded-3xl shadow-lg relative group hover:border-white/10 transition-colors duration-500 overflow-hidden">
        
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
             <div className="w-5 h-5 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : stats ? (
          <>
            {/* Top Header */}
            <div className="flex justify-between items-start w-full relative z-10">
              <div className="flex flex-col">
                <span className="text-neutral-400 text-xs font-medium">Badges</span>
                <span className="text-xl text-white font-bold leading-tight">{stats.badges?.length || 0}</span>
              </div>
              <ArrowRight size={18} className="text-neutral-500" />
            </div>

            {/* Middle Swipeable Badges */}
            <div className="flex-1 w-full relative mt-2">
               {stats.badges?.length > 0 ? (
                 <div className="absolute inset-0 flex items-center overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-2">
                   {stats.badges.map((badge, idx) => {
                     const iconUrl = badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`;
                     return (
                       <div key={idx} className="shrink-0 snap-center flex flex-col items-center justify-center transform hover:scale-110 transition-transform">
                         <img 
                           src={iconUrl} 
                           alt={badge.displayName} 
                           className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                         />
                       </div>
                     );
                   })}
                 </div>
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-neutral-600 text-xs">
                   No Badges Yet
                 </div>
               )}
            </div>

            {/* Bottom Footer */}
            <div className="text-neutral-500 text-[10px] mt-auto relative z-10">
              Most Recent Badge
            </div>
          </>
        ) : null}
      </div>

    </div>
  );
};

// --- MAIN ACHIEVEMENTS SECTION ---
export const AchievementsSection = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const LEETCODE_USERNAME = "codea13"; 

  const achievements = [
    { id: 1, title: "Python Hackathon", desc: "Built and deployed a voice-controlled task management application during an 8-hour hackathon, enabling users to manage tasks through natural voice commands.", year: "2024", image: "/assets/hackathons/pyh.png", link: "" },
    { id: 2, title: "HackSpora 2025 - KAHE", desc: "Participated in Hackspora, a collaborative hackathon focused on building innovative software solutions within a limited time frame.", year: "2025", image: "/assets/hackathons/kahe.png", link: "" },
    { id: 3, title: "Smart X Hackathon", desc: "Presented a technical project/paper at the Smart X Hackathon, a national-level innovation event organized by the IoT Incubation Centre.", year: "2025", image: "/assets/hackathons/ehs.png", link: "" },
    { id: 4, title: "NPTEL: GOOGLE CLOUD", desc: "An 8-week certification program offered by IIT Kharagpur through NPTEL, focused on the fundamentals of modern cloud infrastructure.", year: "2024", image: "/assets/certificates/nptel.png", link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs131/Course/NPTEL24CS131S15240051104198596.pdf" },
    { id: 5, title: "Data Structures & Algorithms", desc: "Completed a course focused on implementing fundamental data structures and algorithms using the C programming language.", year: "2025", image: "/assets/certificates/dsa.png", link: "https://coursera.org/share/8f5d38b4e4ac07d50a09073b48235f9f" },
    { id: 6, title: "JavaScript Essentials", desc: "A foundational course focused on mastering the fundamentals of JavaScript programming and modern web applications.", year: "2025", image: "/assets/certificates/jsb.png", link: "https://coursera.org/share/9c0e313436bee0431f4ab75c6e06b14c" },
    { id: 7, title: "Modern JS: OOP, DOM", desc: "Completed an advanced JavaScript course focused on building dynamic and interactive web applications.", year: "2025", image: "/assets/certificates/jsm.png", link: "https://coursera.org/share/74aa094480d0ce5e1026d3eaffcd57d5" },
    { id: 8, title: "Advanced JavaScript", desc: "Completed an advanced-level JavaScript course focused on writing scalable, efficient, and maintainable client-side applications.", year: "2025", image: "/assets/certificates/ajs.png", link: "https://coursera.org/share/8bfe86b26f833d9d9a8b00c0a7c01d8c" },
    { id: 9, title: "Intro to Git and GitHub", desc: "Completed a course by Google focused on mastering version control and collaborative software development.", year: "2025", image: "/assets/certificates/git.png", link: "#" },
    { id: 10, title: "MongoDB & AI", desc: "Completed a certification focused on the fundamentals of NoSQL databases and AI-driven data applications.", year: "2025", image: "/assets/certificates/mongo.png", link: "#" },
    { id: 11, title: "Intermediate OOP with Java", desc: "Completed a project-based course focused on applying Object-Oriented Programming principles using Java.", year: "2025", image: "/assets/certificates/ioop.png", link: "https://coursera.org/share/0c9150f2f8ec36d0fbbb426b1fa6838d" },
    { id: 12, title: "Front-End Development", desc: "Completed a course focused on building responsive and visually structured web interfaces using core technologies.", year: "2025", image: "/assets/certificates/fwd.png", link: "#" },
    { id: 13, title: "Azure Fundamentals", desc: "Completed a course focused on understanding the core concepts of Microsoft Azure cloud services.", year: "2025", image: "/assets/certificates/ma.png", link: "https://coursera.org/share/3e788c65d8d77a1641906ebd8ac4ab75" }
  ];

  const getBrandBorder = (title) => {
    if (title.includes("NPTEL")) return "border-red-500/40 group-hover/card:border-red-500/80";
    if (title.includes("MongoDB")) return "border-green-500/40 group-hover/card:border-green-500/80";
    if (title.includes("JavaScript") || title.includes("Data Structures") || title.includes("Front-End") || title.includes("OOP") || title.includes("Git")) return "border-blue-500/40 group-hover/card:border-blue-500/80";
    if (title.includes("Azure")) return "border-[#008AD7]/40 group-hover/card:border-[#008AD7]/80";
    return "border-white/10 group-hover/card:border-white/40";
  };

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
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-white gap-4 md:gap-8 py-8 md:py-16 overflow-hidden">
      
      <motion.div variants={containerVar} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="z-10 w-full relative flex flex-col items-center">
        
        <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 mb-8 md:mb-12 flex flex-col items-center justify-center text-center">
          <motion.div variants={itemVar} className="inline-flex items-center justify-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-4 md:mb-6">
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

        <motion.div variants={itemVar} className="relative w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center xl:items-stretch gap-6 md:gap-8 px-4 md:px-8">
          
          {/* Injecting our newly structured, vertically stacked component here */}
          <LeetCodeStatCard username={LEETCODE_USERNAME} />

          <div className="w-full flex-1 min-w-0 relative group rounded-2xl md:rounded-[2rem] overflow-hidden">
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
              className="flex gap-4 md:gap-8 w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing pb-4 touch-pan-x" 
            >
              {duplicatedAchievements.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="group/card relative w-[85vw] max-w-[320px] sm:max-w-[350px] md:max-w-[400px] h-[380px] md:h-[420px] cursor-pointer perspective-[1000px] shrink-0"
                >
                  <div className="w-full h-full relative transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">
                    
                    <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#050505] border ${getBrandBorder(item.title)} p-6 md:p-10 flex flex-col justify-between rounded-2xl md:rounded-[2rem] overflow-hidden transition-colors duration-500`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <span className="text-[10px] md:text-xs font-mono font-medium text-neutral-500 mb-3 block tracking-[0.2em] uppercase">
                            {item.year}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight text-white leading-tight line-clamp-2">
                            {item.title}
                        </h3>
                        <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light line-clamp-3 md:line-clamp-4">
                            {item.desc}
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest text-white/30 uppercase mt-4">
                          Hover/Tap to view <ArrowUpRight size={14} />
                      </div>
                    </div>

                    <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#0a0a0a] border ${getBrandBorder(item.title)} rounded-2xl md:rounded-[2rem] overflow-hidden flex flex-col group/back transition-colors duration-500`}>
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