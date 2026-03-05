
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
}

export const TextEditor: React.FC<TextEditorProps> = ({
  onTextSubmit,
  isProcessing,
  tool,
  placeholder = 'Enter your text here...',
  submitButtonText = 'Analyze'
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
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <div className="flex justify-end mb-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".txt,.pdf,.doc,.docx"
          />
          <Button
            type="button"
            onClick={triggerFileUpload}
            variant="outline"
            size="sm"
            disabled={isProcessing}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          rows={8}
          className="w-full p-4 rounded-lg bg-background border border-input focus:border-primary transition-colors focus:outline-none resize-none shadow-sm text-base"
          disabled={isProcessing}
        ></textarea>
        
        <div className="flex justify-between items-center mt-3">
          <div className="text-xs text-muted-foreground">
            <span>{characterCount} characters</span>
            <span className="mx-2">•</span>
            <span>{wordCount} words</span>
          </div>
          <Button
            type="submit"
            disabled={isProcessing || text.trim().length < 10}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
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
