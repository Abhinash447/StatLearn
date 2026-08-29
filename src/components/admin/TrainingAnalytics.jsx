import { AnalyticsService } from "../../services/analyticsService";
import { LineChart, Star } from "lucide-react";
export const TrainingAnalytics = () => {
  const effectiveness = AnalyticsService.getCourseEffectiveness();
  return <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <LineChart className="w-7 h-7 text-indigo-600" />
          Training Effectiveness & Capacity Building ROI
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Quantitative impact assessment comparing pre- and post-training psychometric metrics across iGOT and NSSTA programmes.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Course Effectiveness & Competency Uplift Ranking</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-y border-slate-200 uppercase text-[10px]">
                <th className="py-3 px-4">Programme Title</th>
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Total Enrollments</th>
                <th className="py-3 px-4">Completion Rate</th>
                <th className="py-3 px-4">Avg Assessment Score</th>
                <th className="py-3 px-4">Competency Improvement Delta</th>
                <th className="py-3 px-4">Learner Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {effectiveness.map((c, i) => <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{c.courseTitle}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{c.provider}</td>
                  <td className="py-3 px-4 text-slate-700 font-mono">{c.enrollments.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-emerald-700">{c.completionRate}%</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{c.avgScore}%</td>
                  <td className="py-3 px-4">
                    <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +{c.competencyImprovementDelta}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {c.learnerRating}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
