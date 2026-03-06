
import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CheckCircle, Laptop, Bot, Languages, ExternalLink } from 'lucide-react';
import logo from '@/assets/logo.png';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />

      <main className="flex-1 w-full">
        <div key={location.pathname} className="animate-fade-in w-full h-full">
          {children}
        </div>
      </main>

      <footer className="py-12 border-t mt-auto bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <img src={logo} alt="AI Text Verifier" className="h-20 w-auto object-contain" style={{ transformOrigin: 'left center', transform: 'scale(1.2)' }} />
              </div>
              <p className="text-base text-slate-500 mb-6 max-w-sm mx-auto md:mx-0 leading-relaxed">
                Professional content analysis tools for writers, marketers, and educators. Detect AI, check grammar, summarize, and translate with enterprise-grade accuracy.
              </p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <a href="https://x.com/AITextTools" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-5 text-sm uppercase tracking-wider">Our Tools</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/ai-detector" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all flex items-center justify-center md:justify-start">
                    <Bot className="w-4 h-4 mr-3 opacity-70" />
                    AI Content Detector
                  </Link>
                </li>
                <li>
                  <Link to="/grammar-checker" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all flex items-center justify-center md:justify-start">
                    <CheckCircle className="w-4 h-4 mr-3 opacity-70" />
                    Grammar Checker
                  </Link>
                </li>
                <li>
                  <Link to="/ai-summary" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all flex items-center justify-center md:justify-start">
                    <Laptop className="w-4 h-4 mr-3 opacity-70" />
                    Text Summarizer
                  </Link>
                </li>
                <li>
                  <Link to="/translator" className="text-slate-500 hover:text-primary hover:translate-x-1 transition-all flex items-center justify-center md:justify-start">
                    <Languages className="w-4 h-4 mr-3 opacity-70" />
                    Translator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-5 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/blog" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center md:justify-start">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge-base" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center md:justify-start">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-slate-500 hover:text-primary transition-colors flex items-center justify-center md:justify-start">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 whitespace-nowrap">
              &copy; {new Date().getFullYear()} AI Text Verifier. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
