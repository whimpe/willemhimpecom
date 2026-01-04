
import React, { useState, useRef } from 'react';
import { Reveal } from './ui/Reveal';
import { Mic, PlayCircle, ExternalLink, Clock, User, ChevronLeft, ChevronRight, Grid, Rows } from 'lucide-react';
import { Episode } from '../types';

const spotifyUrl = "https://open.spotify.com/show/2YRpgs8Y98hzXCrldER2ep";

const episodes: Episode[] = [
  {
    id: '1',
    title: "AI & The Future of Event Experience",
    guest: "Willem Himpe Solo",
    duration: "42:15",
    image: "https://images.unsplash.com/photo-1478737270239-2fccd27ee8fb?q=80&w=2070&auto=format&fit=crop",
    link: spotifyUrl
  },
  {
    id: '2',
    title: "Scaling Creativity in a Tech World",
    guest: "Sarah Jenkins",
    duration: "35:40",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    link: spotifyUrl
  },
  {
    id: '3',
    title: "The Personal Branding Playbook",
    guest: "David Arquette",
    duration: "51:20",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
    link: spotifyUrl
  },
  {
    id: '4',
    title: "Building in Public: Lessons Learned",
    guest: "Emma Richardson",
    duration: "47:30",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    link: spotifyUrl
  },
  {
    id: '5',
    title: "From Idea to MVP in 30 Days",
    guest: "Marcus Chen",
    duration: "38:45",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2070&auto=format&fit=crop",
    link: spotifyUrl
  },
  {
    id: '6',
    title: "The Psychology of Innovation",
    guest: "Dr. Lisa Moore",
    duration: "55:10",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    link: spotifyUrl
  }
];

export const Podcast: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const EpisodeCard = ({ ep, i }: { ep: Episode; i: number }) => (
    <div className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={ep.image} 
          alt={ep.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a 
            href={ep.link} 
            target="_blank" 
            className="bg-white text-black p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300"
          >
            <PlayCircle size={32} />
          </a>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-400" />
            {ep.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-blue-400" />
            {ep.guest}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
          {ep.title}
        </h3>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-500">{i === 0 ? 'Newest Episode' : `Episode ${episodes.length - i}`}</span>
          <a href={ep.link} target="_blank" className="text-xs text-blue-400 font-medium hover:underline">Full Details</a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="podcast" className="py-32 bg-black border-t border-white/10 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <Mic size={20} />
                <span className="uppercase tracking-widest text-xs font-bold">Unquestioned Podcast</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Deep dives into the<br />
                <span className="text-gray-500 italic">intersection of tech & humanity.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} direction="left">
            <div className="flex gap-3">
               <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
               >
                 {isExpanded ? <Rows size={16} /> : <Grid size={16} />}
                 {isExpanded ? 'Scroll View' : 'Show All'}
               </button>
               <a 
                href={spotifyUrl}
                target="_blank" 
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#1DB954] text-black font-semibold hover:bg-[#1ed760] transition-all transform hover:scale-105"
               >
                 Listen on Spotify
                 <ExternalLink size={16} />
               </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll View */}
        {!isExpanded && (
          <div className="relative">
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hidden md:flex"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hidden md:flex"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {episodes.map((ep, i) => (
                <div key={ep.id} className="flex-shrink-0 w-[340px] md:w-[380px] snap-start">
                  <EpisodeCard ep={ep} i={i} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expanded Grid View */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((ep, i) => (
              <Reveal key={ep.id} delay={0.1 + (i * 0.05)} width="100%">
                <EpisodeCard ep={ep} i={i} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal width="100%" className="mt-16 text-center">
          <p className="text-gray-500 text-sm italic">
            Synchronized with the latest RSS feed. New episodes every Tuesday.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
