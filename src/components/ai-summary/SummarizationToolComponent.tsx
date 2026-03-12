
import React, { useState } from 'react';
import { TextEditor } from '@/components/TextEditor';
import { Loader2, Download, Link as LinkIcon, FileText, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { processSummarization, downloadSummaryAsText, scrapeUrl } from '@/services/summarization-service';
import { SummarizationResult } from '@/types/summarization';
import { toast } from 'sonner';

export const SummarizationToolComponent: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SummarizationResult | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedText, setScrapedText] = useState<string>('');

  const handleTextSubmit = async (text: string) => {
    if (text.trim().length < 50) {
      toast.error('Please enter at least 50 characters for meaningful summarization.');
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const summaryResult = await processSummarization(text);
      setResult(summaryResult);
      toast.success('Summarization complete!');
    } catch (error) {
      console.error('Summarization error:', error);
      toast.error('Failed to summarize text: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      new URL(urlInput.trim());
    } catch {
      toast.error('Please enter a valid URL (e.g., https://example.com/article)');
      return;
    }

    setIsScraping(true);
    setResult(null);

    try {
      toast.info('Extracting article from URL...');
      const { text, title } = await scrapeUrl(urlInput.trim());

      if (!text || text.trim().length < 50) {
        toast.error('Could not extract enough text from the URL. Try pasting the text directly.');
        return;
      }

      toast.info(`Extracted "${title || 'article'}" (${text.split(/\s+/).length} words). Summarizing...`);

      // Inject the text into the left pane
      setScrapedText(text);

      const summaryResult = await processSummarization(text);
      setResult(summaryResult);
      toast.success('Article summarized successfully!');
    } catch (error) {
      console.error('URL scrape/summarize error:', error);
      toast.error('Failed to extract article: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsScraping(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadSummaryAsText(result);
      toast.success('Summary report downloaded');
    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200 flex flex-col lg:flex-row overflow-hidden min-h-[700px]">

      {/* LEFT PANE: Editor Area */}
      <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 relative z-10 bg-white">

        {/* Minimal URL Input Section */}
        <div className="px-6 py-5 border-b border-slate-100 bg-white flex flex-col items-start gap-4 z-20">
          <div className="w-full flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 flex items-center">
              <LinkIcon className="w-4 h-4 mr-2 text-primary" />
              Summarize an Article from URL:
            </label>
            <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">Optional</div>
          </div>
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/long-article..."
              className="w-full pl-10 pr-24 py-3 rounded-xl border border-slate-200 bg-slate-50 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all shadow-sm"
              disabled={isScraping || isProcessing}
            />
            <Button
              onClick={handleUrlSubmit}
              disabled={isScraping || isProcessing || !urlInput.trim()}
              className="absolute inset-y-1.5 right-1.5 rounded-lg px-4 h-auto text-sm shadow-none"
            >
              {isScraping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Extract Article'
              )}
            </Button>
          </div>
        </div>

        {/* TextEditor Container */}
        <TextEditor
          onTextSubmit={handleTextSubmit}
          isProcessing={isProcessing}
          tool="ai-summary"
          placeholder="Or paste your article, document, or text here to generate a concise summary..."
          submitButtonText="Summarize"
          className="flex-grow h-full border-none shadow-none bg-transparent"
          injectedText={scrapedText}
        />
      </div>

      {/* RIGHT PANE: Results Area */}
      <div className="w-full lg:w-[400px] xl:w-[480px] bg-[#fdfdfd] border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col h-auto lg:h-full overflow-y-auto custom-scrollbar relative z-0">

        {/* EMPTY STATE */}
        {!result && !isProcessing && !isScraping && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="relative z-10 w-full max-w-[280px]">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
                <FileText className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                <div className="w-12 h-[3px] bg-slate-200 rounded-full"></div>
              </div>

              <h3 className="text-[17px] text-slate-700 font-medium mb-3">Waiting for content</h3>
              <p className="text-sm text-slate-500 mb-10">Paste text or provide a URL to generate an AI summary.</p>

              <div className="space-y-4 text-left bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-100/50">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
                  </div>
                  <span className="text-slate-600">Extracts key points</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  </div>
                  <span className="text-slate-600">Condenses long articles</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROCESSING STATE */}
        {(isProcessing || isScraping) && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150" />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 inline-block">
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
              </div>
              <span className="block text-xl font-bold text-slate-800 mb-2">
                {isScraping ? 'Extracting Article' : 'Generating Summary'}
              </span>
              <p className="text-sm text-slate-500 max-w-[250px] mx-auto">
                {isScraping ? 'Navigating to URL and bypassing boilerplate...' : 'Analyzing key points and compressing text length...'}
              </p>
            </div>
          </div>
        )}

        {/* RESULT STATE */}
        {result && !isProcessing && !isScraping && (
          <div className="h-full flex flex-col animate-in fade-in duration-500">
            <div className="p-6 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-slate-900">Summary Complete</h3>
              </div>
              <Button onClick={handleDownload} variant="outline" size="sm" className="h-8 shadow-sm">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export
              </Button>
            </div>

            <div className="p-6 flex-1 text-[15px] leading-relaxed text-slate-700">
              <p className="whitespace-pre-wrap">{result.summary}</p>

              {result.keyPoints && result.keyPoints.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    Key Takeaways
                  </h4>
                  <ul className="space-y-3">
                    {result.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary font-medium mr-2 select-none">{index + 1}.</span>
                        <span className="text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 mt-auto border-t border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center text-xs text-slate-500 px-2">
                <span>Original: <strong className="text-slate-700 font-medium">{result.wordCount.original}</strong> words</span>
                <span>Summary: <strong className="text-slate-700 font-medium">{result.wordCount.summary}</strong> words</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  -{100 - Math.round((result.wordCount.summary / result.wordCount.original) * 100)}% shorter
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
