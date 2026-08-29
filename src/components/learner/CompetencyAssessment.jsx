import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { INITIAL_ASSESSMENT_QUESTIONS } from "../../data/initialData";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  AlertCircle,
  Compass,
  Award
} from "lucide-react";
import confetti from "canvas-confetti";
export const CompetencyAssessment = () => {
  const { finishQuizSession, setActiveTab, updateCompetencyScore, showToast } = useApp();
  const questions = INITIAL_ASSESSMENT_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const currentQuestion = questions[currentIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIndex
    }));
  };
  const handleSubmitAssessment = () => {
    if (answeredCount < totalQuestions) {
      const confirmIncomplete = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Do you want to submit anyway?`
      );
      if (!confirmIncomplete) return;
    }
    let correctCount = 0;
    const catBreakdown = {
      statistical: { correct: 0, total: 0, pct: 0 },
      technical: { correct: 0, total: 0, pct: 0 },
      governance: { correct: 0, total: 0, pct: 0 },
      behavioral: { correct: 0, total: 0, pct: 0 }
    };
    const compScoresMap = {};
    questions.forEach((q, idx) => {
      const isCorrect = selectedAnswers[idx] === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      catBreakdown[q.category].total += 1;
      if (isCorrect) catBreakdown[q.category].correct += 1;
      if (!compScoresMap[q.competency]) {
        compScoresMap[q.competency] = { correct: 0, total: 0 };
      }
      compScoresMap[q.competency].total += 1;
      if (isCorrect) compScoresMap[q.competency].correct += 1;
    });
    Object.keys(catBreakdown).forEach((k) => {
      const cat = k;
      catBreakdown[cat].pct = catBreakdown[cat].total > 0 ? Math.round(catBreakdown[cat].correct / catBreakdown[cat].total * 100) : 0;
    });
    const percentage = Math.round(correctCount / totalQuestions * 100);
    const strengths = [];
    const weaknesses = [];
    const impacts = [];
    Object.entries(compScoresMap).forEach(([compName, val]) => {
      const compPct = val.correct / val.total * 100;
      if (compPct >= 70) {
        strengths.push(compName);
        impacts.push({ name: compName, score: 82, scoreDelta: 6, isAbsolute: true });
      } else {
        weaknesses.push(compName);
        impacts.push({ name: compName, score: 40, scoreDelta: 2, isAbsolute: true });
      }
    });

    const evaluated = {
      score: correctCount,
      total: totalQuestions,
      percentage,
      categoryScores: catBreakdown,
      competencyImpacts: impacts,
      strengths,
      weaknesses,
      compScoresMap
    };
    setResultsData(evaluated);
    setIsSubmitted(true);
    if (percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleApplyToProfile = () => {
    if (!resultsData) return;
    
    // Create attempt record
    const attempt = {
      id: `att-diag-${Date.now()}`,
      quizId: "diag-baseline",
      quizTitle: "MoSPI Baseline Competency Diagnostic",
      score: resultsData.score,
      totalQuestions: resultsData.total,
      percentage: resultsData.percentage,
      date: new Date().toISOString().split("T")[0],
      competencyBreakdown: resultsData.compScoresMap,
      feedback: resultsData.percentage >= 70
        ? "Exceptional baseline proficiency across statistical methodologies and standards. Target higher-level AI and Cloud capacities."
        : "Baseline established across statistical, technical, and governance areas. Enroll in recommended learning paths to bridge capability gaps.",
      recommendedNextStep: "Review personalized learning roadmap on iGOT Karmayogi",
      timeTakenSeconds: 240
    };

    resultsData.competencyImpacts.forEach((imp) => {
      updateCompetencyScore(imp.name, imp.score, true);
    });

    finishQuizSession(attempt, []);
    showToast("Competency Matrix calibrated and recorded in your Official Dossier!", "success");
    setActiveTab("dashboard");
  };
  if (isSubmitted && resultsData) {
    return <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
        {
      /* Results Header Card */
    }
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            MoSPI Diagnostic Assessment Completed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Overall Competency Score: <span className="text-blue-600">{resultsData.percentage}%</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            You scored {resultsData.score} out of {resultsData.total} questions correctly across 10 official statistical competencies.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-left">
            <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
              <p className="text-[11px] font-bold text-blue-900 uppercase">Statistical</p>
              <p className="text-xl font-black text-blue-700">{resultsData.categoryScores.statistical.pct}%</p>
              <p className="text-[10px] text-slate-500">{resultsData.categoryScores.statistical.correct}/{resultsData.categoryScores.statistical.total} Correct</p>
            </div>
            <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100">
              <p className="text-[11px] font-bold text-indigo-900 uppercase">Technical</p>
              <p className="text-xl font-black text-indigo-700">{resultsData.categoryScores.technical.pct}%</p>
              <p className="text-[10px] text-slate-500">{resultsData.categoryScores.technical.correct}/{resultsData.categoryScores.technical.total} Correct</p>
            </div>
            <div className="bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100">
              <p className="text-[11px] font-bold text-emerald-900 uppercase">Governance</p>
              <p className="text-xl font-black text-emerald-700">{resultsData.categoryScores.governance.pct}%</p>
              <p className="text-[10px] text-slate-500">{resultsData.categoryScores.governance.correct}/{resultsData.categoryScores.governance.total} Correct</p>
            </div>
            <div className="bg-purple-50/60 p-3.5 rounded-xl border border-purple-100">
              <p className="text-[11px] font-bold text-purple-900 uppercase">Behavioural</p>
              <p className="text-xl font-black text-purple-700">{resultsData.categoryScores.behavioral.pct}%</p>
              <p className="text-[10px] text-slate-500">{resultsData.categoryScores.behavioral.correct}/{resultsData.categoryScores.behavioral.total} Correct</p>
            </div>
          </div>
        </div>

        {
      /* Strengths & Growth Areas */
    }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm">
            <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Core Strengths
            </h3>
            <ul className="space-y-2 text-xs">
              {resultsData.strengths.map((s, i) => <li key={i} className="flex items-center gap-2 text-slate-700 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-900">{s}</span> — High precision confirmed
                </li>)}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-sm">
            <h3 className="font-bold text-rose-900 text-sm flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              Identified Skill Gaps
            </h3>
            <ul className="space-y-2 text-xs">
              {resultsData.weaknesses.map((w, i) => <li key={i} className="flex items-center gap-2 text-slate-700 bg-rose-50/50 p-2.5 rounded-lg border border-rose-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span className="font-semibold text-slate-900">{w}</span> — Targeted training recommended
                </li>)}
            </ul>
          </div>
        </div>

        {
      /* Action Buttons */
    }
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base">Ready to Upgrade Your Official Competencies?</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Generate an adaptive 5-phase personalized learning roadmap based on these diagnostic results.
            </p>
          </div>

          <button
      onClick={handleApplyToProfile}
      className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 whitespace-nowrap transition-all"
    >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>Generate Personalized Learning Path</span>
          </button>
        </div>
      </div>;
  }
  return <div className="space-y-6 max-w-4xl mx-auto">
      {
    /* Assessment Header */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
              MoSPI Diagnostic Assessment
            </span>
            <span className="text-xs text-slate-500">Official Statistical Cadre</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mt-1">
            Statistical & Technical Competency Evaluation
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-400" /> Untimed Self-Paced
          </span>
          <span className="bg-slate-100 text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 font-mono">
            Answered: {answeredCount}/{totalQuestions}
          </span>
        </div>
      </div>

      {
    /* Progress Bar */
  }
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div
    className="bg-blue-600 h-full transition-all duration-300"
    style={{ width: `${(currentIdx + 1) / totalQuestions * 100}%` }}
  />
      </div>

      {
    /* Question Card */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Question {currentIdx + 1} of {totalQuestions}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {currentQuestion.competency}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {currentQuestion.difficulty}
            </span>
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
          {currentQuestion.question}
        </h2>

        {
    /* Options */
  }
        <div className="space-y-3">
          {currentQuestion.options.map((opt, oIdx) => {
    const isSelected = selectedAnswers[currentIdx] === oIdx;
    const letters = ["A", "B", "C", "D"];
    return <button
      key={oIdx}
      onClick={() => handleSelectOption(oIdx)}
      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${isSelected ? "bg-blue-50/90 border-blue-500 text-blue-900 shadow-sm ring-1 ring-blue-400" : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"}`}
    >
                <span
      className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-600"}`}
    >
                  {letters[oIdx]}
                </span>
                <span className="leading-relaxed mt-0.5">{opt}</span>
              </button>;
  })}
        </div>

        {
    /* Navigation & Submit Controls */
  }
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
    onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
    disabled={currentIdx === 0}
    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
  >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIdx < totalQuestions - 1 ? <button
    onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
  >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button> : <button
    onClick={handleSubmitAssessment}
    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-md transition-all"
  >
                <Sparkles className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>}
          </div>
        </div>
      </div>

      {
    /* Question Palette Indicator */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Question Navigation Palette</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, qIdx) => {
    const isAnswered = selectedAnswers[qIdx] !== void 0;
    const isCurrent = currentIdx === qIdx;
    return <button
      key={qIdx}
      onClick={() => setCurrentIdx(qIdx)}
      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${isCurrent ? "ring-2 ring-blue-600 bg-blue-600 text-white shadow" : isAnswered ? "bg-blue-100 text-blue-900 border border-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
    >
                {qIdx + 1}
              </button>;
  })}
        </div>
      </div>
    </div>;
};
