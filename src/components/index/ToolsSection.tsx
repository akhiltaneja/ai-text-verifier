import React from 'react';
import { Button } from '@/components/ui/button';
import { GanttChart, Check, Wand, Languages, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ToolsSection: React.FC = () => {
  const tools = [
    {
      id: 'ai-detector',
      title: 'AI Detector',
      description: 'Check if content was written by AI or a human',
      icon: <GanttChart className="h-6 w-6 text-indigo-400 group-hover:text-white transition-colors" />,
      link: '/ai-detector',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      hoverBorder: 'hover:border-indigo-500/50',
      span: 'md:col-span-2 md:row-span-2'
    },
    {
      id: 'grammar-checker',
      title: 'Grammar Checker',
      description: 'Fix grammar, spelling, and punctuation errors instantly',
      icon: <Check className="h-6 w-6 text-emerald-400 group-hover:text-white transition-colors" />,
      link: '/grammar-checker',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-500/50',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 'ai-summarizer',
      title: 'AI Summarizer',
      description: 'Condense long content into concise summaries',
      icon: <Wand className="h-6 w-6 text-amber-400 group-hover:text-white transition-colors" />,
      link: '/ai-summary',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      hoverBorder: 'hover:border-amber-500/50',
      span: 'md:col-span-1 md:row-span-1'
    },
    {
      id: 'translator',
      title: 'Translator',
      description: 'Translate content between multiple languages with context-awareness',
      icon: <Languages className="h-6 w-6 text-rose-400 group-hover:text-white transition-colors" />,
      link: '/translator',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      hoverBorder: 'hover:border-rose-500/50',
      span: 'md:col-span-2 md:row-span-1'
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-violet-600 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              One Suite. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Total Control.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400 leading-relaxed"
            >
              Stop bouncing between five different subscriptions. Everything you need to write, verify, and perfect your content is right here.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/pricing">
              <Button variant="outline" className="rounded-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 hover:text-white px-6 h-12">
                View Pricing <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 lg:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={tool.span}
            >
              <Link to={tool.link} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-950 rounded-3xl">
                <div className={`group relative h-full flex flex-col p-8 rounded-3xl border bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ${tool.borderColor} ${tool.hoverBorder} hover:shadow-2xl hover:shadow-${tool.bgColor.split('-')[1]}-500/10`}>

                  {/* Hover background glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${tool.bgColor} pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-700 transition-all duration-500">
                      {tool.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">{tool.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">{tool.description}</p>

                    <div className="mt-auto pt-8">
                      <div className="inline-flex items-center text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                        Explore tool
                        <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
