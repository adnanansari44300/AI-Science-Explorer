import { ChatMessage } from "./types";

/**
 * Parses Gemini's structured response into structured sections.
 * Format expected:
 * ### 1. Short Answer
 * [Content]
 * ### 2. Easy Explanation
 * [Content]
 * ...
 */
export function parseScientificResponse(text: string): ChatMessage["parsed"] {
  const result: NonNullable<ChatMessage["parsed"]> = {};

  try {
    // Split on headers: ### Number. Title
    const headerRegex = /###\s+(\d)\.\s+([^\n]+)/g;
    
    // We can extract sections by finding the headings and content between them
    const sections: { id: number; title: string; content: string }[] = [];
    let match;
    let lastIndex = 0;

    // First find all matches
    const headings: { id: number; title: string; index: number; length: number }[] = [];
    while ((match = headerRegex.exec(text)) !== null) {
      headings.push({
        id: parseInt(match[1]),
        title: match[2].trim(),
        index: match.index,
        length: match[0].length
      });
    }

    if (headings.length === 0) {
      // Fallback if formatting is completely ignored
      result.shortAnswer = "Scientific Answer";
      result.explanation = text;
      return result;
    }

    for (let i = 0; i < headings.length; i++) {
      const current = headings[i];
      const start = current.index + current.length;
      const end = i < headings.length - 1 ? headings[i + 1].index : text.length;
      const content = text.substring(start, end).trim();

      sections.push({
        id: current.id,
        title: current.title,
        content
      });
    }

    // Map known sections
    sections.forEach(sec => {
      switch (sec.id) {
        case 1:
          result.shortAnswer = sec.content;
          break;
        case 2:
          result.explanation = sec.content;
          break;
        case 3:
          result.example = sec.content;
          break;
        case 4:
          result.funFact = sec.content;
          break;
        case 5:
          // Extract bullet points
          result.keyPoints = sec.content
            .split(/\n/)
            .map(line => line.replace(/^[\s*\-+]+/, "").trim())
            .filter(line => line.length > 0);
          break;
        case 6:
          // Parse mini quiz: Question, Options, Answer
          const quizText = sec.content;
          // Extract correct answer in pipes ||Answer: X||
          const ansMatch = quizText.match(/\|\|Answer:\s*([A-C])\|\|/i);
          const answer = ansMatch ? ansMatch[1].toUpperCase() : "A";
          
          // Remove the answer key from the visible text
          let cleanQuizText = quizText.replace(/\|\|Answer:\s*[A-C]\|\|/i, "").trim();

          // Split options (A), B), C)) or A., B., C.
          const lines = cleanQuizText.split(/\n/);
          const questionLines: string[] = [];
          const options: string[] = [];

          lines.forEach(line => {
            const trimmed = line.trim();
            if (/^[A-C][\s).:-]/i.test(trimmed)) {
              options.push(trimmed.replace(/^[A-C][\s).:-]+\s*/i, "").trim());
            } else if (trimmed.length > 0) {
              questionLines.push(trimmed);
            }
          });

          result.quiz = {
            question: questionLines.join(" "),
            options: options.slice(0, 3), // max 3 options
            answer: answer
          };
          break;
        case 7:
          result.relatedTopics = sec.content
            .split(/,/)
            .map(t => t.replace(/^[\s*\-+]+/, "").trim())
            .filter(t => t.length > 0);
          break;
      }
    });

  } catch (err) {
    console.error("Error parsing scientific response:", err);
    // Simple fallback
    result.shortAnswer = "Science Explorer Explanation";
    result.explanation = text;
  }

  return result;
}
