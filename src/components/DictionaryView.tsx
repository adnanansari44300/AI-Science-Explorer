import React, { useState } from "react";
import { BookMarked, Search, Volume2, ArrowRight, Lightbulb, Compass, HelpCircle } from "lucide-react";
import { DictionaryTerm } from "../types";
import { DICTIONARY } from "../data";

interface DictionaryViewProps {
  language: string;
}

export default function DictionaryView({ language }: DictionaryViewProps) {
  const [query, setQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(DICTIONARY[0]);

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "Urdu" ? "ur-PK" : "en-US";
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredTerms = DICTIONARY.filter(t =>
    t.term.toLowerCase().includes(query.toLowerCase())
  );

  const selectTerm = (term: DictionaryTerm) => {
    setSelectedTerm(term);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Header and Search */}
      <div className="bento-card bento-grad-amber p-6 md:p-8 space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 flex items-center gap-2">
            <BookMarked className="w-8 h-8 text-amber-600" />
            Science Dictionary
          </h1>
          <p className="text-slate-600 text-sm max-w-xl">
            Quickly search and lookup meanings, pronunciations, examples, and related topics for vital scientific terms.
          </p>
        </div>

        {/* Dictionary Search Box */}
        <div className="relative bg-white rounded-2xl shadow-xs border border-slate-150 max-w-md">
          <Search className="w-5 h-5 text-slate-400 absolute left-4.5 top-3.5" />
          <input
            type="text"
            placeholder="Search scientific terms: 'photosynthesis'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-transparent focus:outline-none text-xs sm:text-sm font-sans text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left side list (5 columns) */}
        <div className="md:col-span-5 bento-card h-[420px] flex flex-col overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center text-xs font-bold text-slate-400">
            <span>TERMS IN DICTIONARY</span>
            <span>{filteredTerms.length} found</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-thin">
            {filteredTerms.map((t, idx) => (
              <div
                key={idx}
                onClick={() => selectTerm(t)}
                className={`px-5 py-4 cursor-pointer transition-all flex justify-between items-center ${
                  selectedTerm?.term === t.term
                    ? "bg-amber-50/50 border-l-4 border-amber-500"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-slate-800 font-display">{t.term}</h4>
                  <span className="text-[10px] text-slate-400 font-medium font-sans">[{t.pronunciation}]</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
            {filteredTerms.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400">
                No matching terms found. Try searching something else!
              </div>
            )}
          </div>
        </div>

        {/* Right side detailed look (7 columns) */}
        <div className="md:col-span-7 space-y-6">
          {selectedTerm ? (
            <div className="bento-card p-6 md:p-8 space-y-6 animate-slide-up">
              
              {/* Term Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4.5">
                <div className="space-y-1">
                  <h2 className="text-3xl font-black font-display text-slate-800 leading-none">
                    {selectedTerm.term}
                  </h2>
                  <span className="text-xs text-amber-600 font-bold font-mono tracking-wide">
                    Pronounced: /{selectedTerm.pronunciation}/
                  </span>
                </div>
                <button
                  onClick={() => handleSpeak(selectedTerm.term)}
                  className="p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-colors border border-amber-100/50 shadow-xs active:scale-95 flex items-center gap-1 font-bold text-xs cursor-pointer"
                  title="Listen Pronunciation"
                >
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              </div>

              {/* Meaning block */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meaning</span>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-sans">
                  {selectedTerm.meaning}
                </p>
              </div>

              {/* Real World Example */}
              <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100/60 space-y-1.5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4.5 h-4.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Contextual Example</span>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed italic">
                    "{selectedTerm.example}"
                  </p>
                </div>
              </div>

              {/* Related Concepts */}
              <div className="space-y-2 pt-2 border-t border-slate-150">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Related Scientific Concepts</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedConcepts.map((concept, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const found = DICTIONARY.find(d => d.term.toLowerCase() === concept.toLowerCase());
                        if (found) {
                          setSelectedTerm(found);
                        } else {
                          setQuery(concept);
                        }
                      }}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100/50 text-amber-800 text-[10.5px] font-bold rounded-full border border-amber-100/50 transition-colors cursor-pointer"
                    >
                      💡 {concept}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bento-card bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-12 text-center text-xs text-slate-400 h-full flex flex-col justify-center items-center">
              Select a scientific term from the catalog list on the left to explore its detailed dictionary file.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
