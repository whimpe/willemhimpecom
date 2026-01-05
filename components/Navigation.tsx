
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Linkedin, Instagram, Mail, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Relivo', href: '#relivo' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Contact', href: '#contact' },
];

interface NavigationProps {}

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.47 2.01.41.68 1.14 1.16 1.93 1.28.67.1 1.37-.09 1.93-.46.57-.39.96-1.01 1.06-1.7.07-1.1.06-2.22.06-3.33.01-4.67-.01-9.33.02-14z" />
  </svg>
);

export const Navigation: React.FC<NavigationProps> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#') && href.length > 1) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Socials = () => (
    <div className="flex items-center gap-4 text-gray-400">
      <a href="https://linkedin.com/in/willem-himpe" target="_blank" className="hover:text-white transition-colors">
        <Linkedin size={18} strokeWidth={1.5} />
      </a>
      <a href="https://instagram.com/willem_himpe" target="_blank" className="hover:text-white transition-colors">
        <Instagram size={18} strokeWidth={1.5} />
      </a>
      <a href="https://youtube.com/@willemhimpe" target="_blank" className="hover:text-white transition-colors">
        <Youtube size={18} strokeWidth={1.5} />
      </a>
      <a href="https://tiktok.com/@willemhimpe" target="_blank" className="hover:text-white transition-colors">
        <TikTokIcon size={18} />
      </a>
      <a href="https://x.com/willem_himpe" target="_blank" className="hover:text-white transition-colors">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
      </a>
      <a href="mailto:willem@relivo.io" className="hover:text-white transition-colors">
        <Mail size={18} strokeWidth={1.5} />
      </a>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled || mobileMenuOpen
            ? 'bg-apple-black/80 backdrop-blur-xl border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('#')}
              className="text-xl font-semibold tracking-tight z-50 relative text-white"
            >
              Willem Himpe
            </button>
            <div className="hidden xl:block">
              <Socials />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <a
              href="#contact"
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
            >
              Work With Me
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col items-start space-y-6"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-3xl font-bold text-white tracking-tight"
              >
                {item.label}
              </button>
            ))}
            <div className="h-px w-full bg-white/10 my-4" />
            <div className="flex flex-col gap-6 w-full">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-xl font-medium text-gray-300"
              >
                Book a Call <ArrowRight size={20} />
              </a>
              <div className="pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Connect</p>
                <Socials />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
