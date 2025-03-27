/**
 * Utility functions for analyzing text content
 */

/**
 * Detects the language of a given text based on character sets
 * @param text The text to analyze
 * @returns The detected language code (zh, ja, ko, ar, ru, or en)
 */
export function detectLanguage(text: string): string {
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'ja';
  if (/[\uac00-\ud7af]/.test(text)) return 'ko';
  if (/[\u0600-\u06ff]/.test(text)) return 'ar';
  if (/[\u0400-\u04ff]/.test(text)) return 'ru';
  return 'en';
}

/**
 * Assesses the complexity of a given text based on various metrics
 * @param text The text to analyze
 * @returns A complexity score between 0 and 1
 */
export function assessMessageComplexity(text: string): number {
  let complexity = 0;
  
  // Word length analysis
  const words = text.split(/\s+/);
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  complexity += Math.min(avgWordLength / 10, 0.3);

  // Technical terms detection
  const technicalTerms = text.match(/\b(api|function|algorithm|database|server|client|protocol|framework|library|sdk|microservice|container|kubernetes|docker|aws|azure|gcp|ci|cd|devops|git|rest|graphql|websocket|oauth|jwt|encryption|security|authentication|authorization)\b/gi);
  if (technicalTerms) complexity += Math.min(technicalTerms.length * 0.1, 0.3);

  // Code snippet detection
  const codeSnippets = text.match(/```[\s\S]*?```/g);
  if (codeSnippets) complexity += Math.min(codeSnippets.length * 0.2, 0.4);

  // Mathematical expression detection
  const mathExpressions = text.match(/\b\d+\s*[\+\-\*\/\^]\s*\d+\b/g);
  if (mathExpressions) complexity += Math.min(mathExpressions.length * 0.1, 0.2);

  // Technical diagram detection
  const diagramTerms = text.match(/\b(diagram|flowchart|sequence|architecture|design|pattern)\b/gi);
  if (diagramTerms) complexity += Math.min(diagramTerms.length * 0.1, 0.2);

  return Math.min(complexity, 1);
}

/**
 * Checks if text contains any of the given terms
 * @param text The text to analyze
 * @param terms Array of terms to check for
 * @returns boolean indicating if any terms were found
 */
export function containsAnyTerms(text: string, terms: string[]): boolean {
  const lowerText = text.toLowerCase();
  return terms.some(term => lowerText.includes(term.toLowerCase()));
}

/**
 * Counts occurrences of terms in text
 * @param text The text to analyze
 * @param terms Array of terms to count
 * @returns Number of occurrences found
 */
export function countTermOccurrences(text: string, terms: string[]): number {
  const lowerText = text.toLowerCase();
  return terms.reduce((count, term) => {
    const regex = new RegExp(term.toLowerCase(), 'g');
    return count + (lowerText.match(regex) || []).length;
  }, 0);
} 