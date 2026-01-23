import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, ChevronRight, Github, Linkedin, Mail, Trophy, Award, 
  Code, Cpu, Target, MapPin, Download 
} from "lucide-react";

// --- HERO SECTION ---
export const HeroSection = () => (
  <div className="flex flex-col items-start gap-6 md:gap-8 w-full">
    
    {/* Headline - Adjusted for Mobile */}
    <div className="relative w-full">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.95] md:leading-[0.9]">
        CRAFTING <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
          INTELLIGENT
        </span> <br />
        SOLUTIONS.
      </h1>
    </div>

    {/* Content Container - Stacks on Mobile */}
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl border-l-0 lg:border-l-2 border-white/10 pl-0 lg:pl-8 mt-2">
      
      {/* Bio */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-white">
          Hi, I'm Aditya. <span className="text-gray-500 block md:inline">Full Stack Engineer.</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          I am a 2nd-year <strong>B.Sc Computer Science</strong> student aiming for a top-tier product company. I build scalable backend systems and sleek frontends using <strong>Java</strong> and the <strong>MERN</strong> stack.
        </p>

        {/* Tech Stack - Mobile Friendly Wrap */}
        <div className="flex flex-wrap gap-2 mt-2">
          {["Java Core", "React.js", "Node.js", "MongoDB", "DSA", "System Design"].map((tech) => (
            <span key={tech} className="px-2 py-1 text-[10px] md:text-xs font-mono border border-white/10 rounded bg-white/5 text-cyan-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Grid - Fixed for Mobile */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 w-full lg:w-auto min-w-[200px]">
         <StatCard icon={<Target size={18} className="text-cyan-400"/>} label="Target" value="Product Dev" />
         <StatCard icon={<Cpu size={18} className="text-purple-400"/>} label="Focus" value="Scalability" />
         <StatCard icon={<Code size={18} className="text-yellow-400"/>} label="Stack" value="Java + MERN" />
         <StatCard icon={<MapPin size={18} className="text-red-400"/>} label="Base" value="India" />
      </div>
    </div>

    {/* CTAs */}
    <div className="flex flex-wrap items-center gap-4 mt-2">
      <Link to="/projects" className="flex-1 md:flex-none justify-center group px-6 py-3 bg-white text-black font-bold text-xs md:text-sm tracking-widest uppercase rounded flex items-center gap-2 hover:bg-cyan-400 transition-all">
        View Work <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
      </Link>
      <a href="/resume.pdf" target="_blank" className="flex-1 md:flex-none justify-center px-6 py-3 border border-white/20 text-white font-bold text-xs md:text-sm tracking-widest uppercase rounded flex items-center gap-2 hover:bg-white/10 transition-all">
        CV <Download size={16} />
      </a>
    </div>
  </div>
);

// Helper Component for Stats
const StatCard = ({ icon, label, value }) => (
  <div className="p-3 md:p-4 bg-white/5 rounded border border-white/5 hover:border-cyan-500/30 transition-colors">
    <div className="mb-2">{icon}</div>
    <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">{label}</p>
    <p className="text-xs md:text-sm font-bold text-white">{value}</p>
  </div>
);

// --- OTHER SECTIONS (Unchanged but exported) ---
export const ProjectsSection = () => (
    <div className="text-white">Projects Section Content...</div>
);
export const AchievementsSection = () => (
    <div className="text-white">Achievements Section Content...</div>
);
export const AboutSection = () => (
    <div className="text-white">About Section Content...</div>
);
export const ContactSection = () => (
    <div className="text-white">Contact Section Content...</div>
);