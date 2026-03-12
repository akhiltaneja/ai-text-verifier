
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

      <footer className="py-8 border-t mt-auto bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center justify-start mb-4">
                <img src={logo} alt="AI Text Verifier" className="h-[200px] w-auto object-contain -ml-4" />
              </div>
              <p className="text-slate-500 mb-6 max-w-sm leading-relaxed text-sm">
                Professional content analysis suite. Detect AI, check grammar, summarize, and translate with enterprise-grade accuracy. Powered by NexusCore AI.
              </p>
              <div className="flex items-center space-x-4">
                <a href="https://x.com/AITextTools" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4 text-sm tracking-wide">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/ai-detector" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center">
                    <Bot className="w-3.5 h-3.5 mr-2 opacity-70" />
                    AI Detector
                  </Link>
                </li>
                <li>
                  <Link to="/grammar-checker" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 mr-2 opacity-70" />
                    Grammar Checker
                  </Link>
                </li>
                <li>
                  <Link to="/ai-summary" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center">
                    <Laptop className="w-3.5 h-3.5 mr-2 opacity-70" />
                    Text Summarizer
                  </Link>
                </li>
                <li>
                  <Link to="/translator" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center">
                    <Languages className="w-3.5 h-3.5 mr-2 opacity-70" />
                    Translator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4 text-sm tracking-wide">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-sm text-slate-500 hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/knowledge-base" className="text-sm text-slate-500 hover:text-primary transition-colors">Knowledge Base</Link></li>
                <li><Link to="/api" className="text-sm text-slate-500 hover:text-primary transition-colors">Developer API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 text-sm tracking-wide">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/pricing" className="text-sm text-slate-500 hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="text-sm text-slate-500 hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} AI Text Verifier. Built with NexusCore.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link to="/privacy-policy" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
              <Link to="/cookie-policy" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
