
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, AlertTriangle, Sparkles, Book, HelpCircle } from 'lucide-react';
import { GrammarResult as GrammarResultType } from '@/types/grammar-checker';
import { downloadGrammarReport } from '@/services/grammar-checker/report-generator';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

interface GrammarResultProps {
  result: GrammarResultType;
}

export const GrammarResultView: React.FC<GrammarResultProps> = ({ result }) => {
  const { toast } = useToast();

  const handleDownload = () => {
    downloadGrammarReport(result);
    toast({
      title: "Report Downloaded",
      description: "Your grammar check report has been downloaded."
    });
  };

  // Function to highlight errors in the original text
  const highlightErrors = (text: string, corrections: GrammarResultType['corrections']) => {
    if (!corrections.length) return <pre className="whitespace-pre-wrap font-sans">{text}</pre>;

    // Sort corrections by position in descending order to avoid index shifting
    const sortedCorrections = [...corrections].sort((a, b) => 
      b.position[0] - a.position[0]
    );

    // Create a sorted corrections array for ascending order processing
    const ascendingCorrections = [...corrections].sort((a, b) => 
      a.position[0] - b.position[0]
    );
    
    // Process each correction and wrap the error word in a span
    const fragments: React.ReactNode[] = [];
    let lastIndex = 0;
    
    for (let i = 0; i < ascendingCorrections.length; i++) {
      const correction = ascendingCorrections[i];
      const [start, end] = correction.position;
      
      if (start >= 0 && end <= text.length && start >= lastIndex) {
        // Add text before the error
        if (start > lastIndex) {
          fragments.push(
            <span key={`text-${i}-before`}>{text.substring(lastIndex, start)}</span>
          );
        }
        
        // Add the highlighted error
        fragments.push(
          <span 
            key={`error-${i}`}
            className="text-destructive font-medium"
            title={correction.explanation}
          >
            {text.substring(start, end)}
          </span>
        );
        
        lastIndex = end;
      }
    }
    
    // Add remaining text after the last error
    if (lastIndex < text.length) {
      fragments.push(
        <span key="text-end">{text.substring(lastIndex)}</span>
      );
    }

    return <pre className="whitespace-pre-wrap font-sans">{fragments}</pre>;
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
      <Card className="overflow-hidden mb-8 border">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Grammar Check Result</h2>
              <p className="text-muted-foreground text-sm">Analysis complete with {result.corrections.length} issues found</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">Writing Score</span>
                <span className="text-sm font-bold">{result.score}/100</span>
              </div>
              <Progress 
                value={result.score} 
                className="h-3"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">Fluency Score</span>
                <span className="text-sm font-bold">{result.fluencyScore}/100</span>
              </div>
              <Progress 
                value={result.fluencyScore}
                className={`h-3 ${result.fluencyScore > 70 ? 'bg-green-100' : 'bg-yellow-100'}`}
                indicatorClassName={result.fluencyScore > 70 ? 'bg-green-600' : 'bg-yellow-600'}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">Clarity Score</span>
                <span className="text-sm font-bold">{result.clarityScore}/100</span>
              </div>
              <Progress 
                value={result.clarityScore}
                className={`h-3 ${result.clarityScore > 70 ? 'bg-green-100' : 'bg-yellow-100'}`}
                indicatorClassName={result.clarityScore > 70 ? 'bg-green-600' : 'bg-yellow-600'}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-medium">Error Percentage</span>
                <span className="text-sm font-bold">{result.errorPercentage}%</span>
              </div>
              <Progress 
                value={result.errorPercentage}
                className="h-3 bg-red-100"
                indicatorClassName="bg-red-600"
              />
            </div>
          </div>
          
          <div className="bg-muted/50 p-5 rounded-lg border mb-4 text-base">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
              <h3 className="font-medium text-lg">Summary</h3>
            </div>
            <p className="text-base">{result.summary}</p>
          </div>
          
          <div className="bg-primary/5 p-5 rounded-lg border">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 mr-2 text-primary" />
              Understanding Your Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-1">Writing Score</h4>
                <p className="text-muted-foreground mb-2">Overall quality of writing based on grammar, spelling, and style</p>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>90-100: Excellent</li>
                  <li>80-89: Very Good</li>
                  <li>70-79: Good</li>
                  <li>60-69: Fair</li>
                  <li>Below 60: Needs Improvement</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Fluency & Clarity</h4>
                <p className="text-muted-foreground mb-2">How naturally the text flows and how clearly ideas are expressed</p>
                <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                  <li>70+ (Green): Strong performance</li>
                  <li>Below 70 (Yellow): Room for improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Original Text</h3>
          <div className="bg-muted/30 rounded-lg p-5 text-base leading-relaxed">
            {highlightErrors(result.text, result.corrections)}
          </div>
        </CardContent>
      </Card>

      <SuggestionsList corrections={result.corrections} />

      <Card className="border mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Suggested Text</h3>
          <div className="bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-100 rounded-lg p-5 text-base leading-relaxed">
            <pre className="whitespace-pre-wrap font-sans">{result.correctedText}</pre>
          </div>
        </CardContent>
      </Card>
      
      <HowToUseSection />
      <FAQSection />
      <UpgradeToPremium />
    </div>
  );
};

