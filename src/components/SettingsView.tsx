import React from "react";
import { Settings, Shield, Lock, Bell, Book, Info, Check, Languages, Type } from "lucide-react";
import { UserProfile } from "../types";

interface SettingsViewProps {
  user: UserProfile;
  language: string;
  setLanguage: (lang: string) => void;
  fontSize: "sm" | "md" | "lg";
  setFontSize: (size: "sm" | "md" | "lg") => void;
}

export default function SettingsView({ user, language, setLanguage, fontSize, setFontSize }: SettingsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      {/* Header */}
      <div className="bento-card bg-slate-50 p-6 flex items-center gap-3">
        <div className="p-2.5 bg-slate-800 text-white rounded-xl">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-slate-800">Application Settings</h1>
          <p className="text-slate-500 text-xs">Configure preferences, language, font adjustments, and read safety rules.</p>
        </div>
      </div>

      <div className="bento-card divide-y divide-slate-100">
        
        {/* Language selector */}
        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3 items-start">
            <Languages className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800">Language translation preference</h4>
              <p className="text-[11px] text-slate-400">Hardcodes translation support. Useful for bilingual households.</p>
            </div>
          </div>

          <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100 w-full sm:w-auto">
            {["English", "Urdu"].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 sm:flex-none px-4 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                  language === lang
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Font size controller */}
        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-3 items-start">
            <Type className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800">Adjust content size</h4>
              <p className="text-[11px] text-slate-400">Make textbook lessons and AI answers easier to read.</p>
            </div>
          </div>

          <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100 w-full sm:w-auto">
            {(["sm", "md", "lg"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 sm:flex-none px-4 py-2 font-bold text-xs rounded-lg uppercase transition-all cursor-pointer ${
                  fontSize === size
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                {size === "sm" ? "Small" : size === "md" ? "Medium" : "Large"}
              </button>
            ))}
          </div>
        </div>

        {/* Safe AI Policy rules */}
        <div className="p-5 space-y-4">
          <div className="flex gap-3 items-start">
            <Shield className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800">Safe AI School Policies</h4>
              <p className="text-[11px] text-slate-400">AI Science Explorer values educational integrity and digital safety.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-2.5">
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="leading-relaxed">**Academic Honesty Mandates**: AI Science Explorer never provides complete homework code or writes cheating files; explanations focus entirely on foundational concepts to spark critical thinking.</p>
            </div>
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="leading-relaxed">**Lab Safety Protocols**: Experiments must be performed under direct parent or supervisor guidance; no toxic or hazardous chemicals are recommended.</p>
            </div>
            <div className="flex gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="leading-relaxed">**Child-Friendly Safeguards**: Inappropriate queries are automatically filtered out, ensuring response streams contain strictly age-appropriate materials.</p>
            </div>
          </div>
        </div>

        {/* Legal documents terms & privacy */}
        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5 font-bold">
            <Lock className="w-4 h-4 text-indigo-500" /> Privacy & Terms Policy
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About App</a>
          </div>
        </div>

      </div>
    </div>
  );
}
