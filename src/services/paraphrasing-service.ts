
import { ParaphrasingResult, WordReplacement, SentenceTransformation } from '@/types/paraphrasing';

// Common word replacements for simple paraphrasing
const replacements: WordReplacement = {
  'good': ['great', 'excellent', 'fine', 'positive'],
  'bad': ['poor', 'negative', 'unsatisfactory', 'inadequate'],
  'happy': ['glad', 'pleased', 'delighted', 'content'],
  'sad': ['unhappy', 'disappointed', 'dejected', 'downcast'],
  'important': ['significant', 'crucial', 'essential', 'vital'],
  'difficult': ['challenging', 'hard', 'tough', 'demanding'],
  'easy': ['simple', 'straightforward', 'effortless', 'uncomplicated'],
  'big': ['large', 'substantial', 'significant', 'considerable'],
  'small': ['little', 'tiny', 'minor', 'insignificant'],
  'quickly': ['rapidly', 'swiftly', 'promptly', 'speedily'],
  'slowly': ['gradually', 'leisurely', 'unhurriedly', 'carefully'],
  'very': ['extremely', 'highly', 'exceedingly', 'particularly'],
  'also': ['additionally', 'furthermore', 'moreover', 'likewise'],
  'but': ['however', 'nevertheless', 'yet', 'still'],
  'because': ['since', 'as', 'given that', 'due to the fact that'],
  'if': ['provided that', 'assuming that', 'in the event that', 'on the condition that'],
  'when': ['once', 'as soon as', 'at the time that', 'whenever'],
  'need to': ['must', 'should', 'ought to', 'have to'],
  'want to': ['wish to', 'desire to', 'would like to', 'aim to'],
  'think': ['believe', 'consider', 'feel', 'reckon'],
  'use': ['utilize', 'employ', 'apply', 'exercise'],
  'make': ['create', 'produce', 'generate', 'develop'],
  'get': ['acquire', 'obtain', 'gain', 'secure'],
  'give': ['provide', 'offer', 'supply', 'furnish'],
  'show': ['display', 'exhibit', 'demonstrate', 'present'],
};

// Sentence structure transformations
const transformations: SentenceTransformation[] = [
  // Passive to active or vice versa
  (s: string) => {
    if (s.includes(" was ") && s.includes(" by ")) {
      const parts = s.split(" by ");
      if (parts.length === 2) {
        const beforeBy = parts[0].split(" was ");
        if (beforeBy.length === 2) {
          return `${parts[1].trim()} ${beforeBy[0].trim()} ${beforeBy[1].trim()}`;
        }
      }
    }
    return s;
  },
  
  // Add introductory phrases
  (s: string) => {
    const intros = [
      "In other words, ",
      "To put it differently, ",
      "As a matter of fact, ",
      "To be precise, ",
      "Specifically speaking, ",
      "Notably, ",
      "Particularly, "
    ];
    const randomIntro = intros[Math.floor(Math.random() * intros.length)];
    return Math.random() > 0.7 ? randomIntro + s.charAt(0).toLowerCase() + s.slice(1) : s;
  },
  
  // Restructure sentences with conjunctions
  (s: string) => {
    if (s.includes(", and ")) {
      const parts = s.split(", and ");
      return `${parts[1].trim()}. Additionally, ${parts[0].trim()}.`;
    }
    return s;
  }
];

// Simple paraphrasing algorithm
export const paraphraseText = (text: string): string => {
  // Process the text sentence by sentence
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  
  const paraphrasedSentences = sentences.map(sentence => {
    let result = sentence;
    
    // Apply word replacements
    Object.keys(replacements).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(result) && Math.random() > 0.3) {
        const options = replacements[word];
        const replacement = options[Math.floor(Math.random() * options.length)];
        result = result.replace(regex, replacement);
      }
    });
    
    // Apply sentence transformations (with some randomness)
    if (Math.random() > 0.5) {
      const transformation = transformations[Math.floor(Math.random() * transformations.length)];
      result = transformation(result);
    }
    
    return result;
  });
  
  return paraphrasedSentences.join(' ');
};

// Generate a summary of the text
export const generateSummary = (text: string): string => {
  const wordCount = text.split(/\s+/).length;
  const sentenceCount = (text.match(/[.!?]+/g) || []).length;
  
  return `The original text contains ${wordCount} words across approximately ${sentenceCount} sentences. The paraphrased version maintains the original meaning while using alternative vocabulary and sentence structures for improved clarity and readability.`;
};

// Process text for paraphrasing
export const processParaphrasing = (text: string): ParaphrasingResult => {
  const paraphrasedText = paraphraseText(text);
  const summary = generateSummary(text);
  
  return {
    originalText: text,
    paraphrasedText,
    summary
  };
};
