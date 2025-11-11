
import React, { useState } from 'react';
import type { EligibilityAnswers, EligibilityResult } from '../types';
import { checkEligibility } from '../services/geminiService';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

const ResultCard: React.FC<{ result: EligibilityResult }> = ({ result }) => {
    const statusInfo = {
        Eligible: {
            icon: <CheckCircleIcon className="h-12 w-12 text-green-500" />,
            title: "Likely Eligible!",
            bgColor: "bg-green-50",
            borderColor: "border-green-300",
        },
        Ineligible: {
            icon: <ExclamationCircleIcon className="h-12 w-12 text-yellow-500" />,
            title: "Potentially Ineligible",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-300",
        },
        Consult: {
            icon: <QuestionMarkCircleIcon className="h-12 w-12 text-blue-500" />,
            title: "Consult a Professional",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-300",
        },
    };

    const info = statusInfo[result.status];

    return (
        <div className={`mt-8 p-6 rounded-lg border-2 ${info.borderColor} ${info.bgColor} flex items-start gap-4`}>
            <div>{info.icon}</div>
            <div>
                <h4 className="text-xl font-bold text-slate-800">{info.title}</h4>
                <p className="text-slate-700 mt-1">{result.reason}</p>
                <p className="text-sm text-slate-500 mt-3 italic">
                    Disclaimer: This is not medical advice. Please consult with staff at a donation center for a final eligibility determination.
                </p>
            </div>
        </div>
    );
};


export const EligibilityChecker: React.FC = () => {
    const [answers, setAnswers] = useState<EligibilityAnswers>({
        age: '',
        weight: '',
        lastDonation: 'never',
        health: 'good',
    });
    const [result, setResult] = useState<EligibilityResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answers.age || !answers.weight) {
            setError('Please fill in your age and weight.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult(null);
        const geminiResult = await checkEligibility(answers);
        setResult(geminiResult);
        setIsLoading(false);
    };

    return (
        <section id="eligibility" className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Are You Eligible to Donate?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Answer a few quick questions to see if you meet the basic requirements.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Age (years)</label>
                            <input type="number" name="age" id="age" value={answers.age} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g., 25" required />
                        </div>
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-slate-700 mb-1">Weight (kg)</label>
                            <input type="number" name="weight" id="weight" value={answers.weight} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g., 70" required />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="lastDonation" className="block text-sm font-medium text-slate-700 mb-1">When was your last donation?</label>
                            <select name="lastDonation" id="lastDonation" value={answers.lastDonation} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-red-500 focus:border-red-500">
                                <option value="never">I have never donated</option>
                                <option value="less than 3 months ago">Less than 3 months ago</option>
                                <option value="3-6 months ago">3-6 months ago</option>
                                <option value="more than 6 months ago">More than 6 months ago</option>
                            </select>
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="health" className="block text-sm font-medium text-slate-700 mb-1">Briefly describe your current health</label>
                            <input type="text" name="health" id="health" value={answers.health} onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="e.g., feeling well, have a cold" required />
                        </div>
                        <div className="md:col-span-2">
                            <button type="submit" disabled={isLoading} className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-colors duration-300 disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isLoading ? <><SpinnerIcon /> Checking...</> : 'Check Eligibility'}
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    {isLoading && <div className="text-center mt-8 text-slate-600">AI is analyzing your info...</div>}
                    {result && <ResultCard result={result} />}
                </div>
            </div>
        </section>
    );
};
