
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
      
      <main className="flex-1 pt-16">
        <div key={location.pathname} className="animate-fade-in">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t mt-auto bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 text-center md:text-left max-w-5xl mx-auto">
            <div>
              <div className="flex items-center justify-center md:justify-start mb-2">
                <img src={logo} alt="aitextverifier" className="h-28" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Professional content analysis tools for writers, marketers, and educators.
              </p>
              <a href="https://x.com/AITextTools" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Follow us on X
              </a>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Our Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/ai-detector" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <Bot className="w-4 h-4 mr-2" />
                    AI Content Detector
                  </Link>
                </li>
                <li>
                  <Link to="/grammar-checker" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Grammar Checker
                  </Link>
                </li>
                <li>
                  <Link to="/ai-summary" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <Laptop className="w-4 h-4 mr-2" />
                    AI Summary Tool
                  </Link>
                </li>
                <li>
                  <Link to="/translator" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <Languages className="w-4 h-4 mr-2" />
                    Translator
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/knowledge-base" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center md:justify-start">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Tutorials
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Content Tools
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
