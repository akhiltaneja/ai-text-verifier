
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GrammarPremium: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-24 mb-16 animate-fade-in">
      <div className="bg-primary rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:p-10 text-white">
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 flex items-center">
                <Sparkles className="w-6 h-6 mr-2" />
                Upgrade to Premium
              </h2>
              <p className="text-primary-foreground max-w-xl">
                Get unlimited access to advanced grammar checking features and take your writing to the next level.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/pricing">
                <Button variant="secondary" size="lg" className="font-medium">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 px-6 py-8 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">Unlimited Word Count</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check documents of any length without restrictions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">Advanced Style Suggestions</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get recommendations for clarity, conciseness, and engagement.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">Tone Analysis</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Understand how your writing comes across to readers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">Plagiarism Detection</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check your content against billions of web pages.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">AI Content Detection</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Identify AI-generated content in your documents.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium">Priority Processing</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get faster results even during peak usage times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
