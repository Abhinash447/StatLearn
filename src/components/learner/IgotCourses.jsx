import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  BookOpenCheck,
  Search,
  ExternalLink,
  Clock,
  Sparkles,
  X,
  Play
} from "lucide-react";
export const IgotCourses = () => {
  const { igotCourses, enrollInIGOT, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [activeCourseModal, setActiveCourseModal] = useState(null);
  const filteredCourses = igotCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase()) || course.competencies.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.competencyCategory === selectedCategory;
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase();
    return matchesSearch && matchesCategory && matchesLevel;
  });
  return <div className="space-y-6 max-w-7xl mx-auto">
      {
    /* Ecosystem Header */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              🟢 Connected — Demo Integration
            </span>
            <span className="text-xs text-slate-500">Mission Karmayogi • CBC Certified</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <BookOpenCheck className="w-7 h-7 text-emerald-600" />
            iGOT Karmayogi Course Catalogue for MoSPI
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse competency-aligned official courses. Real-time recommendation scores reflect your live skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-right">
            <p className="text-[10px] text-slate-500 uppercase font-semibold">Enrolled Courses</p>
            <p className="text-lg font-black text-slate-900">
              {igotCourses.filter((c) => c.isEnrolled).length}
            </p>
          </div>
          <button
    onClick={() => setActiveTab("nssta-training")}
    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
  >
            <span>NSSTA Calendar</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {
    /* Filter & Search Bar */
  }
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
    type="text"
    placeholder="Search iGOT courses by title, skill, or department..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
  />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
  >
            <option value="all">All Domains</option>
            <option value="statistical">Statistical</option>
            <option value="technical">Technical</option>
            <option value="governance">Digital Governance</option>
            <option value="behavioral">Behavioural</option>
          </select>

          <select
    value={selectedLevel}
    onChange={(e) => setSelectedLevel(e.target.value)}
    className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
  >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {
    /* Courses Grid */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
    const isEnrolled = course.isEnrolled;
    const isHighMatch = course.matchScore >= 85;
    return <div
      key={course.id}
      className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md ${isHighMatch ? "border-emerald-300 ring-1 ring-emerald-100" : "border-slate-200"}`}
    >
              <div>
                {
      /* Top Badge Row */
    }
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {course.level}
                    </span>
                    {course.isAssessmentDriven && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-rose-600" />
                        Targeted Gap Remediator
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    {course.matchScore}% Match
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {course.provider}
                </p>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {course.matchRationale || course.description}
                </p>

                {
      /* Targeted Competency Badges */
    }
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.competencies.map((c, i) => <span key={i} className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                      {c}
                    </span>)}
                </div>

                {
      /* Progress bar if enrolled */
    }
                {isEnrolled && <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Course Progress</span>
                      <span className="font-bold text-emerald-700">{course.progress ?? 15}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
      className="bg-emerald-500 h-full rounded-full transition-all"
      style={{ width: `${course.progress ?? 15}%` }}
    />
                    </div>
                  </div>}
              </div>

              {
      /* Card Footer */
    }
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
      onClick={() => setActiveCourseModal(course)}
      className="px-2.5 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 text-xs font-semibold"
    >
                    Syllabus
                  </button>

                  {isEnrolled ? <button
      onClick={() => setActiveCourseModal(course)}
      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Continue</span>
                    </button> : <button
      onClick={() => enrollInIGOT(course.id)}
      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
    >
                      <span>Enroll</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>}
                </div>
              </div>
            </div>;
  })}
      </div>

      {
    /* Syllabus Details Modal */
  }
      {activeCourseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {activeCourseModal.provider}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{activeCourseModal.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Duration: {activeCourseModal.duration} • Level: {activeCourseModal.level}</p>
              </div>
              <button
    onClick={() => setActiveCourseModal(null)}
    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
  >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Course Overview</h4>
                <p className="text-slate-600 leading-relaxed">{activeCourseModal.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Curriculum Modules</h4>
                <div className="space-y-2">
                  {activeCourseModal.modules.map((mod, idx) => <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800">{mod}</span>
                    </div>)}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <span className="font-bold text-blue-900 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  AI Matching Rationale:
                </span>
                <p className="text-slate-700">{activeCourseModal.matchRationale}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
    onClick={() => setActiveCourseModal(null)}
    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100"
  >
                Close
              </button>
              {!activeCourseModal.isEnrolled && <button
    onClick={() => {
      enrollInIGOT(activeCourseModal.id);
      setActiveCourseModal(null);
    }}
    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
  >
                  <span>Confirm Enrollment</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>}
            </div>
          </div>
        </div>}
    </div>;
};
