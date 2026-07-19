import React, { useState } from "react";
import { Sparkles, Flame, Compass, BookOpen, Award, Search, ArrowRight, BookMarked, Brain, Heart, Lightbulb } from "lucide-react";
import { UserProfile, ScienceFact, Lesson } from "../types";
import { DAILY_FACTS, LESSONS } from "../data";

interface HomeViewProps {
  user: UserProfile;
  onNavigate: (view: string, targetId?: string) => void;
  onSearch: (query: string) => void;
}

export default function HomeView({ user, onNavigate, onSearch }: HomeViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % DAILY_FACTS.length);
  };

  const currentFact: ScienceFact = DAILY_FACTS[factIndex];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Find featured lessons based on user's selected grade
  const featuredLessons = LESSONS.filter((l) => l.grade === user.grade);

  const getLevelTitle = (level: number) => {
    if (level < 2) return "Novice Observer 🔎";
    if (level < 4) return "Junior Biochemist 🧪";
    if (level < 6) return "Space Cadet 🚀";
    return "Quantum Explorer 🌌";
  };

  const xpProgress = (user.xp % 100); // 100 XP per level

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Header Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bento-header-gradient rounded-[2rem] p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl -mb-8" />
        
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            Grade {user.grade} Explorer Portal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight leading-tight">
            Hello, Future Scientist {user.name}! 👋
          </h1>
          <p className="text-blue-100 max-w-lg text-sm md:text-base">
            Ready to explore the wonders of the cosmos today? Ask the tutor anything, conduct digital lab experiments, or score XP on quizzes!
          </p>
        </div>

        {/* Level & Streak Stats */}
        <div className="flex gap-4 mt-6 md:mt-0 z-10">
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/10 min-w-[110px]">
            <div className="p-2.5 bg-amber-500 rounded-xl text-white">
              <Flame className="w-6 h-6 fill-current animate-bounce" />
            </div>
            <div>
              <div className="text-xs text-blue-100 font-medium">Streak</div>
              <div className="text-xl font-bold leading-tight">{user.dailyStreak} Days</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/10 min-w-[110px]">
            <div className="p-2.5 bg-emerald-500 rounded-xl text-white">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-blue-100 font-medium">Level {user.level}</div>
              <div className="text-xs font-semibold text-emerald-300 truncate w-24 leading-tight">
                {getLevelTitle(user.level)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search Area */}
      <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto -mt-14 px-4 z-20">
        <div className="relative flex items-center bg-white rounded-2xl shadow-xl border border-slate-150 p-1">
          <Search className="w-5.5 h-5.5 text-slate-400 absolute left-4.5" />
          <input
            type="text"
            placeholder="Search science: 'photosynthesis', 'electricity', 'volcano'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-28 py-3.5 bg-transparent rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none font-sans text-sm md:text-base"
          />
          <button
            type="submit"
            className="absolute right-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs md:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Explore
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Left Section: Continue Path & Fact of the Day (8 columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Continue Learning */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Your Recommended Path
              </h2>
              <button 
                onClick={() => onNavigate("explore")} 
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                All Topics <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredLessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  onClick={() => onNavigate("explore", lesson.id)}
                  className="group bento-card p-6 cursor-pointer flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                  <div className="space-y-3">
                    <span className="inline-block bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {lesson.subject}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {lesson.definition}
                    </p>
                    <div className="flex items-center text-xs text-blue-600 font-semibold pt-1 group-hover:translate-x-1 transition-transform">
                      Start Lesson <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Science Fact Card */}
          <div className="bento-card bento-grad-amber p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 -mr-6 -mt-6">
              <Lightbulb className="w-40 h-40 text-amber-500" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold tracking-wide shadow-sm">
                  <Lightbulb className="w-3.5 h-3.5 fill-current" />
                  Fact of the Day
                </span>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                  Category: {currentFact.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 font-display">
                  "{currentFact.fact}"
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentFact.details}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-amber-600 font-medium">Source: AI Science Research</span>
                <button
                  type="button"
                  onClick={nextFact}
                  className="px-4 py-1.5 bg-white hover:bg-amber-100/50 text-amber-700 font-bold text-xs rounded-lg transition-colors border border-amber-200 shadow-xs active:scale-95 cursor-pointer"
                >
                  Next Fact 🎉
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4. Right Section: Daily Challenge, Achievements (4 columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* XP Progress Bar */}
          <div className="bento-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-700">XP Progress</h3>
                <span className="text-xs text-slate-400 font-medium">{user.xp} Total XP</span>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Level {user.level}
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                <span>0 XP</span>
                <span>{100 - xpProgress} XP to Level {user.level + 1}</span>
                <span>100 XP</span>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bento-card bento-grad-indigo p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Today's Mini Quest</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete any virtual lab experiment today to unlock the **Lab Assistant** badge and earn <span className="font-bold text-indigo-700">+150 XP</span>!
            </p>
            <button
              onClick={() => onNavigate("experiments")}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md tracking-wider transition-colors active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              Enter Lab 🧪 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Stats Summary */}
          <div className="bento-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <BookMarked className="w-4.5 h-4.5 text-blue-600" />
              Your Progress
            </h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-lg font-bold text-slate-800">{user.completedLessons.length}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lessons Read</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="text-lg font-bold text-slate-800">{user.completedExperiments.length}</div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Labs Done</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
