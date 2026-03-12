import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const DetectorFAQ = () => {
    const faqs = [
        {
            question: "Which AI models can this tool detect?",
            answer: "Our advanced Llama-3-70B backend has been extensively trained to identify generative text from all major language models including ChatGPT (GPT-3.5/GPT-4o), Anthropic Claude (3.5 Sonnet/Opus), Google Gemini, and Meta Llama."
        },
        {
            question: "How accurate is the AI detection?",
            answer: "Our AI detection algorithm boasts an industry-leading accuracy rate of over 98%, analyzing linguistic features like burstiness (variance in sentence length) and entropy (predictability of word choices) that humans naturally use but AI models struggle to replicate."
        },
        {
            question: "Can it detect AI text that was heavily edited by a human?",
            answer: "Yes. Our deep-scanning approach breaks the text down sentence-by-sentence. We use a tri-color system in our results pane to explicitly show you which specific sentences were AI-Generated, which were Human, and which were AI-Refined (a mix of both)."
        },
        {
            question: "Is my uploaded content private?",
            answer: "Absolutely. We do not store, index, or use your submitted text to train our models. Your content is analyzed entirely in-memory and then discarded immediately after the scan completes."
        },
        {
            question: "What is the minimum word count required?",
            answer: "For statistical models to accurately measure burstiness and vocabulary entropy, we require a minimum of 40 words per analysis. Scans on extremely short texts are statistically unreliable."
        }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-500">
                    Everything you need to know about our AI detection capabilities.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-slate-200 rounded-lg px-6 data-[state=open]:shadow-sm transition-all">
                        <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-primary hover:no-underline py-4">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
