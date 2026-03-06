import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { AIDetectionSample } from '@/types/ai-detector';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Particles } from '@/components/ui/particles';

export const AIDetectionDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai');

  const samples: Record<'ai' | 'human', AIDetectionSample> = {
    ai: {
      text: "The impact of artificial intelligence on modern society represents one of the most significant technological shifts in human history. AI systems have permeated various aspects of daily life, from virtual assistants like Siri and Alexa to recommendation algorithms and automated customer service interfaces. These technologies offer unprecedented efficiency and convenience, streamlining processes that once required substantial human intervention.",
      score: 91,
      verdict: 'Likely AI-Generated',
      highlights: [
        {
          text: "The impact of artificial intelligence on modern society represents one of the most significant technological shifts in human history.",
          isAI: true
        },
        {
          text: "AI systems have permeated various aspects of daily life, from virtual assistants like Siri and Alexa to recommendation algorithms and automated customer service interfaces.",
          isAI: true
        },
        {
          text: "These technologies offer unprecedented efficiency and convenience, streamlining processes that once required substantial human intervention.",
          isAI: true
        }
      ]
    },
    human: {
      text: "I met my best friend when I was only seven years old. We were in the same class, sitting next to each other because our last names were alphabetically adjacent. At first, we didn't get along - I thought she was too bossy, and she thought I was too quiet. But one rainy afternoon, we both had to stay late at school waiting for our parents.",
      score: 12,
      verdict: 'Likely Human-Written',
      highlights: [
        {
          text: "I met my best friend when I was only seven years old.",
          isAI: false
        },
        {
          text: "We were in the same class, sitting next to each other because our last names were alphabetically adjacent.",
          isAI: false
        },
        {
          text: "At first, we didn't get along - I thought she was too bossy, and she thought I was too quiet.",
          isAI: false
        },
        {
          text: "But one rainy afternoon, we both had to stay late at school waiting for our parents.",
          isAI: false
        }
      ]
    }
  };

  const activeSample = samples[activeTab];
  const isHighAI = activeSample.score > 60;
  const humanScore = 100 - activeSample.score;

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            Live Demo
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-slate-900">
            See the Engine in Action
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-slate-500">
            Experience our Quillbot-style interactive detection interface.
          </p>
        </div>

        {/* Demo Window (Interactive UI Replica) */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto relative z-10">

          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all duration-300 ${activeTab === 'ai'
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'bg-slate-50/50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
            >
              Analyze AI-Generated Example
            </button>
            <button
              onClick={() => setActiveTab('human')}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-all duration-300 ${activeTab === 'human'
                  ? 'bg-white text-emerald-600 border-b-2 border-emerald-500'
                  : 'bg-slate-50/50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
            >
              Analyze Human-Written Example
            </button>
          </div>

          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Left Pane (Editor replica) */}
            <div className="w-full md:w-3/5 bg-white p-6 md:p-8 flex flex-col border-r border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-slate-400">Document Text</span>
                <span className="text-sm font-medium text-slate-400">{activeSample.text.split(' ').length} words</span>
              </div>

              <div className="text-base text-slate-700 leading-relaxed font-sans mt-2">
                {activeSample.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className={`transition-all duration-300 ${highlight.isAI
                        ? 'bg-rose-100 text-rose-900 border-b-2 border-rose-300 rounded-sm'
                        : 'text-slate-700'
                      }`}
                  >
                    {highlight.text}{' '}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Pane (Results replica) */}
            <div className="w-full md:w-2/5 bg-white p-6 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <Particles className="absolute inset-0" quantity={30} staticity={50} ease={80} color={isHighAI ? "#E11D48" : "#10B981"} />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-lg font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100">Analysis Results</h3>

                <div className="flex flex-col items-center justify-center mb-10">
                  <div className={`text-7xl font-extrabold tracking-tight mb-3 transition-colors duration-500 ${isHighAI ? 'text-rose-600' : 'text-emerald-500'}`}>
                    {activeSample.score}%
                  </div>
                  <div className="text-base font-medium text-slate-600 flex items-center">
                    {isHighAI ? <ShieldAlert className="w-4 h-4 mr-2 text-rose-500" /> : <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />}
                    {activeSample.verdict}
                  </div>
                </div>

                <div className="w-full mt-auto">
                  <div className="w-full h-2.5 flex overflow-hidden rounded-full mb-3 bg-slate-100">
                    <div style={{ width: `${activeSample.score}%` }} className="bg-rose-500 h-full transition-all duration-1000 ease-out" />
                    <div style={{ width: `${humanScore}%` }} className="bg-emerald-400 h-full transition-all duration-1000 ease-out" />
                  </div>
                  <div className="flex justify-between text-sm font-medium text-slate-500 px-1 mb-8">
                    <span className={isHighAI ? "text-rose-600 font-bold" : ""}>{activeSample.score}% AI</span>
                    <span className={!isHighAI ? "text-emerald-600 font-bold" : ""}>{humanScore}% Human</span>
                  </div>
                </div>

                <Link to="/ai-detector" className="w-full mt-4 group">
                  <div className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium text-center transition-all duration-300 hover:bg-primary shadow-lg hover:shadow-primary/30 flex items-center justify-center border border-transparent">
                    Try Your Own Text
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
