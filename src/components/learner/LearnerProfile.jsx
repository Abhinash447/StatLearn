import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  MapPin,
  Save,
  CheckCircle2,
  Sparkles
} from "lucide-react";
export const LearnerProfile = () => {
  const { user, updateProfile, competencies, overallCompetency, setActiveTab } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    designation: user?.designation || "",
    department: user?.department || "",
    currentAssignment: user?.currentAssignment || "",
    education: user?.education || "",
    experienceYears: user?.experienceYears || 0,
    location: user?.location || "",
    previousTrainingText: Array.isArray(user?.previousTraining) ? user.previousTraining.join("\n") : ""
  });
  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      designation: formData.designation,
      department: formData.department,
      currentAssignment: formData.currentAssignment,
      education: formData.education,
      experienceYears: Number(formData.experienceYears),
      location: formData.location,
      previousTraining: formData.previousTrainingText.split("\n").map((s) => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };
  return <div className="space-y-6 max-w-5xl mx-auto">
      {
    /* Profile Header Card */
  }
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-500/20">
              {(user?.name || "Official User").split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{user?.name || "Official User"}</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Official
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-700 mt-0.5">{user?.designation || "Statistical Officer"}</p>
              <p className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> {user?.department || "National Sample Survey (NSS)"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {user.location}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
    onClick={() => setIsEditing(!isEditing)}
    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isEditing ? "bg-slate-200 text-slate-800 hover:bg-slate-300" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`}
  >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
            <button
    onClick={() => setActiveTab("assessment")}
    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
  >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>
        </div>

        {
    /* Quick summary strip */
  }
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[11px] text-slate-500">Employee ID</p>
            <p className="font-mono font-bold text-xs text-slate-800">{user.employeeId}</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[11px] text-slate-500">Service Experience</p>
            <p className="font-bold text-xs text-slate-800">{user.experienceYears} Years</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[11px] text-slate-500">Overall Competency</p>
            <p className="font-bold text-xs text-blue-600">{overallCompetency}%</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-[11px] text-slate-500">Verified Skills</p>
            <p className="font-bold text-xs text-emerald-600">{competencies.length} MoSPI Areas</p>
          </div>
        </div>
      </div>

      {
    /* Main Profile Form / Details */
  }
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Official Designation & Educational Dossier
        </h3>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Official Full Name
              </label>
              <input
    type="text"
    disabled={!isEditing}
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Official Email Address (gov.in)
              </label>
              <div className="relative">
                <input
    type="email"
    disabled
    value={user.email}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 bg-slate-100 font-mono cursor-not-allowed"
  />
                <Mail className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Designation
              </label>
              <input
    type="text"
    disabled={!isEditing}
    value={formData.designation}
    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Department / Division
              </label>
              <input
    type="text"
    disabled={!isEditing}
    value={formData.department}
    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Official Assignment
              </label>
              <input
    type="text"
    disabled={!isEditing}
    value={formData.currentAssignment}
    onChange={(e) => setFormData({ ...formData, currentAssignment: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Educational Qualifications
              </label>
              <div className="relative">
                <input
    type="text"
    disabled={!isEditing}
    value={formData.education}
    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
                <GraduationCap className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Total Years of Statistical Experience
              </label>
              <input
    type="number"
    min="0"
    max="40"
    disabled={!isEditing}
    value={formData.experienceYears}
    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Duty Location / Office
              </label>
              <input
    type="text"
    disabled={!isEditing}
    value={formData.location}
    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75"
  />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Previous Formal Training & Certifications (One per line)</span>
              <span className="text-[11px] text-slate-400 font-normal">Used by AI Recommendation Engine</span>
            </label>
            <textarea
    rows={4}
    disabled={!isEditing}
    value={formData.previousTrainingText}
    onChange={(e) => setFormData({ ...formData, previousTrainingText: e.target.value })}
    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-75 font-sans leading-relaxed"
  />
          </div>

          {isEditing && <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
    type="button"
    onClick={() => setIsEditing(false)}
    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-all"
  >
                Discard Changes
              </button>
              <button
    type="submit"
    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
  >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>}
        </form>
      </div>
    </div>;
};
