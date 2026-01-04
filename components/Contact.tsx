
import React, { useState } from 'react';
import { Reveal } from './ui/Reveal';
import { Mail, Linkedin, Instagram, Youtube, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.47 2.01.41.68 1.14 1.16 1.93 1.28.67.1 1.37-.09 1.93-.46.57-.39.96-1.01 1.06-1.7.07-1.1.06-2.22.06-3.33.01-4.67-.01-9.33.02-14z" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: 'Collaboration Inquiry', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black relative scroll-mt-32">
        <div className="max-w-5xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <div>
               <Reveal width="100%" direction="up">
                  <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                     Let's build <br />
                     <span className="text-gray-500 italic">the future.</span>
                  </h2>
               </Reveal>
               <Reveal width="100%" direction="up" delay={0.2}>
                  <p className="text-xl text-gray-400 mb-12 max-w-md font-light">
                     Interested in Relivo, the podcast, or a collaborative project? Drop me a message and let's start a conversation.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-gray-300">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <Mail size={20} />
                      </div>
                      <a href="mailto:willem@relivo.io" className="text-lg hover:text-white transition-colors">willem@relivo.io</a>
                    </div>
                  </div>
               </Reveal>
             </div>

             <Reveal width="100%" direction="up" delay={0.3}>
               <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
                 {/* Success Overlay */}
                 {status === 'success' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                      <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Message Received</h3>
                      <p className="text-gray-400">I'll get back to you as soon as possible.</p>
                      <button onClick={() => setStatus('idle')} className="mt-8 text-sm text-gray-500 hover:text-white transition-colors underline">Send another</button>
                    </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                       <input 
                         required
                         type="text" 
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         placeholder="John Doe" 
                         className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                       <input 
                         required
                         type="email" 
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         placeholder="john@example.com" 
                         className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                       />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                     <select 
                       value={formData.subject}
                       onChange={(e) => setFormData({...formData, subject: e.target.value})}
                       className="w-full px-6 py-4 bg-[#111] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-white/30 transition-all appearance-none cursor-pointer"
                     >
                       <option>Collaboration Inquiry</option>
                       <option>Relivo Partnership</option>
                       <option>Podcast Guest Inquiry</option>
                       <option>Speaking Opportunity</option>
                       <option>Other</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                     <textarea 
                       required
                       rows={4}
                       value={formData.message}
                       onChange={(e) => setFormData({...formData, message: e.target.value})}
                       placeholder="How can I help you?" 
                       className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                     ></textarea>
                   </div>
                   
                   <button 
                     type="submit" 
                     disabled={status === 'sending'}
                     className={`w-full py-5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                       status === 'error' ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-gray-200'
                     }`}
                   >
                     {status === 'sending' ? (
                       <>
                         <Loader2 size={18} className="animate-spin" />
                         Encrypting & Sending...
                       </>
                     ) : status === 'error' ? (
                       <>
                         <AlertCircle size={18} />
                         Failed to Send
                       </>
                     ) : (
                       <>
                         <Send size={18} />
                         Send Message
                       </>
                     )}
                   </button>
                   <p className="text-[10px] text-gray-500 text-center uppercase tracking-wider">
                     Direct API delivery to willem@relivo.io
                   </p>
                 </form>
               </div>
             </Reveal>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
               © {new Date().getFullYear()} Willem Himpe. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
               <a href="https://x.com/willem_himpe" target="_blank" className="text-gray-500 hover:text-white transition-colors" aria-label="X (Twitter)">
                 <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                 </svg>
               </a>
               <a href="https://linkedin.com/in/willem-himpe" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
               <a href="https://instagram.com/willem_himpe" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
               <a href="https://youtube.com/@willemhimpe" target="_blank" className="text-gray-500 hover:text-white transition-colors"><Youtube size={20} /></a>
               <a href="https://tiktok.com/@willemhimpe" target="_blank" className="text-gray-500 hover:text-white transition-colors"><TikTokIcon size={20} /></a>
               <a href="mailto:willem@relivo.io" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
         </div>
      </footer>
    </>
  );
};
