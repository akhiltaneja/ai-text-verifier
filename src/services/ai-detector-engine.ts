/**
 * Multi-Algorithm AI Content Detection Engine
 * 
 * Combines 6 heuristic analysis methods to detect AI-generated text:
 * 1. Entropy Analysis — character/word-level information entropy
 * 2. Vocabulary Diversity — TTR, hapax legomena ratio
 * 3. Sentence Structure Variance — length & complexity patterns
 * 4. Burstiness Analysis — perplexity variation per sentence
 * 5. Formulaic Phrase Detection — common AI phrases & patterns
 * 6. Readability Consistency — uniformity in reading level
 */

// Common AI-generated phrases and patterns
const AI_FORMULAIC_PHRASES = [
    'it is important to note',
    'it\'s important to note',
    'it is worth noting',
    'it\'s worth noting',
    'in today\'s world',
    'in today\'s digital age',
    'in today\'s fast-paced',
    'in the realm of',
    'in the world of',
    'it is essential to',
    'it\'s essential to',
    'plays a crucial role',
    'plays a vital role',
    'plays an important role',
    'it is crucial to',
    'it\'s crucial to',
    'on the other hand',
    'in conclusion',
    'to sum up',
    'to summarize',
    'in summary',
    'all in all',
    'overall',
    'furthermore',
    'moreover',
    'additionally',
    'consequently',
    'nevertheless',
    'nonetheless',
    'henceforth',
    'delve',
    'delving',
    'delves',
    'landscape',
    'tapestry',
    'multifaceted',
    'intricacies',
    'underscores',
    'underscoring',
    'pivotal',
    'nuanced',
    'holistic',
    'comprehensive',
    'robust',
    'leverage',
    'leveraging',
    'facilitate',
    'facilitating',
    'foster',
    'fostering',
    'navigate',
    'navigating',
    'empower',
    'empowering',
    'streamline',
    'streamlining',
    'paramount',
    'groundbreaking',
    'cutting-edge',
    'state-of-the-art',
    'game-changer',
    'deep dive',
    'shed light on',
    'shed light',
    'at the end of the day',
    'last but not least',
    'to put it simply',
    'one cannot ignore',
    'it goes without saying',
    'needless to say',
    'as a matter of fact',
    'by and large',
    'in light of',
    'with that being said',
    'that being said',
    'having said that',
    'it can be argued',
    'it should be noted',
    'worth mentioning',
    'cannot be overstated',
    'resonates with',
    'harness',
    'harnessing',
    'pinnacle',
    'ever-evolving',
    'ever-changing',
    'vibrant',
    'realm',
    'embark',
    'embarking',
    'journey',
    'testament',
    'beacon',
    'spearheading',
    'at its core',
    'in essence',
    'serves as',
    'not only but also',
    'both and',
];

// Transitional phrases that AI uses excessively
const AI_TRANSITION_PATTERNS = [
    /^(however|moreover|furthermore|additionally|consequently|nevertheless|nonetheless|thus|hence|therefore|accordingly|subsequently|meanwhile|similarly|likewise|conversely|alternatively|notably|significantly|importantly|essentially|fundamentally|ultimately|inevitably),?\s/i,
];

export interface SentenceAnalysis {
    text: string;
    aiProbability: number;
    isHuman: boolean;
    features: {
        entropy: number;
        vocabularyScore: number;
        formulaicScore: number;
        readabilityScore: number;
        structureScore: number;
        burstyScore: number;
    };
}

export interface EngineResult {
    sentences: SentenceAnalysis[];
    overallScore: number;
    detectionMethods: {
        entropyAnalysis: number;
        vocabularyDiversity: number;
        sentenceStructure: number;
        burstiness: number;
        formulaicPhrases: number;
        readabilityConsistency: number;
    };
    highlightedSentences: string[]; // AI-detected sentences
    improvedVersion: string; // Suggested rewrite
}

// ─── Utility Functions ───────────────────────────────────────────

function splitIntoSentences(text: string): string[] {
    // Split on sentence boundaries, keeping the delimiter
    const raw = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
    return raw.map(s => s.trim()).filter(s => s.length > 0);
}

