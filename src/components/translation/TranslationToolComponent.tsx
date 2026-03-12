
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
  const { useCredits, availableCredits, dailyLimit, isLoading } = useCreditsContext();
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
    <div className="w-full max-w-[1500px] mx-auto bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200 overflow-hidden min-h-[700px]">
      <div className="h-full w-full">
        <ResizablePanelGroup direction="horizontal" className="min-h-[700px] w-full">
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
                className="flex-1 resize-none h-full focus-visible:ring-1 bg-transparent border-none shadow-none text-[15px] leading-relaxed pb-32"
                disabled={isTranslating}
              />

              {/* Floating Bottom Action Bar (Migrated from right pane) */}
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-3xl bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 p-2 md:p-2.5 flex justify-between items-center z-20">
                <div className="flex items-center gap-3 md:gap-6 pl-4 md:pl-6 text-sm text-slate-500 font-medium">
                  <span className="hidden sm:inline-block">{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} Words</span>

                  {/* Inline Credits Display */}
                  <div className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-700">
                    <span className="mr-1.5 text-amber-500">⚡</span>
                    {isLoading ? (
                      <span className="h-4 w-16 bg-slate-200 animate-pulse rounded inline-block"></span>
                    ) : (
                      dailyLimit >= 999999 ? 'Unlimited' : `${availableCredits['translation']} Credits`
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => copyToClipboard(inputText)}
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-slate-600 rounded-full w-10 h-10 hidden sm:flex"
                    title="Copy Source Text"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleTranslate}
                    disabled={!inputText.trim() || isTranslating || !sourceLanguage || sourceLanguage === targetLanguage}
                    className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-6 h-auto font-semibold text-base shadow-sm transition-all shadow-primary/20 gap-2"
                  >
                    {isTranslating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Translating
                      </>
                    ) : (
                      'Translate'
                    )}
                  </Button>
                </div>
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
                className="flex-1 resize-none h-full focus-visible:ring-1 bg-slate-50 border-none shadow-none text-[15px] leading-relaxed p-4"
              />

              {error && (
                <div className="text-destructive text-sm mt-2">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-slate-400">
                  {translatedText.trim() ? translatedText.trim().split(/\s+/).length : 0} words
                </div>


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
      </div>
    </div>
  );
};
