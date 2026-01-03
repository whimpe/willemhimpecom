import React from 'react';
import { Reveal } from './ui/Reveal';
import { Calendar, Briefcase, Award, Linkedin, Instagram, Mail } from 'lucide-react';

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
    <span className="text-xs font-medium text-gray-300 group-hover:text-white">{label}</span>
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

            {/* Social Badges */}
            <Reveal delay={0.5} width="100%">
              <div className="flex flex-wrap gap-3 mt-8">
                <SocialBadge 
                  href="#" 
                  label="LinkedIn" 
                  icon={<Linkedin size={14} />} 
                />
                <SocialBadge 
                  href="#" 
                  label="Instagram" 
                  icon={<Instagram size={14} />} 
                />
                <SocialBadge 
                  href="#" 
                  label="X" 
                  icon={<svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>} 
                />
                <SocialBadge 
                  href="mailto:hello@willem.com" 
                  label="Email" 
                  icon={<Mail size={14} />} 
                />
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
              <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                <img 
                  src="https://raw.githubusercontent.com/WillemHimpe/assets/main/willem_portrait.jpg" 
                  alt="Willem Himpe Portrait" 
                  onError={(e) => {
                    // Fallback to the original placeholder if the specific one fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2187&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale"
                />
                
                {/* Floating Badge */}
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