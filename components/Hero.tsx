
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, User, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.47 2.01.41.68 1.14 1.16 1.93 1.28.67.1 1.37-.09 1.93-.46.57-.39.96-1.01 1.06-1.7.07-1.1.06-2.22.06-3.33.01-4.67-.01-9.33.02-14z" />
  </svg>
);

const SocialIcon = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-110 active:scale-95"
  >
    {icon}
  </a>
);

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
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <SocialIcon href="https://linkedin.com/in/willem-himpe" icon={<Linkedin size={22} />} />
                <SocialIcon href="https://instagram.com/willem_himpe" icon={<Instagram size={22} />} />
                <SocialIcon href="https://youtube.com/@willemhimpe" icon={<Youtube size={22} />} />
                <SocialIcon href="https://tiktok.com/@willemhimpe" icon={<TikTokIcon size={22} />} />
                <SocialIcon href="https://x.com/willem_himpe" icon={
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                } />
              </div>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.2}>
              <h1 className="text-4xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2 leading-[1.05] max-w-4xl mx-auto px-4">
                I Build. Sell. Scale.
              </h1>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.3}>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed px-4">
                  Founder of <span className="text-white font-medium">Relivo</span>. 
                  Host of the <span className="text-white font-medium">Unquestioned Podcast</span>. 
                  Developing the intersection of AI and human experience.
              </p>
            </Reveal>

            <Reveal width="100%" direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <a href="#relivo" className="group w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10">
                    <Play size={16} className="fill-black" strokeWidth={3} />
                    See Relivo
                  </a>
                  <a href="#about" className="group w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95">
                    <User size={16} strokeWidth={2.5} />
                    About
                  </a>
              </div>
            </Reveal>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  );
};
