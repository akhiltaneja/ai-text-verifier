
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, ShieldCheck, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker from CDN to avoid build asset path complications in Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
import { useCredits } from '@/context/CreditContext';
import { ToolType } from '@/context/types';
import { toast } from 'sonner';

interface TextEditorProps {
  onTextSubmit: (text: string) => void;
  isProcessing: boolean;
  tool: ToolType;
  placeholder?: string;
  submitButtonText?: string;
  className?: string;
  injectedText?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  onTextSubmit,
  isProcessing,
  tool,
  placeholder = 'Enter your text here...',
  submitButtonText = 'Analyze',
  className = '',
  injectedText
}) => {
  const [text, setText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  // Update internal text when injectedText changes
  React.useEffect(() => {
    if (injectedText !== undefined && injectedText !== '') {
      setText(injectedText);
    }
  }, [injectedText]);

  const { useCredits: checkCredits, availableCredits, dailyLimit, isLoading } = useCredits();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim().length < 10) {
      toast.error('Please enter at least 10 characters.');
      return;
    }

    const wordCount = text.trim().split(/\s+/).length;

    // Explicit check for tools that use useCredits directly
    // Using checkCredits handles the deduction locally and async on server

    // Check if user has enough credits for other tools
    if (availableCredits[tool] < wordCount) {
      toast.error('Not enough credits remaining. Please upgrade your plan.');
      return;
    }

    // Use the correct credit checking method
    // The useCredits method returns true if credits were successfully used
    if (checkCredits(tool, wordCount)) {
      onTextSubmit(text.trim());
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type and size
    if (!file.type.match('text/plain|application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      toast.error('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File size exceeds 10MB limit.');
      return;
    }

    // Simple text extraction for demo purposes
    // In a real app, we'd use a proper document parsing library
    try {
      setIsExtracting(true);
      toast.info('Extracting text locally...');

      if (file.type === 'text/plain') {
        const content = await file.text();
        setText(content);
        toast.success('Text extracted from document.');
      } else if (file.type === 'application/pdf') {
        let extractedText = '';
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          extractedText += pageText + '\n\n';
        }
        setText(extractedText.trim());
        toast.success(`Extracted ${pdf.numPages} pages from PDF.`);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value.trim());
        toast.success('Text extracted from Word document.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      toast.error('Failed to extract text. The file might be corrupted or image-based.');
    } finally {
      setIsExtracting(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const characterCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col h-full relative ${className}`}>
      <div className="relative flex flex-col h-full flex-grow w-full">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.pdf,.doc,.docx"
        />

        <div className="absolute inset-0 w-full h-[calc(100%-100px)]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-6 md:p-10 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none text-lg text-slate-700 custom-scrollbar pb-32"
            disabled={isProcessing}
          ></textarea>
        </div>

        {/* Clear Text Button (appears when text exists) */}
        {text.length > 0 && !isProcessing && (
          <div className="absolute top-4 right-4 z-20">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setText('')}
                    className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-800 text-white border-none shadow-xl mb-1 py-1 px-3">
                  <span className="text-xs font-medium">Clear text</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Empty State Centered Action Pills */}
        {text.length === 0 && !isProcessing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <div className="flex items-center gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-white/80 backdrop-blur pointer-events-auto border-slate-200 shadow-sm hover:bg-slate-50 hover:text-primary text-slate-600 px-6 py-6 h-auto transition-all"
                onClick={async () => {
                  try {
                    const clipboardText = await navigator.clipboard.readText();
                    if (clipboardText) setText(clipboardText);
                  } catch (err) {
                    toast.error("Could not read from clipboard. Please paste manually.");
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span className="font-medium text-[15px]">Paste text</span>
                </div>
              </Button>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isExtracting}
                      className="rounded-full bg-white/80 backdrop-blur pointer-events-auto border-slate-200 shadow-sm hover:bg-slate-50 hover:text-primary text-slate-600 px-6 py-6 h-auto transition-all"
                      onClick={triggerFileUpload}
                    >
                      <div className="flex items-center gap-2">
                        {isExtracting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                        <span className="font-medium text-[15px]">{isExtracting ? 'Extracting...' : 'Upload doc'}</span>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-800 text-white border-none shadow-xl mb-1 py-2 px-3 max-w-[280px]">
                    <div className="flex items-center text-xs font-medium">
                      <ShieldCheck className="w-4 h-4 mr-2 text-emerald-400 shrink-0" />
                      Files are parsed locally on your device. We never save or upload your documents.
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}

        {/* Floating Bottom Action Bar */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-3xl bg-slate-100/95 backdrop-blur-xl rounded-full shadow-[0_15px_35px_-5px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.03)] border border-slate-300 p-2 md:p-2.5 flex justify-between items-center z-20 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.03),0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 group">
          <div className="flex items-center gap-3 md:gap-6 pl-4 md:pl-6 text-sm text-slate-500 font-medium">
            <span>{wordCount} Words</span>

            {/* Inline Credits Display */}
            <div className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-700">
              <span className="mr-1.5 text-amber-500">⚡</span>
              {isLoading ? (
                <span className="h-4 w-16 bg-slate-200 animate-pulse rounded inline-block"></span>
              ) : (
                dailyLimit >= 999999 ? 'Unlimited' : `${availableCredits[tool]} Credits`
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isProcessing || text.trim().length < 10}
            className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-6 h-auto font-bold text-base shadow-sm transition-all duration-300 shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] group-hover:bg-blue-600"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
