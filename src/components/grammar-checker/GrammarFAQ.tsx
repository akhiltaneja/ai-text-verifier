
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const GrammarFAQ: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 mb-16 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-3 bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Find answers to common questions about our grammar checker
      </p>

      <div className="bg-white dark:bg-gray-950 rounded-lg border border-violet-100 dark:border-indigo-800/30 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-violet-100 dark:border-indigo-800/30">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              How accurate is the grammar checker?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              Our grammar checker uses advanced AI technology to provide highly accurate suggestions and corrections. 
              However, like any automated tool, it's not perfect and some context-specific or nuanced issues might 
              require human judgment. We recommend using it as an assistive tool alongside your own review.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border-b border-violet-100 dark:border-indigo-800/30">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              What types of errors does the grammar checker detect?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              Our grammar checker can detect a wide range of issues including spelling errors, grammar mistakes, 
              punctuation problems, subject-verb agreement, article usage, commonly confused words, redundancies, 
              and stylistic issues. It also checks for clarity and fluency to help improve the overall quality of your writing.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="border-b border-violet-100 dark:border-indigo-800/30">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              Is my text stored or shared?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              We take your privacy seriously. Your text is processed temporarily to provide suggestions and is 
              not permanently stored or shared with third parties. All processing is done securely, and we do 
              not use your content to train our models without explicit permission.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border-b border-violet-100 dark:border-indigo-800/30">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              What file formats are supported for upload?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              Currently, our grammar checker supports .txt, .pdf, .doc, and .docx file formats for direct upload. 
              For other formats, we recommend copying and pasting the text into the editor. We're working on 
              expanding the range of supported formats in future updates.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5" className="border-b border-violet-100 dark:border-indigo-800/30">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              Is there a limit to how much text I can check?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              Free users can check up to 500 words per analysis. Premium subscribers can check up to 10,000 words 
              per analysis and have access to advanced features like style suggestions and tone analysis. If you 
              need to check longer documents, you can split them into multiple parts or upgrade to a premium plan.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="px-6 hover:text-violet-700 dark:hover:text-indigo-400">
              How often is the grammar checker updated?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              We continuously improve our grammar checker with regular updates to enhance accuracy and expand 
              the range of errors it can detect. Our team of linguists and AI experts work together to incorporate 
              the latest language trends and rules. Premium users get access to the newest features and improvements first.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
