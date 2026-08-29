import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AnalyticsService } from "../../services/analyticsService";
import { StatCard } from "../common/StatCard";
import {
  Users,
  Award,
  TrendingDown,
  BookOpenCheck,
  Cpu,
  Clock,
  Sparkles,
  FileText,
  ArrowRight,
  Zap,
  Download
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
export const AdminDashboard = () => {
  const { setActiveTab } = useApp();
  const kpis = AnalyticsService.getKPIs();
  const departments = AnalyticsService.getDepartments();
  const emergingSkills = AnalyticsService.getEmergingSkills();
  const insights = AnalyticsService.getWorkforceInsights();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState(null);
  const handleGenerateReport = () => {
    const report = AnalyticsService.generateExecutiveReport();
    setReportData(report);
    setShowReportModal(true);
  };
  const deptChartData = departments.map((d) => ({
    name: d.code,
    fullName: d.name,
    competency: d.avgCompetency,
    aiReadiness: d.aiReadiness,
    completion: d.trainingCompletion
  }));
  return <div className="space-y-6 max-w-7xl mx-auto">
      {
    /* Executive Admin Banner */
  }
      <div className="bg-gradient-to-r from-gov-navyDark via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              MoSPI Executive Intelligence & Workforce Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Workforce Skill Intelligence Portal
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Real-time enterprise skill mapping, predictive AI competency forecasting, and training effectiveness 
              across <strong className="text-white font-bold">2,486 statistical officers</strong> in India's Official Statistical System.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
    onClick={handleGenerateReport}
    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all whitespace-nowrap"
  >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Generate Workforce Report</span>
            </button>
            <button
    onClick={() => setActiveTab("emerging-skills")}
    className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 flex items-center gap-2 transition-all"
  >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI Predictions</span>
            </button>
          </div>
        </div>
      </div>

      {
    /* 6 Executive KPIs */
  }
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
    title="Total Officials"
    value={kpis.totalOfficials.toLocaleString()}
    subtitle="Across 6 Divisions"
    icon={Users}
    iconColor="text-blue-600"
    bgColor="bg-blue-50"
    onClick={() => setActiveTab("workforce-intelligence")}
  />
        <StatCard
    title="Avg Competency"
    value={`${kpis.avgCompetency}%`}
    subtitle="Target: 75%"
    icon={Award}
    trend={{ value: "+3.2% YoY", isPositive: true }}
    iconColor="text-emerald-600"
    bgColor="bg-emerald-50"
    onClick={() => setActiveTab("competency-analytics")}
  />
        <StatCard
    title="Critical Skill Gaps"
    value={kpis.criticalSkillGaps}
    subtitle="14 Gaps Identified"
    icon={TrendingDown}
    iconColor="text-rose-600"
    bgColor="bg-rose-50"
    badge="Urgent"
    onClick={() => setActiveTab("skill-gap-analytics")}
  />
        <StatCard
    title="Training Completion"
    value={`${kpis.trainingCompletion}%`}
    subtitle="iGOT + NSSTA"
    icon={BookOpenCheck}
    trend={{ value: "+8.4%", isPositive: true }}
    iconColor="text-indigo-600"
    bgColor="bg-indigo-50"
    onClick={() => setActiveTab("training-analytics")}
  />
        <StatCard
    title="AI/ML Readiness"
    value={`${kpis.aiReadiness}%`}
    subtitle="Target: 70%"
    icon={Cpu}
    iconColor="text-purple-600"
    bgColor="bg-purple-50"
    badge="Priority"
    onClick={() => setActiveTab("emerging-skills")}
  />
        <StatCard
    title="Learning Hours"
    value={kpis.learningHours.toLocaleString()}
    subtitle="18.6k Completed"
    icon={Clock}
    iconColor="text-amber-600"
    bgColor="bg-amber-50"
  />
      </div>

      {
    /* Main Analytics Chart: Department Comparison */
  }
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Departmental Competency & AI Readiness Comparison</h3>
                <p className="text-xs text-slate-500">Benchmark comparison across 6 major MoSPI divisions</p>
              </div>
              <button
    onClick={() => setActiveTab("workforce-intelligence")}
    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
  >
                <span>View Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptChartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
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
                  <Legend wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
                  <Bar name="Average Competency (%)" dataKey="competency" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar name="AI/ML Readiness (%)" dataKey="aiReadiness" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar name="Training Completion (%)" dataKey="completion" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>DIID exhibits highest overall technical readiness (76% avg)</span>
            <span className="text-rose-600 font-semibold">FOD and SSD require spatial tool interventions</span>
          </div>
        </div>

        {
    /* Right: Emerging Skills Velocity */
  }
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Emerging Skill Velocity</h3>
                <p className="text-xs text-slate-500">12-Month Projected Growth</p>
              </div>
              <button
    onClick={() => setActiveTab("emerging-skills")}
    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
  >
                Forecasts →
              </button>
            </div>

            <div className="space-y-3">
              {emergingSkills.slice(0, 5).map((skill, idx) => <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                    <p className="text-[10px] text-slate-500">{skill.demandLevel} Demand</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ↑ {skill.growthRate}%
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">Readiness: {skill.currentReadiness}%</p>
                  </div>
                </div>)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
            <button
    onClick={() => setActiveTab("emerging-skills")}
    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-center block transition-all"
  >
              Explore Predictive Workforce Model
            </button>
          </div>
        </div>
      </div>

      {
    /* AI Workforce Insights Summary Cards */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">
              Autonomous AI Workforce Insights & Recommended Interventions
            </h3>
          </div>
          <button
    onClick={() => setActiveTab("ai-workforce-insights")}
    className="text-xs font-semibold text-blue-600 hover:text-blue-800"
  >
            All Insights →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.slice(0, 2).map((ins) => <div
    key={ins.id}
    className="p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white space-y-2"
  >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${ins.priority === "Urgent" ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"}`}>
                  {ins.priority} Priority
                </span>
                <span className="text-[11px] font-bold text-slate-700">{ins.metricHighlight}</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900">{ins.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{ins.summary}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-900 font-semibold flex items-center gap-1">
                <span>Proposed Action:</span>
                <span className="text-slate-700 font-normal">{ins.recommendedIntervention}</span>
              </div>
            </div>)}
        </div>
      </div>

      {
    /* Executive Report Modal */
  }
      {showReportModal && reportData && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2.5 py-0.5 rounded uppercase">
                  Confidential • Government of India
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">{reportData.reportTitle}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Generated on: {reportData.generatedAt}</p>
              </div>
              <button
    onClick={() => setShowReportModal(false)}
    className="text-slate-400 hover:text-slate-700 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg"
  >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 uppercase tracking-wider text-[11px] mb-1">
                  1. Executive Summary
                </h4>
                <p>{reportData.executiveSummary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  2. Key Empirical Findings
                </h4>
                <ul className="space-y-1.5 list-disc pl-5">
                  {reportData.keyFindings.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  3. Strategic Interventions Recommended for MoSPI
                </h4>
                <ul className="space-y-1.5 list-disc pl-5">
                  {reportData.priorityInterventions.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Digitally Signed by DIID AI Capacity Building Engine
              </span>
              <button
    onClick={() => {
      window.print();
    }}
    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
  >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Download Dossier</span>
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
