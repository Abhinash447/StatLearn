import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Compass,
  TrendingUp,
  RotateCcw,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";
export const QuizResults = () => {
  const { latestAttempt, activeQuiz, setActiveTab, updateCompetencyScore, showToast, t } = useApp();
  useEffect(() => {
    if (latestAttempt && latestAttempt.percentage >= 60) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.warn(err);
      }
    }
  }, [latestAttempt]);
  if (!latestAttempt) {
    return <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Assessment Results Available</h3>
        <p className="text-xs text-slate-500">
          Complete a quiz in the AI Quiz Generator or Diagnostic Assessment to review results.
        </p>
        <button
      onClick={() => setActiveTab("quiz-generator")}
      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
    >
          Go to AI Quiz Generator
        </button>
      </div>;
  }
  const isPassed = latestAttempt.percentage >= 60;
  const questions = activeQuiz?.questions || [];
  const handleUpdateCompetency = () => {
    Object.entries(latestAttempt.competencyBreakdown).forEach(([compName, val]) => {
      const scoreDelta = val.percentage >= 75 ? 6 : val.percentage >= 50 ? 3 : -1;
      updateCompetencyScore(compName, scoreDelta, false);
    });
    showToast("Competency Profile successfully upgraded with assessment performance!", "success");
  };
  return <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {
    /* Celebration / Score Banner */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
          <Award className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Official Assessment Evaluation
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          {t("currentScore") || "Score"}: <span className={isPassed ? "text-emerald-600" : "text-amber-600"}>{latestAttempt.percentage}%</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {latestAttempt.quizTitle} • {latestAttempt.score} {t("of")} {latestAttempt.totalQuestions} Questions Correct
        </p>

        {
    /* Competency Breakdown Chips */
  }
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {Object.entries(latestAttempt.competencyBreakdown).map(([compName, stats], i) => <div key={i} className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs flex items-center gap-2">
              <span className="font-semibold text-slate-800">{compName}:</span>
              <span className={`font-bold ${stats.percentage >= 70 ? "text-emerald-600" : "text-rose-600"}`}>
                {stats.percentage}% ({stats.correct}/{stats.total})
              </span>
            </div>)}
        </div>
      </div>

      {
    /* AI Learning Feedback & Recommended Next Step */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200 p-6 shadow-sm">
          <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI Learning Feedback
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            {latestAttempt.feedback}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-2xl border border-emerald-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              {t("recommendedAction") || "Recommended Next Step"}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {latestAttempt.recommendedNextStep}
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2">
            <button
    onClick={handleUpdateCompetency}
    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
  >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t("updateCompetencyProfileBtn")}</span>
            </button>
            <button
    onClick={() => setActiveTab("learning-path")}
    className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all"
  >
              {t("learningPathTitle") || "View Learning Path"}
            </button>
          </div>
        </div>
      </div>

      {
    /* Question by Question Detailed Review */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Detailed Question & Answer Review</h3>
            <p className="text-xs text-slate-500">Includes official explanations and competency mapping</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {latestAttempt.totalQuestions} Questions
          </span>
        </div>

        <div className="space-y-6 divide-y divide-slate-100">
          {questions.map((q, idx) => {
    const userAnswer = latestAttempt.userAnswers[idx];
    const isCorrect = userAnswer === q.correctAnswerIndex;
    const letters = ["A", "B", "C", "D"];
    return <div key={idx} className={`pt-6 first:pt-0 space-y-3`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{q.competency}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{q.difficulty}</span>
                  </div>

                  {isCorrect ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span> : <span className="flex items-center gap-1 text-rose-600 text-xs font-bold">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>}
                </div>

                <h4 className="text-sm font-semibold text-slate-900">{q.question}</h4>

                {
      /* Options Review */
    }
                <div className="space-y-1.5 text-xs">
                  {q.options.map((opt, oIdx) => {
      const isOptionCorrect = oIdx === q.correctAnswerIndex;
      const isOptionUserSelected = oIdx === userAnswer;
      return <div
        key={oIdx}
        className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${isOptionCorrect ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold" : isOptionUserSelected && !isCorrect ? "bg-rose-50 border-rose-300 text-rose-950 font-medium" : "bg-white border-slate-200 text-slate-700"}`}
      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold">{letters[oIdx]}.</span>
                          <span>{opt}</span>
                        </div>
                        {isOptionCorrect && <span className="text-[10px] font-extrabold text-emerald-700 uppercase">{t("correctAnswer")}</span>}
                        {isOptionUserSelected && !isCorrect && <span className="text-[10px] font-extrabold text-rose-700 uppercase">{t("yourAnswer")}</span>}
                      </div>;
    })}
                </div>

                {
      /* AI Explanation */
    }
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-0.5">{t("statisticalExplanation")}:</span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              </div>;
  })}
        </div>

        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
    onClick={() => setActiveTab("quiz-generator")}
    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 flex items-center gap-1.5"
  >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Generate Another Quiz</span>
          </button>

          <button
    onClick={() => setActiveTab("learning-path")}
    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
  >
            <span>{t("learningPathTitle") || "Proceed to Learning Path"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>;
};
