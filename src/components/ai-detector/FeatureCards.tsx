
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Code2, Search, Shield } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Advanced Neural Networks</h3>
          <p className="text-muted-foreground text-sm">
            Our system utilizes state-of-the-art neural networks trained on millions of text samples to identify patterns unique to AI-generated content.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="bg-success/10 p-4 rounded-full mb-4">
            <Code2 className="w-6 h-6 text-success" />
          </div>
          <h3 className="text-lg font-medium mb-2">Pattern Recognition</h3>
          <p className="text-muted-foreground text-sm">
            We analyze text structure, vocabulary patterns, and linguistic nuances that distinguish between human and AI-written content.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="bg-warning/10 p-4 rounded-full mb-4">
            <Search className="w-6 h-6 text-warning" />
          </div>
          <h3 className="text-lg font-medium mb-2">Contextual Analysis</h3>
          <p className="text-muted-foreground text-sm">
            Our detector examines the context and coherence of the text, identifying subtle markers that typically appear in AI-generated content.
          </p>
        </CardContent>
      </Card>
      
      <Card className="border bg-card">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="bg-destructive/10 p-4 rounded-full mb-4">
            <Shield className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-lg font-medium mb-2">Real-time Detection</h3>
          <p className="text-muted-foreground text-sm">
            Get instant results with our real-time analysis system, capable of detecting content from the latest AI models including GPT-4 and Claude.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
