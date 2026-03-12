import React from 'react';

export const TranslationHowToUse = () => {
    const steps = [
        {
            number: '01',
            title: 'Select Languages',
            description: 'Choose your source language (or let our AI detect it automatically) and select the target language you want your text translated into.'
        },
        {
            number: '02',
            title: 'Enter Your Text',
            description: 'Paste your document or type your sentence directly into the left editor pane. Our interface supports large blocks of text effortlessly.'
        },
        {
            number: '03',
            title: 'Get Instant Translation',
            description: 'Click Translate to generate an accurate, context-aware translation using deep learning. You can instantly copy the result for your own use.'
        }
    ];

    return (
        <div className="w-full bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">How to translate text</h2>
                    <p className="text-slate-500">
                        A simple 3-step process to instantly break down language barriers.
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
