import { useApp } from "../../context/AppContext";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  Award
} from "lucide-react";

export const NsstaTraining = () => {
  const { nsstaProgrammes, nominateInNSSTA, user, t } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Academy Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
              {t("nsstaTPACHeader")}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              {t("nsstaTitle")}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {t("nsstaSubtitle")}
            </p>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 text-center flex-shrink-0">
            <p className="text-xs text-slate-400">{t("targetRoleMatch")}</p>
            <p className="text-2xl font-black text-amber-400 mt-0.5">{user?.designation || "Statistical Officer"}</p>
            <p className="text-[11px] text-slate-300 mt-1">{t("nssEligibility")}</p>
          </div>
        </div>
      </div>

      {/* Programmes List */}
      <div className="space-y-5">
        {nsstaProgrammes.map((prog) => {
          const isNominated = prog.isNominated;
          const isHighMatch = prog.matchScore >= 90;
          return (
            <div
              key={prog.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-all ${isHighMatch ? "border-indigo-300 ring-1 ring-indigo-100" : "border-slate-200"}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
                      {prog.mode}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {t("duration")}: {prog.duration}
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {prog.matchScore}% {t("match")}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  {/* AI Rationale */}
                  <div className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 leading-relaxed">
                    <p className="font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {t("trainingRationale")}
                    </p>
                    <p>{prog.recommendationReason}</p>
                  </div>

                  {/* Metadata grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span><strong>{t("venue")}:</strong> {prog.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span><strong>{t("startDate")}:</strong> {prog.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span><strong>{t("eligibility")}:</strong> {prog.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span><strong>{t("faculty")}:</strong> {prog.faculty}</span>
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <div className="text-left lg:text-right text-xs">
                    <p className="text-slate-400 text-[10px]">{t("seatsAvailable")}</p>
                    <p className="text-lg font-black text-slate-800">{prog.seatsAvailable} {t("seats")}</p>
                  </div>

                  {isNominated ? (
                    <div className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t("nominationDispatched")}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => nominateInNSSTA(prog.id)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all whitespace-nowrap"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{t("submitNomination")}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
