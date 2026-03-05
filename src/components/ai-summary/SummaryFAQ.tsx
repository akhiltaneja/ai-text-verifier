
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const SummaryFAQ: React.FC = () => {
  const faqs = [
    {
      question: "How accurate is the AI text summarization?",
      answer: "Our AI summarization tool is designed to maintain high accuracy by identifying and preserving the most important information from your original text. While no summarization is perfect, our tool aims to capture the key points and main ideas with advanced AI algorithms that understand context and importance."
    },
    {
      question: "How much text can I summarize at once?",
      answer: "Free users can summarize up to 2,000 words per day. The tool works best with texts between 100 and 5,000 words, although it can handle shorter or longer content. For larger volumes or more frequent summarization needs, consider upgrading to our premium plan."
    },
    {
      question: "Can I control how long the summary should be?",
      answer: "Yes, you can adjust the compression rate to control the length of your summary. By default, the tool aims to reduce the text to approximately 15-25% of the original length, but this can be customized based on your needs with our premium plan."
    },
    {
      question: "What types of content can be summarized?",
      answer: "The tool works well with various types of content including articles, research papers, reports, news, blog posts, and more. It's optimized for factual and informational content but can also handle narrative text with a focus on extracting key events and points."
    },
    {
      question: "Is my content secure when using the summarization tool?",
      answer: "Yes, we take data privacy seriously. Your content is processed securely and is not stored permanently on our servers. We do not use your content for training our models or share it with third parties."
    },
    {
      question: "How does the key points extraction work?",
      answer: "Our AI identifies the most significant sentences and ideas from your text based on factors like relevance, importance, and uniqueness. These key points are presented as a bulleted list, making it easy to quickly grasp the most crucial information from the original text."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
