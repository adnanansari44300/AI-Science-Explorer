import React, { useState } from "react";
import { Award, Star, Flame, Clock, BookOpen, Crown, ChevronRight, CheckCircle2, TrendingUp, ShieldAlert, Sparkles } from "lucide-react";
import { UserProfile, Achievement } from "../types";
import { ACHIEVEMENTS } from "../data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface ProfileViewProps {
  user: UserProfile;
  onPremiumUnlock: () => void;
}

const PAST_WEEK_DATA = [
  { name: "Mon", XP: 50 },
  { name: "Tue", XP: 150 },
  { name: "Wed", XP: 100 },
  { name: "Thu", XP: 250 },
  { name: "Fri", XP: 120 },
  { name: "Sat", XP: 350 },
  { name: "Sun", XP: 180 }
];

export default function ProfileView({ user, onPremiumUnlock }: ProfileViewProps) {
  const [showPremiumConfetti, setShowPremiumConfetti] = useState(false);

  const getLevelTitle = (level: number) => {
    if (level < 2) return "Novice Observer 🔎";
    if (level < 4) return "Junior Biochemist 🧪";
    if (level < 6) return "Space Cadet 🚀";
    return "Quantum Explorer 🌌";
  };

  const getRankDescription = (level: number) => {
    if (level < 2) return "You are learning the basics. Keep observing!";
    if (level < 4) return "Great lab habits! Formulating scientific theories.";
    if (level < 6) return "High orbits achieved! Navigating complex mechanics.";
    return "The ultimate science state! Unlocking reality dimensions.";
  };

  const xpProgress = (user.xp % 100);

  const handlePremiumUpgrade = () => {
    setShowPremiumConfetti(true);
    onPremiumUnlock();
    setTimeout(() => {
      setShowPremiumConfetti(false);
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-6 md:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* grid element */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="flex items-center gap-4.5 z-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-md ring-4 ring-indigo-500/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black font-display tracking-tight leading-none">{user.name}</h1>
            <p className="text-indigo-300 font-bold text-xs">Level {user.level} • {getLevelTitle(user.level)}</p>
            <p className="text-slate-400 text-xs">{getRankDescription(user.level)}</p>
          </div>
        </div>

        {/* Premium Badge & Streak Summary */}
        <div className="flex gap-4 z-10 w-full md:w-auto">
          <div className="flex-1 md:flex-none flex items-center gap-3 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50">
            <Flame className="w-6 h-6 text-orange-500 fill-current animate-bounce" />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Active Streak</span>
              <span className="text-sm font-black text-slate-200">{user.dailyStreak} Days</span>
            </div>
          </div>
          <div className="flex-1 md:flex-none flex items-center gap-3 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50">
            <Crown className={`w-6 h-6 ${user.isPremium ? "text-amber-400 fill-current" : "text-slate-500"}`} />
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Membership</span>
              <span className="text-sm font-black text-slate-200">{user.isPremium ? "PREMIUM VIP" : "Free Cadet"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column (7 columns): Progress Chart & Achievements checklist */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Progress chart using Recharts */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-5 h-5 text-indigo-600" /> Learning XP Velocity
              </h3>
              <span className="text-xs text-slate-400 font-semibold uppercase">PAST 7 DAYS</span>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PAST_WEEK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "8px", color: "#fff", fontSize: "11px" }} />
                  <Area type="monotone" dataKey="XP" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorXp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements badge showcase */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-1.5">
              <Award className="w-5 h-5 text-indigo-600" /> Scientific Badges Earned
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACHIEVEMENTS.map((ach) => {
                const isUnlocked = ach.unlocked || user.completedLessons.length > 0; // fallback trigger
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-xl border flex gap-3 items-center transition-all ${
                      isUnlocked
                        ? "bg-white border-slate-100 shadow-xs"
                        : "bg-slate-50/50 border-slate-100 opacity-60"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      isUnlocked ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {ach.iconName === "Sparkles" ? "✨" : ach.iconName === "BookOpen" ? "📖" : ach.iconName === "FlaskConical" ? "🧪" : "🏆"}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-800">{ach.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed max-w-[170px] truncate">{ach.description}</p>
                      <span className={`text-[9px] font-bold block ${isUnlocked ? "text-emerald-600" : "text-slate-400"}`}>
                        {isUnlocked ? "✓ Unlocked (+100 XP)" : "Locked"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right column (5 columns): Upgrade Monetization & Stats Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Learning Stats */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Analytics</h3>
            
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-500" /> Lessons completed
                </span>
                <span className="font-extrabold text-slate-800">{user.completedLessons.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-500" /> High Score Quizzes
                </span>
                <span className="font-extrabold text-slate-800">100% Accuracy</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" /> Daily Practice Time
                </span>
                <span className="font-extrabold text-slate-800">30 min</span>
              </div>
            </div>
          </div>

          {/* Premium upgrades monetization banner */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-3xl p-6 text-white border border-indigo-700 shadow-lg relative overflow-hidden space-y-5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6" />
            
            <div className="space-y-2">
              <span className="px-3 py-1 bg-amber-400 text-slate-950 font-black rounded-full text-[9px] tracking-widest uppercase shadow-sm inline-block">
                PREMIUM ACCREDITATION
              </span>
              <h3 className="text-lg font-black font-display leading-tight">
                Unlock Unlimited Science AI Capabilities!
              </h3>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Remove banner ads and unlock unlimited custom AI scientific responses, textbook image uploads, priority model streaming, and offline downloadable packs!
              </p>
            </div>

            {/* Premium feature rows */}
            <ul className="space-y-2 text-[11px] font-semibold text-indigo-50">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-indigo-800" /> Unlimited AI Questions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-indigo-800" /> Double Rank XP Gains
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 fill-indigo-800" /> Priority 3.5 Flash response speeds
              </li>
            </ul>

            {user.isPremium ? (
              <div className="bg-white/15 p-3.5 rounded-xl text-center text-xs font-bold border border-white/10">
                ⭐ Premium Membership Active! Thank you! ⭐
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePremiumUpgrade}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-101 active:scale-98 flex items-center justify-center gap-1.5"
              >
                <Crown className="w-4 h-4 text-slate-900 fill-current" /> Upgrade for $4.99/mo
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Confetti Animation Overlay when Premium is selected */}
      {showPremiumConfetti && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-center items-center text-center p-8 space-y-4 animate-fade-in">
          <div className="w-20 h-20 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 border-amber-300 animate-bounce">
            👑
          </div>
          <h2 className="text-3xl font-black font-display text-amber-400">Welcome to Science VIP!</h2>
          <p className="text-sm text-indigo-200 max-w-sm">
            Thank you for unlocking AI Science Explorer Premium. Unlimited custom questions and textbook scans are now fully loaded!
          </p>
          <div className="flex gap-2">
            <span className="text-xs bg-amber-400 text-slate-900 px-3 py-1 rounded-full font-bold">Priority Flash Active</span>
            <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-bold">No Ads</span>
          </div>
        </div>
      )}

    </div>
  );
}
