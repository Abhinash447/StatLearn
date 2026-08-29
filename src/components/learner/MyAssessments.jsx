import { useApp } from "../../context/AppContext";
import {
  History,
  Clock,
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
export const MyAssessments = () => {
  const { assessmentHistory, setActiveTab, t } = useApp();
  const chartData = [...assessmentHistory].reverse().map((att, idx) => ({
    name: `Test ${idx + 1}`,
    score: att.percentage,
    date: att.date
  }));
  const avgScore = assessmentHistory.length ? Math.round(assessmentHistory.reduce((acc, a) => acc + a.percentage, 0) / assessmentHistory.length) : 0;
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <History className="w-7 h-7 text-blue-600" />
            Assessment History & Performance Trends
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track psychometric diagnostic scores, micro-quizzes, and longitudinal competency growth.
          </p>
        </div>

        <button
          onClick={() => setActiveTab("quiz-generator")}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Take New AI Quiz</span>
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Assessments</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{assessmentHistory.length}</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Psychometrically Evaluated
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Average Assessment Score</p>
          <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{avgScore}%</h3>
          <p className="text-xs text-slate-500 mt-2">
            Target benchmark: 80%
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Competency Trajectory</p>
          <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">+14%</h3>
          <p className="text-xs text-slate-500 mt-2">
            Growth across last 30 days
          </p>
        </div>
      </div>

      {/* Longitudinal Score Trend Line Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Longitudinal Score Trajectory</h3>
              <p className="text-xs text-slate-500">Historical performance across diagnostic and micro-assessments</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
              Upward Trend
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#3b82f6" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Assessment History Table / Empty State */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Completed Assessment Log</h3>
          <span className="text-xs text-slate-500">{assessmentHistory.length} Attempts</span>
        </div>

        {assessmentHistory.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center border border-blue-100 shadow-sm">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-slate-900 text-base">{t("noAssessmentsTitle") || "No Assessments Completed Yet"}</h4>
              <p className="text-xs text-slate-500">
                {t("noAssessmentsSubtitle") || "You haven't completed any psychometric assessments yet. Take the official diagnostic or generate a topic quiz from training manuals to calibrate your baseline scores!"}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab("assessment")}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t("takeAssessmentBtn") || "Start AI Diagnostic Assessment"}</span>
              </button>
              <button
                onClick={() => setActiveTab("quiz-generator")}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 flex items-center gap-2 transition-all"
              >
                <span>{t("uploadDocTitle") || "Upload Material for Quiz"}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {assessmentHistory.map((att) => (
              <div key={att.id} className="p-5 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${att.percentage >= 80 ? "bg-emerald-100 text-emerald-800" : att.percentage >= 60 ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"}`}>
                      {att.percentage}%
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{att.quizTitle}</h4>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {att.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {att.timeTakenSeconds ? `${Math.round(att.timeTakenSeconds / 60)} mins` : "Completed"}
                    </span>
                  </p>

                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 line-clamp-1">
                    {att.feedback}
                  </p>
                </div>

                <div className="flex-shrink-0 text-right">
                  <span className="text-xs font-semibold text-slate-500 block">
                    {att.score}/{att.totalQuestions} Correct
                  </span>
                  <button
                    onClick={() => setActiveTab("quiz-generator")}
                    className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    Retake Similar →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
