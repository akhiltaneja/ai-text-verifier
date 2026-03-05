
import { GrammarRule } from '@/types/grammar-checker';

export const grammarRules: GrammarRule[] = [
  // Grammar rules
  {
    type: 'grammar',
    pattern: /\b(i|we|you|they|he|she) (is)\b/gi,
    fix: (match: string, subject?: string) => {
      if (!subject) return match;
      
      const parts = match.split(' ');
      let verb = 'are';
      
      if (parts[0].toLowerCase() === 'i') {
        verb = 'am';
      } else if (['he', 'she'].includes(parts[0].toLowerCase())) {
        verb = 'is';
      }
      
      return `${parts[0]} ${verb}`;
    },
    explanation: 'Subject-verb agreement: Use the correct form of the verb based on the subject.'
  },
  {
    type: 'grammar',
    pattern: /\b(there|their|they're)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for review
    needsContext: true,
    explanation: 'Commonly confused words: "There" (location), "their" (possession), "they\'re" (they are).'
  },
  {
    type: 'grammar',
    pattern: /\b(your|you're)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for review
    needsContext: true,
    explanation: 'Commonly confused words: "Your" (possession) vs "you\'re" (you are).'
  },
  {
    type: 'grammar',
    pattern: /\b(its|it's)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for review
    needsContext: true,
    explanation: 'Commonly confused words: "Its" (possession) vs "it\'s" (it is).'
  },
  {
    type: 'grammar',
    pattern: /\b(affect|effect)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for review
    needsContext: true,
    explanation: 'Commonly confused words: "Affect" (verb, to influence) vs "effect" (noun, result).'
  },
  
  // Spelling rules
  {
    type: 'spelling',
    pattern: /\b(alot)\b/gi,
    fix: () => 'a lot',
    explanation: '"Alot" is not a word. Use "a lot" instead.'
  },
  {
    type: 'spelling',
    pattern: /\b(cant)\b/gi,
    fix: () => "can't",
    explanation: 'Missing apostrophe in contraction.'
  },
  {
    type: 'spelling',
    pattern: /\b(dont)\b/gi,
    fix: () => "don't",
    explanation: 'Missing apostrophe in contraction.'
  },
  {
    type: 'spelling',
    pattern: /\b(wont)\b/gi,
    fix: () => "won't",
    explanation: 'Missing apostrophe in contraction.'
  },
  {
    type: 'spelling',
    pattern: /\b(im)\b/gi,
    fix: () => "I'm",
    explanation: 'Missing apostrophe in contraction and capitalization of "I".'
  },
  {
    type: 'spelling',
    pattern: /\b(i)\b/g,
    fix: () => "I",
    explanation: 'The pronoun "I" should always be capitalized.'
  },
  {
    type: 'spelling',
    pattern: /\b(recieve)\b/gi,
    fix: () => "receive",
    explanation: 'Misspelled word. Remember: "I" before "E" except after "C".'
  },
  {
    type: 'spelling',
    pattern: /\b(definately)\b/gi,
    fix: () => "definitely",
    explanation: 'Common misspelling.'
  },
  {
    type: 'spelling',
    pattern: /\b(seperate)\b/gi,
    fix: () => "separate",
    explanation: 'Common misspelling.'
  },
  
  // Punctuation rules
  {
    type: 'punctuation',
    pattern: /(\w+)(\s+)([,.!?;:])/g,
    fix: (match: string, p1: string, p2: string, p3: string) => `${p1}${p3}`,
    explanation: 'Remove space before punctuation marks.'
  },
  {
    type: 'punctuation',
    pattern: /([,.!?;:])(\w+)/g,
    fix: (match: string, p1: string, p2: string) => `${p1} ${p2}`,
    explanation: 'Add space after punctuation marks.'
  },
  {
    type: 'punctuation',
    pattern: /(\w+)([.!?])(\s+)([a-z])/g,
    fix: (match: string, p1: string, p2: string, p3: string, p4: string) => 
      `${p1}${p2}${p3}${p4.toUpperCase()}`,
    explanation: 'Capitalize the first letter of a sentence.'
  },
  
  // Style rules
  {
    type: 'style',
    pattern: /\b(very|really|extremely)\s+(\w+)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for style improvement
    explanation: 'Consider using a stronger word instead of intensifiers like "very" or "really".'
  },
  {
    type: 'style',
    pattern: /\b(good|bad|nice|interesting)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for style improvement
    explanation: 'Consider using more specific and descriptive words instead of generic adjectives.'
  },
  {
    type: 'style',
    pattern: /\b(thing|stuff)\b/gi,
    fix: (match: string) => match, // Keep as is, but flag for style improvement
    explanation: 'Consider using more specific nouns instead of vague words like "thing" or "stuff".'
  }
];
