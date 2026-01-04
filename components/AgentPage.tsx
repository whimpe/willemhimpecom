
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowUp, Paperclip, Smile, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Reveal } from './ui/Reveal';

interface AgentPageProps {
  onBack?: () => void;
}

export const AgentPage: React.FC<AgentPageProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { 
      role: 'assistant', 
      content: "Welcome to my dedicated AI space. I'm Willem's digital twin. Ask me anything about Relivo, my podcast, or my background in entrepreneurship and speaking." 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use a ref to track if we should scroll to bottom to prevent jumping on every keypress
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      shouldScrollRef.current = false;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    shouldScrollRef.current = true;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the specialized, full-page AI version of Willem Himpe. 
          Willem is a visionary entrepreneur, professional speaker, and the founder of Relivo (relivo.io), an AI-powered event photography platform that delivers photos instantly via face matching.
          He is also the host of the "Unquestioned Podcast" (available on Spotify: https://open.spotify.com/show/2YRpgs8Y98hzXCrldER2ep).
          
          Tagline: "I build companies with innovative products."

          Tone & Style:
          - Premium, minimalist, and deeply professional (Apple-style).
          - Intelligent, forward-thinking, and human-centric.
          - You should speak as Willem's "Digital Twin".
          
          Key Facts:
          - LinkedIn: @willemhimpe (linkedin.com/in/willem-himpe)
          - Instagram/X: @willem_himpe
          - Relivo: Uses AI to enhance human connection at events.
          - Podcast: Explores the intersection of tech and humanity.
          
          Always encourage users to view Relivo in action or listen to the podcast if relevant. Be concise but insightful.`,
          temperature: 0.8,
        },
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I'm processing that..." }]);
      shouldScrollRef.current = true;
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Failed to connect. Please check your network." }]);
      shouldScrollRef.current = true;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col items-center justify-center bg-black px-6">
      <div className="w-full max-w-4xl flex flex-col h-[85vh] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl shadow-2xl relative">
        {/* Page Header */}
        <div className="flex-none p-6 md:p-8 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Willem AI Agent</h1>
              <p className="text-sm text-gray-500">Digital Twin Interface</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 uppercase tracking-[0.2em]">
              High Fidelity Mode
            </span>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef} 
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar scroll-smooth"
        >
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] p-6 md:p-8 rounded-[2rem] text-[16px] md:text-[17px] leading-relaxed prose-chat ${
                m.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none border border-white/5'
              }`}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white/10 px-6 py-4 rounded-2rem rounded-tl-none border border-white/5">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Big Input Container - Stable Fixed Height to prevent jumping */}
        <div className="flex-none p-6 md:p-10 border-t border-white/10 bg-black/40 h-[140px]">
          <div className="relative group max-w-3xl mx-auto h-full">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Willem's AI..."
              className="w-full h-full bg-white/5 border-2 border-white/10 rounded-[2rem] px-8 py-5 text-lg text-white focus:outline-none focus:border-white/30 transition-all resize-none pr-32 placeholder-gray-600 focus:bg-white/10 overflow-hidden"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
              <button className="hidden sm:block text-gray-500 hover:text-gray-300 transition-colors"><Paperclip size={22} /></button>
              <button className="hidden sm:block text-gray-500 hover:text-gray-300 transition-colors"><Smile size={22} /></button>
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all shadow-xl disabled:opacity-30 disabled:hover:bg-white"
              >
                <ArrowUp size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black/40 pb-4 text-center">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">Powered by Google Gemini</span>
        </div>
      </div>
    </div>
  );
};
