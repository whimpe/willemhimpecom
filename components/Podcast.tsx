
import React, { useState, useRef, useEffect } from 'react';
import { Reveal } from './ui/Reveal';
import { Mic, PlayCircle, ExternalLink, Clock, User, ChevronLeft, ChevronRight, Grid, Rows } from 'lucide-react';
import { Episode } from '../types';

const spotifyUrl = "https://open.spotify.com/show/2YRpgs8Y98hzXCrldER2ep";
const RSS_FEED_URL = "/api/podcast-feed";

// Fallback episodes in case RSS fetch fails
const fallbackEpisodes: Episode[] = [
  {
    id: '40',
    title: "The Courage to be Disliked",
    guest: "Louis Debaere & Willem Himpe",
    duration: "29:42",
    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/35553904/35553904-1732379533979-fc0b8e1bd63b4.jpg",
    link: "https://podcasters.spotify.com/pod/show/unquestioned/episodes/E40-THE-COURAGE-TO-BE-DISLIKED-e3bbuar"
  },
  {
    id: '3',
    title: "Relivo Business Awards 2022",
    guest: "Louis Debaere & Willem Himpe",
    duration: "14:06",
    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/35553904/35553904-1672620183536-ba72214f4b125.jpg",
    link: "https://podcasters.spotify.com/pod/show/unquestioned/episodes/E3-Relivo-Business-Awards-2022-e1t9djh"
  },
  {
    id: '2',
    title: "How Technology Can Become Invisible",
    guest: "Louis Debaere & Willem Himpe",
    duration: "11:48",
    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/35553904/35553904-1672009503267-76fe4a808fb03.jpg",
    link: "https://podcasters.spotify.com/pod/show/unquestioned/episodes/E2-How-technology-can-become-invisible--focus-on-the-problem-and-deterministic-vs-probabilistic-models-e1sn96k"
  },
  {
    id: '1',
    title: "The 5 Tweets of the Week",
    guest: "Louis Debaere & Willem Himpe",
    duration: "20:12",
    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/35553904/35553904-1671226273881-7c8bc228bd802.jpg",
    link: "https://podcasters.spotify.com/pod/show/unquestioned/episodes/E1-The-5-Tweets-of-the-week-e1sc8co"
  },
  {
    id: '0',
    title: "Introduction, Dogfood and GPT-3",
    guest: "Louis Debaere & Willem Himpe",
    duration: "11:21",
    image: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/35553904/35553904-1670553873767-1b94d33f8b6d2.jpg",
    link: "https://podcasters.spotify.com/pod/show/unquestioned/episodes/E0-Introduction--Dogfood-and-Simpson-terms-and-GPT3-e1s047f"
  }
];

const parseRSSFeed = async (): Promise<Episode[]> => {
  try {
    const response = await fetch(RSS_FEED_URL);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    const items = xml.querySelectorAll('item');
    
    console.log(`Fetched ${items.length} episodes from RSS feed`);
    
    // Parse ALL episodes with their publication dates
    const allEpisodes: { episode: Episode; pubDate: Date }[] = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent?.replace(/^E\d+:\s*/, '') || '';
      const link = item.querySelector('link')?.textContent || spotifyUrl;
      
      // Get duration from itunes:duration
      const durationEl = item.getElementsByTagName('itunes:duration')[0];
      const duration = durationEl?.textContent || '';
      
      // Get image from itunes:image
      const imageEl = item.getElementsByTagName('itunes:image')[0];
      const image = imageEl?.getAttribute('href') || 
                   'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/35553904/35553904-1678543723582-1c9dd0801abf9.jpg';
      
      // Get publication date for sorting
      const pubDateStr = item.querySelector('pubDate')?.textContent || '';
      const pubDate = new Date(pubDateStr);
      
      allEpisodes.push({
        episode: {
          id: String(index),
          title,
          guest: "Louis Debaere & Willem Himpe",
          duration,
          image,
          link
        },
        pubDate
      });
    });
    
    // Sort ALL episodes by publication/upload date (newest first)
    allEpisodes.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
    
    // Take the 5 most recently uploaded episodes
    const latestFiveEpisodes = allEpisodes.slice(0, 5).map(e => e.episode);
    
    console.log('Latest 5 episodes by upload date:', latestFiveEpisodes.map(e => e.title));
    
    return latestFiveEpisodes.length > 0 ? latestFiveEpisodes : fallbackEpisodes;
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    return fallbackEpisodes;
  }
};

export const Podcast: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>(fallbackEpisodes);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parseRSSFeed().then((eps) => {
      setEpisodes(eps);
      setIsLoading(false);
    });
  }, []);

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
    <a 
      href={ep.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={ep.image} 
          alt={ep.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white text-black p-4 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <PlayCircle size={32} />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-white/60" />
            {ep.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-white/60" />
            {ep.guest}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-[#1DB954] transition-colors leading-snug">
          {ep.title}
        </h3>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-500">{i === 0 ? 'Newest Episode' : `Episode ${episodes.length - i}`}</span>
          <span className="text-xs text-white font-medium group-hover:text-[#1DB954] transition-colors">Listen Now →</span>
        </div>
      </div>
    </a>
  );

  return (
    <section id="podcast" className="py-32 bg-black border-t border-white/10 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-4 text-white">
                <Mic size={20} />
                <span className="uppercase tracking-widest text-xs font-bold">Unquestioned Podcast</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Sharing experiences from<br />
                <span className="text-gray-500 italic">startups and big tech.</span>
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
            A podcast where a senior developer and a startup founder discuss tech trends and share experiences.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