function splitIntoWords(text: string): string[] {
    // Keep numbers and alphabets to properly catch list numbering
    return (text.toLowerCase().match(/\b[a-z0-9']+\b/g) || []);
}

function mean(arr: number[]): number {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function standardDeviation(arr: number[]): number {
    if (arr.length < 2) return 0;
    const m = mean(arr);
    const squaredDiffs = arr.map(x => (x - m) ** 2);
    return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / (arr.length - 1));
}

function coefficientOfVariation(arr: number[]): number {
    const m = mean(arr);
    if (m === 0) return 0;
    return standardDeviation(arr) / m;
}

// ─── Analysis Algorithm 1: Entropy Analysis ──────────────────────

function calculateCharEntropy(text: string): number {
    const freq: Record<string, number> = {};
    const chars = text.toLowerCase().replace(/\s+/g, ' ');
    for (const ch of chars) {
        freq[ch] = (freq[ch] || 0) + 1;
    }
    const len = chars.length;
    let entropy = 0;
    for (const ch in freq) {
        const p = freq[ch] / len;
        if (p > 0) entropy -= p * Math.log2(p);
    }
    return entropy;
}

function calculateWordEntropy(words: string[]): number {
    if (words.length === 0) return 0;
    const freq: Record<string, number> = {};
    for (const w of words) {
        freq[w] = (freq[w] || 0) + 1;
    }
    let entropy = 0;
    for (const w in freq) {
        const p = freq[w] / words.length;
        if (p > 0) entropy -= p * Math.log2(p);
    }
    return entropy;
}

/**
 * AI text tends to have moderate, consistent entropy.
 * Human text tends to have more variable entropy.
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeEntropy(text: string, sentences: string[]): number {
    const charEntropy = calculateCharEntropy(text);

    // Calculate per-sentence entropy variation
    const sentenceEntropies = sentences.map(s => {
        const words = splitIntoWords(s);
        return calculateWordEntropy(words);
    });

    const entropyCV = coefficientOfVariation(sentenceEntropies);

    // AI text has lower CV (more uniform entropy) — typically 0.05-0.2
    // Human text has higher CV (more variable entropy) — typically 0.2-0.6
    let score = 0;

    // Low entropy variation = likely AI
    if (entropyCV < 0.15) score += 40;
    else if (entropyCV < 0.25) score += 30;
    else if (entropyCV < 0.35) score += 15;
    else if (entropyCV < 0.45) score += 5;

    // Moderate overall char entropy (4.0-4.5) is typical of AI
    if (charEntropy >= 3.8 && charEntropy <= 4.6) score += 30;
    else if (charEntropy >= 3.5 && charEntropy <= 5.0) score += 15;

    // Very uniform word entropy across sentences = AI
    const avgSentenceEntropy = mean(sentenceEntropies);
    if (avgSentenceEntropy > 2 && avgSentenceEntropy < 5 && entropyCV < 0.15) {
        score += 30;
    }

    return Math.min(100, score);
}

// ─── Analysis Algorithm 2: Vocabulary Diversity ──────────────────

/**
 * AI text uses more common vocabulary with less diversity.
 * Measures: Type-Token Ratio (TTR), Hapax Legomena Ratio
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeVocabularyDiversity(words: string[]): number {
    if (words.length < 10) return 50; // Not enough data

    // Type-Token Ratio (unique words / total words)
    const uniqueWords = new Set(words);
    const ttr = uniqueWords.size / words.length;

    // Hapax legomena: words that appear exactly once
    const freq: Record<string, number> = {};
    for (const w of words) {
        freq[w] = (freq[w] || 0) + 1;
    }
    const hapax = Object.values(freq).filter(f => f === 1).length;
    const hapaxRatio = hapax / words.length;

    let score = 0;

    // Low TTR = more repetitive = more likely AI
    // For text > 100 words, TTR < 0.5 suggests high repetition
    if (words.length > 50) {
        const adjustedTTR = ttr * Math.sqrt(words.length / 100); // Normalize for text length
        if (adjustedTTR < 0.35) score += 40;
        else if (adjustedTTR < 0.45) score += 30;
        else if (adjustedTTR < 0.55) score += 20;
        else if (adjustedTTR < 0.65) score += 10;
    }

    // Low hapax ratio = AI tends to reuse words
    if (hapaxRatio < 0.3) score += 30;
    else if (hapaxRatio < 0.4) score += 20;
    else if (hapaxRatio < 0.5) score += 10;

    // Check for overly "smooth" vocabulary (no very rare/specialized words)
    const avgWordLength = mean(words.map(w => w.length));
    const wordLengthStd = standardDeviation(words.map(w => w.length));

    // AI tends to use words of uniform length
    if (wordLengthStd < 2.0) score += 15;
    else if (wordLengthStd < 2.5) score += 8;

    // AI uses slightly longer words on average (4.5-5.5 chars)
    if (avgWordLength >= 4.3 && avgWordLength <= 5.8) score += 15;

    return Math.min(100, score);
}

// ─── Analysis Algorithm 3: Sentence Structure Variance ───────────

/**
 * AI produces sentences of more uniform length and structure.
 * Human writing varies significantly in sentence length.
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeSentenceStructure(sentences: string[]): number {
    if (sentences.length < 3) return 50;

    const lengths = sentences.map(s => splitIntoWords(s).length);
    const cv = coefficientOfVariation(lengths);
    const avgLength = mean(lengths);

    let score = 0;

    // Low CV = uniform sentence length = likely AI
    if (cv < 0.3) score += 45;
    else if (cv < 0.4) score += 35;
    else if (cv < 0.5) score += 20;
    else if (cv < 0.6) score += 10;

    // AI prefers medium-length sentences (15-25 words)
    if (avgLength >= 14 && avgLength <= 28) score += 25;
    else if (avgLength >= 10 && avgLength <= 32) score += 15;

    // Check for no very short or very long sentences (AI avoids extremes)
    const hasVeryShort = lengths.some(l => l <= 4);
    const hasVeryLong = lengths.some(l => l >= 40);
    if (!hasVeryShort && !hasVeryLong) score += 20;

    // Check sentence opening diversity
    const openings = sentences.map(s => {
        const words = splitIntoWords(s);
        return words.slice(0, 1).join(' '); // Reduced to 1 word for list checking
    });
    const uniqueOpenings = new Set(openings);
    const openingDiversity = uniqueOpenings.size / openings.length;

    // AI loves bulleted lists and repeated sentence structures (The... The... The...)
    if (openingDiversity < 0.3) score += 35; // Highly repetitive starts
    else if (openingDiversity < 0.5) score += 20;
    else if (openingDiversity > 0.9 && sentences.length > 8) score += 15; // Unnaturally diverse

    // Look for list-like structure (many short lines ending abruptly without punctuation)
    const shortPhraseCount = lengths.filter(l => l > 0 && l <= 8).length;
    if (shortPhraseCount > sentences.length * 0.3 && sentences.length > 5) {
        // High density of short phrases (like bullet points) is very common in AI
        score += 30;
    }

    return Math.min(100, score);
}

// ─── Analysis Algorithm 4: Burstiness Analysis ──────────────────

/**
 * Human writing is "bursty" — some sentences are complex, others are simple.
 * AI writing is smooth — relatively uniform complexity.
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeBurstiness(sentences: string[]): number {
    if (sentences.length < 3) return 50;

    // Calculate "complexity" of each sentence using multiple metrics
    const complexities = sentences.map(s => {
        const words = splitIntoWords(s);
        const avgWordLen = words.length > 0 ? mean(words.map(w => w.length)) : 0;
        const sentenceLen = words.length;
        const commaCount = (s.match(/,/g) || []).length;
        const hasSubclause = /\b(which|that|who|whom|whose|where|when|because|although|while|since|if|unless|whereas)\b/i.test(s);

        return (
            avgWordLen * 2 +
            sentenceLen * 0.5 +
            commaCount * 3 +
            (hasSubclause ? 5 : 0)
        );
    });

    const cv = coefficientOfVariation(complexities);

    let score = 0;

    // Low burstiness (low CV) = AI (Tightened for better accuracy on LLMs)
    if (cv < 0.20) score += 50;
    else if (cv < 0.25) score += 40;
    else if (cv < 0.35) score += 30;
    else if (cv < 0.45) score += 15;
    else if (cv < 0.55) score += 5;

    // Check for uniformity in sentence-to-sentence complexity changes
    const diffs: number[] = [];
    for (let i = 1; i < complexities.length; i++) {
        diffs.push(Math.abs(complexities[i] - complexities[i - 1]));
    }
    const diffCV = coefficientOfVariation(diffs);

    // AI has more uniform changes between sentences
    if (diffCV < 0.3) score += 25;
    else if (diffCV < 0.5) score += 15;
    else if (diffCV < 0.7) score += 5;

    // Check paragraph-level burstiness (AI smooths across paragraphs too)
    const stdDev = standardDeviation(complexities);
    const meanComplexity = mean(complexities);
    if (meanComplexity > 0) {
        const normalizedStd = stdDev / meanComplexity;
        if (normalizedStd < 0.15) score += 15;
        else if (normalizedStd < 0.25) score += 8;
    }

    return Math.min(100, score);
}

// ─── Analysis Algorithm 5: Formulaic Phrase Detection ────────────

/**
 * AI frequently uses specific transitional and filler phrases.
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeFormulaicPhrases(text: string, sentences: string[]): number {
    const lowerText = text.toLowerCase();
    let formulaicCount = 0;
    const matchedPhrases: string[] = [];

    // Check for AI-typical phrases
    for (const phrase of AI_FORMULAIC_PHRASES) {
        const regex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
        const matches = lowerText.match(regex);
        if (matches) {
            formulaicCount += matches.length;
            matchedPhrases.push(phrase);
        }
    }

    // Check for AI-typical sentence transitions
    let transitionCount = 0;
    for (const sentence of sentences) {
        for (const pattern of AI_TRANSITION_PATTERNS) {
            if (pattern.test(sentence.trim())) {
                transitionCount++;
                break;
            }
        }
    }

    const totalSentences = sentences.length;
    const wordCount = splitIntoWords(text).length;

    let score = 0;

    // Formulaic phrase density
    const phraseDensity = formulaicCount / Math.max(1, wordCount / 100); // per 100 words
    if (phraseDensity > 3) score += 40;
    else if (phraseDensity > 2) score += 30;
    else if (phraseDensity > 1) score += 20;
    else if (phraseDensity > 0.5) score += 10;

    // Transition phrase frequency
    const transitionRate = transitionCount / Math.max(1, totalSentences);
    if (transitionRate > 0.4) score += 35;
    else if (transitionRate > 0.3) score += 25;
    else if (transitionRate > 0.2) score += 15;
    else if (transitionRate > 0.1) score += 8;

    // Unique formulaic phrases used
    if (matchedPhrases.length > 5) score += 25;
    else if (matchedPhrases.length > 3) score += 15;
    else if (matchedPhrases.length > 1) score += 8;

    return Math.min(100, score);
}

// ─── Analysis Algorithm 6: Readability Consistency ───────────────

/**
 * AI maintains a very consistent reading level throughout text.
 * Human writing varies in complexity across paragraphs.
 * Uses Flesch-Kincaid inspired metrics.
 * Returns 0-100 (higher = more likely AI)
 */
function analyzeReadabilityConsistency(sentences: string[]): number {
    if (sentences.length < 3) return 50;

    // Calculate per-sentence readability (simplified Flesch-Kincaid)
    const readabilityScores = sentences.map(sentence => {
        const words = splitIntoWords(sentence);
        if (words.length === 0) return 0;

        const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);
        const avgSyllablesPerWord = syllableCount / words.length;
        const wordsPerSentence = words.length;

        // Simplified readability score (higher = harder to read)
        return avgSyllablesPerWord * 10 + wordsPerSentence * 0.5;
    });

    const cv = coefficientOfVariation(readabilityScores);

    let score = 0;

    // Very consistent readability = likely AI
    if (cv < 0.2) score += 50;
    else if (cv < 0.25) score += 40;
    else if (cv < 0.3) score += 30;
    else if (cv < 0.4) score += 20;
    else if (cv < 0.5) score += 10;

    // AI tends to keep readability in a medium range
    const avgReadability = mean(readabilityScores);
    if (avgReadability >= 15 && avgReadability <= 25) score += 20;
    else if (avgReadability >= 12 && avgReadability <= 30) score += 10;

    // Check for no outlier sentences (AI avoids extremely simple/complex sentences)
    const stdDev = standardDeviation(readabilityScores);
    const hasOutliers = readabilityScores.some(r => Math.abs(r - avgReadability) > 2 * stdDev);
    if (!hasOutliers && sentences.length > 5) score += 20;

    // Check paragraph consistency (window-based)
    if (sentences.length >= 4) {
        const windowSize = Math.min(3, sentences.length - 1);
        const windowAvgs: number[] = [];
        for (let i = 0; i <= readabilityScores.length - windowSize; i++) {
            const window = readabilityScores.slice(i, i + windowSize);
            windowAvgs.push(mean(window));
        }
        const windowCV = coefficientOfVariation(windowAvgs);
        if (windowCV < 0.1) score += 30; // Highly consistent windows (like lists)
        else if (windowCV < 0.2) score += 15;
    }

    return Math.min(100, score);
}

function countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 2) return 1;

    // Remove silent 'e' at the end
    word = word.replace(/e$/, '');

    // Count vowel groups
    const vowelGroups = word.match(/[aeiouy]+/g);
    let count = vowelGroups ? vowelGroups.length : 1;

    return Math.max(1, count);
}

