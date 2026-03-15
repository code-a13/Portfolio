import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, Github, Linkedin, Terminal } from "lucide-react";

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

    const payload = {
      access_key: "642c75e1-4f3f-423b-82b7-0cda2dd1460f", 
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
    <section className="relative w-full h-full flex flex-col justify-center bg-transparent text-white overflow-hidden px-4 py-0 md:py-16">
      
      {/* THE FIX: Gap reduced to gap-4 on mobile to pull form closer to the text */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-24 relative z-10 px-0 md:px-8 mt-2 md:mt-0">
        
        <motion.div 
          variants={containerVar} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          // THE FIX: Space reduced to space-y-3
          className="flex flex-col justify-center space-y-3 md:space-y-10"
        >
          {/* THE FIX: Space reduced to space-y-2 */}
          <div className="space-y-2 md:space-y-6">
            <motion.div variants={itemVar} className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-white"></span>
              </span>
              <span className="text-[8px] md:text-[10px] font-mono font-medium text-white tracking-[0.2em] uppercase">Available for work</span>
            </motion.div>

            {/* THE FIX: Mobile text reduced to text-4xl so it easily fits on one line or a very tight two lines */}
            <motion.h2 variants={itemVar} className="text-4xl sm:text-5xl md:text-8xl font-medium tracking-tighter uppercase leading-none text-white">
              Let's <br /> <span className="font-serif italic text-neutral-500 lowercase">collaborate.</span>
            </motion.h2>

            {/* THE FIX: Text size reduced to text-[10px] on mobile */}
            <motion.p variants={itemVar} className="text-neutral-400 text-[10px] md:text-lg max-w-md font-light leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-none">
              Whether it's scalable Java architecture, full-stack MERN applications, or core engineering concepts—my inbox is open.
            </motion.p>
          </div>

          {/* THE FIX: Strict grid-cols-3 on mobile to force social buttons onto a SINGLE row. NEVER stacks vertically now! */}
          <motion.div variants={itemVar} className="grid grid-cols-3 md:flex md:flex-col gap-2 md:gap-4 pt-0 md:pt-4">
            <a href="mailto:your.email@gmail.com" className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 w-full py-1.5 md:py-0 rounded-xl md:rounded-none border border-white/10 md:border-0 bg-white/[0.02] md:bg-transparent">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full border md:border border-white/10 md:bg-white/[0.02] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Mail size={10} className="md:w-[18px] md:h-[18px]" />
              </div>
              <span className="font-mono text-[8px] md:text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">Email</span>
            </a>
            <a href="https://github.com/code-a13" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 w-full py-1.5 md:py-0 rounded-xl md:rounded-none border border-white/10 md:border-0 bg-white/[0.02] md:bg-transparent">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full border md:border border-white/10 md:bg-white/[0.02] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Github size={10} className="md:w-[18px] md:h-[18px]" />
              </div>
              <span className="font-mono text-[8px] md:text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">Github</span>
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer" className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 w-full py-1.5 md:py-0 rounded-xl md:rounded-none border border-white/10 md:border-0 bg-white/[0.02] md:bg-transparent">
              <div className="w-6 h-6 md:w-12 md:h-12 rounded-full border md:border border-white/10 md:bg-white/[0.02] flex items-center justify-center group-hover:bg-[#0A66C2] md:group-hover:border-[#0A66C2] group-hover:text-white transition-all duration-500">
                <Linkedin size={10} className="md:w-[18px] md:h-[18px]" />
              </div>
              <span className="font-mono text-[8px] md:text-sm tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: Premium Form Container --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }} 
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          viewport={{ once: true }}
          // THE FIX: Form padding reduced to p-4 on mobile
          className="bg-white/[0.02] border border-white/10 p-4 md:p-12 rounded-2xl md:rounded-[3rem] backdrop-blur-xl h-fit shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 md:py-20 relative z-10">
                <div className="w-12 h-12 md:w-24 md:h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                   <CheckCircle size={24} className="md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-3xl font-medium tracking-tight text-white mb-1">Message Sent</h3>
                <p className="text-neutral-400 text-[10px] md:text-sm font-light">Thank you! I will get back to you shortly.</p>
                <button onClick={() => setStatus("idle")} className="mt-4 md:mt-8 px-6 py-2 bg-white/[0.05] border border-white/10 text-[8px] md:text-xs font-mono tracking-widest text-white uppercase rounded-full hover:bg-white hover:text-black transition-all duration-500">
                  Send Another
                </button>
              </motion.div>
            ) : (
              // THE FIX: Form field gap compressed to space-y-1.5
              <form onSubmit={handleSubmit} className="space-y-1.5 md:space-y-6 relative z-10">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-2 md:ml-4 flex items-center gap-1.5">
                     <Terminal size={8} className="md:w-[10px] md:h-[10px]" /> Name
                  </label>
                  {/* THE FIX: Vertical padding compressed to py-2 */}
                  <input required disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 text-white text-[10px] md:text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] transition-all duration-500 disabled:opacity-50" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-2 md:ml-4 flex items-center gap-1.5">
                     <Mail size={8} className="md:w-[10px] md:h-[10px]" /> Email
                  </label>
                  {/* THE FIX: Vertical padding compressed to py-2 */}
                  <input required type="email" disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-4 text-white text-[10px] md:text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] transition-all duration-500 disabled:opacity-50" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 ml-2 md:ml-4">Message</label>
                  {/* THE FIX: Textarea minimum height brutally reduced to min-h-[40px] and py-2 */}
                  <textarea required disabled={status === "sending"} className="w-full bg-[#050505] border border-white/10 rounded-xl md:rounded-2xl px-3 md:px-6 py-2 md:py-5 text-white text-[10px] md:text-sm font-light focus:outline-none focus:border-white/40 focus:bg-white/[0.02] min-h-[40px] md:min-h-[140px] resize-none transition-all duration-500 disabled:opacity-50" placeholder="Tell me about your project..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}/>
                </div>
                
                {/* THE FIX: Button height reduced to py-2.5 */}
                <button 
                  disabled={status === "sending"}
                  className="w-full mt-2 md:mt-4 py-2.5 md:py-5 bg-white text-black rounded-xl md:rounded-2xl text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {status === "sending" ? "Transmitting..." : "Send Message"} 
                  {!status.includes("sending") && <Send size={10} className="md:w-4 md:h-4" />}
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};