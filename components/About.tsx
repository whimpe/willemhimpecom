
import React from 'react';
import { Reveal } from './ui/Reveal';
import { Briefcase, Mic } from 'lucide-react';

const milestones = [
  { year: '2021', title: 'Founded Relivo', desc: 'Revolutionizing event photography with AI.', icon: <Briefcase size={16} /> },
  { year: '2022', title: 'Unquestioned Podcast', desc: 'Started conversations with industry leaders.', icon: <Mic size={16} /> },
];

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
                  I believe real progress happens when humans and technology operate as one. My focus: using AI to remove friction and help companies move toward full autonomy.
                </p>
                <p>
                  At <strong className="text-white">Relivo</strong>, we use AI to instantly deliver event photos. On the <strong className="text-white">Unquestioned Podcast</strong>, Louis Debaere and I explore what it takes to become the next generation of innovators.
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
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
