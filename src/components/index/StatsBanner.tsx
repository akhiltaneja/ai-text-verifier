import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, Globe } from 'lucide-react';

export const StatsBanner: React.FC = () => {
    const stats = [
        {
            id: 1,
            name: 'Professionals Trusting Us',
            value: '45,000+',
            icon: <Users className="w-5 h-5 text-indigo-500" />
        },
        {
            id: 2,
            name: 'Documents Analyzed',
            value: '2.4M+',
            icon: <FileText className="w-5 h-5 text-indigo-500" />
        },
        {
            id: 3,
            name: 'Detection Accuracy',
            value: '99.8%',
            icon: <CheckCircle className="w-5 h-5 text-indigo-500" />
        },
        {
            id: 4,
            name: 'Languages Supported',
            value: '50+',
            icon: <Globe className="w-5 h-5 text-indigo-500" />
        }
    ];

    return (
        <section className="bg-white border-y border-slate-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-white to-violet-50/50" />
            <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-16 pb-20">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Trusted by Professionals</h2>
                    <p className="text-slate-500 text-lg">Our proprietary model analyzes millions of words daily, delivering uncompromising accuracy at scale.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100/80 bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-8 md:p-10 text-center hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-mono tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-widest text-center max-w-[120px]">
                                {stat.name}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
