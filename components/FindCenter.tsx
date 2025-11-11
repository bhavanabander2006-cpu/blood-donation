
import React, { useState } from 'react';
import type { DonationCenter } from '../types';
import { findDonationCenters } from '../services/geminiService';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';


const CenterCard: React.FC<{ center: DonationCenter }> = ({ center }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-bold text-red-600 mb-3">{center.name}</h3>
        <div className="space-y-3 text-slate-600">
            <p className="flex items-start gap-3">
                <LocationMarkerIcon className="h-5 w-5 mt-0.5 text-slate-400 flex-shrink-0" />
                <span>{center.address}</span>
            </p>
            <p className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <span>{center.hours}</span>
            </p>
            <p className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-slate-400 flex-shrink-0" />
                <span>{center.phone}</span>
            </p>
        </div>
    </div>
);


export const FindCenter: React.FC = () => {
    const [location, setLocation] = useState('');
    const [centers, setCenters] = useState<DonationCenter[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location) {
            setError('Please enter a location.');
            return;
        }
        setError('');
        setIsLoading(true);
        setSearched(true);
        setCenters([]);
        const geminiResult = await findDonationCenters(location);
        setCenters(geminiResult);
        setIsLoading(false);
    };
    
    return (
        <section id="find-center" className="bg-slate-100 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Find a Donation Center</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Enter your city or zip code to find a convenient location to donate.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter City or ZIP Code..."
                            className="flex-grow px-5 py-3 border border-slate-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                        <button type="submit" disabled={isLoading} className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                             {isLoading ? <><SpinnerIcon /> Searching...</> : 'Search'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>
                
                <div className="mt-12">
                    {isLoading && (
                        <div className="text-center text-slate-600">
                            Searching for centers near you...
                        </div>
                    )}
                    {!isLoading && searched && centers.length === 0 && (
                        <div className="text-center bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-slate-700">No Centers Found</h3>
                            <p className="text-slate-500 mt-2">We couldn't find any donation centers based on your search. Please try a different location.</p>
                        </div>
                    )}
                    {centers.length > 0 && (
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {centers.map((center, index) => (
                                <CenterCard key={index} center={center} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};
