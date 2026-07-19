import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Sparkles, Send, Volume2, HelpCircle, Lightbulb, Compass, Languages, ChevronDown, Check, X } from "lucide-react";
import { UserProfile, ChatMessage } from "../types";
import { parseScientificResponse } from "../utils";

interface ChatViewProps {
  user: UserProfile;
  language: string;
  setLanguage: (lang: string) => void;
  onXpGain: (xp: number) => void;
}

const SAMPLE_QUESTIONS = [
  "Why is the sky blue?",
  "How do volcanoes erupt?",
  "How do plants make food?",
  "How does gravity work?",
  "How does the human heart work?",
  "How are rainbows formed?",
  "Why do stars shine?"
];

export default function ChatView({ user, language, setLanguage, onXpGain }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-bot",
      role: "assistant",
      text: "### 1. Short Answer\nWelcome to your AI Science Chat! Ask me any science question.\n\n### 2. Easy Explanation\nI am your custom-trained AI tutor. You can ask me anything about planets, cells, chemistry, gravity, or human bodies. I will explain everything in simple terms, give real-world analogies, share fun trivia, and even test you with a mini quiz!\n\n### 3. Real-Life Example\nFor example, type 'Why is the sky blue?' below, or click any of the suggested questions to see how I work!\n\n### 4. Fun Fact\nDid you know that the word 'Science' comes from the Latin word 'Scientia', which means 'Knowledge'?\n\n### 5. Key Points\n* Ask questions freely!\n* Toggle your school grade (5-8) to customize explanations.\n* Play the mini-quiz in each answer to test your memory.\n\n### 6. Mini Quiz\nWhich language does the word 'Science' come from?\nA) Greek\nB) Latin\nC) Urdu\n||Answer: B||\n\n### 7. Related Topics\nScientific Method, Famous Scientists, Space Exploration",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      parsed: parseScientificResponse("### 1. Short Answer\nWelcome to your AI Science Chat! Ask me any science question.\n\n### 2. Easy Explanation\nI am your custom-trained AI tutor. You can ask me anything about planets, cells, chemistry, gravity, or human bodies. I will explain everything in simple terms, give real-world analogies, share fun trivia, and even test you with a mini quiz!\n\n### 3. Real-Life Example\nFor example, type 'Why is the sky blue?' below, or click any of the suggested questions to see how I work!\n\n### 4. Fun Fact\nDid you know that the word 'Science' comes from the Latin word 'Scientia', which means 'Knowledge'?\n\n### 5. Key Points\n* Ask questions freely!\n* Toggle your school grade (5-8) to customize explanations.\n* Play the mini-quiz in each answer to test your memory.\n\n### 6. Mini Quiz\nWhich language does the word 'Science' come from?\nA) Greek\nB) Latin\nC) Urdu\n||Answer: B||\n\n### 7. Related Topics\nScientific Method, Famous Scientists, Space Exploration")
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [targetGrade, setTargetGrade] = useState<"5" | "6" | "7" | "8">(user.grade);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Consulting scientific journals...");
  
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Cycling fun loading captions to keep students engaged during API calls
  const LOADING_CAPTIONS = [
    "Consulting the periodic table...",
    "Powering up the particle accelerator...",
    "Counting mitochondria energy cells...",
    "Calibrating gravitational waves...",
    "Cooking baking soda bubbles...",
    "Scanning solar orbits..."
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      let idx = 0;
      interval = setInterval(() => {
        idx = (idx + 1) % LOADING_CAPTIONS.length;
        setLoadingText(LOADING_CAPTIONS[idx]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "Urdu" ? "ur-PK" : "en-US";
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          grade: targetGrade,
          language,
          history: messages.slice(-6).map((m) => ({ role: m.role, text: m.text })) // Send limited context
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          parsed: parseScientificResponse(data.text)
        };
        setMessages((prev) => [...prev, assistantMsg]);
        onXpGain(15); // Ask AI custom questions triggers XP gains!
      } else {
        throw new Error(data.error || "Failed to contact science database.");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: "### 1. Short Answer\nOh no! A cosmic interference blocked our server signals!\n\n### 2. Easy Explanation\nSometimes, heavy solar flares or server downtime disconnects our connection. Please check that you are online or try re-submitting your question in a moment.\n\n### 5. Key Points\n* Ensure internet connection is solid.\n* Re-submit your science prompt.\n* Explore virtual experiments while connection recovers!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        parsed: parseScientificResponse("### 1. Short Answer\nOh no! A cosmic interference blocked our server signals!\n\n### 2. Easy Explanation\nSometimes, heavy solar flares or server downtime disconnects our connection. Please check that you are online or try re-submitting your question in a moment.\n\n### 5. Key Points\n* Ensure internet connection is solid.\n* Re-submit your science prompt.\n* Explore virtual experiments while connection recovers!")
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizAnswer = (msgId: string, option: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId || !m.parsed?.quiz) return m;
        
        const isCorrect = m.parsed.quiz.answer === option;
        if (isCorrect && m.parsed.quiz.userAnswer === undefined) {
          onXpGain(25); // Score XP on answering AI mini-quiz!
        }

        return {
          ...m,
          parsed: {
            ...m.parsed,
            quiz: {
              ...m.parsed.quiz,
              userAnswer: option,
              isCorrect: isCorrect
            }
          }
        };
      })
    );
  };

  return (
    <div className="flex flex-col h-[78vh] bento-card overflow-hidden relative bg-white">
      {/* 1. Controller Bar */}
      <div className="bg-slate-50/50 border-b border-slate-100 px-6 py-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Science AI Tutor</h2>
            <p className="text-[10.5px] text-slate-400 font-semibold tracking-wide uppercase">Powered by Gemini 3.5 Flash</p>
          </div>
        </div>

        {/* Level & Language controller options */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Grade selection */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-100 p-1.5 rounded-xl text-xs font-semibold text-slate-600">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden md:inline">Grade Level:</span>
            <select
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value as any)}
              className="bg-transparent focus:outline-none cursor-pointer font-bold text-slate-800"
            >
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
            </select>
          </div>

          {/* Language selector */}
          <button
            onClick={() => setLanguage(language === "English" ? "Urdu" : "English")}
            className="flex items-center gap-1.5 bg-white border border-slate-100 p-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer active:scale-95"
          >
            <Languages className="w-3.5 h-3.5 text-blue-500" />
            <span>{language}</span>
          </button>
        </div>
      </div>

      {/* 2. Messages Board */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
            >
              {/* Sender & Timestamp */}
              <span className="text-[10px] text-slate-400 font-semibold px-1">
                {isUser ? "You" : "Science Explorer AI"} • {msg.timestamp}
              </span>

              {/* Chat Bubble Container */}
              <div
                className={`max-w-[90%] md:max-w-[75%] rounded-2xl p-4 md:p-5 shadow-xs leading-relaxed text-sm ${
                  isUser
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none space-y-4"
                }`}
              >
                {isUser ? (
                  <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  /* Assistant Structured Cards */
                  <div className="space-y-4">
                    {/* Audio read aloud icon */}
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2.5">
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> AI Response Card
                      </span>
                      <button
                        onClick={() => speakText(msg.parsed?.shortAnswer || msg.text)}
                        className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Section 1: Short Answer Spot */}
                    {msg.parsed?.shortAnswer && (
                      <div className="bg-blue-50/60 p-4.5 rounded-xl border-l-4 border-blue-500">
                        <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">Direct Answer</span>
                        <p className="font-extrabold text-slate-800 text-xs md:text-sm">
                          {msg.parsed.shortAnswer}
                        </p>
                      </div>
                    )}

                    {/* Section 2: Easy Explanation */}
                    {msg.parsed?.explanation && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Explain It Simpler</span>
                        <p className="text-xs md:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed font-sans">
                          {msg.parsed.explanation}
                        </p>
                      </div>
                    )}

                    {/* Section 3: Real Life Analogy */}
                    {msg.parsed?.example && (
                      <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/60 space-y-1.5">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Real-World Analogy 🌍</span>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          {msg.parsed.example}
                        </p>
                      </div>
                    )}

                    {/* Section 4: Fun Fact Banner */}
                    {msg.parsed?.funFact && (
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
                        <Lightbulb className="w-5 h-5 text-amber-500 fill-current mt-0.5 shrink-0" />
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Amazing Science Fact!</span>
                          <p className="text-xs text-slate-600 font-sans leading-relaxed">
                            {msg.parsed.funFact}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Section 5: Key Takeaways */}
                    {msg.parsed?.keyPoints && msg.parsed.keyPoints.length > 0 && (
                      <div className="space-y-2 pt-1 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Points to Memorize</span>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {msg.parsed.keyPoints.map((pt, i) => (
                            <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 text-xs text-slate-600 flex gap-2 font-medium">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Section 6: Interactive Mini-Quiz */}
                    {msg.parsed?.quiz && msg.parsed.quiz.question && (
                      <div className="bg-slate-50 border border-slate-150/80 p-4.5 rounded-xl space-y-3">
                        <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200/50">
                          <HelpCircle className="w-4.5 h-4.5 text-blue-600" />
                          <span className="text-xs font-bold text-slate-800">Practice Quiz challenge</span>
                        </div>
                        <p className="text-xs font-extrabold text-slate-700 leading-relaxed">
                          {msg.parsed.quiz.question}
                        </p>
                        
                        {/* Quiz Options */}
                        <div className="flex flex-col gap-2">
                          {msg.parsed.quiz.options.map((opt, oIdx) => {
                            const optionLetter = String.fromCharCode(65 + oIdx);
                            const isUserSelected = msg.parsed?.quiz?.userAnswer === optionLetter;
                            const isCorrectAnswer = msg.parsed?.quiz?.answer === optionLetter;
                            
                            let optStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100/50";
                            if (msg.parsed?.quiz?.userAnswer) {
                              if (isCorrectAnswer) {
                                optStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                              } else if (isUserSelected) {
                                optStyle = "bg-red-50 border-red-400 text-red-950";
                              } else {
                                optStyle = "bg-white border-slate-200 text-slate-400 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={msg.parsed?.quiz?.userAnswer !== undefined}
                                onClick={() => handleQuizAnswer(msg.id, optionLetter)}
                                className={`text-left p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                              >
                                <span>{optionLetter}) {opt}</span>
                                {msg.parsed?.quiz?.userAnswer && isCorrectAnswer && (
                                  <Check className="w-4 h-4 text-emerald-600" />
                                )}
                                {msg.parsed?.quiz?.userAnswer && isUserSelected && !isCorrectAnswer && (
                                  <X className="w-4 h-4 text-red-600" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* feedback message */}
                        {msg.parsed.quiz.userAnswer && (
                          <div className={`p-3 rounded-lg text-[11px] leading-relaxed ${
                            msg.parsed.quiz.isCorrect 
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                              : "bg-red-50 text-red-800 border border-red-100"
                          }`}>
                            <p className="font-bold">
                              {msg.parsed.quiz.isCorrect ? "🎉 Bravo! Excellent work! (+25 XP claimed)" : "❌ Close, but not quite correct! Try reading the easy explanation above."}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Section 7: Related Search Tags */}
                    {msg.parsed?.relatedTopics && msg.parsed.relatedTopics.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-50">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Explore related queries</span>
                        <div className="flex flex-wrap gap-2">
                          {msg.parsed.relatedTopics.map((tag, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSendMessage(`Tell me about ${tag}`)}
                              className="bg-blue-50/50 hover:bg-blue-100/50 text-blue-700 text-[10.5px] font-bold px-3 py-1.5 rounded-full border border-blue-100/50 transition-all hover:scale-102 cursor-pointer"
                            >
                              🔍 {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* LOADING BOX */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold px-1">AI Science Explorer</span>
            <div className="bg-white border border-slate-100 p-5 rounded-2xl rounded-tl-none max-w-[65%] shadow-sm flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-700 animate-pulse">{loadingText}</span>
                <p className="text-[10px] text-slate-400 leading-tight">Gemini is writing simple explanations...</p>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* 3. Predefined Suggested Questions Teaser */}
      {messages.length < 3 && !isLoading && (
        <div className="px-6 py-2.5 bg-slate-50/80 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          <span className="text-xs font-bold text-slate-500 self-center">Try asking:</span>
          {SAMPLE_QUESTIONS.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(sq)}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 transition-all cursor-pointer"
            >
              🚀 {sq}
            </button>
          ))}
        </div>
      )}

      {/* 4. Chat Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMessage);
        }}
        className="bg-white border-t border-slate-100 p-4 flex gap-2 z-10"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating response..." : "Ask your science question: 'Why does ice float?', 'What is carbon dioxide?'"}
          value={inputMessage}
          disabled={isLoading}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-3.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 focus:border-blue-500 rounded-xl focus:outline-none text-xs sm:text-sm font-medium transition-all"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="px-5 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:hover:bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <span>Ask</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
