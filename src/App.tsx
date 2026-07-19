import React, { useState, useEffect } from "react";
import { 
  Home, Compass, FlaskConical, Award, User, BookMarked, Camera, Settings, 
  Sparkles, Flame, Crown, BookOpen, Volume2, Globe, Heart, Star 
} from "lucide-react";

import { UserProfile } from "./types";
import HomeView from "./components/HomeView";
import ExploreView from "./components/ExploreView";
import ChatView from "./components/ChatView";
import ExperimentsView from "./components/ExperimentsView";
import QuizView from "./components/QuizView";
import DictionaryView from "./components/DictionaryView";
import VisionView from "./components/VisionView";
import SettingsView from "./components/SettingsView";

const LOCAL_STORAGE_KEY = "ai_science_explorer_profile_v1";

const DEFAULT_PROFILE: UserProfile = {
  name: "Alex",
  grade: "6",
  xp: 50,
  level: 1,
  dailyStreak: 3,
  lastActive: new Date().toISOString().split('T')[0],
  badges: ["ach-welcome"],
  completedLessons: [],
  completedExperiments: [],
  quizHighScores: {},
  isPremium: false
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<string>("home");
  const [targetId, setTargetId] = useState<string | null>(null); // used to pass lesson id to explore
  
  // App-level customization variables
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [xpPopup, setXpPopup] = useState<number | null>(null);

  // Load profile on start
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse local profile, using default.", e);
      }
    }
  }, []);

  // Save profile helper
  const saveProfile = (newProfile: UserProfile) => {
    setUser(newProfile);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProfile));
  };

  // Helper to flash an XP point reward bubble
  const triggerXpAward = (amount: number) => {
    setXpPopup(amount);
    setTimeout(() => {
      setXpPopup(null);
    }, 2500);
  };

  const handleGainXp = (amount: number) => {
    const newXp = user.xp + amount;
    const newLevel = Math.floor(newXp / 100) + 1; // 100 XP per level
    
    const updated = {
      ...user,
      xp: newXp,
      level: newLevel > user.level ? newLevel : user.level
    };

    saveProfile(updated);
    triggerXpAward(amount);
  };

  const handleLessonComplete = (lessonId: string, xpReward: number) => {
    const updatedCompleted = [...user.completedLessons];
    if (!updatedCompleted.includes(lessonId)) {
      updatedCompleted.push(lessonId);
    }

    const newXp = user.xp + xpReward;
    const newLevel = Math.floor(newXp / 100) + 1;

    const updated: UserProfile = {
      ...user,
      completedLessons: updatedCompleted,
      xp: newXp,
      level: newLevel > user.level ? newLevel : user.level
    };

    saveProfile(updated);
    triggerXpAward(xpReward);
  };

  const handleExperimentComplete = (expId: string, xpReward: number) => {
    const updatedCompleted = [...user.completedExperiments];
    if (!updatedCompleted.includes(expId)) {
      updatedCompleted.push(expId);
    }

    const newXp = user.xp + xpReward;
    const newLevel = Math.floor(newXp / 100) + 1;

    const updated: UserProfile = {
      ...user,
      completedExperiments: updatedCompleted,
      xp: newXp,
      level: newLevel > user.level ? newLevel : user.level
    };

    saveProfile(updated);
    triggerXpAward(xpReward);
  };

  const handleQuizComplete = (score: number, total: number, xpReward: number) => {
    handleGainXp(xpReward);
  };

  const handlePremiumUnlock = () => {
    saveProfile({
      ...user,
      isPremium: true
    });
    triggerXpAward(200); // Premium gets visual XP reward!
  };

  // Navigation router
  const handleNavigate = (tab: string, arg?: string) => {
    setActiveTab(tab);
    if (tab === "explore" && arg) {
      setTargetId(arg);
    } else {
      setTargetId(null);
    }
  };

  const handleSearchTrigger = (query: string) => {
    // Navigate to Chat tab and pass search prompt
    setActiveTab("chat");
    // Directly inject question into chat state or perform prompt
  };

  const getFontSizeClass = () => {
    if (fontSize === "sm") return "text-xs";
    if (fontSize === "lg") return "text-lg";
    return "text-sm";
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans select-none pb-24 md:pb-6 ${getFontSizeClass()}`}>
      
      {/* 1. Header Board */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand */}
          <div 
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 cursor-pointer group active:scale-98"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-500/10 group-hover:rotate-12 transition-all">
              🔬
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-800 font-display flex items-center gap-1">
                AI Science Explorer 
                <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block">Beta</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">Discover • Learn • Explore</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-4.5">
            {/* XP progress bar */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Rank Progress:</span>
              <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${user.xp % 100}%` }} 
                />
              </div>
              <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Level {user.level}</span>
            </div>

            {/* Streak flame */}
            <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100/60 px-3 py-1.5 rounded-xl text-orange-600 text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>{user.dailyStreak} Days</span>
            </div>

            {/* Premium VIP status badge */}
            {user.isPremium ? (
              <div className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm animate-pulse">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">VIP ACTIVE</span>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate("profile")}
                className="flex items-center gap-1 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:bg-indigo-100/50 transition-colors cursor-pointer active:scale-95"
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upgrade</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        
        {/* Render correct tab */}
        {activeTab === "home" && (
          <HomeView 
            user={user} 
            onNavigate={handleNavigate} 
            onSearch={handleSearchTrigger} 
          />
        )}
        
        {activeTab === "explore" && (
          <ExploreView 
            user={user} 
            initialLessonId={targetId} 
            onLessonComplete={handleLessonComplete}
            language={language}
          />
        )}

        {activeTab === "chat" && (
          <ChatView 
            user={user} 
            language={language}
            setLanguage={setLanguage}
            onXpGain={handleGainXp}
          />
        )}

        {activeTab === "experiments" && (
          <ExperimentsView 
            user={user} 
            onExperimentComplete={handleExperimentComplete}
          />
        )}

        {activeTab === "quiz" && (
          <QuizView 
            user={user} 
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === "dictionary" && (
          <DictionaryView 
            language={language}
          />
        )}

        {activeTab === "vision" && (
          <VisionView 
            user={user} 
            onXpGain={handleGainXp}
          />
        )}

        {activeTab === "settings" && (
          <SettingsView 
            user={user} 
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        )}

      </main>

      {/* 3. persistent Bottom Mobile Navigation / Desktop Footer Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2.5 shadow-lg z-40 flex justify-around md:justify-center md:gap-10 max-w-none md:max-w-2xl md:mx-auto md:rounded-2xl md:bottom-4 md:border">
        
        <button
          onClick={() => handleNavigate("home")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "home" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Home className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>

        <button
          onClick={() => handleNavigate("explore")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "explore" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Compass className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Explore</span>
        </button>

        <button
          onClick={() => handleNavigate("chat")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "chat" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Sparkles className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Tutor AI</span>
        </button>

        <button
          onClick={() => handleNavigate("experiments")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "experiments" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <FlaskConical className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Labs</span>
        </button>

        <button
          onClick={() => handleNavigate("quiz")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "quiz" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Award className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Quiz</span>
        </button>

        {/* Dictionary */}
        <button
          onClick={() => handleNavigate("dictionary")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "dictionary" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <BookMarked className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Lexicon</span>
        </button>

        {/* Vision Upload */}
        <button
          onClick={() => handleNavigate("vision")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "vision" ? "text-blue-600 bg-blue-50/50 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Camera className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Scanner</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => handleNavigate("settings")}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === "settings" ? "text-slate-600 scale-105" : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Settings className="w-5.5 h-5.5" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Config</span>
        </button>

      </nav>

      {/* 4. Animated XP gains pop-up overlay toast */}
      {xpPopup !== null && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce border border-emerald-400">
          <Star className="w-5 h-5 text-yellow-300 fill-current animate-pulse" />
          <span>+{xpPopup} XP Claimed! Keep going!</span>
        </div>
      )}

    </div>
  );
}
