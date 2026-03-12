import React from 'react';

export const DetectorHowToUse = () => {
    const steps = [
        {
            number: '01',
            title: 'Paste Your Text',
            description: 'Copy the document, email, or essay you want to verify and paste it directly into the left editor pane. You need at least 40 words for accurate patterns to emerge.'
        },
        {
            number: '02',
            title: 'Analyze Content',
            description: 'Click the Analyze button. Our Llama 3.3 engine will instantly process the vocabulary entropy and structural burstiness of your writing.'
        },
        {
            number: '03',
            title: 'Review the Verdict',
            description: 'The right panel will break down exactly which sentences trigger AI detection flags, color-coding them to show Human, AI-Refined, or purely AI-Generated text.'
        }
    ];

    return (
        <div className="w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">How to verify AI text</h2>
                    <p className="text-slate-500">
                        A simple 3-step process to ensure your content is originally drafted by a human.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {index !== steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-slate-200 to-transparent"></div>
                            )}
                            <div className="text-5xl font-black text-slate-100 mb-4 tracking-tighter">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
