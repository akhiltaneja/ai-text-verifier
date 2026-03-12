import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Database, FileText, Cpu, ShieldCheck, Zap, Activity, ServerCog } from 'lucide-react';

const PulseLine = ({ delay = 0, duration = 2 }: { delay?: number, duration?: number }) => (
    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-200 -translate-y-1/2 overflow-hidden">
        <motion.div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ left: '-100%' }}
            animate={{ left: '200%' }}
            transition={{ repeat: Infinity, duration, delay, ease: "linear" }}
            style={{ position: 'relative' }}
        />
    </div>
);

export const ModelArchitecture = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="absolute right-0 top-1/4 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10 translate-x-1/2" />
            <div className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl -z-10 -translate-x-1/2" />

            <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100/50 shadow-sm">
                        <Cpu className="w-4 h-4" />
                        Proprietary Technology
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                        Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">NexusCore AI</span>
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        Our detection engine doesn't just look for keywords. NexusCore applies a multi-layered neural architecture combined with 6 mathematical heuristics to achieve industry-leading accuracy.
                    </p>
                </div>

                {/* The Animated Architecture Diagram */}
                <div className="relative max-w-5xl mx-auto bg-slate-50/80 rounded-3xl border border-slate-200 p-8 md:p-12 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">
                        {/* Stage 1: Input */}
                        <div className="flex-1 flex flex-col items-center relative">
                            <motion.div
                                className="w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center mb-4 relative z-10"
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="absolute -inset-2 bg-blue-100 rounded-3xl blur-md -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <FileText className="w-10 h-10 text-slate-600" />
                            </motion.div>
                            <h3 className="font-bold text-slate-900 mb-2">Raw Input</h3>
                            <p className="text-sm text-center text-slate-500">Text parsing & tokenization</p>
                        </div>

                        {/* Path 1 */}
                        <div className="hidden md:block w-32 relative h-20">
                            <PulseLine delay={0} duration={2.5} />
                        </div>

                        {/* Stage 2: NexusCore Processing Array */}
                        <div className="flex-[2] flex flex-col items-center relative w-full">
                            <motion.div
                                className="w-full bg-white rounded-3xl shadow-xl border border-blue-100 p-6 relative z-10 overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10" />

                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <BrainCircuit className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">NexusCore Engine</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-semibold text-slate-700">Vocabulary Entropy</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        <span className="text-sm font-semibold text-slate-700">Burstiness Variance</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <Database className="w-4 h-4 text-blue-500" />
                                        <span className="text-sm font-semibold text-slate-700">N-Gram Parsing</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <ServerCog className="w-4 h-4 text-indigo-500" />
                                        <span className="text-sm font-semibold text-slate-700">Llama 3.3 Bridge</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Path 2 */}
                        <div className="hidden md:block w-32 relative h-20">
                            <PulseLine delay={1.25} duration={2.5} />
                        </div>

                        {/* Stage 3: Output */}
                        <div className="flex-1 flex flex-col items-center relative">
                            <motion.div
                                className="w-20 h-20 bg-emerald-50 rounded-2xl shadow-lg shadow-emerald-100/50 border border-emerald-200 flex items-center justify-center mb-4 relative z-10"
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="absolute inset-0 border-2 border-emerald-400 rounded-2xl animate-pulse opacity-50" />
                                <ShieldCheck className="w-10 h-10 text-emerald-600" />
                            </motion.div>
                            <h3 className="font-bold text-emerald-900 mb-2">Final Verdict</h3>
                            <p className="text-sm text-center text-slate-500">Sentence-level prediction</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
