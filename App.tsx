
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Relivo } from './components/Relivo';
import { Podcast } from './components/Podcast';
import { Contact } from './components/Contact';
import { WillemChat } from './components/WillemChat';
import { AgentPage } from './components/AgentPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'agent'>('home');

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      <Navigation onNavigate={(page) => setCurrentPage(page)} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <About />
            <Relivo />
            <Podcast />
            <Contact />
          </>
        ) : (
          <AgentPage onBack={() => setCurrentPage('home')} />
        )}
      </main>
      <WillemChat isVisible={currentPage === 'home'} />
    </div>
  );
}

export default App;
