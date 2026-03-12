import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, Github, Linkedin, Terminal } from "lucide-react";

// --- CINEMATIC ANIMATION VARIANTS ---
const containerVar = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const itemVar = {
  hidden: { y: 30, opacity: 0, filter: "blur(12px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

export const ContactSection = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // Serverless Email Payload (Web3Forms)
    const payload = {
      access_key: "642c75e1-4f3f-423b-82b7-0cda2dd1460f", // Macha, paste your exact key here!
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    // FIX: Using min-h-[100dvh] so the mobile keyboard doesn't break the layout when typing
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center bg-transparent text-white overflow-hidden px-4 py-24 md:py-0">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 relative z-10 px-4 md:px-8">
        
        {/* --- LEFT SIDE: Typography & Socials --- */}
        <motion.div 
          variants={containerVar} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="flex flex-col justify-center space-y-10"
        >
          <div className="space-y-6">
            <motion.div variants={itemVar} className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[10px] font-mono font-medium text-white tracking-[0.2em] uppercase">Available for work</span>
            </motion.div>

            <motion.h2 variants={itemVar} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter uppercase leading-[0.9] text-white">
              Let's <br /> <span className="font-serif italic text-neutral-500 lowercase">collaborate.</span>
            </motion.h2>

            <motion.p variants={itemVar} className="text-neutral-400 text-base md:text-lg max-w-md font-light leading-relaxed">
              Whether it's scalable Java architecture, full-stack MERN applications, or discussing pure core engineering concepts—my inbox is always open.
            </motion.p>
          </div>

          {/* Social Links Grid */}
          <motion.div variants={itemVar} className="flex flex-col gap-4 pt-4">
            <a href="mailto:your.email@gmail.com" className="group flex items-center gap-4 w-fit">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Mail size={18} />
              </div>
              <span className="font-mono text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">Email Me</span>
            </a>
            <a href="https://github.com/code-a13" target="_blank" rel="noreferrer" className="group flex items-center gap-4 w-fit">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Github size={18} />
              </div>
              <span className="font-mono text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">Github</span>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="group flex items-center gap-4 w-fit">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:border-[#0A66C2] group-hover:text-white transition-all duration-500">
                <Linkedin size={18} />
              </div>
              <span className="font-mono text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: Premium Form Container --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }} 
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] backdrop-blur-xl h-fit shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle hover gradient inside the form card */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 relative z-10">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                   <CheckCircle size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-medium tracking-tight text-white mb-3">Message Sent</h3>
                <p className="text-neutral-400 text-sm font-light">Thank you! I will get back to you shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 px-8 py-3 bg-white/[0.05] border border-white/10 text-xs font-mono tracking-widest text-white uppercase rounded-full hover:bg-white hover:text-black transition-all duration-500">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-4 flex items-center gap-2">
                     <Terminal size={10} /> Name
                  </label>
                  <input required disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] transition-all duration-500 disabled:opacity-50" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-4 flex items-center gap-2">
                     <Mail size={10} /> Email
                  </label>
                  <input required type="email" disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-4 text-white text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] transition-all duration-500 disabled:opacity-50" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-4">Message</label>
                  <textarea required disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-2xl px-6 py-5 text-white text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] min-h-[140px] resize-none transition-all duration-500 disabled:opacity-50" placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}/>
                </div>
                
                <button 
                  disabled={status === "sending"}
                  className="w-full mt-4 py-5 bg-white text-black rounded-2xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {status === "sending" ? "Transmitting..." : "Send Message"} 
                  {!status.includes("sending") && <Send size={16} />}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};