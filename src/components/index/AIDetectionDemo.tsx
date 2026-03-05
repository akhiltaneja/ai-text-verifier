
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { AIDetectionSample } from '@/types/ai-detector';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Particles } from '@/components/ui/particles';

export const AIDetectionDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');
  
  const samples: Record<'ai' | 'human', AIDetectionSample> = {
    ai: {
      text: "The impact of artificial intelligence on modern society represents one of the most significant technological shifts in human history. AI systems have permeated various aspects of daily life, from virtual assistants like Siri and Alexa to recommendation algorithms and automated customer service interfaces. These technologies offer unprecedented efficiency and convenience, streamlining processes that once required substantial human intervention.",
      score: 91.2,
      verdict: 'AI Generated',
      highlights: [
        {
          text: "The impact of artificial intelligence on modern society represents one of the most significant technological shifts in human history. ",
          isAI: true
        },
        {
          text: "AI systems have permeated various aspects of daily life, from virtual assistants like Siri and Alexa to recommendation algorithms and automated customer service interfaces. ",
          isAI: true
        },
        {
          text: "These technologies offer unprecedented efficiency and convenience, streamlining processes that once required substantial human intervention.",
          isAI: true
        }
      ]
    },
    human: {
      text: "I met my best friend when I was only seven years old. We were in the same class, sitting next to each other because our last names were alphabetically adjacent. At first, we didn't get along - I thought she was too bossy, and she thought I was too quiet. But one rainy afternoon, we both had to stay late at school waiting for our parents.",
      score: 12.8,
      verdict: 'Human Written',
      highlights: [
        {
          text: "I met my best friend when I was only seven years old. We were in the same class, sitting next to each other because our last names were alphabetically adjacent. ",
          isAI: false
        },
        {
          text: "At first, we didn't get along - I thought she was too bossy, and she thought I was too quiet. ",
          isAI: false
        },
        {
          text: "But one rainy afternoon, we both had to stay late at school waiting for our parents.",
          isAI: false
        }
      ]
    }
  };
  
  const activeSample = samples[activeTab];
  
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Try AI Content Detector Now
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              See how our AI detector works with these sample texts.
            </p>
          </div>
        </div>

        <div className="bg-card border rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto relative z-10">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <Particles
                className="absolute inset-0"
                quantity={60}
                staticity={40}
                ease={80}
                color="#8B5CF6"
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 py-3 px-4 text-center font-medium relative ${
                    activeTab === 'ai' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  AI-Generated Example
                </button>
                <button
                  onClick={() => setActiveTab('human')}
                  className={`flex-1 py-3 px-4 text-center font-medium relative ${
                    activeTab === 'human' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  Human-Written Example
                </button>
              </div>
              
              <div className="p-6 bg-white/90 backdrop-blur-sm">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Sample Text:</div>
                  <div className="bg-muted/30 p-4 rounded-md overflow-hidden backdrop-blur-sm">
                    {activeSample.highlights.map((highlight, index) => (
                      <span 
                        key={index} 
                        className={`inline-block ${highlight.isAI ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'}`}
                      >
                        {highlight.text}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-muted/20 rounded-md backdrop-blur-sm">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      activeSample.verdict === 'AI Generated' 
                        ? 'bg-destructive' 
                        : 'bg-green-500'
                    }`}></div>
                    <span className="font-medium">
                      {activeSample.verdict}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">AI Probability:</span>
                    <span className="font-bold">
                      {activeSample.score}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-6 flex justify-center border-t">
                <Link to="/ai-detector">
                  <InteractiveHoverButton
                    className="w-40 h-12 text-base font-medium"
                    text="Try It Now"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
