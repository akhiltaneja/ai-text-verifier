
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

export interface TranslationResult {
  detectedLanguage: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
}

export const detectLanguage = async (text: string): Promise<string> => {
  if (!text.trim()) return 'en';

  try {
    if (/[\u4e00-\u9fa5]/.test(text)) return 'zh';
    if (/[ñáéíóúü]/i.test(text)) return 'es';
    if (/[àâæçéèêëîïôœùûüÿ]/i.test(text)) return 'fr';
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/[\u0900-\u097F]/.test(text)) return 'hi';
    if (/[äöüßÄÖÜ]/i.test(text)) return 'de';
    if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(text)) return 'ja';

    return 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
};

export const getLanguageName = (code: string): string => {
  const language = languageOptions.find(lang => lang.code === code);
  return language ? language.name : code;
};

export const translateText = async (
  text: string,
  fromLanguage: string,
  toLanguage: string
): Promise<TranslationResult> => {
  if (!text.trim() || fromLanguage === toLanguage) {
    return {
      detectedLanguage: fromLanguage,
      translatedText: text,
      fromLanguage,
      toLanguage
    };
  }

  try {
    const toLangName = getLanguageName(toLanguage);
    console.log(`Translating using LLM to ${toLangName}...`);

    const { data, error } = await supabase.functions.invoke('process-llm', {
      body: {
        tool: 'translate',
        text,
        targetLanguage: toLangName
      }
    });

    if (error) {
      console.error('Translation LLM error:', error);
      throw new Error('Translation failed');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (!data?.translatedText) {
      throw new Error('LLM returned invalid response format');
    }

    return {
      detectedLanguage: fromLanguage,
      translatedText: data.translatedText,
      fromLanguage: fromLanguage,
      toLanguage: toLanguage
    };
  } catch (error) {
    console.error('Translation error:', error);
    toast.error('Translation failed. Please try again.');
    throw error;
  }
};
