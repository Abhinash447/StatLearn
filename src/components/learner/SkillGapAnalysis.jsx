import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  TrendingDown,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  BookOpen
} from "lucide-react";

export const SkillGapAnalysis = () => {
  const { skillGaps, user, setActiveTab, t } = useApp();
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filteredGaps = skillGaps.filter((g) => {
    if (selectedPriority === "all") return true;
    return g.priority.toLowerCase() === selectedPriority.toLowerCase();
  });

  const criticalCount = skillGaps.filter((g) => g.priority === "Critical").length;
  const highCount = skillGaps.filter((g) => g.priority === "High").length;
  const mediumCount = skillGaps.filter((g) => g.priority === "Medium").length;
  const lowCount = skillGaps.filter((g) => g.priority === "Low").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <TrendingDown className="w-7 h-7 text-rose-600" />
            {t("skillGapTitle")}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t("skillGapSubtitle")}
          </p>
        </div>

        <button
          onClick={() => setActiveTab(skillGaps.length === 0 ? "assessment" : "learning-path")}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{skillGaps.length === 0 ? (t("takeAssessmentBtn") || "Take AI Assessment") : (t("viewLearningPathBtn") || "View Targeted Roadmap")}</span>
        </button>
      </div>

      {/* If No Skill Gaps Identified (Zero / Unassessed State) */}
      {skillGaps.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-14 text-center shadow-sm space-y-6 max-w-2xl mx-auto my-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-100 shadow-sm">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900">{t("noGapsIdentified") || "No Skill Gaps Identified Yet"}</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
              {t("noGapsSubtitle") || "StatSkill AI identifies skill gaps strictly through empirical evaluation of your answers rather than arbitrary assumptions. Complete your initial 10-question AI Diagnostic Assessment to calibrate your matrix."}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab("assessment")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t("takeAssessmentBtn") || "Take AI Diagnostic Assessment (10 Questions)"}</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz-generator")}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 flex items-center gap-2 transition-all"
            >
              <span>{t("tryDemoBtn") || "Upload Document for AI Quiz"}</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Priority Badges Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              onClick={() => setSelectedPriority("critical")}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                selectedPriority === "critical"
                  ? "bg-rose-50 border-rose-400 ring-2 ring-rose-200"
                  : "bg-white border-slate-200 hover:border-rose-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 uppercase">{t("criticalGaps") || "Critical Gaps"}</span>
                <span className="text-xs text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full font-bold">41%+ Deficit</span>
              </div>
              <p className="text-2xl font-black text-rose-700 mt-1">{criticalCount}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {skillGaps.filter((g) => g.priority === "Critical").map((g) => g.name).join(", ") || "None Identified"}
              </p>
            </div>

            <div
              onClick={() => setSelectedPriority("high")}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                selectedPriority === "high"
                  ? "bg-amber-50 border-amber-400 ring-2 ring-amber-200"
                  : "bg-white border-slate-200 hover:border-amber-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase">{t("highPriority") || "High Priority"}</span>
                <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full font-bold">26–40% Deficit</span>
              </div>
              <p className="text-2xl font-black text-amber-700 mt-1">{highCount}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {skillGaps.filter((g) => g.priority === "High").map((g) => g.name).join(", ") || "None Identified"}
              </p>
            </div>

            <div
              onClick={() => setSelectedPriority("medium")}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                selectedPriority === "medium"
                  ? "bg-blue-50 border-blue-400 ring-2 ring-blue-200"
                  : "bg-white border-slate-200 hover:border-blue-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase">{t("mediumPriority") || "Medium Priority"}</span>
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full font-bold">11–25% Deficit</span>
              </div>
              <p className="text-2xl font-black text-blue-700 mt-1">{mediumCount}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {skillGaps.filter((g) => g.priority === "Medium").map((g) => g.name).join(", ") || "None Identified"}
              </p>
            </div>

            <div
              onClick={() => setSelectedPriority("low")}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                selectedPriority === "low"
                  ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 hover:border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase">{t("lowPriority") || "Low / Minor"}</span>
                <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">1–10% Deficit</span>
              </div>
              <p className="text-2xl font-black text-emerald-700 mt-1">{lowCount}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                {skillGaps.filter((g) => g.priority === "Low").map((g) => g.name).join(", ") || "None Identified"}
              </p>
            </div>
          </div>

          {/* Filter reset pill */}
          {selectedPriority !== "all" && (
            <div className="flex items-center justify-between bg-blue-50/80 px-4 py-2 rounded-xl text-xs border border-blue-200 text-blue-900">
              <span>
                Showing only <strong>{selectedPriority.toUpperCase()}</strong> priority gaps ({filteredGaps.length} items)
              </span>
              <button
                onClick={() => setSelectedPriority("all")}
                className="font-bold underline hover:text-blue-700"
              >
                Show All Gaps
              </button>
            </div>
          )}

          {/* Comprehensive Gap Cards with AI Explanations */}
          <div className="space-y-4">
            {filteredGaps.map((gap) => {
              const isCritical = gap.priority === "Critical";
              const isHigh = gap.priority === "High";
              const isMedium = gap.priority === "Medium";
              return (
                <div
                  key={gap.competencyId}
                  className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
                    isCritical
                      ? "border-rose-300 ring-1 ring-rose-100"
                      : isHigh
                      ? "border-amber-300 ring-1 ring-amber-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <h3 className="text-base font-bold text-slate-900">{gap.name}</h3>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                            isCritical
                              ? "bg-rose-100 text-rose-800"
                              : isHigh
                              ? "bg-amber-100 text-amber-800"
                              : isMedium
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {gap.priority} Priority
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md uppercase">
                          {gap.category}
                        </span>
                        {gap.lastAssessed && (
                          <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md">
                            {t("currentScore") || "Assessed"}: {gap.lastAssessed}
                          </span>
                        )}
                      </div>

                      {/* AI Diagnostic Explanation Box */}
                      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 my-3 text-xs leading-relaxed text-slate-700">
                        <p className="font-semibold text-blue-900 flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          StatSkill AI Diagnostic Rationale:
                        </p>
                        <p>{gap.aiExplanation}</p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">{t("recommendedAction") || "Recommended Intervention"}:</span>
                        <span>{gap.recommendedAction}</span>
                      </div>
                    </div>

                    {/* Scores & Quick CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="text-right">
                        <span className={`text-2xl font-black ${gap.gap > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                          {gap.gap > 0 ? `${gap.gap}% ${t("gapDeficit") || "Gap"}` : `0% ${t("gapDeficit") || "Gap"}`}
                        </span>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {t("currentScore") || "Assessed"}: {gap.current}% / {t("roleReq") || "Target"}: {gap.required}%
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab("igot-courses")}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
                      >
                        <span>{t("remediateIgot") || "Remediate on iGOT"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
