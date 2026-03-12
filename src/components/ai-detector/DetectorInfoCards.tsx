import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldAlert, Zap, Search, Target } from 'lucide-react';

export const DetectorInfoCards = () => {
    const features = [
        {
            icon: <Target className="w-8 h-8 text-primary" />,
            title: 'High Accuracy Detection',
            description: 'Our advanced Llama-3-70B engine accurately identifies AI-generated content down to the sentence level.'
        },
        {
            icon: <Search className="w-8 h-8 text-blue-500" />,
            title: 'Granular Analysis',
            description: 'We don’t just give a percentage; we highlight exactly which sentences appear AI-generated or human-written.'
        },
        {
            icon: <Zap className="w-8 h-8 text-amber-500" />,
            title: 'Lightning Fast',
            description: 'Powered by Groq LPU inference, our AI detector returns detailed analysis in milliseconds.'
        },
        {
            icon: <ShieldAlert className="w-8 h-8 text-emerald-500" />,
            title: 'Plagiarism Prevention',
            description: 'Ensure academic integrity and original content creation by catching ChatGPT, Claude, and Gemini outputs instantly.'
        }
    ];

    return (
        <div className="w-full">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use our AI Detector?</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Built for educators, publishers, and creators to ensure content authenticity in the generative AI era.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="mb-4 bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-lg text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
