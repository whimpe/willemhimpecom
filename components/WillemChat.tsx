
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ArrowUp,
  MessageSquare, HelpCircle, MessageCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

type ViewMode = 'inbox' | 'chat';

interface WillemChatProps {
  isVisible?: boolean;
}

export const WillemChat: React.FC<WillemChatProps> = ({ isVisible = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewMode>('inbox');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, timestamp: string}[]>([
    { 
      role: 'assistant', 
      content: "Hi there 👋\n\nYou are now speaking with Willem Himpe's AI Agent. How can I help you today?", 
      timestamp: 'Just now' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, view]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: now }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the Willem Himpe AI Agent. Willem is an entrepreneur (Relivo), speaker, and host of the Unquestioned Podcast. 
          Tagline: "I build companies with innovative products."
          Your tone is premium, professional, yet approachable. 
          Encourage checking out Relivo.io or listening to the Unquestioned Podcast.`,
          temperature: 0.7,
        },
      });

      const text = response.text || "I'm having a little trouble connecting. Could you try asking that again?";
      setMessages(prev => [...prev, { role: 'assistant', content: text, timestamp: 'Just now' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Willem's server is busy!", timestamp: 'Just now' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[380px] md:w-[420px] h-[600px] max-h-[80vh] bg-[#0d0d0d] border border-white/10 rounded-[1.5rem] shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-hidden">
              {view === 'inbox' ? (
                <div className="flex flex-col h-full bg-[#0d0d0d]">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Messages</h2>
                    <div 
                      onClick={() => setView('chat')}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                        <MessageSquare size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-white truncate">Chat with Willem AI</h4>
                          <span className="text-[11px] text-gray-500">Just now</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {messages[messages.length - 1].content}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto p-6 text-center space-y-4">
                    <button 
                      onClick={() => setView('chat')}
                      className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg shadow-white/5"
                    >
                      Ask a question <HelpCircle size={18} />
                    </button>
                    <div className="flex items-center justify-center gap-1.5 text-gray-600">
                      <span className="text-[11px] font-bold uppercase tracking-wider">Powered by Google</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full bg-[#0d0d0d] overscroll-contain">
                  <div className="flex-none px-5 py-4 flex items-center justify-between bg-[#0d0d0d] border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setView('inbox')}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <MessageSquare size={20} className="text-white" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-base font-bold text-white leading-tight">Willem AI</h4>
                          <span className="text-[13px] text-gray-400">Online</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
                      <X size={20} />
                    </button>
                  </div>

                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar scroll-smooth">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[88%] px-5 py-4 rounded-[1.5rem] text-[15px] leading-relaxed prose-chat ${
                          m.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-[#262626] text-white rounded-tl-none'
                        }`}>
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                        <div className="mt-2 px-1">
                          <span className="text-[11px] text-gray-500 font-medium">
                            {m.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex flex-col items-start">
                        <div className="bg-[#262626] px-4 py-3 rounded-[1.5rem] rounded-tl-none">
                          <div className="flex gap-1.5 items-center h-4">
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-none p-4 bg-[#0d0d0d] border-t border-white/5">
                    <div className="relative border-2 border-white/10 rounded-[1.5rem] bg-transparent focus-within:border-white/30 transition-colors h-[80px]">
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
                        placeholder="Type a message..."
                        className="w-full h-full bg-transparent px-5 pt-4 pb-4 text-[15px] text-white focus:outline-none resize-none placeholder-gray-500 overflow-hidden"
                      />
                      <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="absolute bottom-2 right-2 p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all disabled:opacity-30"
                      >
                        <ArrowUp size={18} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-black text-white border border-white/20 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.1)] flex items-center justify-center z-[70]"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} className="text-white/90" />}
      </motion.button>
    </div>
  );
};
