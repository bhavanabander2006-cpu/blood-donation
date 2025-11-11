
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative bg-white pt-20 pb-24 md:pt-32 md:pb-40">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')"}}></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Give the Gift of Life.
          <span className="block text-red-500 mt-2">Donate Blood Today.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          A single donation can save up to three lives. Your simple act of kindness can make a world of difference for families in need.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#find-center"
            className="bg-red-500 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Find a Donation Center
          </a>
          <a
            href="#eligibility"
            className="bg-white text-red-500 border-2 border-red-200 font-bold text-lg px-8 py-4 rounded-full hover:bg-red-50 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Check Eligibility
          </a>
        </div>
      </div>
    </section>
  );
};
