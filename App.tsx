
import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Relivo } from './components/Relivo';
import { Podcast } from './components/Podcast';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Relivo />
        <Podcast />
        <Contact />
      </main>
    </div>
  );
}

export default App;
