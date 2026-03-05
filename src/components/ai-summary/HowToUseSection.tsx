
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardPaste, FileText, ArrowRight, FileBarChart } from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  const steps = [
    {
      icon: <ClipboardPaste className="h-6 w-6 text-primary" />,
      title: "Paste Your Content",
      description: "Start by pasting your text into the editor. The tool accepts articles, documents, reports, essays and more."
    },
    {
      icon: <ArrowRight className="h-6 w-6 text-primary" />,
      title: "Submit for Analysis",
      description: "Click the 'Summarize' button to start the AI-powered summarization process."
    },
    {
      icon: <FileBarChart className="h-6 w-6 text-primary" />,
      title: "Review Results",
      description: "Examine your summary, key points, and statistics to ensure the output meets your needs."
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Save and Share",
      description: "Download a report with your original text and summary to save or share with others."
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">How to Use the AI Summary Tool</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <Card key={index} className="border bg-card">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-3">
                {step.icon}
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              <div className="mt-4 text-sm font-medium text-primary">Step {index + 1}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
