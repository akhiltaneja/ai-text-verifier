
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero: React.FC = () => {
  return (
    <div className="relative px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            Comprehensive Content Analysis Suite
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
            Professional Tools for
            <span className="block text-primary"> Content Creators</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed animate-slide-up delay-100">
            Verify content authenticity, improve grammar, and summarize long text with our suite of professional content tools designed for writers, marketers, and publishers.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up delay-150">
            <Link to="/ai-detector">
              <Button size="lg" className="gap-2 text-base px-6 py-6 h-12">
                Try AI Detector
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            
            <Link to="/ai-summary">
              <Button size="lg" variant="outline" className="gap-2">
                Try AI Summary
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        <FeatureShowcase />
      </div>
    </div>
  );
};

// Feature Showcase Component
const FeatureShowcase: React.FC = () => {
  const features = [
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "AI Content Detector",
      description: "Analyze text to determine if it was written by AI models like ChatGPT, Gemini, or Claude with sentence-level detection.",
      link: "/ai-detector"
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Grammar Checker",
      description: "Identify grammatical errors, improve readability, and enhance the overall quality of your writing with our advanced checker.",
      link: "/grammar-checker"
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "AI Summary Tool",
      description: "Automatically summarize long articles, reports, and documents into concise, readable summaries that capture key points.",
      link: "/ai-summary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="relative rounded-xl p-6 border bg-card animate-scale-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground mb-6">{feature.description}</p>
          <Link 
            to={feature.link} 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            Try it now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
};
