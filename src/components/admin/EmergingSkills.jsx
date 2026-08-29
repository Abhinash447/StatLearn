import { AnalyticsService } from "../../services/analyticsService";
import { Zap } from "lucide-react";
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
export const EmergingSkills = () => {
  const emergingSkills = AnalyticsService.getEmergingSkills();
  const chartData = emergingSkills.map((s) => ({
    name: s.name.replace(" & Machine Learning", "/ML").replace(" & Python Automation", "").replace(" & Sovereign Infra", "").replace(" & Open APIs", "").replace(" & Data Privacy (DPDP)", "").replace(" & Remote Sensing Analytics", ""),
    current: s.currentReadiness,
    projected: s.projectedDemand2027,
    growth: s.growthRate
  }));
  return <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
            AI Forecast Engine
          </span>
          <span className="text-xs text-slate-500">2026–2028 Strategic Outlook</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Zap className="w-7 h-7 text-amber-500" />
          Emerging Skills Velocity & Predictive Workforce Demand
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Machine learning econometric models predicting official statistical capacity demands over the next 12–24 months.
        </p>
      </div>

      {
    /* AI Forecast Alert Banners */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              AI Forecast • High Confidence
            </span>
            <span className="text-amber-300 font-bold text-xs">+38% Demand Surge</span>
          </div>
          <h4 className="font-bold text-sm text-white">
            AI & Machine Learning Competency Surge
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            AI/ML competency demand across MoSPI is projected to expand by <strong className="text-amber-400">38%</strong> over the next 12 months, driven by automated survey imputation and NLP classification of occupational descriptions.
          </p>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="bg-emerald-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
              AI Forecast • Infrastructure
            </span>
            <span className="text-emerald-300 font-bold text-xs">+27% Demand Surge</span>
          </div>
          <h4 className="font-bold text-sm text-white">
            Government Cloud Architecture Transition
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cloud Computing is projected to become a mandatory baseline competency for all analytical roles as survey microdata processing migrates to sovereign NIC MeghRaj GI Cloud infrastructure.
          </p>
        </div>
      </div>

      {
    /* Predictive Comparison Chart */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Current Readiness vs. 2027 Projected Demand</h3>
            <p className="text-xs text-slate-500">Predicted capacity requirements calculated from DIID technology roadmap</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Simulated via SARIMA & Logistic Trends</span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
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
              <Bar name="Current Workforce Readiness (%)" dataKey="current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar name="Projected 2027 Strategic Demand (%)" dataKey="projected" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {
    /* Strategic Skills Detail Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {emergingSkills.map((skill, idx) => <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-xs font-bold text-slate-900">{skill.name}</span>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ↑ {skill.growthRate}%
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{skill.strategicRelevance}</p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Readiness: <strong className="text-slate-800">{skill.currentReadiness}%</strong></span>
              <span>Projected: <strong className="text-amber-600">{skill.projectedDemand2027}%</strong></span>
            </div>
          </div>)}
      </div>
    </div>;
};
