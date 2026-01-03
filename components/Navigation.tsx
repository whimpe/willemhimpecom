import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Relivo', href: '#relivo' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <a href="#" className="text-xl font-semibold tracking-tight z-50 relative mix-blend-difference text-white">
            Willem Himpe
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item.label}
              </a>
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
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-bold text-white tracking-tight"
              >
                {item.label}
              </a>
            ))}
            <div className="h-px w-full bg-white/10 my-4" />
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 text-xl font-medium text-gray-300"
            >
              Book a Call <ArrowRight size={20} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};