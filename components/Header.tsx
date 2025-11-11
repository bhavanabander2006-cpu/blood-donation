
import React from 'react';
import { BloodDropIcon } from './icons/BloodDropIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#hero" className="flex items-center gap-2">
          <BloodDropIcon className="h-8 w-8 text-red-500" />
          <span className="text-2xl font-bold text-slate-800">LifeFlow</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#why-donate" className="text-slate-600 hover:text-red-500 transition-colors">Why Donate?</a>
          <a href="#eligibility" className="text-slate-600 hover:text-red-500 transition-colors">Check Eligibility</a>
          <a href="#find-center" className="text-slate-600 hover:text-red-500 transition-colors">Find a Center</a>
        </nav>
        <a 
          href="#find-center"
          className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Donate Now
        </a>
      </div>
    </header>
  );
};
