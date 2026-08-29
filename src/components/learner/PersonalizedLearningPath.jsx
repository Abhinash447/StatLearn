import { useApp } from "../../context/AppContext";
import {
  CheckCircle2,
  Clock,
  Play,
  Sparkles,
  ExternalLink
} from "lucide-react";
export const PersonalizedLearningPath = () => {
  const { learningPath, user, setActiveTab, enrollInIGOT } = useApp();
  const completedStepsCount = learningPath.filter((s) => s.status === "Completed").length;
  const progressPercentage = Math.round(completedStepsCount / learningPath.length * 100);
  return <div className="space-y-6 max-w-5xl mx-auto">
      {
    /* Header Banner */
  }
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-indigo-700/60 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="bg-indigo-500/30 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-400/30">
              AI-Curated Capacity Building Roadmap
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
              Personalized Learning Path for {user?.name || "Official User"}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Engineered using the 5-factor optimization model: 40% Skill Gap Match, 25% Role Match ({user?.designation || "Statistical Officer"}), 
              15% Competency Level, 10% Learning History, and 10% Department Priority ({user?.department || "National Sample Survey"}).
            </p>
          </div>

          <div className="bg-indigo-950/80 p-4 rounded-2xl border border-indigo-700/60 text-center flex-shrink-0">
            <p className="text-xs text-slate-400">Roadmap Completion</p>
            <p className="text-3xl font-black text-amber-400 mt-0.5">{progressPercentage}%</p>
            <p className="text-[11px] text-slate-300 mt-1">{completedStepsCount} of {learningPath.length} Milestones</p>
          </div>
        </div>
      </div>

      {
    /* Visual Roadmap Stepper */
  }
      <div className="relative space-y-6 before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-slate-200 before:pointer-events-none">
        {learningPath.map((step, index) => {
    const isCompleted = step.status === "Completed";
    const isInProgress = step.status === "In Progress";
    const isNotStarted = step.status === "Not Started";
    return <div
      key={step.id}
      className={`relative pl-14 sm:pl-20 transition-all ${isInProgress ? "scale-[1.01]" : ""}`}
    >
              {
      /* Stepper Node Icon */
    }
              <div
      className={`absolute left-0 sm:left-2 top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-md transition-all z-10 ${isCompleted ? "bg-emerald-600 text-white shadow-emerald-500/30" : isInProgress ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30 ring-4 ring-amber-100" : "bg-white text-slate-400 border-2 border-slate-300"}`}
    >
                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span>STEP {step.stepNumber}</span>}
              </div>

              {
      /* Step Card Content */
    }
              <div
      className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${isInProgress ? "border-amber-400 shadow-md ring-2 ring-amber-200" : isCompleted ? "border-emerald-200 bg-slate-50/50" : "border-slate-200"}`}
    >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {step.phase} Phase
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {step.skill}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {step.level}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {step.matchScore}% AI Match
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {step.courseTitle}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>

                    {
      /* AI Rationale */
    }
                    <div className="mt-3 bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-blue-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-blue-900">Why this step? </span>
                        <span>{step.rationale}</span>
                      </div>
                    </div>
                  </div>

                  {
      /* Provider & Action */
    }
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right text-xs">
                      <p className="text-slate-400 text-[10px]">Ecosystem Provider</p>
                      <p className="font-bold text-slate-800">{step.provider}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {step.duration}
                      </p>
                    </div>

                    {isCompleted ? <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span> : isInProgress ? <button
      onClick={() => {
        if (step.courseId) enrollInIGOT(step.courseId);
        setActiveTab("igot-courses");
      }}
      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
    >
                        <Play className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Continue Learning</span>
                      </button> : <button
      onClick={() => {
        if (step.provider.includes("NSSTA")) {
          setActiveTab("nssta-training");
        } else {
          if (step.courseId) enrollInIGOT(step.courseId);
          setActiveTab("igot-courses");
        }
      }}
      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition-all"
    >
                        <span>Start Milestone</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>}
                  </div>
                </div>
              </div>
            </div>;
  })}
      </div>
    </div>;
};
