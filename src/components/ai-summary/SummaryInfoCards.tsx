
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FileBarChart, List, Clock } from 'lucide-react';

export const SummaryInfoCards: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6">How Our Summarization Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30 p-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Condensed Content</CardTitle>
              </div>
              <CardDescription>Reduce text length while keeping the meaning</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our AI summarization tool analyzes your text and extracts the most important information, 
                reducing the length while maintaining the core message and key details.
              </p>
            </CardContent>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/30 dark:to-pink-900/30 p-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5 text-primary" />
                <CardTitle>Improved Clarity</CardTitle>
              </div>
              <CardDescription>Clear and concise summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The summarization process reorganizes and simplifies complex information, 
                making it easier to understand and more accessible to your audience.
              </p>
            </CardContent>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-green-50 to-teal-100 dark:from-green-950/30 dark:to-teal-900/30 p-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <CardTitle>Key Points Extraction</CardTitle>
              </div>
              <CardDescription>Highlight the most important ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Beyond summarization, our tool identifies and extracts the most crucial points 
                from your text, helping readers quickly grasp the essential information.
              </p>
            </CardContent>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-900/30 p-1">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Time Efficiency</CardTitle>
              </div>
              <CardDescription>Save time reading and writing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                With our summarization tool, you can quickly condense lengthy articles, reports, or documents,
                saving valuable time for both content creators and readers.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};
