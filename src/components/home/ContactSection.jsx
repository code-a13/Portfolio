import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle, Github, Linkedin, MessageSquare } from "lucide-react";

export const ContactSection = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <section className="w-full min-h-screen py-20 flex flex-col items-center justify-center relative z-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
        {/* Left Side Info */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none text-white">
            Let's <br /> <span className="text-neutral-500 italic font-serif">Connect.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-md font-light">I'm always open to discussing new projects or opportunities.</p>
        </motion.div>

        {/* Form Container */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-neutral-900/40 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <CheckCircle size={60} className="text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold uppercase tracking-widest text-white">Sent Successfully</h3>
                <button onClick={() => setStatus("idle")} className="mt-4 text-xs underline text-neutral-400">Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 ml-4">Name</label>
                  <input required className="w-full bg-white/[0.05] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-white/40" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 ml-4">Email</label>
                  <input required type="email" className="w-full bg-white/[0.05] border border-white/10 rounded-full px-8 py-4 text-white focus:outline-none focus:border-white/40" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-neutral-500 ml-4">Message</label>
                  <textarea required className="w-full bg-white/[0.05] border border-white/10 rounded-3xl p-6 text-white focus:outline-none focus:border-white/40 min-h-[120px]" placeholder="Hi there!" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}/>
                </div>
                <button className="w-full py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all">
                  {status === "sending" ? "Sending..." : "Send Message"} <Send size={18} />
                </button>
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};