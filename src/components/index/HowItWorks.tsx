import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, FileCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: <UploadCloud className="w-8 h-8 text-primary" />,
            title: "1. Paste or Upload Text",
            description: "Simply paste your content or upload your document directly into our secure platform."
        },
        {
            icon: <Cpu className="w-8 h-8 text-primary" />,
            title: "2. Heuristic Analysis",
            description: "Our engine scans the text across 6 distinct mathematical dimensions for AI patterns."
        },
        {
            icon: <FileCheck className="w-8 h-8 text-primary" />,
            title: "3. Get Instant Verification",
            description: "Receive a detailed, sentence-by-sentence authenticity report and actionable insights."
        }
    ];

    return (
        <section className="py-12 md:py-16 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Analyze your content with mathematical precision in three simple steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/20">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 leading-relaxed px-4">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
