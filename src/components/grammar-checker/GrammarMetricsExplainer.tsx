
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const GrammarMetricsExplainer: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20 mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">Understanding Your Grammar Scores</h2>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Our grammar checker provides detailed metrics to help you understand the quality of your writing
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-violet-100 dark:border-indigo-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Writing Score (0-100)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Excellent</span>
                <span className="text-sm font-medium">90-100</span>
              </div>
              <Progress value={95} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-green-500" />
              
              <div className="flex justify-between mt-4">
                <span className="text-sm text-muted-foreground">Very Good</span>
                <span className="text-sm font-medium">80-89</span>
              </div>
              <Progress value={85} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-green-400" />
              
              <div className="flex justify-between mt-4">
                <span className="text-sm text-muted-foreground">Good</span>
                <span className="text-sm font-medium">70-79</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-yellow-400" />
              
              <div className="flex justify-between mt-4">
                <span className="text-sm text-muted-foreground">Fair</span>
                <span className="text-sm font-medium">60-69</span>
              </div>
              <Progress value={65} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-orange-400" />
              
              <div className="flex justify-between mt-4">
                <span className="text-sm text-muted-foreground">Needs Improvement</span>
                <span className="text-sm font-medium">Below 60</span>
              </div>
              <Progress value={55} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-red-500" />
              
              <p className="text-sm text-muted-foreground mt-4">
                Your writing score evaluates the overall quality of your writing, factoring in grammar, spelling, punctuation, and style.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card className="border border-violet-100 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Fluency Score (0-100)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Measures how naturally your text flows and how easy it is to read.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                <Progress value={75} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-violet-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-violet-100 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Clarity Score (0-100)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Evaluates how clear and understandable your text is to readers.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Low</span>
                  <span className="text-sm text-muted-foreground">High</span>
                </div>
                <Progress value={85} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-indigo-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-violet-100 dark:border-indigo-800/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Error Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The percentage of your text that contains errors relative to total word count.
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">0%</span>
                  <span className="text-sm text-muted-foreground">10%+</span>
                </div>
                <Progress value={12} className="h-2 bg-gray-100 dark:bg-gray-800" indicatorClassName="bg-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
