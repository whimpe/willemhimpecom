import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Elements */}
      <motion.div 
        style={{ y: y1, opacity: 0.4 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/30 via-black to-black" 
      />
      
      <div className="max-w-7xl mx-auto px-6 z-10 text-center flex flex-col items-center">
        <motion.div 
          style={{ opacity }}
          className="space-y-8"
        >
            <Reveal width="100%" direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-gray-300 backdrop-blur-md mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Available for New Projects
            </div>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2">
                Innovating Experience.
                <br />
                Capturing Moments.
            </h1>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.3}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                Entrepreneur, Speaker, and Founder of <span className="text-white font-medium">Relivo</span>. 
                Host of the <span className="text-white font-medium">Unquestioned Podcast</span>. 
                Building the intersection of AI, events, and personal branding.
            </p>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <a href="#projects" className="group bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
                View My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="https://relivo.io" target="_blank" rel="noreferrer" className="group bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all hover:bg-white/20 active:scale-95">
                <Play size={16} className="fill-white" />
                See Relivo in Action
                </a>
            </div>
            </Reveal>
        </motion.div>
      </div>

      {/* Gradient Overlay for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};