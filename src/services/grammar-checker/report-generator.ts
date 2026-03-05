
import { GrammarResult } from '@/types/grammar-checker';

export const downloadGrammarReport = (result: GrammarResult): void => {
  if (!result) return;
  
  const reportText = `
Grammar Check Report
===================

Scores:
- Writing Score: ${result.score}/100
- Fluency Score: ${result.fluencyScore}/100
- Clarity Score: ${result.clarityScore}/100
- Error Percentage: ${result.errorPercentage}%

Summary:
${result.summary}

Suggestions:
${result.corrections.map((c, i) => 
`${i+1}. Issue: "${c.original}" could be "${c.corrected}"
  Type: ${c.type}
  Explanation: ${c.explanation}
`).join('\n')}

Original Text:
${result.text}

Suggested Text:
${result.correctedText}
  `;
  
  const blob = new Blob([reportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'grammar-check-report.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
