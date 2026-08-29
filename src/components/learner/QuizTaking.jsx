import { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { AIEngine } from "../../services/aiEngine";
import { AudioQuestionSpeaker } from "../common/AudioQuestionSpeaker";
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  X
} from "lucide-react";

export const QuizTaking = () => {
  const { activeQuiz, finishQuizSession, setActiveTab, clearActiveQuiz, showToast, t } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeQuiz || !activeQuiz.questions.length) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-4">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Active Quiz Session</h3>
        <p className="text-xs text-slate-500">
          Upload learning material or select a topic to generate an AI assessment.
        </p>
        <button
          onClick={() => setActiveTab("quiz-generator")}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all"
        >
          Go to AI Quiz Generator
        </button>
      </div>
    );
  }

  const questions = activeQuiz.questions;
  const currentQuestion = questions[currentIdx];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const handleSubmitQuiz = () => {
    if (answeredCount < totalQuestions) {
      const confirmIncomplete = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Do you want to submit?`
      );
      if (!confirmIncomplete) return;
    }

    let correctCount = 0;
    const compMap = {};

    questions.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctAnswerIndex;
      if (isCorrect) correctCount++;
      if (!compMap[q.competency]) {
        compMap[q.competency] = { correct: 0, total: 0, percentage: 0 };
      }
      compMap[q.competency].total += 1;
      if (isCorrect) compMap[q.competency].correct += 1;
    });

    Object.keys(compMap).forEach((compName) => {
      compMap[compName].percentage = Math.round(compMap[compName].correct / compMap[compName].total * 100);
    });

    const percentage = Math.round(correctCount / totalQuestions * 100);
    const { feedback, recommendedNextStep, suggestedCompetencyDelta } = AIEngine.generateAssessmentFeedback(
      percentage,
      compMap,
      activeQuiz.topic
    );

    const answerArray = questions.map((_, i) => userAnswers[i] ?? -1);

    const attempt = {
      id: `att-${Date.now()}`,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      score: correctCount,
      totalQuestions,
      percentage,
      date: new Date().toISOString().split("T")[0],
      competencyBreakdown: compMap,
      feedback,
      recommendedNextStep,
      userAnswers: answerArray,
      timeTakenSeconds: secondsElapsed
    };

    const impactedCompetencies = Object.keys(compMap).map((name) => ({
      name,
      scoreDelta: suggestedCompetencyDelta
    }));

    finishQuizSession(attempt, impactedCompetencies);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Session Top Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {t("navAssessment")}
            </span>
            <span className="text-xs text-slate-500 font-medium">{activeQuiz.topic}</span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            {activeQuiz.title}
          </h1>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-mono border border-slate-200">
            <Clock className="w-4 h-4 text-blue-600" />
            {formatTimer(secondsElapsed)}
          </span>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit this quiz session?")) {
                clearActiveQuiz();
                setActiveTab("quiz-generator");
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            title="Cancel Quiz"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${(currentIdx + 1) / totalQuestions * 100}%` }}
        />
      </div>

      {/* Active Question Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              {t("questionOf")} {currentIdx + 1} {t("of")} {totalQuestions}
            </span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {currentQuestion.competency}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Text-to-Speech Audio Speaker Button */}
          <AudioQuestionSpeaker
            questionNumber={currentIdx + 1}
            questionText={currentQuestion.question}
            options={currentQuestion.options}
            competency={currentQuestion.competency}
          />
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
          {currentQuestion.question}
        </h2>

        {/* Option Selection */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, optIdx) => {
            const isSelected = userAnswers[currentIdx] === optIdx;
            const letters = ["A", "B", "C", "D"];
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-blue-50/90 border-blue-500 text-blue-900 shadow-sm ring-1 ring-blue-400"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {letters[optIdx]}
                </span>
                <span className="leading-relaxed mt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("previousBtn")}</span>
          </button>

          <div className="flex items-center gap-2">
            {currentIdx < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>{t("nextBtn")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t("submitAssessmentBtn")}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigator Palette */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t("navPalette")}
        </p>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, qIdx) => {
            const isAnswered = userAnswers[qIdx] !== void 0;
            const isCurrent = currentIdx === qIdx;
            return (
              <button
                key={qIdx}
                onClick={() => setCurrentIdx(qIdx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  isCurrent
                    ? "ring-2 ring-blue-600 bg-blue-600 text-white shadow"
                    : isAnswered
                    ? "bg-blue-100 text-blue-900 border border-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {qIdx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
