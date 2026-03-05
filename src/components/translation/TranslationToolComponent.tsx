
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, ArrowLeftRight, Globe, Languages } from 'lucide-react';
import { toast } from 'sonner';
import { useCredits as useCreditsContext } from '@/context/CreditContext';
import { 
  detectLanguage, 
  translateText, 
  languageOptions, 
  getLanguageName,
  TranslationResult
} from '@/services/translation-service';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export const TranslationToolComponent: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const { useCredits, availableCredits } = useCreditsContext();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inputText.trim()) {
      setDetectedLanguage('');
      setSourceLanguage('');
      return;
    }

    const timer = setTimeout(async () => {
      setIsDetecting(true);
      try {
        const detected = await detectLanguage(inputText);
        setDetectedLanguage(detected);
        if (!sourceLanguage) {
          setSourceLanguage(detected);
        }
        
        if (detected === targetLanguage) {
          if (detected === 'en') {
            setTargetLanguage('es');
          } else {
            setTargetLanguage('en');
          }
        }
      } catch (error) {
        console.error('Language detection error:', error);
      } finally {
        setIsDetecting(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [inputText]);

  useEffect(() => {
    if (sourceLanguage === targetLanguage) {
      if (sourceLanguage === 'en') {
        setTargetLanguage('es');
      } else {
        setTargetLanguage('en');
      }
    }
  }, [sourceLanguage]);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to translate');
      return;
    }

    if (!sourceLanguage) {
      toast.warning('Please select or wait for language detection');
      return;
    }

    const wordCount = inputText.trim().split(/\s+/).length;
    
    if (availableCredits.translation < wordCount) {
      toast.error('Not enough translation credits remaining');
      return;
    }

    setIsTranslating(true);
    setError(null);
    
    try {
      if (useCredits('translation', wordCount)) {
        const translationResult = await translateText(inputText, sourceLanguage, targetLanguage);
        setResult(translationResult);
        setTranslatedText(translationResult.translatedText);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try again.');
      toast.error('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Copied to clipboard'))
      .catch(() => toast.error('Failed to copy'));
  };

  const swapLanguages = () => {
    if (result) {
      const newSourceLang = targetLanguage;
      const newTargetLang = sourceLanguage;
      setSourceLanguage(newSourceLang);
      setTargetLanguage(newTargetLang);
      setInputText(translatedText);
      setTranslatedText(inputText);
    }
  };

  return (
    <Card className="mb-8 border-2 border-primary/20">
      <CardContent className="p-0">
        <ResizablePanelGroup direction="horizontal" className="min-h-[350px]">
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {isDetecting ? (
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Detecting language...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Label>Source Language:</Label>
                      <Select
                        value={sourceLanguage}
                        onValueChange={setSourceLanguage}
                        disabled={isTranslating}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>
              
              {detectedLanguage && (
                <div className="mb-2 text-sm text-muted-foreground">
                  {sourceLanguage === detectedLanguage ? (
                    <span>Detected: {getLanguageName(detectedLanguage)}</span>
                  ) : (
                    <span>
                      Detected: {getLanguageName(detectedLanguage)}.{' '}
                      <Button 
                        variant="link" 
                        className="p-0 h-auto" 
                        onClick={() => setSourceLanguage(detectedLanguage)}
                      >
                        Use this language
                      </Button>
                    </span>
                  )}
                </div>
              )}
              
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="flex-1 resize-none min-h-[250px] focus-visible:ring-1 bg-background"
                disabled={isTranslating}
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  {inputText.trim().length} characters, {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
                </div>
                <Button
                  onClick={() => copyToClipboard(inputText)}
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="p-5 h-full flex flex-col relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-primary" />
                  <Label>Target Language:</Label>
                  <Select
                    value={targetLanguage}
                    onValueChange={setTargetLanguage}
                    disabled={isTranslating}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  onClick={swapLanguages}
                  variant="outline"
                  size="icon"
                  disabled={!result || isTranslating}
                  title="Swap languages"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Textarea
                value={translatedText}
                readOnly
                placeholder="Translation will appear here..."
                className="flex-1 resize-none min-h-[250px] focus-visible:ring-1 bg-muted/30"
              />

              {error && (
                <div className="text-destructive text-sm mt-2">
                  {error}
                </div>
              )}
              
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={handleTranslate}
                  disabled={!inputText.trim() || isTranslating || !sourceLanguage || sourceLanguage === targetLanguage}
                  className="gap-2"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>Translate</>
                  )}
                </Button>
                
                <Button
                  onClick={() => copyToClipboard(translatedText)}
                  variant="outline"
                  size="sm"
                  disabled={!translatedText}
                  className="gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              
              {isTranslating && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <span>Translating...</span>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};
