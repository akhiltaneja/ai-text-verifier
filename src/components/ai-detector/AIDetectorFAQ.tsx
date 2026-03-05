
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AIDetectorFAQ: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">AI Content Detector FAQs</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger className="text-left text-base font-medium">
            How accurate is your AI content detector?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Our AI content detector achieves an accuracy rate of over 90% in identifying content created by leading AI models like ChatGPT, Claude, and Gemini. However, accuracy may vary depending on factors like text length, complexity, and the specific AI model used. For best results, we recommend analyzing texts of at least 300 words.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q2">
          <AccordionTrigger className="text-left text-base font-medium">
            Can your tool detect content from all AI writing tools?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Our detector is optimized to identify content from major AI models including GPT-3.5, GPT-4, Claude, Gemini, and similar large language models. It's continually updated to keep pace with new AI systems. However, heavily edited AI content or text from specialized or proprietary AI systems may be more challenging to detect with the same level of accuracy.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q3">
          <AccordionTrigger className="text-left text-base font-medium">
            Will your detector flag human-written content as AI-generated?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Our system is designed to minimize false positives, but no detection system is perfect. Occasionally, highly formal or technical human writing may share patterns with AI-generated text. Similarly, highly creative or unconventional writing might receive lower AI probability scores. We recommend using the detector as one tool in your assessment rather than as the sole determining factor.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q4">
          <AccordionTrigger className="text-left text-base font-medium">
            How do you protect the privacy of the text I analyze?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>We take data privacy seriously. Text submitted to our AI detector is processed securely and is not stored permanently on our servers after analysis is complete. We do not use your submitted text to train our models or share it with third parties. For users with privacy concerns, we offer options to delete analysis data immediately after processing.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q5">
          <AccordionTrigger className="text-left text-base font-medium">
            How does the AI detector work?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Our AI detector uses a multilayered approach that combines statistical analysis, pattern recognition, and machine learning. It examines various linguistic features including sentence structure, word choice patterns, text entropy, and stylistic consistency. The system has been trained on millions of examples of both human and AI-written text to identify the subtle differences between them.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q6">
          <AccordionTrigger className="text-left text-base font-medium">
            Can I use this tool for academic integrity purposes?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Yes, our AI detector is widely used by educators to help maintain academic integrity. However, we recommend using it as part of a comprehensive approach that includes discussions with students, clear guidelines about AI use, and human judgment. While our tool provides valuable insights, decisions about academic integrity should not be based solely on automated detection systems.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q7">
          <AccordionTrigger className="text-left text-base font-medium">
            Does the detector work with languages other than English?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Currently, our AI detector is optimized for English text. While it may provide some level of detection for other major languages, the accuracy will be significantly lower. We're actively working on expanding our language capabilities to include more comprehensive support for other languages in future updates.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q8">
          <AccordionTrigger className="text-left text-base font-medium">
            Is there a minimum text length requirement?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>For meaningful results, we recommend analyzing text that is at least 100 words long. However, the most accurate results come from texts with 300 or more words. Very short texts provide fewer linguistic patterns for our system to analyze, which can reduce detection accuracy.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q9">
          <AccordionTrigger className="text-left text-base font-medium">
            Can AI-generated text be modified to evade detection?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Yes, AI text can be edited to make detection more difficult. Techniques like heavy manual editing, paraphrasing, or using specialized "AI humanizers" can reduce detectability. However, our system is designed to identify subtle patterns that often remain even after editing. We continually update our detection methods to address evasion techniques and maintain high accuracy.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="q10">
          <AccordionTrigger className="text-left text-base font-medium">
            What do the different percentage scores mean?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            <p>Our AI probability score represents the likelihood that the analyzed text was generated by an AI system:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>80-100%: Very likely AI-generated</li>
              <li>60-80%: Likely AI-generated</li>
              <li>40-60%: Mixed characteristics or uncertain</li>
              <li>20-40%: Likely human-written</li>
              <li>0-20%: Very likely human-written</li>
            </ul>
            <p className="mt-2">These ranges provide a general guideline, but they should be considered alongside the detailed analysis and context of the text.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
