
import React from 'react';
import { BloodDropIcon } from './icons/BloodDropIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
             <a href="#hero" className="flex items-center gap-2 mb-4">
                <BloodDropIcon className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold text-white">LifeFlow</span>
            </a>
            <p className="text-slate-400">Saving lives, one drop at a time. Join our community of heroes.</p>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#why-donate" className="hover:text-red-400 transition-colors">Why Donate?</a></li>
              <li><a href="#eligibility" className="hover:text-red-400 transition-colors">Eligibility</a></li>
              <li><a href="#find-center" className="hover:text-red-400 transition-colors">Find a Center</a></li>
              <li><a href="#testimonials" className="hover:text-red-400 transition-colors">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Contact Us</h3>
            <p>123 Life Saver St, Hope City</p>
            <p>contact@lifeflow.dev</p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} LifeFlow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
