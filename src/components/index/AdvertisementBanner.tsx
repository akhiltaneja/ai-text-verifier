import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const AdvertisementBanner: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 mb-20">
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-700" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1 bg-white/10 backdrop-blur-md text-primary-foreground border border-white/20 rounded-full text-xs md:text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-3 md:w-4 h-3 md:h-4 mr-2" />
              Limited Time: Launch Offer
            </div>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Full Power</span> of AI Verification
            </h3>

            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Get 30% off your first year of Premium. Professional-grade detection, unlimited scans, and advanced heuristics for enterprise teams.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/pricing">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 rounded-2xl group/btn">
                  Claim 30% Discount
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div className="flex items-center text-slate-400 text-sm font-medium px-4">
                <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
                No setup fees. Cancel anytime.
              </div>
            </div>
          </div>

          {/* Visual Side Component */}
          <div className="relative hidden lg:block w-full lg:w-1/3 max-w-md">
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Premium Access</h4>
                  <p className="text-slate-400 text-sm">Enterprise Features</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Unlimited AI Content Scans",
                  "Cross-Sentence Heuristics",
                  "Detailed PDF Analysis Reports",
                  "API Access & Integrations"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">Was $49.00/yr</p>
                  <p className="text-white text-3xl font-extrabold">$29.00<span className="text-sm font-normal text-slate-400">/yr</span></p>
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-lg border border-emerald-500/20">
                  Save 30%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
