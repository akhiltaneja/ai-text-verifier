
import React, { useState } from 'react';
import { TextEditor } from '@/components/TextEditor';
import { Loader2, Download, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { processSummarization, downloadSummaryAsText, scrapeUrl } from '@/services/summarization-service';
import { SummarizationResult } from '@/types/summarization';
import { toast } from 'sonner';

export const SummarizationToolComponent: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SummarizationResult | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isScraping, setIsScraping] = useState(false);

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

    // Basic URL validation
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
    <div className="w-full">
      {/* URL Input Section */}
      <div className="p-4 rounded-lg border border-input mb-4 bg-card">
        <label className="text-sm font-medium mb-2 block text-muted-foreground">
          <LinkIcon className="w-4 h-4 inline mr-1.5 -mt-0.5" />
          Paste an article URL to summarize
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/article..."
            className="flex-1 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:border-primary transition-colors"
            disabled={isScraping || isProcessing}
          />
          <Button
            onClick={handleUrlSubmit}
            disabled={isScraping || isProcessing || !urlInput.trim()}
            size="sm"
          >
            {isScraping ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              'Summarize URL'
            )}
          </Button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground mb-4">— or paste text directly —</div>

      {/* Text Input Section */}
      <div className="p-6 rounded-lg border border-input mb-6">
        <TextEditor
          onTextSubmit={handleTextSubmit}
          isProcessing={isProcessing}
          tool="ai-summary"
          placeholder="Paste your article, document, or text here to generate a concise summary..."
          submitButtonText="Summarize"
        />
      </div>

      {(isProcessing || isScraping) && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <span className="ml-3 text-lg">
            {isScraping ? 'Extracting article...' : 'Generating summary...'}
          </span>
        </div>
      )}

      {result && !isProcessing && !isScraping && (
        <div className="mt-8 animate-fade-in">
          <div className="bg-card shadow-sm rounded-lg p-6 border mb-6">
            <h3 className="text-xl font-bold mb-4">Summary</h3>
            <p className="whitespace-pre-wrap mb-6">{result.summary}</p>

            {result.keyPoints && result.keyPoints.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Points</h4>
                <ul className="list-disc pl-6 space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center text-sm text-muted-foreground">
              <div>
                <span>Original: {result.wordCount.original} words</span>
                <span className="mx-2">•</span>
                <span>Summary: {result.wordCount.summary} words</span>
                <span className="mx-2">•</span>
                <span>
                  {Math.round((result.wordCount.summary / result.wordCount.original) * 100)}% of original length
                </span>
              </div>

              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
