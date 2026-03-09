
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Upload } from 'lucide-react';
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
}

export const TextEditor: React.FC<TextEditorProps> = ({
  onTextSubmit,
  isProcessing,
  tool,
  placeholder = 'Enter your text here...',
  submitButtonText = 'Analyze',
  className = ''
}) => {
  const [text, setText] = useState('');
  const { useCredits: checkCredits, availableCredits } = useCredits();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim().length < 10) {
      toast.error('Please enter at least 10 characters.');
      return;
    }

    const wordCount = text.trim().split(/\s+/).length;

    // Skip credit check for summarization tool
    if (tool === 'ai-summary') {
      onTextSubmit(text.trim());
      return;
    }

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
      // For this demo, we'll just handle TXT files
      if (file.type === 'text/plain') {
        const content = await file.text();
        setText(content);
        toast.success('Text extracted from document.');
      } else {
        toast.error('Document parsing not fully implemented yet. Please use TXT files for now.');
      }
    } catch (error) {
      console.error('Error extracting text:', error);
      toast.error('Failed to extract text from document.');
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

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full flex-grow p-6 md:p-10 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none text-lg text-slate-700 min-h-[400px] pb-32"
          disabled={isProcessing}
        ></textarea>

        {/* Empty State Centered Action Pills */}
        {text.length === 0 && !isProcessing && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 pointer-events-none">
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

            <Button
              type="button"
              variant="outline"
              className="rounded-full bg-white/80 backdrop-blur pointer-events-auto border-slate-200 shadow-sm hover:bg-slate-50 hover:text-primary text-slate-600 px-6 py-6 h-auto transition-all"
              onClick={triggerFileUpload}
            >
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                <span className="font-medium text-[15px]">Upload doc</span>
              </div>
            </Button>
          </div>
        )}

        {/* Floating Bottom Action Bar */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-3xl bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 p-2 md:p-2.5 flex justify-between items-center z-20">
          <div className="flex items-center gap-3 md:gap-6 pl-4 md:pl-6 text-sm text-slate-500 font-medium">
            <span>{wordCount} Words</span>

            {/* Inline Credits Display */}
            {tool !== 'ai-summary' && (
              <div className="flex items-center px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full font-semibold text-slate-700">
                <span className="mr-1.5 text-amber-500">⚡</span>
                {availableCredits[tool]} Credits
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isProcessing || text.trim().length < 10}
            className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-6 h-auto font-semibold text-base shadow-sm transition-all shadow-primary/20"
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
