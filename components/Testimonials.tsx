
import React from 'react';

const testimonialsData = [
    {
        quote: "Donating blood was so easy and rewarding. Knowing I helped save a life is a feeling like no other. The staff were amazing and made me feel comfortable the whole time.",
        name: "Sarah L.",
        type: "Donor",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        quote: "My daughter needed an urgent blood transfusion. I'm forever grateful to the anonymous donors who gave her a chance to live. You are true heroes.",
        name: "Michael R.",
        type: "Recipient's Father",
        avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
        quote: "I've been a regular donor for years. It's a small part of my day, but it has a huge impact. I encourage everyone who can to donate.",
        name: "David C.",
        type: "Donor",
        avatar: "https://i.pravatar.cc/150?img=5"
    }
];

const TestimonialCard: React.FC<{ quote: string; name: string; type: string; avatar: string }> = ({ quote, name, type, avatar }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-full">
        <p className="text-slate-600 italic flex-grow">"{quote}"</p>
        <div className="mt-6 flex items-center">
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4 border-2 border-red-200" />
            <div>
                <p className="font-bold text-slate-800">{name}</p>
                <p className="text-sm text-red-500 font-semibold">{type}</p>
            </div>
        </div>
    </div>
);

export const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Stories from the Heart</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Read what donors and recipients have to say about the power of giving.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};
