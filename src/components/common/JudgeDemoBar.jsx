import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  PlayCircle,
  Flame,
  Compass,
  Bot,
  TrendingUp
} from "lucide-react";
export const JudgeDemoBar = () => {
  const {
    role,
    loginAsLearner,
    loginAsAdmin,
    setActiveTab,
    resetToInitialDemoData,
    showToast
  } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);
  return <aside aria-label="SIH 2026 Judge & Evaluator Toolbar" className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t-2 border-amber-500 shadow-2xl text-white text-xs transition-all">
      {
    /* Mini Toggle Header */
  }
      <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> SIH 2026 Live Demo & Evaluation Quick Bar
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
            Problem ID: 26101 • MoSPI DIID
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
    onClick={resetToInitialDemoData}
    className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700 hover:border-slate-600 transition-all"
    title="Reset all competency scores and courses to baseline"
  >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>Reset Demo State</span>
          </button>
          <button
    onClick={() => setIsExpanded(!isExpanded)}
    className="text-slate-400 hover:text-white flex items-center gap-0.5 text-[11px]"
  >
            {isExpanded ? <>
                <span>Collapse</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </> : <>
                <span>Quick Tour</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>}
          </button>
        </div>
      </div>

      {
    /* Expanded Quick Action Pills */
  }
      {isExpanded && <div className="px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider mr-1">
              Test Workflow:
            </span>

            {
    /* 1. Learner Dashboard */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("dashboard");
      showToast("Jumped to Learner Dashboard (Abhinash Kumar)", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <UserCheck className="w-3 h-3 text-blue-400" />
              <span>1. Learner Dashboard</span>
            </button>

            {
    /* 2. AI Assessment */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("assessment");
      showToast("Jumped to AI Competency Assessment", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <PlayCircle className="w-3 h-3 text-emerald-400" />
              <span>2. AI Diagnostic</span>
            </button>

            {
    /* 3. Skill Gap Analysis */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("skill-gaps");
      showToast("Jumped to Automated Skill Gap Analysis", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <Flame className="w-3 h-3 text-rose-400" />
              <span>3. Skill Gaps (AI/ML Critical)</span>
            </button>

            {
    /* 4. Personalized Learning */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("learning-path");
      showToast("Jumped to Personalized Learning Roadmap", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <Compass className="w-3 h-3 text-sky-400" />
              <span>4. Learning Path (5 Steps)</span>
            </button>

            {
    /* 5. iGOT / NSSTA */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("igot-courses");
      showToast("Jumped to iGOT Karmayogi Catalog", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>5. iGOT & NSSTA Integration</span>
            </button>

            {
    /* 6. AI Quiz Generator */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("quiz-generator");
      showToast("Jumped to AI Quiz Generator with built-in Sampling material", "info");
    }}
    className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 transition-all whitespace-nowrap font-semibold"
  >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>6. AI Quiz Generator (Docx/PDF/Demo)</span>
            </button>

            {
    /* 7. AI Assistant */
  }
            <button
    onClick={() => {
      if (role !== "learner") loginAsLearner();
      setActiveTab("ai-assistant");
      showToast("Opened StatSkill AI Assistant", "info");
    }}
    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-all whitespace-nowrap"
  >
              <Bot className="w-3 h-3 text-purple-400" />
              <span>7. AI Assistant (En/Hi/Te)</span>
            </button>

            {
    /* 8. Admin Analytics */
  }
            <button
    onClick={() => {
      loginAsAdmin();
      setActiveTab("admin-dashboard");
      showToast("Switched to Administrator Workforce Intelligence", "info");
    }}
    className="px-2.5 py-1 rounded bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-200 border border-indigo-700 flex items-center gap-1 transition-all whitespace-nowrap font-bold"
  >
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              <span>8. Admin Workforce Intelligence</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-slate-400 text-[11px] whitespace-nowrap">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready for Jury Presentation</span>
          </div>
        </div>}
    </aside>;
};
