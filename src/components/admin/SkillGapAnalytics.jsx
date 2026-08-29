import { useApp } from "../../context/AppContext";
import { TrendingDown } from "lucide-react";

export const SkillGapAnalytics = () => {
  const { t } = useApp();

  const enterpriseGaps = [
    { name: "AI & Machine Learning", gapAvg: 40, impacted: "1,850 Officials", priority: "Critical", intervention: "Deploy 4-week iGOT ML cohort with Wadhwani AI" },
    { name: "Cloud Computing (MeghRaj GI Cloud)", gapAvg: 38, impacted: "1,620 Officials", priority: "Critical", intervention: "NIC Cloud infrastructure bootcamps" },
    { name: "GIS & Spatial Analytics", gapAvg: 28, impacted: "1,410 Officials", priority: "High", intervention: "NSSTA Greater Noida residential QGIS labs" },
    { name: "Python Automated Tabulation", gapAvg: 24, impacted: "1,290 Officials", priority: "Medium", intervention: "PLFS & ASI automated scripting cohorts" },
    { name: "APIs & Open Data Feeds", gapAvg: 18, impacted: "940 Officials", priority: "Medium", intervention: "SDMX & RESTful microdata exchange webinars" },
    { name: "Data Privacy (DPDP Act 2023)", gapAvg: 12, impacted: "720 Officials", priority: "Low", intervention: "Mandatory compliance self-paced e-learning" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <TrendingDown className="w-7 h-7 text-rose-600" />
          Enterprise Skill Gap Analytics & Interventions
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Aggregated capability deficit modeling across 2,486 officials with policy recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {enterpriseGaps.map((gap, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${gap.priority === "Critical" ? "bg-rose-100 text-rose-800" : gap.priority === "High" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                  {gap.priority} {t("highPriority")?.includes("Priority") ? "Priority" : ""}
                </span>
                <span className="text-base font-black text-rose-600">{gap.gapAvg}% {t("gapDeficit") || "Avg Gap"}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">{gap.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Impacts {gap.impacted} across MoSPI</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block mb-1">{t("recommendedAction") || "Recommended Policy Intervention:"}</span>
              <p className="text-slate-600 leading-relaxed">{gap.intervention}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
