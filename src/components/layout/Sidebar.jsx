import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  User,
  Award,
  ClipboardCheck,
  TrendingDown,
  Compass,
  BookOpenCheck,
  GraduationCap,
  Sparkles,
  History,
  Bot,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Zap,
  FileText,
  ChevronRight,
  ShieldCheck,
  Building2,
  X,
  Radio,
  CheckCircle2
} from "lucide-react";

export const Sidebar = () => {
  const { role, activeTab, setActiveTab, skillGaps, isSidebarOpen, setIsSidebarOpen, t } = useApp();
  const criticalGapsCount = skillGaps.filter((g) => g.priority === "Critical").length;

  const learnerSections = [
    {
      title: t("sectionCoreProfile") || "Core & Profile",
      items: [
        {
          id: "dashboard",
          label: t("navDashboard"),
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: "profile",
          label: t("navProfile"),
          icon: User,
          badge: null
        },
        {
          id: "competencies",
          label: t("navCompetencies"),
          icon: Award,
          badge: "23",
          badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-400/30"
        }
      ]
    },
    {
      title: t("sectionDiagnostics") || "Diagnostics & Gap Engine",
      items: [
        {
          id: "assessment",
          label: t("navAssessment"),
          icon: ClipboardCheck,
          badge: "AI",
          badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold"
        },
        {
          id: "skill-gaps",
          label: t("navSkillGaps"),
          icon: TrendingDown,
          badge: criticalGapsCount > 0 ? `${criticalGapsCount}` : null,
          badgeColor: "bg-rose-500 text-white font-bold animate-pulse"
        },
        {
          id: "learning-path",
          label: t("navLearningPath"),
          icon: Compass,
          badge: "5",
          badgeColor: "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
        }
      ]
    },
    {
      title: t("sectionPlatforms") || "Integrated Platforms",
      items: [
        {
          id: "igot-courses",
          label: t("navIgotCourses"),
          icon: BookOpenCheck,
          badge: "LIVE",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold"
        },
        {
          id: "nssta-training",
          label: t("navNsstaTraining"),
          icon: GraduationCap,
          badge: "TPAC",
          badgeColor: "bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold"
        }
      ]
    },
    {
      title: t("sectionAiDrills") || "AI Drills & Copilot",
      items: [
        {
          id: "quiz-generator",
          label: t("navQuizGenerator"),
          icon: Sparkles,
          badge: "GenAI",
          badgeColor: "bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black shadow-sm"
        },
        {
          id: "my-assessments",
          label: t("navMyAssessments"),
          icon: History,
          badge: null
        },
        {
          id: "ai-assistant",
          label: t("navAiAssistant"),
          icon: Bot,
          badge: "24/7 AI",
          badgeColor: "bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 font-bold"
        }
      ]
    }
  ];

  const adminSections = [
    {
      title: t("sectionExecutive") || "Executive Suite",
      items: [
        {
          id: "admin-dashboard",
          label: t("navDashboard"),
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: "workforce-intelligence",
          label: t("navWorkforceIntelligence"),
          icon: Users,
          badge: "2,486",
          badgeColor: "bg-blue-500/20 text-blue-300 border border-blue-400/30"
        }
      ]
    },
    {
      title: t("sectionAnalytics") || "Analytics & Monitoring",
      items: [
        {
          id: "competency-analytics",
          label: t("navCompetencyAnalytics"),
          icon: BarChart3,
          badge: "Heatmap",
          badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-400/30 font-medium"
        },
        {
          id: "skill-gap-analytics",
          label: t("navSkillGapAnalytics"),
          icon: PieChart,
          badge: "14",
          badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-400/30"
        },
        {
          id: "training-analytics",
          label: t("navTrainingAnalytics"),
          icon: LineChart,
          badge: "74%",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
        }
      ]
    },
    {
      title: t("sectionStrategic") || "Strategic Foresight",
      items: [
        {
          id: "emerging-skills",
          label: t("navEmergingSkills"),
          icon: Zap,
          badge: "+38%",
          badgeColor: "bg-amber-400 text-slate-950 font-black shadow-sm"
        },
        {
          id: "ai-workforce-insights",
          label: t("navAiWorkforceInsights"),
          icon: FileText,
          badge: "Report",
          badgeColor: "bg-indigo-600 text-white font-bold shadow-sm"
        }
      ]
    }
  ];

  const sections = role === "admin" ? adminSections : learnerSections;

  return (
    <aside
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={`fixed top-0 bottom-0 left-0 w-72 sm:w-80 bg-slate-950/95 backdrop-blur-2xl text-slate-200 flex flex-col flex-shrink-0 border-r border-slate-800/80 select-none h-full shadow-[0_0_50px_rgba(0,0,0,0.6)] z-50 transition-all duration-300 ease-out transform ${
        isSidebarOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "-translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Header Banner Card */}
      <div className="p-3.5 pt-4 pb-3 flex-shrink-0 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-slate-950/60">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/70 to-slate-900 border border-slate-700/60 shadow-lg shadow-black/40">
          <div className="flex items-center gap-3 min-w-0">
            {role === "admin" ? (
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 flex-shrink-0">
                <Building2 className="w-5 h-5 stroke-[2.5]" />
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-black text-white uppercase tracking-wider truncate">
                  {role === "admin" ? t("adminRole") : t("officialCadre")}
                </h3>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                {role === "admin" ? "MoSPI Executive Command" : t("nationalStatisticalPortal")}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/60 border border-transparent hover:border-slate-600 transition-all flex-shrink-0"
            title="Close navigation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-3 px-3 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400/80 flex items-center justify-between">
              <span>{section.title}</span>
              <div className="h-px bg-slate-800/80 flex-1 ml-3" />
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/30 ring-1 ring-white/20 translate-x-1"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-700/50"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                    </div>
                    <span className="truncate text-left">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold tracking-tight shadow-sm ${
                          isActive
                            ? "bg-white/25 text-white ring-1 ring-white/30"
                            : item.badgeColor || "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive ? (
                      <ChevronRight className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-400 transition-all flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Connectivity Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 text-[11px] text-slate-400 space-y-2 flex-shrink-0">
        <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-300 text-[10px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              iGOT Karmayogi API
            </span>
            <span className="text-[9px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/40 font-mono font-semibold">
              {t("liveConnected") || "Live Connected"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-300 text-[10px] font-medium">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              NSSTA TPAC Sync
            </span>
            <span className="text-[9px] bg-sky-950/80 text-sky-300 px-2 py-0.5 rounded-full border border-sky-700/40 font-mono font-semibold">
              {t("synced") || "v2.4 Synced"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 text-[9px] text-slate-400">
          <span>{t("mospiGovEnterprise") || "MoSPI Gov Enterprise"}</span>
          <span>{t("securityLayerActive") || "Security Layer Active"}</span>
        </div>
      </div>
    </aside>
  );
};
