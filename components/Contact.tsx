import React from 'react';
import { Reveal } from './ui/Reveal';
import { ArrowUpRight, Mail, Linkedin, Instagram } from 'lucide-react';

const projects = [
  { id: 1, title: 'TechSummit Keynote', cat: 'Speaking', img: 'https://picsum.photos/600/400?random=4' },
  { id: 2, title: 'Startup Advisory', cat: 'Consulting', img: 'https://picsum.photos/600/400?random=5' },
];

export const Contact: React.FC = () => {
  return (
    <>
      {/* Projects Section */}
      <section id="projects" className="py-24 bg-apple-dark scroll-mt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
           <Reveal width="100%" className="mb-12">
              <h2 className="text-3xl font-bold text-white">Selected Works</h2>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((p, i) => (
                 <Reveal key={p.id} width="100%" delay={i * 0.1}>
                    <div className="group relative rounded-3xl overflow-hidden aspect-video bg-gray-800">
                       <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90" />
                       <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-sm text-gray-400 mb-1">{p.cat}</p>
                          <div className="flex items-center justify-between">
                             <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                             <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0" />
                          </div>
                       </div>
                    </div>
                 </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* Work With Me / Contact */}
      <section id="contact" className="py-32 bg-black relative scroll-mt-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal width="100%" direction="up">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
                 Let's build something <br />
                 <span className="text-gray-500">extraordinary.</span>
              </h2>
           </Reveal>
           <Reveal width="100%" direction="up" delay={0.2}>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                 Whether you want to implement Relivo at your next event, need a speaker, or want to collaborate on content.
              </p>
           </Reveal>
           
           <Reveal width="100%" direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a href="mailto:hello@willem.com" className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                    Book a Call
                 </a>
                 <div className="w-full sm:w-auto relative group">
                    <input 
                      type="email" 
                      placeholder="Join newsletter" 
                      className="w-full px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors">
                       <ArrowUpRight size={16} />
                    </button>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
               © {new Date().getFullYear()} Willem Himpe. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
               <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="X (Twitter)">
                 {/* X Logo */}
                 <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                 </svg>
               </a>
               <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
               <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
               <a href="#" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
         </div>
      </footer>
    </>
  );
};