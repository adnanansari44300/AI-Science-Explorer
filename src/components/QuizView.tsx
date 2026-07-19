import React, { useState } from "react";
import { Award, CheckCircle2, XCircle, ArrowRight, Play, RefreshCw, HelpCircle, Star, Sparkles, BookOpen, Clock } from "lucide-react";
import { QuizQuestion, UserProfile } from "../types";

interface QuizViewProps {
  user: UserProfile;
  onQuizComplete: (score: number, totalQuestions: number, xpGained: number) => void;
}

const QUIZ_BANK: QuizQuestion[] = [
  // --- GRADE 5 ---
  {
    id: "q-photosyn",
    grade: "5",
    subject: "Plants",
    type: "mcq",
    question: "What is the primary gas absorbed by green plants during the process of photosynthesis?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
    answer: "A",
    explanation: "Plants breathe in Carbon Dioxide from the atmosphere through tiny pores called stomata to cook glucose food."
  },
  {
    id: "q-stomata",
    grade: "5",
    subject: "Plants",
    type: "tf",
    question: "Stomata are the green structures inside plant cells that trap sunlight energy.",
    options: ["True", "False"],
    answer: "False",
    explanation: "Chloroplasts (containing Chlorophyll) trap sunlight. Stomata are simply tiny breathing pores on the underside of leaves."
  },
  {
    id: "q-plants-fill",
    grade: "5",
    subject: "Plants",
    type: "fill",
    question: "The green pigment in plant leaves that absorbs sunlight for photosynthesis is called ______.",
    answer: "chlorophyll",
    explanation: "Chlorophyll is the green pigment in leaves that makes capturing light energy possible."
  },
  {
    id: "q-saturn",
    grade: "5",
    subject: "Solar System",
    type: "mcq",
    question: "Which gas giant planet is famous for having beautiful, extensive ring systems made of ice and dust?",
    options: ["Mars", "Saturn", "Neptune", "Mercury"],
    answer: "B",
    explanation: "Saturn's spectacular rings are made of billions of chunks of ice, dust, and rock orbiting the giant planet."
  },

  // --- GRADE 6 ---
  {
    id: "q-nucleus",
    grade: "6",
    subject: "Cells",
    type: "mcq",
    question: "Which organelle acts as the 'brain' of the cell, storing DNA and directing cell activities?",
    options: ["Mitochondria", "Cell Wall", "Nucleus", "Ribosome"],
    answer: "C",
    explanation: "The nucleus holds genetic material and controls cellular processes."
  },
  {
    id: "q-cells-tf",
    grade: "6",
    subject: "Cells",
    type: "tf",
    question: "Animal cells have a rigid outer cell wall for protection and support.",
    options: ["True", "False"],
    answer: "False",
    explanation: "Only plant cells, fungi, and some bacteria have cell walls. Animal cells only have cell membranes."
  },
  {
    id: "q-insulator",
    grade: "6",
    subject: "Electricity",
    type: "mcq",
    question: "Which of the following materials is a great electrical insulator that prevents electricity from flowing?",
    options: ["Silver", "Rubber", "Copper", "Gold"],
    answer: "B",
    explanation: "Rubber holds onto its electrons tightly, blocking the flow of electricity, making it an excellent insulator."
  },

  // --- GRADE 7 ---
  {
    id: "q-proton",
    grade: "7",
    subject: "Atoms",
    type: "mcq",
    question: "Which subatomic particle carries a positive electrical charge and is found in the atom's nucleus?",
    options: ["Proton", "Neutron", "Electron", "Molecule"],
    answer: "A",
    explanation: "Protons are positively charged, neutrons are neutral (0), and electrons are negatively charged (-)."
  },
  {
    id: "q-atoms-tf",
    grade: "7",
    subject: "Atoms",
    type: "tf",
    question: "An atom is mostly empty space.",
    options: ["True", "False"],
    answer: "True",
    explanation: "Over 99.999% of an atom is completely empty space, with a tiny positive nucleus and distant orbiting electrons."
  },

  // --- GRADE 8 ---
  {
    id: "q-noble",
    grade: "8",
    subject: "Periodic Table Basics",
    type: "mcq",
    question: "Which group of gases in the Periodic Table (Group 18) are highly stable and unreactive?",
    options: ["Halogens", "Alkali Metals", "Noble Gases", "Metalloids"],
    answer: "C",
    explanation: "Noble Gases (like Helium, Neon, Argon) have completely filled electron shells and rarely react with other atoms."
  },
  {
    id: "q-metals-liquid",
    grade: "8",
    subject: "Periodic Table Basics",
    type: "tf",
    question: "All metal elements on the periodic table are solid at room temperature.",
    options: ["True", "False"],
    answer: "False",
    explanation: "Mercury (element Hg) is a shiny liquid metal at room temperature!"
  }
];

