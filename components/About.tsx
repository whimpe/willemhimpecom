
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Calendar, Briefcase, Award } from 'lucide-react';

const TikTokIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.47 2.01.41.68 1.14 1.16 1.93 1.28.67.1 1.37-.09 1.93-.46.57-.39.96-1.01 1.06-1.7.07-1.1.06-2.22.06-3.33.01-4.67-.01-9.33.02-14z" />
  </svg>
);

const milestones = [
  { year: '2023', title: 'Founded Relivo', desc: 'Revolutionizing event photography with AI.', icon: <Briefcase size={16} /> },
  { year: '2022', title: 'Unquestioned Podcast', desc: 'Started conversations with industry leaders.', icon: <Award size={16} /> },
  { year: '2020', title: 'Content Creation', desc: 'began building personal brand & audience.', icon: <Calendar size={16} /> },
];

const SocialBadge = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all group"
  >
    <span className="text-gray-400 group-hover:text-white transition-colors">{icon}</span>
    <span className="text-[10px] md:text-xs font-medium text-gray-300 group-hover:text-white">{label}</span>
  </a>
);

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-black relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <Reveal>
              <h2 className="text-gray-500 font-semibold tracking-wide uppercase text-sm mb-4">About Willem</h2>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                Driven by curiosity, <br />
                defined by execution.
              </h3>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
                <p>
                  I believe in the power of technology to enhance human connection, not replace it. 
                  My journey started with a simple question: "How can we make experiences last longer?"
                </p>
                <p>
                  This curiosity led me to build <strong className="text-white">Relivo</strong>, 
                  where we use AI to instantly deliver event photos to attendees. 
                  Simultaneously, I explore the minds of other creators on the <strong className="text-white">Unquestioned Podcast</strong>.
                </p>
              </div>
            </Reveal>

            {/* Timeline */}
            <div className="mt-12 space-y-6">
              {milestones.map((item, index) => (
                <Reveal key={index} delay={0.6 + (index * 0.1)} direction="left" width="100%">
                  <div className="flex items-start gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                        {item.icon}
                      </div>
                      {index !== milestones.length - 1 && <div className="w-px h-8 bg-white/10 my-2" />}
                    </div>
                    <div>
                      <span className="text-sm font-mono text-gray-500">{item.year}</span>
                      <h4 className="text-white font-medium text-lg">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <Reveal direction="right" width="100%">
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                <img 
                  src="/profile.jpeg" 
                  alt="Willem Himpe Portrait" 
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
                
                <div className="absolute bottom-8 left-8 z-20 bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl max-w-xs">
                  <p className="text-white font-medium text-sm">"Building for the future."</p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
