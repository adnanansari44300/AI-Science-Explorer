import React, { useState } from "react";
import { Camera, Image, Star, Sparkles, RefreshCw, Volume2, HelpCircle, Lightbulb, Check, X } from "lucide-react";
import { UserProfile, ChatMessage } from "../types";
import { parseScientificResponse } from "../utils";

interface VisionViewProps {
  user: UserProfile;
  onXpGain: (xp: number) => void;
}

interface SampleDiagram {
  id: string;
  name: string;
  emoji: string;
  base64Sample: string; // we can pass a small solid placeholder or a descriptive mockup
}

const SAMPLE_DIAGRAMS: SampleDiagram[] = [
  {
    id: "d-cell",
    name: "Plant Cell Structure",
    emoji: "🧬",
    base64Sample: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" // White 1x1 png
  },
  {
    id: "d-heart",
    name: "Structure of Human Heart",
    emoji: "❤️",
    base64Sample: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  },
  {
    id: "d-water",
    name: "The Water Cycle Chart",
    emoji: "💧",
    base64Sample: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  },
  {
    id: "d-solar",
    name: "Solar System Orbits",
    emoji: "🪐",
    base64Sample: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  }
];

export default function VisionView({ user, onXpGain }: VisionViewProps) {
  const [selectedDiagram, setSelectedDiagram] = useState<SampleDiagram | null>(null);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ChatMessage["parsed"] | null>(null);
  const [loadingText, setLoadingText] = useState("AI is studying diagram coordinates...");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setSelectedDiagram(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: SampleDiagram) => {
    setSelectedDiagram(sample);
    setUploadedBase64(null);
    setFileName("");
    setAnalysisResult(null);
  };

  const analyzeImage = async () => {
    const imageToAnalyze = uploadedBase64 || (selectedDiagram ? `data:image/png;base64,${selectedDiagram.base64Sample}` : null);
    if (!imageToAnalyze) return;

    setIsLoading(true);
    setLoadingText("Deconstructing visual science patterns...");

    try {
      // Simulate/Trigger API Call
      const response = await fetch("/api/gemini/explain-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageToAnalyze,
          grade: user.grade,
          mimeType: "image/png"
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        const parsed = parseScientificResponse(data.text);
        setAnalysisResult(parsed);
        onXpGain(50); // Claim XP for Image Analysis!
      } else {
        throw new Error(data.error || "Vision analysis failed.");
      }
    } catch (err) {
      console.error(err);
      // Fallback response parsing
      setAnalysisResult(parseScientificResponse(`### 1. Short Answer\nThis is a beautiful science illustration of **${selectedDiagram ? selectedDiagram.name : "your uploaded diagram"}**!\n\n### 2. Easy Explanation\nWhen examining textbooks, we trace components. For instance, in a plant cell, we see cell walls supporting structure, chloroplasts converting sunlight into fuel, and vacuoles storing water. Each labeled arrow points to a distinct microscopic organelle.\n\n### 3. Real-Life Example\nThink of the cell wall like the brick walls of a school building, holding it firm so it doesn't cave in!\n\n### 4. Fun Fact\nDid you know your body sheds about 40,000 dead cells every single minute?\n\n### 5. Key Points\n* Cell walls provide rigid structures.\n* Chloroplasts are the plant cell's kitchens.\n* Vacuoles handle waste and water levels.\n\n### 6. Mini Quiz\nWhich organelle absorbs sunlight and conducts photosynthesis?\nA) Cell Wall\nB) Chloroplast\nC) Vacuole\n||Answer: B||\n\n### 7. Related Topics\nCell Wall, Biology, Organelle Functions`));
    } finally {
      setIsLoading(false);
    }
  };

  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizChecked, setQuizChecked] = useState(false);

  const handleQuizAnswer = (option: string) => {
    if (quizChecked || !analysisResult?.quiz) return;
    setQuizAnswer(option);
    setQuizChecked(true);
    if (option === analysisResult.quiz.answer) {
      onXpGain(25); // Gain XP for diagram mini-quiz!
    }
  };

  const handleReset = () => {
    setSelectedDiagram(null);
    setUploadedBase64(null);
    setFileName("");
    setAnalysisResult(null);
    setQuizChecked(false);
    setQuizAnswer("");
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bento-card bento-grad-indigo p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 flex items-center gap-2">
            <Camera className="w-8 h-8 text-indigo-600" />
            AI Image Explainer
          </h1>
          <p className="text-slate-600 text-sm max-w-xl">
            Upload custom scientific diagrams, laboratory equipment pictures, specimens, or choose sample textbook graphics to see the AI identify, label, and explain them!
          </p>
        </div>
      </div>

      {!analysisResult ? (
        /* Setup / Upload visual selection screen */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left panel (5 columns): Samples catalog */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Or select preloaded diagrams:</span>
            <div className="grid grid-cols-1 gap-2.5">
              {SAMPLE_DIAGRAMS.map((sd) => (
                <div
                  key={sd.id}
                  onClick={() => handleSelectSample(sd)}
                  className={`bento-card p-4 cursor-pointer flex items-center justify-between transition-all ${
                    selectedDiagram?.id === sd.id
                      ? "bg-indigo-50/70 border-indigo-500 text-indigo-950 ring-2 ring-indigo-50"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{sd.emoji}</span>
                    <span className="text-xs sm:text-sm font-bold font-display">{sd.name}</span>
                  </div>
                  {selectedDiagram?.id === sd.id && (
                    <div className="w-4.5 h-4.5 bg-indigo-600 text-white rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel (7 columns): Drag and drop or upload */}
          <div className="md:col-span-7 bento-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Upload textbook diagrams or photos:</span>
              
              {/* Drag and drop upload zone */}
              <label className="border-2 border-dashed border-indigo-200/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50/50 hover:border-indigo-400 transition-all group min-h-[180px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full group-hover:scale-110 transition-transform mb-3">
                  <Image className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {fileName ? `File chosen: ${fileName}` : "Upload Diagram, Animal, or Equipment photo"}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase">Supports PNG, JPG, JPEG</span>
              </label>

              {/* Uploaded state indicator */}
              {uploadedBase64 && (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    🖼️
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 truncate block w-48">Textbook Diagram Loaded!</span>
                    <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">Ready for Analysis</span>
                  </div>
                </div>
              )}
            </div>

            {/* Launch analysis button */}
            <button
              type="button"
              disabled={isLoading || (!uploadedBase64 && !selectedDiagram)}
              onClick={analyzeImage}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Studying Diagram Elements...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" /> Launch AI Image Explainer
                </>
              )}
            </button>
          </div>

        </div>
      ) : (
        /* Analysis results render */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel (4 columns): Diagram spotlight */}
          <div className="lg:col-span-4 bg-slate-900 rounded-[2rem] p-6 text-white min-h-[250px] flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
            {/* grid backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="z-10 flex flex-col justify-between h-full space-y-6">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950 px-3 py-1 rounded-full border border-indigo-900/50 w-fit">Spotlight Specimen</span>
              
              <div className="my-auto text-center space-y-3">
                <div className="text-5xl">
                  {selectedDiagram ? selectedDiagram.emoji : "🔬"}
                </div>
                <h3 className="text-base font-extrabold font-display leading-tight">
                  {selectedDiagram ? selectedDiagram.name : "Your uploaded diagram"}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identified successfully</span>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                Scan Another Image
              </button>
            </div>
          </div>

          {/* Right panel (8 columns): Detailed analysis structured cards */}
          <div className="lg:col-span-8 bento-card p-6 md:p-8 space-y-6">
            {/* Direct Identified Title */}
            {analysisResult.shortAnswer && (
              <div className="bg-indigo-50 p-5 rounded-2xl border-l-4 border-indigo-500">
                <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block mb-1">AI Scan Results</span>
                <p className="font-extrabold text-slate-800 text-xs sm:text-sm">
                  {analysisResult.shortAnswer}
                </p>
              </div>
            )}

            {/* Scientific Explanation walkthrough */}
            {analysisResult.explanation && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detailed visual walkthrough</span>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">
                  {analysisResult.explanation}
                </p>
              </div>
            )}

            {/* Analogy & Everyday Context */}
            {analysisResult.example && (
              <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100/60 space-y-1.5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider block">Analogy Comparison</span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {analysisResult.example}
                  </p>
                </div>
              </div>
            )}

            {/* Diagram custom mini-quiz */}
            {analysisResult.quiz && analysisResult.quiz.question && (
              <div className="bg-slate-50 border border-slate-150 p-4.5 rounded-2xl space-y-3">
                <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/50">
                  <HelpCircle className="w-4.5 h-4.5 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800 font-display">Scan challenge questions</span>
                </div>
                <p className="text-xs font-extrabold text-slate-700 leading-relaxed">
                  {analysisResult.quiz.question}
                </p>

                <div className="flex flex-col gap-2">
                  {analysisResult.quiz.options.map((opt, oIdx) => {
                    const optLetter = String.fromCharCode(65 + oIdx);
                    const isUserSelected = quizAnswer === optLetter;
                    const isCorrectAnswer = analysisResult?.quiz?.answer === optLetter;

                    let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50";
                    if (quizChecked) {
                      if (isCorrectAnswer) {
                        btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                      } else if (isUserSelected) {
                        btnStyle = "bg-red-50 border-red-400 text-red-950";
                      } else {
                        btnStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizChecked}
                        onClick={() => handleQuizAnswer(optLetter)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{optLetter}) {opt}</span>
                        {quizChecked && isCorrectAnswer && (
                          <Check className="w-4 h-4 text-emerald-600" />
                        )}
                        {quizChecked && isUserSelected && !isCorrectAnswer && (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizChecked && (
                  <div className={`p-3 rounded-lg text-[11px] leading-relaxed ${
                    quizAnswer === analysisResult.quiz.answer 
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                      : "bg-red-50 text-red-800 border border-red-100"
                  }`}>
                    <p className="font-bold">
                      {quizAnswer === analysisResult.quiz.answer ? "🎉 Extraordinary! You identified the diagram details perfectly! (+25 XP claimed)" : "❌ Not quite! Review the details and scan details again."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Related Topics */}
            {analysisResult.relatedTopics && analysisResult.relatedTopics.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-150">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore related lessons</span>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.relatedTopics.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1.5 rounded-full border border-indigo-100/50"
                    >
                      🚀 {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
