
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TextQuote, Upload, Search, CheckCircle2 } from 'lucide-react';

export const GrammarHowToUse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-3 text-primary">How to Use the Grammar Checker</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Get started with our grammar checker in just a few simple steps
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
              <TextQuote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">1. Paste Your Text</h3>
            <p className="text-muted-foreground text-sm">
              Copy and paste the text you want to check into the editor box above.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">2. Or Upload a Document</h3>
            <p className="text-muted-foreground text-sm">
              Alternatively, upload a text document directly using the upload button.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">3. Analyze Your Text</h3>
            <p className="text-muted-foreground text-sm">
              Click the "Analyze" button to check your text for grammar, spelling, and punctuation errors.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-primary/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">4. Review Suggestions</h3>
            <p className="text-muted-foreground text-sm">
              Review the suggested improvements and see your corrected text with all issues fixed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
