import React from 'react';
import { Reveal } from './ui/Reveal';
import { Camera, ShieldCheck, Zap, Smartphone } from 'lucide-react';

const features = [
  {
    title: "AI Face Match",
    desc: "Guests find their photos instantly by uploading a selfie.",
    icon: <Camera className="w-6 h-6" />
  },
  {
    title: "Privacy First",
    desc: "GDPR compliant. Your data is secure and never trained on.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Instant Delivery",
    desc: "From shutter to smartphone in seconds.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Mobile Optimized",
    desc: "A flawless experience on any device, no app download needed.",
    icon: <Smartphone className="w-6 h-6" />
  }
];

export const Relivo: React.FC = () => {
  return (
    <section id="relivo" className="py-32 bg-apple-dark relative overflow-hidden scroll-mt-32">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#f23472]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <Reveal width="100%" direction="up">
            <div className="inline-flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-2xl mb-6">
              <span className="text-white font-bold tracking-tight px-4">Relivo</span>
            </div>
          </Reveal>
          <Reveal width="100%" direction="up" delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Event photography,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fe623d] to-[#f23472]">reimagined with AI.</span>
            </h2>
          </Reveal>
          <Reveal width="100%" direction="up" delay={0.2}>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Stop scrolling through thousands of photos. Relivo delivers your memories directly to you using advanced facial recognition.
            </p>
          </Reveal>
        </div>

        {/* Product Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
           {/* Main Phone Mockup */}
           <div className="lg:col-span-7 relative group">
              <Reveal width="100%" className="h-full">
                <div className="relative h-full min-h-[500px] bg-gray-900 rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8 lg:p-12">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#fe623d]/10 via-transparent to-transparent opacity-50" />
                   
                   {/* Abstract Phone UI Representation */}
                   <div className="relative w-64 h-[500px] bg-black border-4 border-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden transform transition-transform duration-700 group-hover:scale-105">
                      <div className="absolute top-0 w-full h-full bg-gray-900">
                        {/* Header */}
                        <div className="h-16 bg-black/50 backdrop-blur-md flex items-center justify-center border-b border-white/5">
                           <div className="w-16 h-4 bg-gray-800 rounded-full" />
                        </div>
                        {/* Grid */}
                        <div className="p-4 grid grid-cols-2 gap-2">
                           {[1,2,3,4,5,6].map(i => (
                             <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                           ))}
                        </div>
                        {/* Floating Action */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-[#fe623d] to-[#f23472] rounded-full shadow-lg shadow-[#f23472]/20">
                           <div className="w-20 h-2 bg-white/80 rounded-full" />
                        </div>
                      </div>
                   </div>
                </div>
              </Reveal>
           </div>

           {/* Feature Grid */}
           <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {features.map((feature, i) => (
                <Reveal key={i} delay={0.2 + (i * 0.1)} width="100%">
                  <div className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-3xl transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#fe623d]/20 flex items-center justify-center text-[#fe623d] mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </Reveal>
              ))}
           </div>
        </div>

        {/* CTA */}
        <div className="text-center">
           <Reveal width="100%" direction="up">
              <a href="https://relivo.io" className="inline-flex items-center gap-2 text-[#fe623d] hover:text-[#f23472] font-medium transition-colors">
                Explore the Platform <span className="text-xl">→</span>
              </a>
           </Reveal>
        </div>

      </div>
    </section>
  );
};