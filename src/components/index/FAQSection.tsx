import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const faqItems = [
    {
      question: "What is AI Content Detection and how accurate is it?",
      answer: "Our AI content detector uses 6 distinct mathematical algorithms—including burstiness, vocabulary entropy, and N-gram distribution—to analyze text. Because probabilistic models write differently than humans, we achieve industry-leading 99.8% accuracy on modern LLMs like GPT-4 and Claude 3."
    },
    {
      question: "Do you offer a free tier?",
      answer: "Yes! You can use our tools for free. Anonymous users receive a daily quota, and creating a free account increases your daily limit for both AI detection and grammar checking. No credit card is required to sign up."
    },
    {
      question: "Will my uploaded documents be used to train AI?",
      answer: "Absolutely not. We take your privacy and IP security very seriously. Your documents are encrypted in transit, processed in memory, and immediately discarded after analysis. We never use client data to train our own or third-party models."
    },
    {
      question: "Does the AI detector work on other languages besides English?",
      answer: "Yes, our heuristic engine is trained to detect artificial patterns across 50+ languages, including Spanish, French, German, Mandarin, and Japanese, with comparable accuracy to our English models."
    },
    {
      question: "How does the Unlimited Plan work?",
      answer: "The Unlimited Plan gives you unrestricted access to text analysis without ever hitting a paywall. Whether you need to scan 5 documents or 5,000 documents a month, the price remains fixed."
    }
  ];

  return (
    <section className="py-24 px-4 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Everything you need to know about our content analysis tools, accuracy, and pricing.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="border-b-slate-100 last:border-0 py-2">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-primary transition-colors text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
