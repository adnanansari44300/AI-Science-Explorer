export interface Lesson {
  id: string;
  grade: "5" | "6" | "7" | "8";
  subject: string;
  title: string;
  definition: string;
  explanation: string;
  examples: string[];
  illustrationUrl?: string;
  illustrationType?: "cells" | "plants" | "animals" | "human" | "electricity" | "force" | "matter" | "atoms" | "space" | "weather" | "ecosystem" | "periodic-table";
  keyTerms: { term: string; definition: string }[];
  funFacts: string[];
  commonMistakes: string[];
  revisionNotes: string[];
  practiceQuestions: { question: string; options: string[]; answer: string; explanation: string }[];
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  objective: string;
  materials: string[];
  steps: {
    number: number;
    text: string;
    actionLabel: string;
    animationState: string;
  }[];
  expectedResult: string;
  explanation: string;
  safetyTips: string[];
  illustrationType: "volcano" | "magnet" | "circuit" | "watercycle" | "plantgrowth" | "density";
}

export interface QuizQuestion {
  id: string;
  grade: "5" | "6" | "7" | "8";
  subject: string;
  type: "mcq" | "tf" | "fill" | "match";
  question: string;
  options?: string[]; // For MCQ or Match (shuffled options)
  answer: string; // Correct letter (e.g. "A" or "True" or fill-in blank word)
  explanation: string;
  pairs?: { left: string; right: string }[]; // For Match type
  imageHint?: string;
}

export interface DictionaryTerm {
  term: string;
  meaning: string;
  pronunciation: string;
  example: string;
  illustrationType?: string;
  relatedConcepts: string[];
}

export interface ScienceFact {
  id: string;
  category: "space" | "animal" | "human" | "nature" | "tech" | "ocean";
  fact: string;
  details: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  iconName: string;
  progress: number; // 0 to 100
  unlocked: boolean;
}

export interface UserProfile {
  name: string;
  grade: "5" | "6" | "7" | "8";
  xp: number;
  level: number;
  dailyStreak: number;
  lastActive: string;
  badges: string[]; // List of badge IDs
  completedLessons: string[]; // List of lesson IDs
  completedExperiments: string[]; // List of experiment IDs
  quizHighScores: { [quizId: string]: number };
  isPremium: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  // Parsed segments for structured response cards
  parsed?: {
    shortAnswer?: string;
    explanation?: string;
    example?: string;
    funFact?: string;
    keyPoints?: string[];
    quiz?: {
      question: string;
      options: string[];
      answer: string;
      userAnswer?: string;
      isCorrect?: boolean;
    };
    relatedTopics?: string[];
  };
}
