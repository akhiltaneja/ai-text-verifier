
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const TranslationFAQ: React.FC = () => {
  const faqs = [
    {
      question: "How accurate is the translation tool?",
      answer: "Our translation tool leverages advanced AI models to provide high-quality translations across multiple languages. While accuracy is excellent for most common languages and general content, technical or highly specialized content may have some limitations."
    },
    {
      question: "Which languages are supported?",
      answer: "We support over 50 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, Russian, Portuguese, and many more. Our system can automatically detect the source language in most cases."
    },
    {
      question: "Are there any character limits?",
      answer: "Free users can translate up to 500 words per day. Premium users enjoy higher limits with the ability to translate longer documents and higher daily quotas based on their subscription plan."
    },
    {
      question: "Is my text data private and secure?",
      answer: "Yes, we take privacy very seriously. Your text data is encrypted during transmission, not stored permanently after translation, and never shared with third parties. We comply with major privacy regulations including GDPR."
    },
    {
      question: "Can I use the translations for commercial purposes?",
      answer: "Yes, you own the rights to your translated content and can use it for commercial purposes. However, we recommend human review for legal, medical, or other critical documents where perfect accuracy is essential."
    },
    {
      question: "How do I report a translation error?",
      answer: "If you notice a translation error, you can provide feedback using the feedback form available on the translator page. Your input helps us improve the translation quality over time."
    }
  ];
  
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
