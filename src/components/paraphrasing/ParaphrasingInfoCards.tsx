
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const ParaphrasingInfoCards: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6">How Paraphrasing Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vocabulary Enhancement</CardTitle>
            <CardDescription>Replace words with meaningful synonyms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our paraphrasing tool intelligently replaces words with contextually appropriate synonyms, 
              enhancing the vocabulary while preserving the original meaning of your text.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sentence Restructuring</CardTitle>
            <CardDescription>Improve flow and readability</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The tool analyzes sentence structure and restructures when appropriate, 
              converting between active and passive voice or adding introductory phrases for better readability.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Maintaining Meaning</CardTitle>
            <CardDescription>Preserve the original message</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              While changing words and sentence structures, our algorithm ensures that the 
              core meaning and intent of your original text remains intact throughout the paraphrasing process.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Readability</CardTitle>
            <CardDescription>Clearer, more engaging content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The end result is content that reads more smoothly and engages readers 
              more effectively while maintaining your original message and intent.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
