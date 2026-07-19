import React, { useState } from "react";
import { FlaskConical, Play, Check, ChevronRight, RefreshCw, AlertTriangle, HelpCircle, Star, ArrowLeft, Lightbulb } from "lucide-react";
import { Experiment, UserProfile } from "../types";
import { VIRTUAL_EXPERIMENTS } from "../data";

interface ExperimentsViewProps {
  user: UserProfile;
  onExperimentComplete: (expId: string, xpGained: number) => void;
}

export default function ExperimentsView({ user, onExperimentComplete }: ExperimentsViewProps) {
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [simulationState, setSimulationState] = useState("start"); // tracks progress of animation
  const [checkedMaterials, setCheckedMaterials] = useState<{ [mat: string]: boolean }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectExperiment = (exp: Experiment) => {
    setSelectedExp(exp);
    setCurrentStepIndex(0);
    setSimulationState("start");
    setCheckedMaterials({});
    setIsCompleted(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSimulationState("start");
    setIsCompleted(false);
  };

  const handleStepAction = () => {
    if (!selectedExp) return;
    
    const currentStep = selectedExp.steps[currentStepIndex];
    setSimulationState(currentStep.animationState);

    if (currentStepIndex < selectedExp.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      // Award XP
      const alreadyDone = user.completedExperiments.includes(selectedExp.id);
      onExperimentComplete(selectedExp.id, alreadyDone ? 15 : 150);
    }
  };

  const toggleMaterial = (mat: string) => {
    setCheckedMaterials(prev => ({ ...prev, [mat]: !prev[mat] }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!selectedExp ? (
        /* Catalog list */
        <div className="space-y-6">
          <div className="bento-card bento-grad-indigo p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-8 h-8 text-indigo-600" />
                AI Virtual Experiment Lab
              </h1>
              <p className="text-slate-600 text-sm max-w-xl">
                Who says you need a chemical laboratory to do experiments? Complete virtual experiments, follow steps, and learn the science behind the reactions safely!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIRTUAL_EXPERIMENTS.map((exp) => {
              const isDone = user.completedExperiments.includes(exp.id);
              return (
                <div
                  key={exp.id}
                  onClick={() => handleSelectExperiment(exp)}
                  className="group bento-card p-6 cursor-pointer flex flex-col justify-between space-y-5"
                >
                  {isDone && (
                    <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-600 p-1.5 rounded-full border border-emerald-100 z-10">
                      <Check className="w-4 h-4" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <span className="text-2xl">
                      {exp.illustrationType === "volcano" ? "🌋" : exp.illustrationType === "circuit" ? "⚡" : "🧲"}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 font-display">{exp.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{exp.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs font-bold text-slate-500">
                    <span className="flex items-center gap-1 text-indigo-600">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      +150 XP Reward
                    </span>
                    <span className="text-indigo-600 flex items-center gap-0.5">
                      Enter Lab <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Active experiment simulator */
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => setSelectedExp(null)}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Lab Catalog
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side parameters (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Objective card */}
              <div className="bento-card p-6 space-y-2">
                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Objective</span>
                <h2 className="text-xl font-bold text-slate-800 font-display">{selectedExp.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedExp.objective}</p>
              </div>

              {/* Materials Checklist */}
              <div className="bento-card p-6 space-y-3">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Materials needed</h3>
                <div className="space-y-2">
                  {selectedExp.materials.map((mat, i) => {
                    const checked = checkedMaterials[mat] || false;
                    return (
                      <div
                        key={i}
                        onClick={() => toggleMaterial(mat)}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100/50 rounded-xl cursor-pointer transition-colors border border-slate-100"
                      >
                        <div className={`w-4 h-4 border rounded-md flex items-center justify-center transition-all ${
                          checked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300"
                        }`}>
                          {checked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-xs font-semibold ${checked ? "text-slate-400 line-through" : "text-slate-700"}`}>
                          {mat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety tips */}
              <div className="bento-card bento-grad-rose p-6 space-y-3">
                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" /> Lab Safety Regulations
                </h4>
                <ul className="space-y-1.5">
                  {selectedExp.safetyTips.map((tip, i) => (
                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                      <span className="text-red-500 font-bold shrink-0">•</span>
                      <p className="leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right side interactive workspace (7 columns) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-[2rem] p-6 md:p-8 text-white min-h-[480px] flex flex-col justify-between shadow-xl relative overflow-hidden border border-slate-800">
              {/* grid background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Simulation Header */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-950 px-3 py-1.5 rounded-full border border-indigo-900/60 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" /> Simulation Stage
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Step {currentStepIndex + 1} of {selectedExp.steps.length}
                </span>
              </div>

              {/* SIMULATION VISUAL STAGE */}
              <div className="flex-1 flex items-center justify-center p-6 min-h-[250px] z-10">
                {/* 1. Volcano Simulation */}
                {selectedExp.illustrationType === "volcano" && (
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Sky/Atmosphere */}
                      <rect x="0" y="0" width="200" height="200" fill="transparent" />
                      
                      {/* Lava eruptions */}
                      {simulationState === "erupting" && (
                        <>
                          {/* Giant bubbling foam bursts */}
                          <circle cx="100" cy="50" r="24" fill="#ef4444" className="animate-pulse" />
                          <circle cx="85" cy="55" r="18" fill="#f97316" className="animate-bounce" />
                          <circle cx="115" cy="55" r="18" fill="#f97316" className="animate-bounce" style={{ animationDelay: "200ms" }} />
                          <circle cx="92" cy="40" r="14" fill="#fcd34d" />
                          <circle cx="108" cy="40" r="14" fill="#fcd34d" style={{ animationDelay: "400ms" }} />
                          
                          {/* Overflow lava trails rolling down sides */}
                          <path d="M 90,70 L 60,160 L 70,160 L 92,75 Z" fill="#ef4444" className="animate-pulse" />
                          <path d="M 110,70 L 140,160 L 130,160 L 108,75 Z" fill="#ef4444" className="animate-pulse" />
                        </>
                      )}

                      {/* Volcano Body mountain */}
                      <polygon points="100,60 40,160 160,160" fill="#3f3f46" stroke="#27272a" strokeWidth="2" />
                      <polygon points="100,60 80,100 120,100" fill="#27272a" />
                      
                      {/* Inner bottle insert */}
                      <rect x="90" y="75" width="20" height="85" rx="2" fill="#a1a1aa" opacity="0.4" stroke="#d4d4d8" strokeWidth="1" />
                      
                      {/* Baking soda powder */}
                      {(simulationState === "baking_soda_added" || simulationState === "soap_colored" || simulationState === "erupting") && (
                        <ellipse cx="100" cy="155" rx="8" ry="4" fill="#ffffff" />
                      )}

                      {/* Red soapy dye color mix */}
                      {(simulationState === "soap_colored" || simulationState === "erupting") && (
                        <rect x="91" y="130" width="18" height="25" fill="#f43f5e" opacity="0.8" />
                      )}

                      {/* Volcano crater top */}
                      <ellipse cx="100" cy="65" rx="14" ry="5" fill="#18181b" />
                    </svg>
                  </div>
                )}

                {/* 2. Electric Circuit Simulation */}
                {selectedExp.illustrationType === "circuit" && (
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Battery container (Bottom) */}
                      <rect x="50" y="150" width="70" height="25" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                      <rect x="120" y="156" width="6" height="12" rx="1" fill="#f59e0b" /> {/* positive terminal */}
                      <text x="60" y="167" fill="#ffffff" fontSize="10" fontWeight="bold">BATTERY</text>
                      <text x="110" y="167" fill="#22c55e" fontSize="12" fontWeight="bold">+</text>
                      <text x="54" y="167" fill="#ef4444" fontSize="12" fontWeight="bold">-</text>

                      {/* Bulb (Top) */}
                      {/* Glowing radial circles */}
                      {simulationState === "circuit_closed" && (
                        <>
                          <circle cx="100" cy="50" r="30" fill="#fef08a" opacity="0.15" className="animate-pulse" />
                          <circle cx="100" cy="50" r="20" fill="#fef08a" opacity="0.3" />
                          {/* Radial shining flares */}
                          <line x1="100" y1="15" x2="100" y2="25" stroke="#facc15" strokeWidth="2.5" />
                          <line x1="100" y1="75" x2="100" y2="85" stroke="#facc15" strokeWidth="2.5" />
                          <line x1="65" y1="50" x2="75" y2="50" stroke="#facc15" strokeWidth="2.5" />
                          <line x1="125" y1="50" x2="135" y2="50" stroke="#facc15" strokeWidth="2.5" />
                          <line x1="75" y1="25" x2="82" y2="32" stroke="#facc15" strokeWidth="2" />
                          <line x1="125" y1="25" x2="118" y2="32" stroke="#facc15" strokeWidth="2" />
                        </>
                      )}

                      {/* Bulb base */}
                      <rect x="92" y="65" width="16" height="15" fill="#64748b" />
                      <path d="M 92,65 C 92,40, 108,40, 108,65 Z" fill={simulationState === "circuit_closed" ? "#facc15" : "#334155"} stroke="#475569" strokeWidth="1.5" />
                      {/* Filament */}
                      <path d="M 96,65 L 98,52 L 102,52 L 104,65" stroke="#94a3b8" strokeWidth="1" fill="none" />

                      {/* Conductor wires (Left, negative wire) */}
                      {(simulationState === "bulb_connected" || simulationState === "switch_connected" || simulationState === "circuit_closed") && (
                        <path d="M 50,162 L 20,162 L 20,50 L 92,72" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray={simulationState === "circuit_closed" ? "4" : "0"} className={simulationState === "circuit_closed" ? "animate-pulse" : ""} />
                      )}

                      {/* Conductor wires (Right side wire) */}
                      {(simulationState === "switch_connected" || simulationState === "circuit_closed") && (
                        <path d="M 123,162 L 170,162 L 170,95" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray={simulationState === "circuit_closed" ? "4" : "0"} />
                      )}

                      {/* Switch Paperclip */}
                      {simulationState === "switch_connected" && (
                        /* Open Paperclip */
                        <line x1="170" y1="95" x2="140" y2="65" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                      )}
                      
                      {simulationState === "circuit_closed" && (
                        /* Closed Paperclip bridging to wire top */
                        <>
                          <line x1="170" y1="95" x2="108" y2="72" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                          <path d="M 108,72 L 170,95" fill="none" stroke="#22c55e" strokeWidth="2" />
                        </>
                      )}

                      {/* Connection dots */}
                      <circle cx="108" cy="72" r="3.5" fill="#f59e0b" />
                    </svg>
                  </div>
                )}

                {/* 3. Magnetism Simulation */}
                {selectedExp.illustrationType === "magnet" && (
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Ground glass sheet overlay */}
                      {(simulationState === "paper_overlaid" || simulationState === "filings_pattern") && (
                        <rect x="15" y="15" width="170" height="170" rx="6" fill="#ffffff" fillOpacity="0.1" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1" />
                      )}

                      {/* Curved Magnetic flux lines */}
                      {simulationState === "filings_pattern" && (
                        <g stroke="#94a3b8" strokeWidth="1.5" fill="none" strokeDasharray="2 3" opacity="0.6">
                          {/* Inner loops */}
                          <path d="M 60,100 C 60,60, 140,60, 140,100" />
                          <path d="M 60,100 C 60,140, 140,140, 140,100" />
                          {/* Outer loops */}
                          <path d="M 60,100 C 40,40, 160,40, 140,100" />
                          <path d="M 60,100 C 40,160, 160,160, 140,100" />
                          {/* Distant lines */}
                          <path d="M 60,100 C 20,20, 180,20, 140,100" />
                          <path d="M 60,100 C 20,180, 180,180, 140,100" />

                          {/* Tiny filings dots concentrated around poles */}
                          <circle cx="60" cy="100" r="1.5" fill="#334155" />
                          <circle cx="140" cy="100" r="1.5" fill="#334155" />
                          <circle cx="58" cy="95" r="1" fill="#334155" />
                          <circle cx="62" cy="105" r="1" fill="#334155" />
                          <circle cx="138" cy="95" r="1" fill="#334155" />
                          <circle cx="142" cy="105" r="1" fill="#334155" />
                        </g>
                      )}

                      {/* Bar Magnet (N on Left, S on Right) */}
                      <g transform="translate(0, 0)">
                        {/* North pole (Red) */}
                        <rect x="60" y="85" width="40" height="30" rx="2" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
                        <text x="75" y="104" fill="#ffffff" fontSize="13" fontWeight="extrabold">N</text>
                        
                        {/* South pole (Blue) */}
                        <rect x="100" y="85" width="40" height="30" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
                        <text x="115" y="104" fill="#ffffff" fontSize="13" fontWeight="extrabold">S</text>
                      </g>
                    </svg>
                  </div>
                )}
              </div>

              {/* Simulation Footer Control Panel */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 z-10 space-y-3.5">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Instructions</span>
                  <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
                    {selectedExp.steps[currentStepIndex]?.text}
                  </p>
                </div>

                <div className="flex gap-3 justify-between items-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all border border-slate-600"
                    title="Restart Simulation"
                  >
                    <RefreshCw className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleStepAction}
                    className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    {isCompleted ? (
                      <>
                        <Check className="w-4.5 h-4.5 text-emerald-300" /> Experiment Completed!
                      </>
                    ) : (
                      <>
                        <Play className="w-4.5 h-4.5 text-indigo-200 fill-current" />
                        {selectedExp.steps[currentStepIndex]?.actionLabel}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Success celebration backdrop overlay */}
              {isCompleted && (
                <div className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md z-20 p-8 flex flex-col justify-center items-center text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-3xl shadow-lg border border-indigo-500">
                    🔬
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-display">Experiment Successful!</h3>
                    <p className="text-xs text-indigo-200 max-w-sm">
                      Congratulations on completing the **{selectedExp.title}** simulation!
                    </p>
                  </div>
                  
                  {/* Scientific Explanation Reveal */}
                  <div className="bg-slate-900/80 p-4.5 rounded-xl text-left border border-indigo-500/30 max-h-48 overflow-y-auto w-full text-xs space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Scientific Explanation</span>
                    <p className="text-slate-200 leading-relaxed font-sans">{selectedExp.explanation}</p>
                  </div>

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-lg border border-slate-700 transition-colors"
                    >
                      Repeat Lab
                    </button>
                    <button
                      onClick={() => setSelectedExp(null)}
                      className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-xs rounded-lg shadow-md shadow-indigo-500/25 transition-all flex items-center justify-center gap-1.5"
                    >
                      Claim Rank XP (+150 XP) 🚀
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