// ─── Per-Sentence Analysis ───────────────────────────────────────

function analyzeSentence(sentence: string, allSentences: string[]): SentenceAnalysis {
    const words = splitIntoWords(sentence);

    // Simplified per-sentence analysis
    const entropy = calculateWordEntropy(words);
    const avgWordLen = words.length > 0 ? mean(words.map(w => w.length)) : 0;

    // Check formulaic content in this sentence
    const lowerSentence = sentence.toLowerCase();
    let formulaicHits = 0;
    for (const phrase of AI_FORMULAIC_PHRASES) {
        if (lowerSentence.includes(phrase)) formulaicHits++;
    }

    // Check transition pattern
    let isTransitionStart = false;
    for (const pattern of AI_TRANSITION_PATTERNS) {
        if (pattern.test(sentence.trim())) {
            isTransitionStart = true;
            break;
        }
    }

    // Sentence-level scoring
    const formulaicScore = Math.min(100, formulaicHits * 35 + (isTransitionStart ? 20 : 0));

    // Vocabulary score for this sentence
    const uniqueWords = new Set(words);
    const ttr = words.length > 0 ? uniqueWords.size / words.length : 1;
    const vocabularyScore = ttr < 0.6 ? 60 : ttr < 0.75 ? 40 : 20;

    // Readability for this sentence
    const syllables = words.reduce((t, w) => t + countSyllables(w), 0);
    const avgSyllables = words.length > 0 ? syllables / words.length : 0;
    const readabilityScore = (avgSyllables >= 1.4 && avgSyllables <= 1.8 && words.length >= 14 && words.length <= 26) ? 60 : 30;

    // Structure score (medium-length sentences are more AI-like)
    const structureScore = (words.length >= 14 && words.length <= 26) ? 60 : (words.length >= 8 && words.length <= 35) ? 35 : 15;

    // Entropy score (moderate entropy is AI-like)
    const entropyScore = (entropy >= 2.5 && entropy <= 4.5) ? 55 : 30;

    // Burstiness: how different is this sentence from the average?
    const allLengths = allSentences.map(s => splitIntoWords(s).length);
    const avgSentenceLen = mean(allLengths);
    const deviation = Math.abs(words.length - avgSentenceLen) / Math.max(1, avgSentenceLen);
    const burstyScore = deviation < 0.25 ? 75 : deviation < 0.4 ? 50 : 20;

    // Weighted combination
    const aiProbability = Math.min(100, Math.round(
        formulaicScore * 0.30 +
        vocabularyScore * 0.10 +
        readabilityScore * 0.10 +
        structureScore * 0.15 +
        entropyScore * 0.15 +
        burstyScore * 0.20
    ));

    return {
        text: sentence,
        aiProbability,
        isHuman: aiProbability < 50,
        features: {
            entropy: entropyScore,
            vocabularyScore,
            formulaicScore,
            readabilityScore,
            structureScore,
            burstyScore,
        }
    };
}

