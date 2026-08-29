import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Award,
  Search,
  Filter,
  Sparkles,
  HelpCircle
} from "lucide-react";
export const MyCompetencies = () => {
  const { competencies, setActiveTab } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = [
    { id: "all", label: "All Categories", count: competencies.length },
    { id: "statistical", label: "Statistical Competencies", count: competencies.filter((c) => c.category === "statistical").length },
    { id: "technical", label: "Technical Competencies", count: competencies.filter((c) => c.category === "technical").length },
    { id: "governance", label: "Digital Governance", count: competencies.filter((c) => c.category === "governance").length },
    { id: "behavioral", label: "Behavioural & Managerial", count: competencies.filter((c) => c.category === "behavioral").length }
  ];
  const filtered = competencies.filter((comp) => {
    const matchesCat = activeCategory === "all" || comp.category === activeCategory;
    const matchesLvl = activeLevel === "all" || comp.level.toLowerCase() === activeLevel.toLowerCase();
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesLvl && matchesSearch;
  });
  const getLevelBadgeColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Advanced":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Beginner":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Unassessed":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "High":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };
  return <div className="space-y-6 max-w-7xl mx-auto">
      {
    /* Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Award className="w-7 h-7 text-blue-600" />
            Official Competency Framework & Scores
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Standardized multi-tier evaluation aligned with MoSPI Statistical Cadre & Capacity Building Commission guidelines.
          </p>
        </div>

        <button
    onClick={() => setActiveTab("assessment")}
    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all self-start sm:self-auto"
  >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Launch AI Assessment</span>
        </button>
      </div>

      {
    /* Filter and Search Bar */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        {
    /* Category Tabs */
  }
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => <button
    key={cat.id}
    onClick={() => setActiveCategory(cat.id)}
    className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeCategory === cat.id ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
  >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === cat.id ? "bg-blue-700 text-blue-100" : "bg-slate-200 text-slate-600"}`}>
                {cat.count}
              </span>
            </button>)}
        </div>

        {
    /* Search & Level Filters */
  }
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
    type="text"
    placeholder="Search competencies by title, description or method..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
  />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={activeLevel}
              onChange={(e) => setActiveLevel(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Proficiency Levels</option>
              <option value="unassessed">Unassessed (0%)</option>
              <option value="beginner">Beginner (&lt;50%)</option>
              <option value="intermediate">Intermediate (50-69%)</option>
              <option value="advanced">Advanced (70-84%)</option>
              <option value="expert">Expert (85%+)</option>
            </select>
          </div>
        </div>
      </div>

      {
    /* Competencies Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((comp) => {
    const isGapCritical = comp.priority === "Critical";
    const isGapHigh = comp.priority === "High";
    return <div
      key={comp.id}
      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md ${isGapCritical ? "border-rose-200 hover:border-rose-300 ring-1 ring-rose-100" : isGapHigh ? "border-amber-200 hover:border-amber-300 ring-1 ring-amber-100" : "border-slate-200 hover:border-blue-300"}`}
    >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${comp.category === "statistical" ? "bg-blue-50 text-blue-800 border-blue-200" : comp.category === "technical" ? "bg-indigo-50 text-indigo-800 border-indigo-200" : comp.category === "governance" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-purple-50 text-purple-800 border-purple-200"}`}>
                    {comp.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getLevelBadgeColor(comp.level)}`}>
                      {comp.level}
                    </span>
                    {comp.gap > 0 && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getPriorityBadgeColor(comp.priority)}`}>
                        {comp.priority}
                      </span>}
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{comp.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                {
      /* Visual Progress Bar */
    }
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Current Score:</span>
                  <span className="font-extrabold text-slate-900">{comp.currentScore}%</span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  <div
      className={`h-full rounded-full transition-all ${comp.currentScore >= 80 ? "bg-emerald-500" : comp.currentScore >= 60 ? "bg-blue-600" : comp.currentScore >= 40 ? "bg-amber-500" : "bg-rose-500"}`}
      style={{ width: `${comp.currentScore}%` }}
    />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Role Req: <strong className="text-slate-700">{comp.requiredScore}%</strong></span>
                  <span className={comp.gap > 0 ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>
                    {comp.gap > 0 ? `Gap: -${comp.gap}%` : "\u2713 Benchmark Met"}
                  </span>
                </div>
              </div>
            </div>;
  })}
      </div>

      {filtered.length === 0 && <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-700 font-semibold text-sm">No competencies match your search filter.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting "All Categories".</p>
        </div>}
    </div>;
};
