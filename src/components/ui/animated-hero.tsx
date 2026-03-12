import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-4 pb-8 md:pt-6 md:pb-10 overflow-hidden bg-white">
      {/* Subtle modern background gradient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 px-4">
        <div className="flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200 shadow-sm backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">Powered by NexusCore AI v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 leading-[1.1]"
          >
            Verify Content Authenticity with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600 pb-2">
              Absolute Precision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed"
          >
            Our heuristic engine analyzes burstiness, vocabulary entropy, and sentence variance to detect AI-generated text with industry-leading accuracy. Protect your academic integrity, SEO rankings, and brand voice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link to="/ai-detector" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                Try AI Detector Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link to="/pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8 h-14 rounded-full border-slate-200 hover:bg-slate-50 shadow-sm transition-all text-slate-700">
                View Pricing
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium"
          >
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> No credit card required</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Unlimited scans on Pro</span>
            <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Supports 50+ Languages</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
