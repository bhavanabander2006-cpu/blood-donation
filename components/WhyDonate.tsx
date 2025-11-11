
import React from 'react';
import { HeartIcon } from './icons/HeartIcon';
import { ClockIcon } from './icons/ClockIcon';
import { CommunityIcon } from './icons/CommunityIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center transform hover:-translate-y-2">
    <div className="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

export const WhyDonate: React.FC = () => {
  return (
    <section id="why-donate" className="bg-slate-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The Impact of Your Donation</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Every drop counts. Discover why your contribution is so vital.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<HeartIcon className="h-10 w-10 text-red-500" />}
            title="Saves Multiple Lives"
            description="One pint of blood can be separated into different components, helping patients with various medical needs."
          />
          <FeatureCard
            icon={<ClockIcon className="h-10 w-10 text-red-500" />}
            title="A Quick, Simple Process"
            description="The entire process, from registration to refreshment, typically takes about an hour. The donation itself is only 10 minutes."
          />
          <FeatureCard
            icon={<CommunityIcon className="h-10 w-10 text-red-500" />}
            title="Strengthens Community"
            description="Donating blood is a powerful way to support your neighbors and ensure a healthy blood supply for everyone."
          />
        </div>
      </div>
    </section>
  );
};
