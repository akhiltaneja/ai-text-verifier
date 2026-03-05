
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, ListChecks, Zap } from 'lucide-react';

export const GrammarInfoCards: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16 mb-12 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
        How Our Grammar Checker Works
      </h2>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Advanced technology to help you write with confidence and clarity
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-violet-100 dark:border-indigo-800/30 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-violet-50 dark:from-gray-950 dark:to-indigo-950/40">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-violet-100 dark:bg-indigo-900/40 text-violet-600 dark:text-indigo-400 p-4 rounded-full mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Advanced Language Processing</h3>
            <p className="text-muted-foreground text-sm">
              Our grammar checker uses advanced natural language processing algorithms to analyze your text, identifying errors in grammar, spelling, punctuation, and style with high accuracy.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-violet-100 dark:border-indigo-800/30 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-violet-50 dark:from-gray-950 dark:to-indigo-950/40">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-violet-100 dark:bg-indigo-900/40 text-violet-600 dark:text-indigo-400 p-4 rounded-full mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Contextual Suggestions</h3>
            <p className="text-muted-foreground text-sm">
              Unlike basic spell checkers, our tool understands context and provides suggestions that make sense within the specific sentence structure, improving clarity and readability.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-violet-100 dark:border-indigo-800/30 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-violet-50 dark:from-gray-950 dark:to-indigo-950/40">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-violet-100 dark:bg-indigo-900/40 text-violet-600 dark:text-indigo-400 p-4 rounded-full mb-4">
              <ListChecks className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Comprehensive Analysis</h3>
            <p className="text-muted-foreground text-sm">
              We check for multiple issues including subject-verb agreement, article usage, commonly confused words, redundancies, and complex grammatical structures.
            </p>
          </CardContent>
        </Card>
        
        <Card className="border border-violet-100 dark:border-indigo-800/30 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-white to-violet-50 dark:from-gray-950 dark:to-indigo-950/40">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-violet-100 dark:bg-indigo-900/40 text-violet-600 dark:text-indigo-400 p-4 rounded-full mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">Instant Feedback</h3>
            <p className="text-muted-foreground text-sm">
              Get detailed explanations for each correction, helping you understand why changes are recommended and improve your writing skills over time.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-10 p-6 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-lg border border-violet-100 dark:border-indigo-800/30">
        <h3 className="text-lg font-medium mb-3">Writing Score Explained</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your writing score is calculated based on the number and severity of detected errors, relative to the length of your text. A higher score indicates fewer errors and better overall writing quality.
        </p>
        <h4 className="font-medium text-sm mb-2">Score Breakdown:</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>90-100: Excellent - Minor or no errors</li>
          <li>80-89: Very Good - Few minor errors</li>
          <li>70-79: Good - Some errors that don't significantly impact readability</li>
          <li>60-69: Fair - Several errors that may affect clarity</li>
          <li>Below 60: Needs Improvement - Numerous errors affecting comprehension</li>
        </ul>
      </div>
    </div>
  );
};
