import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AnalyticsService } from "../../services/analyticsService";
import {
  Sparkles,
  FileText,
  Download
} from "lucide-react";

export const AiWorkforceInsights = () => {
  const { t } = useApp();
  const insights = AnalyticsService.getWorkforceInsights();
  const [reportData, setReportData] = useState(null);

  const handleGenerateReport = () => {
    const report = AnalyticsService.generateExecutiveReport();
    setReportData(report);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-amber-500" />
            AI Workforce Insights & Policy Advisory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated psychometric and capacity building intelligence synthesized from 2,486 official assessments.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <FileText className="w-4 h-4" />
          <span>{t("generateReportBtn") || "Generate Full Executive Report"}</span>
        </button>
      </div>

      {/* Insights Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((ins) => (
          <div
            key={ins.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${ins.priority === "Urgent" ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"}`}>
                  {ins.priority} Priority
                </span>
                <span className="text-xs font-bold text-slate-700">{ins.metricHighlight}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">{ins.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ins.summary}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{t("departmentLabel") || "Impacted Divisions"}:</span>
                <span className="text-slate-600 font-mono">{ins.impactedDepartments.join(", ")}</span>
              </div>
              <div>
                <span className="font-bold text-blue-900 block mb-0.5">{t("recommendedAction") || "Recommended Policy Intervention:"}</span>
                <p className="text-slate-700">{ins.recommendedIntervention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Executive Report Render Zone if Generated */}
      {reportData && (
        <div className="bg-white rounded-2xl border-2 border-blue-600 p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded uppercase">
                Official MoSPI Executive Dossier
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{reportData.reportTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Generated: {reportData.generatedAt}</p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export / Print Report</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-900 uppercase tracking-wider text-[11px] mb-1">
                Executive Synthesis
              </h4>
              <p>{reportData.executiveSummary}</p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Empirical Findings
              </h4>
              <ul className="space-y-1.5 list-disc pl-5">
                {reportData.keyFindings.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                Policy Interventions
              </h4>
              <ul className="space-y-1.5 list-disc pl-5">
                {reportData.priorityInterventions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
