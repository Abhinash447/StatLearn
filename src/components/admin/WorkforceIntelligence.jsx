import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AnalyticsService } from "../../services/analyticsService";
import {
  Users,
  Search
} from "lucide-react";

export const WorkforceIntelligence = () => {
  const { t } = useApp();
  const departments = AnalyticsService.getDepartments();
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const demoOfficials = [
    { id: "usr-10492", name: "Priya Sharma", designation: "Statistical Officer", department: "National Sample Survey (NSS)", competency: 72, aiReadiness: 35, topGap: "AI/ML (40%)", status: "Enrolled in Python" },
    { id: "usr-10493", name: "Rajesh Nair", designation: "Senior Statistical Officer", department: "National Sample Survey (NSS)", competency: 76, aiReadiness: 45, topGap: "GIS (25%)", status: "Completed Sampling" },
    { id: "usr-10494", name: "Ananya Roy", designation: "Assistant Director", department: "Economic Statistics Division (ESD)", competency: 81, aiReadiness: 55, topGap: "Cloud (20%)", status: "Completed SDMX" },
    { id: "usr-10495", name: "Vikram Singh", designation: "Statistical Officer", department: "Economic Statistics Division (ESD)", competency: 67, aiReadiness: 38, topGap: "Python (28%)", status: "In Progress" },
    { id: "usr-10496", name: "Sunita Patel", designation: "Joint Director", department: "Data Informatics & Innovation Division (DIID)", competency: 88, aiReadiness: 82, topGap: "DPDP Act (10%)", status: "Master Certified" },
    { id: "usr-10497", name: "Karthik Raman", designation: "Systems Analyst", department: "Data Informatics & Innovation Division (DIID)", competency: 84, aiReadiness: 78, topGap: "GIS (15%)", status: "Completed Cloud" },
    { id: "usr-10498", name: "Meenakshi Iyer", designation: "Statistical Officer", department: "National Accounts Division (NAD)", competency: 69, aiReadiness: 32, topGap: "AI/ML (45%)", status: "Enrolled in ML" },
    { id: "usr-10499", name: "Amitabh Sen", designation: "Deputy Director", department: "National Accounts Division (NAD)", competency: 78, aiReadiness: 48, topGap: "Open Data (18%)", status: "Nominated NSSTA" },
    { id: "usr-10500", name: "Pooja Hegde", designation: "Statistical Officer", department: "Social Statistics Division (SSD)", competency: 64, aiReadiness: 28, topGap: "GIS (35%)", status: "Pending Training" },
    { id: "usr-10501", name: "Manoj Bajpai", designation: "Assistant Director", department: "Social Statistics Division (SSD)", competency: 71, aiReadiness: 40, topGap: "Data Viz (22%)", status: "In Progress" },
    { id: "usr-10502", name: "Deepak Chawla", designation: "Field Superintendent", department: "Field Operations Division (FOD)", competency: 63, aiReadiness: 25, topGap: "CAPI (30%)", status: "Enrolled in Leadership" },
    { id: "usr-10503", name: "Geeta Kumari", designation: "Statistical Officer", department: "Field Operations Division (FOD)", competency: 66, aiReadiness: 30, topGap: "Data Quality (20%)", status: "Completed Quality" }
  ];

  const filteredOfficials = demoOfficials.filter((off) => {
    const matchesDept = selectedDept === "all" || off.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = off.name.toLowerCase().includes(searchQuery.toLowerCase()) || off.designation.toLowerCase().includes(searchQuery.toLowerCase()) || off.topGap.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-blue-600" />
            Workforce Intelligence & Departmental Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise roster tracking individual official competencies, AI readiness indices, and active training enrollments.
          </p>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <div
            key={dept.code}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded">
                  {dept.code}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-1">{dept.name}</h3>
              </div>
              <span className="text-xs text-slate-500 font-bold">{dept.officialsCount} Officers</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-slate-100">
              <div className="bg-slate-50 p-2 rounded-lg">
                <p className="text-[10px] text-slate-400">Avg Skill</p>
                <p className="font-bold text-slate-900">{dept.avgCompetency}%</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg">
                <p className="text-[10px] text-purple-600 font-semibold">AI Ready</p>
                <p className="font-bold text-purple-900">{dept.aiReadiness}%</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-lg">
                <p className="text-[10px] text-emerald-600 font-semibold">Training</p>
                <p className="font-bold text-emerald-900">{dept.trainingCompletion}%</p>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Top Gaps: <strong className="text-rose-600">{dept.topGaps.join(", ")}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {/* Personnel Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 text-base">Statistical Cadre Personnel Dossier</h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchPlaceholderLearner") || "Search official name, role..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:outline-none"
            >
              <option value="all">All Divisions</option>
              <option value="Sample Survey">NSS</option>
              <option value="Economic">ESD</option>
              <option value="Informatics">DIID</option>
              <option value="Accounts">NAD</option>
              <option value="Social">SSD</option>
              <option value="Field">FOD</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-y border-slate-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">{t("fullNameLabel") || "Official Name"}</th>
                <th className="py-3 px-4">{t("designationLabel") || "Designation"}</th>
                <th className="py-3 px-4">{t("departmentLabel") || "Department"}</th>
                <th className="py-3 px-4">{t("kpiOverallCompetency") || "Competency"}</th>
                <th className="py-3 px-4">{t("aiReadiness") || "AI Readiness"}</th>
                <th className="py-3 px-4">{t("gapDeficit") || "Top Capability Gap"}</th>
                <th className="py-3 px-4">{t("kpiLearningProgress") || "Training Status"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOfficials.map((off) => (
                <tr key={off.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{off.name}</td>
                  <td className="py-3 px-4 text-slate-600">{off.designation}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{off.department}</td>
                  <td className="py-3 px-4">
                    <span className={`font-black ${off.competency >= 75 ? "text-emerald-600" : "text-blue-600"}`}>
                      {off.competency}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-black ${off.aiReadiness >= 50 ? "text-purple-600" : "text-rose-600"}`}>
                      {off.aiReadiness}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-rose-700 font-semibold">{off.topGap}</td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded">
                      {off.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