export default function QuizView({ user, onQuizComplete }: QuizViewProps) {
  // Game Setup states
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<"5" | "6" | "7" | "8">(user.grade);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  // Game Loop states
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [fillValue, setFillValue] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  
  // Game Over states
  const [isGameOver, setIsGameOver] = useState(false);

  const startQuiz = () => {
    // Filter questions by selected grade
    let qList = QUIZ_BANK.filter(q => q.grade === selectedGrade);
    
    if (qList.length === 0) {
      // Fallback if no specific questions exist, show all
      qList = QUIZ_BANK;
    }

    // Shuffle and pick 5 questions max
    const shuffled = [...qList].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setFillValue("");
    setIsAnswerChecked(false);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  const handleSelectOption = (optLetter: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(optLetter);
  };

  const checkAnswer = () => {
    if (isAnswerChecked || !currentQuestions[currentIndex]) return;
    
    const currentQ = currentQuestions[currentIndex];
    let isCorrect = false;

    if (currentQ.type === "fill") {
      isCorrect = fillValue.trim().toLowerCase() === currentQ.answer.toLowerCase();
    } else {
      isCorrect = selectedAnswer === currentQ.answer;
    }

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setIsAnswerChecked(true);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer("");
      setFillValue("");
      setIsAnswerChecked(false);
    } else {
      // Game Over
      setIsGameOver(true);
      setIsPlaying(false);
      const pointsReward = score * 25; // 25 XP per correct answer
      onQuizComplete(score, currentQuestions.length, pointsReward);
    }
  };

  const activeQ = currentQuestions[currentIndex];

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* 1. Setup Pre-Game Screen */}
      {!isPlaying && !isGameOver && (
        <div className="bento-card p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
              🎯
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-900">Science Quiz Point</h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Test your knowledge on cells, elements, space, electricity, and atoms. Unlock badges and level up!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Choose Grade */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Grade level</span>
              <div className="grid grid-cols-4 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {(["5", "6", "7", "8"] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(g)}
                    className={`py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                      selectedGrade === g
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-blue-600 hover:bg-slate-100/50"
                    }`}
                  >
                    G-{g}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Difficulty */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Difficulty</span>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {(["easy", "medium", "hard"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 font-bold text-[10.5px] uppercase rounded-lg tracking-wider transition-all cursor-pointer ${
                      difficulty === diff
                        ? "bg-amber-500 text-white shadow-sm"
                        : "text-slate-500 hover:text-amber-600 hover:bg-slate-100/50"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl tracking-widest uppercase shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Start Quiz Challenge
          </button>
        </div>
      )}

      {/* 2. Active Quiz Gameplay Screen */}
      {isPlaying && activeQ && (
        <div className="bento-card p-6 md:p-8 space-y-6">
          {/* Header metadata */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                Grade {activeQ.grade} • {activeQ.subject}
              </span>
              <h2 className="text-sm font-bold text-slate-800">Quiz Question {currentIndex + 1} of {currentQuestions.length}</h2>
            </div>
            {/* Progress Meter */}
            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-relaxed font-sans">
              "{activeQ.question}"
            </h3>
          </div>

          {/* Interactive Answer Inputs */}
          {activeQ.type === "fill" ? (
            /* Fill in the blank input */
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Type your scientific answer..."
                value={fillValue}
                disabled={isAnswerChecked}
                onChange={(e) => setFillValue(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl focus:outline-none text-sm font-bold"
              />
            </div>
          ) : (
            /* Multiple Choice or True/False buttons */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {activeQ.options?.map((opt, oIdx) => {
                const optLetter = String.fromCharCode(65 + oIdx); // A, B, C, D
                const isSelected = selectedAnswer === optLetter;
                const isCorrectVal = activeQ.answer === optLetter;
                
                let btnStyle = "bg-slate-50 border-slate-100 hover:bg-slate-100/50 text-slate-700";
                if (isSelected) {
                  btnStyle = "bg-blue-50 border-blue-500 text-blue-950 font-bold ring-2 ring-blue-50";
                }
                if (isAnswerChecked) {
                  if (isCorrectVal) {
                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                  } else if (isSelected) {
                    btnStyle = "bg-red-50 border-red-500 text-red-950";
                  } else {
                    btnStyle = "bg-white border-slate-100 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswerChecked}
                    onClick={() => handleSelectOption(optLetter)}
                    className={`text-left p-4 rounded-2xl border font-semibold transition-all text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-bold">{optLetter})</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Answer Checked Feedbacks */}
          {isAnswerChecked && (
            <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
              (activeQ.type === "fill" ? (fillValue.trim().toLowerCase() === activeQ.answer.toLowerCase()) : (selectedAnswer === activeQ.answer))
                ? "bg-emerald-50 border-emerald-100 text-emerald-950"
                : "bg-red-50 border-red-100 text-red-950"
            }`}>
              {(activeQ.type === "fill" ? (fillValue.trim().toLowerCase() === activeQ.answer.toLowerCase()) : (selectedAnswer === activeQ.answer)) ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-50 mt-0.5 shrink-0 animate-bounce" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 fill-red-50 mt-0.5 shrink-0" />
              )}
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-extrabold text-slate-800">
                  {(activeQ.type === "fill" ? (fillValue.trim().toLowerCase() === activeQ.answer.toLowerCase()) : (selectedAnswer === activeQ.answer)) ? "🎉 Splendid! That is correct!" : `❌ Oh! Close choice. (Correct: Option ${activeQ.answer})`}
                </p>
                <p className="text-slate-600 leading-relaxed font-sans pt-0.5">{activeQ.explanation}</p>
              </div>
            </div>
          )}

          {/* Control Actions buttons */}
          <div className="flex justify-end pt-2 border-t border-slate-100">
            {!isAnswerChecked ? (
              <button
                type="button"
                disabled={activeQ.type === "fill" ? !fillValue.trim() : !selectedAnswer}
                onClick={checkAnswer}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl tracking-wider uppercase shadow-md shadow-blue-500/10 transition-all active:scale-95 cursor-pointer"
              >
                Validate Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl tracking-wider uppercase shadow-md shadow-indigo-500/10 transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <span>{currentIndex === currentQuestions.length - 1 ? "Complete Quiz" : "Next Question"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. Game Over Post-Quiz Scoreboard Screen */}
      {isGameOver && (
        <div className="bento-card p-6 md:p-8 space-y-6 text-center">
          <div className="space-y-3">
            <div className="w-20 h-20 bg-gradient-to-tr from-emerald-400 to-emerald-500 text-white rounded-full flex items-center justify-center text-4xl mx-auto shadow-md border-4 border-emerald-100 animate-pulse">
              🏆
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 leading-tight">Quiz Complete!</h1>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto">
              You scored <span className="font-extrabold text-emerald-600">{score} out of {currentQuestions.length}</span> correct answers!
            </p>
          </div>

          {/* Score stats layout */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <div className="bento-card bg-slate-50 p-5">
              <span className="text-2xl font-black text-slate-800">
                {Math.round((score / currentQuestions.length) * 100)}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pt-0.5">Accuracy</span>
            </div>
            <div className="bento-card bg-slate-50 p-5">
              <span className="text-2xl font-black text-indigo-600 flex items-center justify-center gap-1.5">
                <Star className="w-5.5 h-5.5 fill-current" /> +{score * 25}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pt-0.5">XP Gained</span>
            </div>
          </div>

          {/* Educational Encouragement message */}
          <p className="text-xs text-slate-500 italic max-w-md mx-auto leading-relaxed">
            {score === currentQuestions.length 
              ? "Astounding! A perfect score! You are a genuine Science Pro!" 
              : "Splendid effort! Practice makes perfect. Try doing another quiz to hit 100%!"}
          </p>

          <div className="flex gap-4 max-w-md mx-auto pt-4 border-t border-slate-150">
            <button
              onClick={() => {
                setIsGameOver(false);
                setIsPlaying(false);
              }}
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Back Setup
            </button>
            <button
              onClick={startQuiz}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Retry Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
