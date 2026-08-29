import React from "react";
import { useApp } from "../../context/AppContext";
import { StatCard } from "../common/StatCard";
import { RadarChartComponent } from "../common/RadarChartComponent";
import { CompetencyEngine } from "../../services/competencyEngine";
import {
  Award,
  TrendingDown,
  BookOpenCheck,
  Clock,
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Compass,
  ExternalLink,
  Brain,
  AlertTriangle,
  Play,
  UserCheck
} from "lucide-react";

export const LearnerDashboard = () => {
  const {
    user,
    competencies,
    skillGaps,
    learningPath,
    igotCourses,
    overallCompetency,
    overallGap,
    learningStreak,
    learningHours,
    coursesCompletedCount,
    assessmentHistory,
    setActiveTab
  } = useApp();

  const criticalGaps = skillGaps.filter((g) => g.priority === "Critical" || g.priority === "High");
  const topRecommendations = igotCourses.slice(0, 3);
  const nextLearningStep = learningPath.find((step) => step.status === "In Progress" || step.status === "Not Started");
  
  // Real dynamic calculations
  const assessedComps = competencies.filter((c) => c.currentScore > 0);
  const isUnassessed = assessedComps.length === 0 && assessmentHistory.length === 0;
  
  const categorySummary = CompetencyEngine.calculateCategoryAverages(competencies);
  const completedStepsCount = learningPath.filter((s) => s.status === "Completed").length;
  const learningProgressPercent = learningPath.length
    ? Math.round((completedStepsCount / learningPath.length) * 100)
    : 0;

  const strongest = [...assessedComps].sort((a, b) => b.currentScore - a.currentScore).slice(0, 3);
  const topDeficits = [...competencies].sort((a, b) => (b.requiredScore - b.currentScore) - (a.requiredScore - a.currentScore)).slice(0, 3);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gov-navy via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/80 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{user?.department || "National Sample Survey (NSS)"} • {user?.designation || "Statistical Officer"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {user?.name || "Official User"}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              {isUnassessed ? (
                <span>Your official profile has been initialized. Complete the <strong>10-question AI Diagnostic Assessment</strong> below to calibrate your baseline competency dossier.</span>
              ) : (
                <span>Your AI competency intelligence model has evaluated <strong className="text-amber-400 font-bold">{assessedComps.length} competencies</strong> with an overall score of <strong className="text-emerald-400">{overallCompetency}%</strong>.</span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab("assessment")}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{isUnassessed ? "Start Baseline Diagnostic" : "Take AI Assessment"}</span>
            </button>
            <button
              onClick={() => setActiveTab("learning-path")}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>View Learning Path</span>
            </button>
          </div>
        </div>
      </div>

      {/* Onboarding Guide Card for Fresh / Unassessed Users */}
      {isUnassessed && (
        <div className="bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-6 text-white shadow-lg space-y-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Official Onboarding: 3-Step Capacity Building Calibration
              </h3>
              <p className="text-xs text-slate-300">
                Your profile is in clean baseline state. Take your first step to populate your real performance matrix:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-600 text-white uppercase">Step 1</span>
                  <span className="text-[11px] text-slate-400">10 Questions</span>
                </div>
                <h4 className="font-bold text-sm text-white">AI Diagnostic Test</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Calibrates your statistical, technical, and governance competencies with real-time scoring.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("assessment")}
                className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Start Diagnostic →
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-600 text-white uppercase">Step 2</span>
                  <span className="text-[11px] text-slate-400">iGOT / NSSTA</span>
                </div>
                <h4 className="font-bold text-sm text-white">Enroll in Programs</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Explore tailored iGOT Karmayogi courses and residential NSSTA training workshops.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("igot-courses")}
                className="w-full mt-2 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all"
              >
                Explore Courses →
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-600 text-white uppercase">Step 3</span>
                  <span className="text-[11px] text-slate-400">Upload PDF / DOCX</span>
                </div>
                <h4 className="font-bold text-sm text-white">Generate Custom Quiz</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Upload official MoSPI circulars, manuals, or training documents to generate tailored MCQs.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("quiz-generator")}
                className="w-full mt-2 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-all"
              >
                Upload & Generate →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Overall Competency"
          value={`${overallCompetency}%`}
          subtitle={isUnassessed ? "Unassessed Baseline" : "Target: 80%"}
          icon={Award}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
          onClick={() => setActiveTab("competencies")}
        />
        <StatCard
          title="Skill Gap"
          value={`${overallGap}%`}
          subtitle={isUnassessed ? "Pending Calibration" : `${criticalGaps.length} Critical/High`}
          icon={TrendingDown}
          iconColor="text-rose-600"
          bgColor="bg-rose-50"
          onClick={() => setActiveTab("skill-gaps")}
        />
        <StatCard
          title="Learning Progress"
          value={`${learningProgressPercent}%`}
          subtitle={`${completedStepsCount} of ${learningPath.length} Milestones`}
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
          onClick={() => setActiveTab("learning-path")}
        />
        <StatCard
          title="Learning Hours"
          value={`${learningHours} hrs`}
          subtitle="Goal: 50 hrs/yr"
          icon={Clock}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50"
          onClick={() => setActiveTab("igot-courses")}
        />
        <StatCard
          title="Completed Courses"
          value={coursesCompletedCount}
          subtitle="iGOT + NSSTA"
          icon={BookOpenCheck}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
          onClick={() => setActiveTab("igot-courses")}
        />
        <StatCard
          title="Learning Streak"
          value={`${learningStreak} Days`}
          subtitle={learningStreak > 0 ? "Active Learner" : "Start Today"}
          icon={Flame}
          iconColor="text-amber-600"
          bgColor="bg-amber-50"
          badge={learningStreak > 0 ? "🔥 Active" : "New"}
        />
      </div>

      {/* AI Diagnostic Insight Box */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 rounded-2xl p-5 border border-blue-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md flex-shrink-0 mt-0.5">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                StatSkill AI Diagnostic Insight
              </span>
              <span className="bg-blue-200 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {isUnassessed ? "Awaiting Assessment" : "Active Evaluation"}
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              {isUnassessed ? (
                <span>You have not completed any competency assessments yet. Complete the 10-question AI Diagnostic Assessment or take a topic quiz to establish your baseline proficiency.</span>
              ) : (
                <span>
                  Your strongest assessed competencies are {strongest.map((c) => <strong key={c.id} className="text-emerald-700">{c.name} ({c.currentScore}%) </strong>)}. 
                  Top development opportunities include {topDeficits.map((c) => <strong key={c.id} className="text-rose-600">{c.name} ({c.requiredScore - c.currentScore}% Gap) </strong>)}.
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("ai-assistant")}
          className="whitespace-nowrap px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs border border-blue-200 shadow-sm flex items-center gap-1.5 transition-all flex-shrink-0"
        >
          <span>Ask AI Assistant</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Competency Radar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Competency Profile Radar</h3>
                <p className="text-xs text-slate-500">Current proficiency vs Required role benchmark</p>
              </div>
              <button
                onClick={() => setActiveTab("competencies")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>All 23 Skills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <RadarChartComponent competencies={competencies} height={280} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 text-center text-xs">
            <div>
              <p className="text-slate-400 text-[11px]">Statistical Avg</p>
              <p className="font-bold text-slate-800 text-sm">{categorySummary.statistical.current}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Technical Avg</p>
              <p className="font-bold text-slate-800 text-sm">{categorySummary.technical.current}%</p>
            </div>
            <div>
              <p className="text-slate-400 text-[11px]">Governance Avg</p>
              <p className="font-bold text-slate-800 text-sm">{categorySummary.governance.current}%</p>
            </div>
          </div>
        </div>

        {/* Right: Critical Skill Gaps */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Top Priority Skill Gaps</h3>
                <p className="text-xs text-slate-500">Sorted by empirical deficit (Required Benchmark − Assessed Score)</p>
              </div>
              <button
                onClick={() => setActiveTab("skill-gaps")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Full Gap Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {skillGaps.length === 0 ? (
                <div className="py-8 text-center space-y-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 p-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-100">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">No Skill Gaps Identified Yet</p>
                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      Skill gaps are discovered exclusively through completed diagnostic tests and topic assessments.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("assessment")}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Start AI Diagnostic Assessment →
                  </button>
                </div>
              ) : (
                skillGaps.slice(0, 4).map((gap) => (
                  <div
                    key={gap.competencyId}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 truncate">{gap.name}</span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            gap.priority === "Critical"
                              ? "bg-rose-100 text-rose-800"
                              : gap.priority === "High"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {gap.priority} Priority
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${gap.current}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1 font-medium">
                        <span>Assessed: {gap.current}%</span>
                        <span className="font-bold text-slate-700">Target: {gap.required}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-black text-rose-600">-{gap.gap}%</span>
                      <p className="text-[10px] text-slate-500">Deficit</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Target 80% benchmark across official statistical cadres</span>
            </span>
            <button
              onClick={() => setActiveTab("assessment")}
              className="font-bold text-blue-600 hover:underline"
            >
              Start Calibration →
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Courses & Current Learning Roadmap Step */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Learning Step Spotlight */}
        {nextLearningStep && (
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-indigo-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-400/30">
                  Step {nextLearningStep.stepNumber} of 5 • {nextLearningStep.phase}
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  {nextLearningStep.matchScore}% Match
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {nextLearningStep.courseTitle}
              </h3>
              <p className="text-xs text-slate-300 mb-4 line-clamp-3">
                {nextLearningStep.description}
              </p>

              <div className="bg-indigo-950/60 p-3 rounded-xl border border-indigo-800/60 text-xs space-y-1 mb-4">
                <p className="text-indigo-300 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Recommendation Reason:
                </p>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {nextLearningStep.rationale}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Provider: <strong className="text-white">{nextLearningStep.provider}</strong>
              </span>
              <button
                onClick={() => setActiveTab("igot-courses")}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>{nextLearningStep.status === "In Progress" ? "Continue Course" : "Enroll in Course"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Top Recommended iGOT Courses */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recommended iGOT Karmayogi Courses</h3>
                <p className="text-xs text-slate-500">Calculated with 5-factor AI matching formula</p>
              </div>
              <button
                onClick={() => setActiveTab("igot-courses")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topRecommendations.map((course) => (
                <div
                  key={course.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-slate-900 truncate">{course.title}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        {course.matchScore}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{course.provider} • {course.duration}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab("igot-courses")}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs flex items-center gap-1 self-start sm:self-center transition-all"
                  >
                    <span>{course.isEnrolled ? "Enrolled" : "Enroll"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>🟢 Connected to iGOT API Ecosystem</span>
            <button
              onClick={() => setActiveTab("nssta-training")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Explore NSSTA In-Person Training →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
