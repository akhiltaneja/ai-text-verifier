import React from 'react';
import { motion } from 'framer-motion';
import { Activity, LayoutGrid, FileType, Repeat, ShieldCheck, Microscope } from 'lucide-react';

export const DetectionMethodology: React.FC = () => {
    const methodologies = [
        {
            icon: <Activity className="w-6 h-6 text-violet-500" />,
            title: "Burstiness Analysis",
            description: "Humans write in spikes of long and short sentences. AI maintains a flat, rigid uniformity."
        },
        {
            icon: <LayoutGrid className="w-6 h-6 text-violet-500" />,
            title: "Vocabulary Entropy",
            description: "Measures the predictability of word choices. High predictability flags probabilistic AI models."
        },
        {
            icon: <FileType className="w-6 h-6 text-violet-500" />,
            title: "Sentence Variance",
            description: "Calculates the standard deviation of structural length to identify non-human structural loops."
        },
        {
            icon: <Repeat className="w-6 h-6 text-violet-500" />,
            title: "Repetitive Phrase Density",
            description: "Detects the specific transitional loops and list-framing hooks commonly hardcoded into LLMs."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-violet-500" />,
            title: "Readability Consistency",
            description: "Flags texts that maintain an exact mid-level grade readability without human fluctuation."
        },
        {
            icon: <Microscope className="w-6 h-6 text-violet-500" />,
            title: "N-Gram Distribution",
            description: "Analyzes adjacent word clusters against known AI pre-training distribution ratios."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
            <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-white fill-current">
                    <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">

                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built on 6 Mathematical Heuristics</h2>
                            <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                Unlike simple classifiers that can be tricked by minimal prompt engineering, our proprietary engine relies on the mathematical impossibility of humans writing like probabilistic machines.
                            </p>
                            <div className="inline-flex items-center text-violet-400 font-medium hover:text-violet-300 transition-colors cursor-pointer">
                                Read our technical whitepaper
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {methodologies.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-all font-medium"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 border border-violet-500/20">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
