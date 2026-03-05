
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { ParaphrasingResult as ParaphrasingResultType } from '@/types/paraphrasing';

interface ParaphrasingResultProps {
  result: ParaphrasingResultType;
}

export const ParaphrasingResultView: React.FC<ParaphrasingResultProps> = ({ result }) => {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6 animate-fade-in">
      <Card className="border">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <FileText className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-bold">Paraphrasing Result</h2>
          </div>
              
          <div className="bg-muted/50 p-4 rounded-lg border mb-6">
            <h3 className="font-medium mb-2">Summary</h3>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Paraphrased Version</h3>
              <div className="bg-muted/30 rounded-lg p-4 text-sm">
                {result.paraphrasedText}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Original Text</h3>
              <div className="bg-muted/30 rounded-lg p-4 text-sm">
                {result.originalText}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
