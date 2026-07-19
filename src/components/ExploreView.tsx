import React, { useState, useEffect } from "react";
import { BookOpen, GraduationCap, ArrowLeft, Star, Volume2, HelpCircle, CheckCircle2, RotateCcw, AlertTriangle, Lightbulb, ClipboardList, Sparkles } from "lucide-react";
import { Lesson, UserProfile } from "../types";
import { LESSONS } from "../data";

interface ExploreViewProps {
  user: UserProfile;
  initialLessonId?: string | null;
  onLessonComplete: (lessonId: string, xpGained: number) => void;
  language: string;
}

export default function ExploreView({ user, initialLessonId, onLessonComplete, language }: ExploreViewProps) {
  const [selectedGrade, setSelectedGrade] = useState<"5" | "6" | "7" | "8">(user.grade);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  // Flashcard practice states
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Practice quiz states
  const [practiceAnswers, setPracticeAnswers] = useState<{ [qIndex: number]: string }>({});
  const [practiceChecked, setPracticeChecked] = useState<{ [qIndex: number]: boolean }>({});

  useEffect(() => {
    if (initialLessonId) {
      const found = LESSONS.find(l => l.id === initialLessonId);
      if (found) {
        setSelectedLesson(found);
        setSelectedGrade(found.grade);
      }
    }
  }, [initialLessonId]);

  const filteredLessons = LESSONS.filter((l) => l.grade === selectedGrade);

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentFlashcardIndex(0);
    setIsFlipped(false);
    setPracticeAnswers({});
    setPracticeChecked({});
  };

  const handleBackToCatalog = () => {
    setSelectedLesson(null);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "Urdu" ? "ur-PK" : "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      const alreadyCompleted = user.completedLessons.includes(selectedLesson.id);
      onLessonComplete(selectedLesson.id, alreadyCompleted ? 10 : 50);
    }
  };

  const getTopicIllustration = (type: Lesson["illustrationType"]) => {
    switch (type) {
      case "plants":
        return "🌿🌞🌱";
      case "space":
        return "🪐🌌☄️";
      case "cells":
        return "🧬🔬🦠";
      case "electricity":
        return "⚡🔋💡";
      case "atoms":
        return "⚛️🛰️💥";
      case "periodic-table":
        return "🧪📋🔥";
      default:
        return "🔬🧪📖";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header Section */}
      {!selectedLesson ? (
        <div className="space-y-6">
          <div className="bento-card bento-grad-emerald p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
                Science Explainer Catalog
              </h1>
              <p className="text-slate-600 text-sm max-w-xl">
                Explore structured, visual lessons designed according to the curriculum for Grades 5 to 8. Practice flashcards and revision questions.
              </p>
            </div>
            
            {/* Grade Selector Tabs */}
            <div className="flex bg-white p-1 rounded-xl shadow-xs border border-slate-100 w-full md:w-auto">
              {(["5", "6", "7", "8"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`flex-1 md:flex-none px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                    selectedGrade === g
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  Grade {g}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson) => {
              const isCompleted = user.completedLessons.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className="group bento-card cursor-pointer flex flex-col justify-between"
                >
                  {isCompleted && (
                    <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-600 p-1 rounded-full border border-emerald-100 z-10">
                      <CheckCircle2 className="w-4 h-4 fill-current text-emerald-50" />
                    </div>
                  )}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {getTopicIllustration(lesson.illustrationType)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          {lesson.subject}
                        </span>
                        <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors pt-0.5">
                          {lesson.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {lesson.definition}
                    </p>
                  </div>
                  <div className="px-6 py-3.5 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      Reward: +50 XP
                    </span>
                    <span className="text-emerald-600 group-hover:translate-x-1 transition-transform">
                      Learn Concept &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* 2. Detailed Science Explainer (Detailed View) */
        <div className="space-y-8 animate-slide-up">
          {/* Back Nav Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToCatalog}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Catalog
            </button>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Grade {selectedLesson.grade} • {selectedLesson.subject}
              </span>
              <button
                onClick={() => speakText(`${selectedLesson.title}. ${selectedLesson.definition}`)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors cursor-pointer"
                title="Listen to Explanation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title Area */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold font-display text-slate-900 leading-tight">
              {selectedLesson.title}
            </h1>
            {/* Quick Definition Box */}
            <div className="bg-emerald-50/80 p-5 rounded-2xl border-l-4 border-emerald-500 shadow-xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">Definition</span>
              <p className="text-emerald-950 font-medium text-sm md:text-base leading-relaxed">
                {selectedLesson.definition}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main column (8 columns): Easy explanation, real life examples, common mistakes, notes */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Easy Analogy Explanation */}
              <div className="bento-card p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 font-display border-b border-slate-100 pb-3">
                  <span className="text-2xl">🧠</span> Easy Analogy Explanation
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {selectedLesson.explanation}
                </p>
              </div>

              {/* Real Life Examples */}
              <div className="bento-card bento-grad-indigo p-6 md:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 font-display border-b border-indigo-50 pb-3">
                  <span className="text-2xl">🌍</span> Real-Life Situations
                </h3>
                <div className="space-y-3">
                  {selectedLesson.examples.map((ex, i) => (
                    <div key={i} className="flex gap-3 bg-white p-4 rounded-xl shadow-xs border border-blue-100/50">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Questions Area */}
              <div className="bento-card p-6 md:p-8 space-y-5">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5 font-display border-b border-slate-100 pb-3">
                  <span className="text-2xl">✏️</span> Practice Questions
                </h3>
                <div className="space-y-6">
                  {selectedLesson.practiceQuestions.map((pq, qIdx) => {
                    const isChecked = practiceChecked[qIdx];
                    const selectedAns = practiceAnswers[qIdx];
                    return (
                      <div key={qIdx} className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-100">
                        <p className="text-sm font-bold text-slate-800 flex items-start gap-1.5">
                          <HelpCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          {pq.question}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {pq.options.map((opt, oIdx) => {
                            const optionLetter = String.fromCharCode(65 + oIdx); // A, B, C, D
                            const isSelected = selectedAns === optionLetter;
                            const isCorrectOpt = pq.answer === optionLetter;
                            
                            let optStyle = "bg-white border-slate-100 text-slate-700";
                            if (isSelected) {
                              optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950";
                            }
                            if (isChecked) {
                              if (isCorrectOpt) {
                                optStyle = "bg-emerald-100 border-emerald-600 text-emerald-950";
                              } else if (isSelected) {
                                optStyle = "bg-red-50 border-red-500 text-red-950";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isChecked}
                                onClick={() => setPracticeAnswers(prev => ({ ...prev, [qIdx]: optionLetter }))}
                                className={`text-left text-xs p-3 rounded-xl border font-semibold transition-all cursor-pointer ${optStyle}`}
                              >
                                <span className="font-bold mr-1">{optionLetter})</span> {opt}
                              </button>
                            );
                          })}
                        </div>

                        {isChecked && (
                          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-xs text-slate-600 space-y-1 animate-fade-in">
                            <p className="font-bold text-slate-800">
                              {selectedAns === pq.answer ? "🎉 Correct!" : `❌ Incorrect (Correct: Option ${pq.answer})`}
                            </p>
                            <p>{pq.explanation}</p>
                          </div>
                        )}

                        {!isChecked && (
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              disabled={!selectedAns}
                              onClick={() => setPracticeChecked(prev => ({ ...prev, [qIdx]: true }))}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                            >
                              Check Answer
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right sidebar column (4 columns): Flashcards deck, fun facts, common mistakes, complete lesson */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Dynamic Flashcards Practice */}
              <div className="bento-card bento-grad-indigo p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> Lesson Flashcards
                  </h3>
                  <span className="text-[10px] font-bold text-indigo-500 bg-white px-2 py-0.5 rounded-full shadow-xs">
                    {currentFlashcardIndex + 1} / {selectedLesson.keyTerms.length}
                  </span>
                </div>

                {/* The Flippable Card */}
                <div 
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="h-44 w-full bg-white rounded-xl shadow-xs border border-indigo-100/60 p-5 flex flex-col justify-between items-center text-center cursor-pointer hover:border-indigo-400 transition-all active:scale-98 select-none"
                >
                  <div className="my-auto space-y-2">
                    {!isFlipped ? (
                      <>
                        <span className="text-[10px] font-bold text-indigo-500 tracking-wider uppercase bg-indigo-50 px-2 py-0.5 rounded-full">Term</span>
                        <h4 className="text-lg font-extrabold text-slate-800 font-display">
                          {selectedLesson.keyTerms[currentFlashcardIndex]?.term}
                        </h4>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-bold text-emerald-500 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-full">Meaning</span>
                        <p className="text-xs font-semibold text-slate-600 leading-relaxed max-h-24 overflow-y-auto">
                          {selectedLesson.keyTerms[currentFlashcardIndex]?.definition}
                        </p>
                      </>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                    Click to flip 🔄
                  </span>
                </div>

                {/* Flashcard Nav controls */}
                <div className="flex justify-between items-center">
                  <button
                    disabled={currentFlashcardIndex === 0}
                    onClick={() => {
                      setCurrentFlashcardIndex(prev => prev - 1);
                      setIsFlipped(false);
                    }}
                    className="px-3 py-1.5 bg-white text-slate-500 font-bold text-xs rounded-lg disabled:opacity-30 border border-slate-200 transition-colors cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      setCurrentFlashcardIndex((prev) => (prev + 1) % selectedLesson.keyTerms.length);
                    }}
                    className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-lg border border-indigo-700 transition-colors cursor-pointer"
                  >
                    Next Card 🃏
                  </button>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bento-card bento-grad-rose p-6 space-y-3">
                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Common Misconceptions
                </h4>
                <div className="space-y-2">
                  {selectedLesson.commonMistakes.map((cm, i) => (
                    <div key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-red-500 font-bold shrink-0">❌</span>
                      <p className="leading-relaxed">{cm}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Revision Notes */}
              <div className="bento-card bento-grad-amber p-6 space-y-3">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-amber-600" /> Revision Notes
                </h4>
                <ul className="space-y-2">
                  {selectedLesson.revisionNotes.map((note, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-amber-500 font-bold shrink-0">💡</span>
                      <p className="leading-relaxed">{note}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Complete & Claim XP Button */}
              <div className="bento-card bento-grad-emerald p-6 space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-emerald-700 font-extrabold text-sm block">Mark Lesson Complete</span>
                  <p className="text-slate-500 text-xs">
                    Gain XP points and level up your Science ranks!
                  </p>
                </div>
                <button
                  onClick={handleCompleteLesson}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md tracking-widest transition-colors flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4.5 h-4.5" />
                  {user.completedLessons.includes(selectedLesson.id) ? "Lesson Read (+10 XP)" : "Claim Lesson XP (+50 XP)"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
