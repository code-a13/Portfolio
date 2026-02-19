import React from "react";

const Placeholder = ({ title }) => (
  <div className="h-full flex items-center justify-center text-5xl font-black text-white/5 tracking-tighter">
    {title}
  </div>
);

export const AchievementsSection = () => <Placeholder title="ACHIEVEMENTS" />;
export const AboutSection = () => <Placeholder title="ABOUT" />;
export const ContactSection = () => <Placeholder title="CONTACT" />;