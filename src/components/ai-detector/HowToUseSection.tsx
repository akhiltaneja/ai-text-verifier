
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardPaste, Search, Bot } from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">How to Use Our AI Content Detector</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border bg-gradient-to-br from-white via-blue-50/20 to-blue-100/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-700/80">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <ClipboardPaste className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Step 1: Paste Your Text</h3>
            <p className="text-muted-foreground text-sm">
              Copy and paste the text you want to analyze into the text box, or upload a document file. For best results, use at least 100 words.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border bg-gradient-to-br from-white via-blue-50/20 to-blue-100/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-700/80">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Step 2: Analyze</h3>
            <p className="text-muted-foreground text-sm">
              Click the "Analyze" button to start the detection process. Our AI system will scan the text for patterns indicative of AI-generated content.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border bg-gradient-to-br from-white via-blue-50/20 to-blue-100/30 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-700/80">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Step 3: Review Results</h3>
            <p className="text-muted-foreground text-sm">
              Examine the detailed analysis to see the AI probability score, highlighted AI-generated phrases, and a comprehensive explanation of the results.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-900/50">
        <h3 className="text-xl font-semibold mb-3">Pro Tip: Best Practices</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">•</span>
            <span>For more accurate results, use at least 300 words of text.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">•</span>
            <span>Include complete paragraphs rather than fragments for better analysis.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">•</span>
            <span>Our tool works best with English text from academic, professional, or creative writing.</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">•</span>
            <span>Remember that no AI detector is 100% accurate - always use results as a guide rather than definitive proof.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
