
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { TranslationFAQ } from '@/components/translation/TranslationFAQ';
import { AIDetectorFAQ } from '@/components/ai-detector/AIDetectorFAQ';
import { SummaryFAQ } from '@/components/ai-summary/SummaryFAQ';
import { GrammarFAQ } from '@/components/grammar-checker/GrammarFAQ';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    // Ensure page starts at the top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our AI content tools and services.
          </p>
        </div>

        <div className="mb-10">
          <NavigationMenu className="justify-center mb-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="#general">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    General
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#ai-detector">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    AI Detector
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#translator">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Translator
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#summarizer">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Summarizer
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="#grammar">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Grammar Checker
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-5 max-w-3xl mx-auto mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ai-detector">AI Detector</TabsTrigger>
              <TabsTrigger value="translator">Translator</TabsTrigger>
              <TabsTrigger value="summarizer">Summarizer</TabsTrigger>
              <TabsTrigger value="grammar">Grammar Checker</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" id="general" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">General Questions</h2>
                <div className="mb-16">
                  <div className="max-w-3xl mx-auto">
                    <div className="FAQSection">
                      {/* Use the existing FAQSection component content */}
                      <div className="container mx-auto max-w-4xl">
                        <div className="mb-10">
                          <h3 className="text-xl font-semibold mb-4">About Our Services</h3>
                        </div>
                        <div className="mb-10">
                          <FAQItems />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ai-detector" id="ai-detector" className="mt-6">
              <AIDetectorFAQ />
            </TabsContent>
            
            <TabsContent value="translator" id="translator" className="mt-6">
              <TranslationFAQ />
            </TabsContent>
            
            <TabsContent value="summarizer" id="summarizer" className="mt-6">
              <SummaryFAQ />
            </TabsContent>
            
            <TabsContent value="grammar" id="grammar" className="mt-6">
              <GrammarFAQ />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

// Extract FAQItems from the FAQSection component
const FAQItems = () => {
  const faqItems = [
    {
      question: "What is AI Content Detection?",
      answer: "Our AI content detector uses advanced algorithms to analyze text patterns, language structure, and other indicators to determine whether content was likely generated by AI models like ChatGPT, Claude, or other language models. It provides a detailed analysis with confidence scores and specific markers of AI-generated content."
    },
    {
      question: "How accurate is the Grammar Checker?",
      answer: "Our grammar checker employs comprehensive linguistic rules and machine learning to identify grammatical errors, spelling mistakes, and style improvements. It covers everything from basic spelling to complex grammatical structures, providing detailed explanations for each correction."
    },
    {
      question: "Is the Paraphrasing Tool really free?",
      answer: "Yes! Our paraphrasing tool is completely free to use with no subscription required. It helps you rephrase content while maintaining meaning, improving readability, and ensuring originality. While other features may require credits, paraphrasing remains free for all users."
    },
    {
      question: "How does the credit system work?",
      answer: "Our credit system is simple: 1 credit equals 1 word processed. Free users get 250 credits per day per tool without login, and 500 credits with login. These credits refresh daily, ensuring you can always access our tools. The paraphrasing tool remains free and doesn't use credits."
    },
    {
      question: "How do I get more credits?",
      answer: "You can get more credits by upgrading to our Basic Plan ($3/month for 5,000 credits) or Premium Plan ($10/month for unlimited credits). Each plan also includes additional features like advanced grammar correction, faster processing times, and more."
    },
    {
      question: "Can I download analysis reports?",
      answer: "Yes! All our tools allow you to download detailed reports of your analysis. These reports include original text, corrections, suggestions, and complete analysis metrics. This feature is available for all users, including those on the free tier."
    },
    {
      question: "What types of text can I analyze?",
      answer: "Our tools support a wide range of text types including essays, articles, blog posts, marketing copy, academic papers, creative writing, and more. The AI detector is particularly effective with longer texts (100+ words) as it needs enough content to analyze patterns."
    },
    {
      question: "Are my uploads secure and private?",
      answer: "Yes, we take your privacy seriously. All text submitted to our tools is encrypted during transmission and is not stored permanently on our servers. We do not use your content for training our models or share it with third parties. Your data is processed only for the purpose of providing the requested analysis."
    },
    {
      question: "How does the Paraphrasing Tool work?",
      answer: "Our paraphrasing tool uses advanced natural language processing to understand your text and generate alternative versions that maintain the original meaning. It can simplify complex content, improve readability, and help you avoid unintentional plagiarism by rephrasing content in your own voice."
    },
    {
      question: "Can I use these tools for academic purposes?",
      answer: "Absolutely! Our tools are designed with academic integrity in mind. Students can use the grammar checker to improve their writing, the plagiarism detector to ensure originality, and the AI detector helps institutions verify that submitted work is original. We recommend following your institution's guidelines on the use of such tools."
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;
