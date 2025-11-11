
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyDonate } from './components/WhyDonate';
import { EligibilityChecker } from './components/EligibilityChecker';
import { FindCenter } from './components/FindCenter';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
      <Header />
      <main>
        <Hero />
        <WhyDonate />
        <EligibilityChecker />
        <FindCenter />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