interface CorrectionsListProps {
  corrections: GrammarResultType['corrections'];
}

const SuggestionsList: React.FC<CorrectionsListProps> = ({ corrections }) => {
  return (
    <Card className="mb-8 border">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Suggestions ({corrections.length})</h3>
        <div className="space-y-4">
          {corrections.map((correction, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-5">
              <div className="flex justify-between mb-3">
                <span className="font-medium text-base">Suggestion {index + 1}</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${
                  correction.type === 'grammar' 
                    ? 'bg-destructive/10 text-destructive' 
                    : correction.type === 'spelling'
                      ? 'bg-warning/10 text-warning'
                      : correction.type === 'punctuation'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                }`}>
                  {correction.type}
                </span>
              </div>
              <div className="flex items-center mb-3 text-base">
                <div className="line-through text-destructive">{correction.original}</div>
                <span className="mx-3">→</span>
                <div className="font-medium text-success">{correction.corrected}</div>
              </div>
              <p className="text-sm text-muted-foreground">{correction.explanation}</p>
            </div>
          ))}
          
          {corrections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle className="h-12 w-12 text-success mb-3" />
              <p className="text-lg font-medium">No suggestions needed!</p>
              <p className="text-muted-foreground">Your text looks great and doesn't require any grammar suggestions.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const HowToUseSection: React.FC = () => {
  return (
    <Card className="mb-8 border">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2 text-primary" />
          How to Use the Grammar Checker
        </h3>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium mr-3 shrink-0">1</div>
            <div>
              <h4 className="font-medium text-base mb-1">Enter Your Text</h4>
              <p className="text-muted-foreground text-sm">Paste or type your text in the editor. You can also upload a document in TXT format.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium mr-3 shrink-0">2</div>
            <div>
              <h4 className="font-medium text-base mb-1">Click "Analyze"</h4>
              <p className="text-muted-foreground text-sm">Our grammar checker will automatically scan your text for grammatical errors, spelling mistakes, and style improvements.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium mr-3 shrink-0">3</div>
            <div>
              <h4 className="font-medium text-base mb-1">Review Suggestions</h4>
              <p className="text-muted-foreground text-sm">Examine each correction, complete with explanations about why changes are recommended.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary/10 rounded-full h-8 w-8 flex items-center justify-center text-primary font-medium mr-3 shrink-0">4</div>
            <div>
              <h4 className="font-medium text-base mb-1">Download Your Report</h4>
              <p className="text-muted-foreground text-sm">Get a detailed PDF report with all corrections and suggestions for future reference.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FAQSection: React.FC = () => {
  return (
    <Card className="mb-8 border">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How accurate is the grammar checker?</AccordionTrigger>
            <AccordionContent>
              Our grammar checker employs comprehensive linguistic rules and machine learning to identify grammatical errors, spelling mistakes, and style improvements. It covers everything from basic spelling to complex grammatical structures, providing detailed explanations for each correction.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How many words can I check at once?</AccordionTrigger>
            <AccordionContent>
              Free users can check up to 500 words per day (750 words with login). Premium users can check up to 2,000 words per day. Each word consumes one credit from your daily allocation.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>What types of errors does it detect?</AccordionTrigger>
            <AccordionContent>
              Our grammar checker detects various types of errors including spelling mistakes, grammar errors (subject-verb agreement, tense usage, etc.), punctuation errors, style issues, commonly confused words, and redundancies.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I use this for academic papers?</AccordionTrigger>
            <AccordionContent>
              Yes! Our grammar checker is perfect for academic papers, essays, research papers, and other scholarly documents. It helps ensure your writing is clear, correct, and professional.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger>Is my text saved or stored?</AccordionTrigger>
            <AccordionContent>
              Your privacy is important to us. We do not permanently store your text on our servers. Your text is only processed temporarily to provide the grammar check service and is not used to train our models.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

const UpgradeToPremium: React.FC = () => {
  return (
    <Card className="mb-8 border">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
            <p className="text-muted-foreground mb-4">Get 2,000 daily credits, enhanced grammar detection, and priority support with our Premium plan.</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span>4x more daily credits for grammar checking</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span>Advanced style suggestions</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span>Detailed writing analysis</span>
              </li>
              <li className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 text-success mr-2" />
                <span>Priority customer support</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/pricing">Upgrade Now</Link>
            </Button>
          </div>
          <div className="md:w-1/3 bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary mb-1">$5.99</div>
            <div className="text-sm text-muted-foreground mb-4">per month</div>
            <div className="text-xs bg-success/10 text-success rounded-full px-2 py-1 inline-block">
              Save 50% - Limited Time
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
