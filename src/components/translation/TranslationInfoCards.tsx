
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Sparkles, BookOpen, Clock } from 'lucide-react';

export const TranslationInfoCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/30 dark:to-cyan-900/30 p-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle>Multiple Languages</CardTitle>
            </div>
            <CardDescription>Translate to and from over 100 languages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our translation engine supports a wide range of languages, allowing you to translate content
              between most major languages used worldwide.
            </p>
          </CardContent>
        </div>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-950/30 dark:to-indigo-900/30 p-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Context Preservation</CardTitle>
            </div>
            <CardDescription>Maintain original meaning and context</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our advanced AI translation understands context and nuance, ensuring that the translated text
              preserves the original meaning, tone, and intent of your content.
            </p>
          </CardContent>
        </div>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950/30 dark:to-green-900/30 p-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle>Specialized Content</CardTitle>
            </div>
            <CardDescription>Support for technical and specialized texts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Whether you're translating technical documentation, creative content, or business materials,
              our system adapts to the specific terminology and style requirements.
            </p>
          </CardContent>
        </div>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/30 p-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Instant Translations</CardTitle>
            </div>
            <CardDescription>Fast processing for quick results</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Get quick results for your translation needs with our high-performance processing system,
              allowing you to work efficiently across language barriers.
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
