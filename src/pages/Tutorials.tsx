
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, CheckCircle, FileText, Languages, Play, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Tutorials' },
    { id: 'detector', name: 'AI Detection', icon: <Bot className="h-4 w-4" /> },
    { id: 'grammar', name: 'Grammar Checker', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'summary', name: 'AI Summary', icon: <FileText className="h-4 w-4" /> },
    { id: 'translation', name: 'Translation', icon: <Languages className="h-4 w-4" /> },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'How to Use the AI Content Detector',
      category: 'detector',
      description: 'Learn how to effectively use our AI detection tool to verify content authenticity.',
      duration: '4:30',
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/ai-detector',
      steps: [
        {
          title: 'Access the AI Detector Tool',
          content: 'Navigate to the AI Detector tool from the main menu or homepage. You\'ll find it prominently displayed among our primary tools.',
          image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Paste Your Content',
          content: 'Copy the text you want to analyze and paste it into the text editor. The tool accepts content of any length, though longer samples (300+ words) provide more accurate results.',
          image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Analyze the Content',
          content: 'Click the "Analyze" button to start the detection process. Our algorithm will process the text and provide results within seconds.',
          image: 'https://images.unsplash.com/photo-1572187142356-66000ebdf621?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Interpret the Results',
          content: 'Review the AI probability score (0-100%) and the sentence-level analysis. Higher percentages indicate a greater likelihood of AI-generated content.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Download Report (Optional)',
          content: 'If needed, download a detailed PDF report of your analysis for documentation or sharing purposes.',
          image: 'https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
        }
      ]
    },
    {
      id: 2,
      title: 'Using the Grammar Checker Effectively',
      category: 'grammar',
      description: 'Tips and techniques for getting the most out of our advanced grammar checking tool.',
      duration: '5:15',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80',
      link: '/grammar-checker',
      steps: [
        {
          title: 'Navigate to Grammar Checker',
          content: 'Access the Grammar Checker tool from the navigation menu or homepage.',
          image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80'
        },
        {
          title: 'Input Your Text',
          content: 'Enter or paste the text you wish to check in the editor. The tool works best with complete sentences and paragraphs.',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80'
        },
        {
          title: 'Start the Check',
          content: 'Click "Check Grammar" to begin the analysis process. Our system will examine your text for grammar, style, and readability issues.',
          image: 'https://images.unsplash.com/photo-1629742126563-4fec0edae4d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Review Suggestions',
          content: 'Examine each highlighted issue. Hover over highlighted text to see explanations and suggestions for improvement.',
          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Apply Corrections',
          content: 'Click on suggestions to apply them automatically, or edit the text manually based on the recommendations.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        }
      ]
    },
    {
      id: 3,
      title: 'Creating Effective Summaries',
      category: 'summary',
      description: 'Master the art of generating concise and accurate summaries with our AI Summary Tool.',
      duration: '3:45',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/ai-summary',
      steps: [
        {
          title: 'Access the Summary Tool',
          content: 'Navigate to the AI Summary Tool from the main menu or tools section on the homepage.',
          image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Paste Long-Form Content',
          content: 'Copy and paste the article, report, or document you want to summarize. The tool works best with content that has clear structure and is at least several paragraphs long.',
          image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Set Summarization Options',
          content: 'Choose your desired summary length (brief, detailed, or custom percentage) and any focus keywords if you want to emphasize specific aspects of the content.',
          image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Generate Summary',
          content: 'Click the "Summarize" button to process your text. Our algorithm will analyze the content and extract the most important information.',
          image: 'https://images.unsplash.com/photo-1526649661456-89c7ed4d00b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
        },
        {
          title: 'Review and Export',
          content: 'Review the generated summary for accuracy and completeness. You can copy the text or download it as a document for your records.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        }
      ]
    },
    {
      id: 4,
      title: 'Translating Content Between Languages',
      category: 'translation',
      description: 'Learn how to use our translation tool for accurate multilingual content conversion.',
      duration: '4:00',
      image: 'https://images.unsplash.com/photo-1518085250692-bbeac080edb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      link: '/translator',
      steps: [
        {
          title: 'Open the Translation Tool',
          content: 'Access our Translator tool from the main navigation menu or tools section.',
          image: 'https://images.unsplash.com/photo-1518085250692-bbeac080edb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80'
        },
        {
          title: 'Select Languages',
          content: 'Choose the source language (what your text is currently in) and the target language (what you want to translate it to) from the dropdown menus.',
          image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
        },
        {
          title: 'Enter Your Text',
          content: 'Type or paste the content you want to translate into the left text area. You can enter anything from a single sentence to several paragraphs.',
          image: 'https://images.unsplash.com/photo-1547640565-8546461c0a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Translate Content',
          content: 'Click the "Translate" button to process your text. Our translation engine will convert your content while preserving meaning and context.',
          image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        {
          title: 'Use Advanced Options (Optional)',
          content: 'For specialized content, use the domain selection feature to choose industry-specific translation models (e.g., medical, legal, technical).',
          image: 'https://images.unsplash.com/photo-1517842536804-84dcb305535c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
        }
      ]
    }
  ];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Tutorials</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn how to use our tools effectively with these step-by-step guides
          </p>
        </div>

        <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
          <div className="flex justify-center mb-10">
            <TabsList>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                  {category.icon} {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredTutorials.map(tutorial => (
                  <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="w-full">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={tutorial.image} 
                          alt={tutorial.title}
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </AspectRatio>
                    </div>
                    <CardHeader>
                      <CardTitle>{tutorial.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Duration: {tutorial.duration}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tutorial.description}</p>
                      
                      <div className="mt-6 space-y-4">
                        <h3 className="text-lg font-medium">Step-by-Step Guide:</h3>
                        <div className="space-y-6">
                          {tutorial.steps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">{step.title}</h4>
                                <p className="text-sm text-muted-foreground">{step.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={tutorial.link} className="w-full">
                        <InteractiveHoverButton text="Try It Now" className="w-full" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Looking for More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our comprehensive Knowledge Base for detailed explanations of our technology and features.
          </p>
          <Link to="/knowledge-base" className="inline-block">
            <Button variant="outline" className="gap-2">
              <span>Visit Knowledge Base</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Tutorials;
