
// Translation service with proper API integration
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

// Language options including the new requested languages
export const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ar', name: 'Arabic' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' },
];

// Type definitions for translation results
export interface TranslationResult {
  detectedLanguage: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
}

// Function to detect language
export const detectLanguage = async (text: string): Promise<string> => {
  if (!text.trim()) return 'en';
  
  try {
    // For quick language detection, we'll still use our simple detection logic
    // Character-based language detection as a fallback
    if (/[\u4e00-\u9fa5]/.test(text)) return 'zh'; // Chinese characters
    if (/[ñáéíóúü]/i.test(text)) return 'es'; // Spanish characters
    if (/[àâæçéèêëîïôœùûüÿ]/i.test(text)) return 'fr'; // French characters
    if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabic characters
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi characters
    if (/[äöüßÄÖÜ]/i.test(text)) return 'de'; // German characters
    if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(text)) return 'ja'; // Japanese characters
    
    // Default to English for anything else
    return 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en'; // Default to English on error
  }
};

// Get language name from code - define once and export
export const getLanguageName = (code: string): string => {
  const language = languageOptions.find(lang => lang.code === code);
  return language ? language.name : code;
};

// Function to translate text with ZeroGPT API via Edge Function
export const translateText = async (
  text: string, 
  fromLanguage: string, 
  toLanguage: string
): Promise<TranslationResult> => {
  if (!text.trim()) {
    return {
      detectedLanguage: fromLanguage,
      translatedText: '',
      fromLanguage,
      toLanguage
    };
  }
  
  try {
    // If the source and target languages are the same, return original text
    if (fromLanguage === toLanguage) {
      return {
        detectedLanguage: fromLanguage,
        translatedText: text,
        fromLanguage,
        toLanguage
      };
    }
    
    // Convert language codes to full language names for the ZeroGPT API
    const fromLangName = fromLanguage ? getLanguageName(fromLanguage) : '';
    const toLangName = getLanguageName(toLanguage);
    
    console.log('Translating from', fromLangName, 'to', toLangName);
    
    // Call our Supabase Edge Function that wraps the ZeroGPT API
    const { data, error } = await supabase.functions.invoke('translate', {
      body: {
        text,
        fromLanguage: fromLangName,
        toLanguage: toLangName
      }
    });
    
    if (error) {
      console.error('Translation API error:', error);
      throw new Error('Translation service unavailable');
    }
    
    console.log('Translation response:', data);
    
    if (!data || !data.translatedText) {
      throw new Error('No translation returned');
    }
    
    return {
      detectedLanguage: data.fromLanguage || fromLanguage,
      translatedText: data.translatedText,
      fromLanguage: data.fromLanguage || fromLanguage,
      toLanguage: toLanguage
    };
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Translation failed. Please try again.');
    throw error; // Rethrow so the component can handle it appropriately
  }
};
