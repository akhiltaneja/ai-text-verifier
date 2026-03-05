
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GanttChart, Check, Wand, Pencil, FileCheck, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ToolsSection: React.FC = () => {
  const tools = [
    {
      id: 'ai-detector',
      title: 'AI Detector',
      description: 'Check if content was written by AI or a human',
      icon: <GanttChart className="h-12 w-12 text-primary" />,
      link: '/ai-detector',
      features: [
        'Analysis of text patterns',
        'Perplexity & burstiness metrics',
        'Advanced algorithm detection',
        'Fast & accurate results',
      ]
    },
    {
      id: 'grammar-checker',
      title: 'Grammar Checker',
      description: 'Fix grammar, spelling, and punctuation errors',
      icon: <Check className="h-12 w-12 text-primary" />,
      link: '/grammar-checker',
      features: [
        'Spelling & grammar correction',
        'Style & tone suggestions',
        'Readability analysis',
        'Vocabulary enhancement',
      ]
    },
    {
      id: 'ai-summarizer',
      title: 'AI Summarizer',
      description: 'Condense long content into concise summaries',
      icon: <Wand className="h-12 w-12 text-primary" />,
      link: '/ai-summary',
      features: [
        'Multiple summary lengths',
        'Key points extraction',
        'Source retention',
        'Clean formatting',
      ]
    },
    {
      id: 'translator',
      title: 'Translator',
      description: 'Translate content between multiple languages',
      icon: <Languages className="h-12 w-12 text-primary" />,
      link: '/translator',
      features: [
        'Support for 50+ languages',
        'Context-aware translations',
        'Preserve formatting',
        'Technical terms handling',
      ]
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-[900px] mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Tools</h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Powerful AI-powered tools to help you create, optimize, and analyze content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="transition-all hover:shadow-md h-full">
              <CardHeader>
                <div className="mb-4">{tool.icon}</div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={tool.link}>Try {tool.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
