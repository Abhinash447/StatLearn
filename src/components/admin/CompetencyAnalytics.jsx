import { useApp } from "../../context/AppContext";
import { AnalyticsService } from "../../services/analyticsService";
import { BarChart3 } from "lucide-react";

export const CompetencyAnalytics = () => {
  const { t } = useApp();
  const departments = AnalyticsService.getDepartments();

  const heatmapData = [
    { skill: "Sampling & Survey Design", nss: 82, esd: 74, diid: 70, nad: 68, ssd: 72, fod: 78 },
    { skill: "Data Quality (GSBPM)", nss: 80, esd: 72, diid: 84, nad: 70, ssd: 66, fod: 65 },
    { skill: "Python & Automation", nss: 58, esd: 64, diid: 85, nad: 54, ssd: 48, fod: 36 },
    { skill: "AI & Machine Learning", nss: 38, esd: 44, diid: 68, nad: 36, ssd: 34, fod: 28 },
    { skill: "GIS Spatial Mapping", nss: 44, esd: 36, diid: 62, nad: 30, ssd: 40, fod: 32 },
    { skill: "Cloud & APIs", nss: 35, esd: 48, diid: 82, nad: 40, ssd: 32, fod: 24 },
    { skill: "Data Privacy & DPDP", nss: 68, esd: 70, diid: 88, nad: 66, ssd: 64, fod: 60 },
    { skill: "Ethics & Integrity", nss: 86, esd: 84, diid: 85, nad: 86, ssd: 82, fod: 88 }
  ];

  const getHeatmapColor = (score) => {
    if (score >= 80) return "bg-emerald-600 text-white font-bold";
    if (score >= 65) return "bg-blue-600 text-white font-semibold";
    if (score >= 50) return "bg-amber-400 text-slate-950 font-bold";
    return "bg-rose-500 text-white font-bold";
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-blue-600" />
            Enterprise Competency Analytics & Heatmap
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cross-departmental proficiency mapping across 2,486 officials and 4 standard MoSPI tiers.
          </p>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Cross-Divisional Competency Heatmap</h3>
          <p className="text-xs text-slate-500">Color-coded proficiency indices across central divisions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-y border-slate-200 uppercase text-[10px]">
                <th className="py-3 px-4 text-left">{t("kpiOverallCompetency") || "Competency Area"}</th>
                <th className="py-3 px-3">NSS (840)</th>
                <th className="py-3 px-3">ESD (420)</th>
                <th className="py-3 px-3">DIID (290)</th>
                <th className="py-3 px-3">NAD (310)</th>
                <th className="py-3 px-3">SSD (380)</th>
                <th className="py-3 px-3">FOD (246)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {heatmapData.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-sans font-bold text-slate-800 text-left">{row.skill}</td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.nss)}`}>{row.nss}%</span></td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.esd)}`}>{row.esd}%</span></td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.diid)}`}>{row.diid}%</span></td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.nad)}`}>{row.nad}%</span></td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.ssd)}`}>{row.ssd}%</span></td>
                  <td className="p-2"><span className={`inline-block w-12 py-1 rounded ${getHeatmapColor(row.fod)}`}>{row.fod}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-end gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600" /> {t("expertLevel") || "Expert"} (&ge;80%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-600" /> {t("advancedLevel") || "Advanced"} (65-79%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400" /> {t("intermediateLevel") || "Intermediate"} (50-64%)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500" /> {t("criticalGaps") || "Critical Deficit"} (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
};