// ─── Improved Version Generator ──────────────────────────────────

function generateImprovedVersion(text: string, sentenceAnalyses: SentenceAnalysis[]): string {
    const improved: string[] = [];

    for (const analysis of sentenceAnalyses) {
        if (analysis.aiProbability > 55) {
            // Rewrite AI-flagged sentences
            improved.push(humanizeSentence(analysis.text));
        } else {
            improved.push(analysis.text);
        }
    }

    return improved.join(' ');
}

function humanizeSentence(sentence: string): string {
    let result = sentence;

    // Remove common AI filler phrases
    const fillerReplacements: [RegExp, string][] = [
        [/\bIt is important to note that\b/gi, ''],
        [/\bIt's important to note that\b/gi, ''],
        [/\bIt is worth noting that\b/gi, ''],
        [/\bIt's worth noting that\b/gi, ''],
        [/\bIn today's world,?\s*/gi, ''],
        [/\bIn today's digital age,?\s*/gi, ''],
        [/\bIn the realm of\b/gi, 'In'],
        [/\bplays a crucial role in\b/gi, 'matters for'],
        [/\bplays a vital role in\b/gi, 'helps with'],
        [/\bIt is essential to\b/gi, 'You should'],
        [/\bFurthermore,?\s*/gi, 'Also, '],
        [/\bMoreover,?\s*/gi, 'Also, '],
        [/\bAdditionally,?\s*/gi, 'Also, '],
        [/\bConsequently,?\s*/gi, 'So, '],
        [/\bNevertheless,?\s*/gi, 'But '],
        [/\bNonetheless,?\s*/gi, 'Still, '],
        [/\bdelve into\b/gi, 'look at'],
        [/\bdelves into\b/gi, 'covers'],
        [/\bdelving into\b/gi, 'looking at'],
        [/\bleverage\b/gi, 'use'],
        [/\bleveraging\b/gi, 'using'],
        [/\bfacilitate\b/gi, 'help'],
        [/\bfacilitating\b/gi, 'helping'],
        [/\butilize\b/gi, 'use'],
        [/\butilizing\b/gi, 'using'],
        [/\bcomprehensive\b/gi, 'complete'],
        [/\brobust\b/gi, 'strong'],
        [/\bnavigate\b/gi, 'handle'],
        [/\bnavigating\b/gi, 'handling'],
        [/\bempower\b/gi, 'help'],
        [/\bempowering\b/gi, 'helping'],
        [/\bstreamline\b/gi, 'simplify'],
        [/\bstreamlining\b/gi, 'simplifying'],
        [/\bparamount\b/gi, 'essential'],
        [/\bgroundbreaking\b/gi, 'new'],
        [/\bcutting-edge\b/gi, 'modern'],
        [/\bstate-of-the-art\b/gi, 'latest'],
        [/\bmultifaceted\b/gi, 'complex'],
        [/\bholistic\b/gi, 'full'],
        [/\bpivotal\b/gi, 'key'],
        [/\bnuanced\b/gi, 'subtle'],
    ];

    for (const [pattern, replacement] of fillerReplacements) {
        result = result.replace(pattern, replacement);
    }

    // Clean up double spaces and capitalize first letter
    result = result.replace(/\s{2,}/g, ' ').trim();
    if (result.length > 0) {
        result = result.charAt(0).toUpperCase() + result.slice(1);
    }

    return result;
}

// ─── Main Detection Function ─────────────────────────────────────

const ALGORITHM_WEIGHTS = {
    entropy: 0.15,
    vocabulary: 0.15,
    sentenceStructure: 0.15,
    burstiness: 0.20,
    formulaicPhrases: 0.20,
    readabilityConsistency: 0.15,
};

export function detectAIContent(text: string): EngineResult {
    const sentences = splitIntoSentences(text);
    const words = splitIntoWords(text);

    // Run all 6 analysis algorithms
    const entropyScore = analyzeEntropy(text, sentences);
    const vocabularyScore = analyzeVocabularyDiversity(words);
    const structureScore = analyzeSentenceStructure(sentences);
    const burstyScore = analyzeBurstiness(sentences);
    const formulaicScore = analyzeFormulaicPhrases(text, sentences);
    const readabilityScore = analyzeReadabilityConsistency(sentences);

    // Weighted overall score
    const overallScore = Math.round(
        entropyScore * ALGORITHM_WEIGHTS.entropy +
        vocabularyScore * ALGORITHM_WEIGHTS.vocabulary +
        structureScore * ALGORITHM_WEIGHTS.sentenceStructure +
        burstyScore * ALGORITHM_WEIGHTS.burstiness +
        formulaicScore * ALGORITHM_WEIGHTS.formulaicPhrases +
        readabilityScore * ALGORITHM_WEIGHTS.readabilityConsistency
    );

    // Add an adjustment for list-heavy text (if vocabulary and structure look like AI but burstiness failed because of lists)
    let finalScore = overallScore;

    // MATHEMATICAL AMPLIFICATION TUNING
    // If a single metric screams "This is definitely AI", we do not want a linear average
    // to dilute it down to 60%. We take the maximum of the strongest indicators.
    const maxIndicator = Math.max(entropyScore, structureScore, formulaicScore, burstyScore);

    const strongHits = Object.values({
        entropyScore, vocabularyScore, structureScore, burstyScore, formulaicScore, readabilityScore
    }).filter(s => s > 75).length;

    const moderateHits = Object.values({
        entropyScore, vocabularyScore, structureScore, burstyScore, formulaicScore, readabilityScore
    }).filter(s => s > 50).length;

    // Extremely aggressive snapping for high certainty
    if (maxIndicator >= 95) {
        // If word choice is explicitly predictable or structure is entirely uniform
        finalScore = Math.min(100, Math.max(99, maxIndicator));
    } else if (maxIndicator >= 85) {
        finalScore = Math.min(100, Math.max(95, maxIndicator + 5));
    } else if (strongHits >= 4) {
        // Almost certain AI (e.g. standard ChatGPT output)
        finalScore = Math.min(100, Math.max(95, finalScore + 25));
    } else if (strongHits >= 2 && moderateHits >= 3) {
        // Highly likely AI
        finalScore = Math.min(100, Math.max(85, finalScore + 15));
    } else if (strongHits >= 1 && moderateHits >= 4) {
        finalScore = Math.min(100, Math.max(65, finalScore + 15));
    }

    // Check for standard ChatGPT structural signatures
    // e.g. "Title" -> Intro -> "First," "Second," -> "In Conclusion"
    const lowerText = text.toLowerCase();
    const hasChatGPTStructure =
        (lowerText.includes('in conclusion') || lowerText.includes('to summarize') || lowerText.includes('ultimately')) &&
        (lowerText.includes('firstly') || lowerText.includes('first,') || lowerText.includes('one of the primary')) &&
        sentences.length > 5;

    if (hasChatGPTStructure) {
        finalScore = Math.min(100, finalScore + 20);
    }

    // Generate sentence-level analysis
    const sentenceAnalyses: SentenceAnalysis[] = sentences.map(s => analyzeSentence(s, sentences));

    // Extract highlighted sentences
    const highlightedSentences = sentenceAnalyses
        .filter(s => s.aiProbability > 55)
        .map(s => s.text);

    // Generate improved version
    const improvedVersion = generateImprovedVersion(text, sentenceAnalyses);

    return {
        sentences: sentenceAnalyses,
        overallScore: Math.min(100, Math.max(0, finalScore)),
        detectionMethods: {
            entropyAnalysis: entropyScore,
            vocabularyDiversity: vocabularyScore,
            sentenceStructure: structureScore,
            burstiness: burstyScore,
            formulaicPhrases: formulaicScore,
            readabilityConsistency: readabilityScore,
        },
        highlightedSentences,
        improvedVersion,
    };
}
