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
  Building2
} from "lucide-react";
export const Sidebar = () => {
  const { role, activeTab, setActiveTab, skillGaps, t } = useApp();
  const criticalGapsCount = skillGaps.filter((g) => g.priority === "Critical").length;
  const learnerNavItems = [
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
      badge: "23"
    },
    {
      id: "assessment",
      label: t("navAssessment"),
      icon: ClipboardCheck,
      badge: "AI"
    },
    {
      id: "skill-gaps",
      label: t("navSkillGaps"),
      icon: TrendingDown,
      badge: criticalGapsCount > 0 ? `${criticalGapsCount}` : null,
      badgeColor: "bg-rose-500 text-white"
    },
    {
      id: "learning-path",
      label: t("navLearningPath"),
      icon: Compass,
      badge: "5"
    },
    {
      id: "igot-courses",
      label: t("navIgotCourses"),
      icon: BookOpenCheck,
      badge: "Live"
    },
    {
      id: "nssta-training",
      label: t("navNsstaTraining"),
      icon: GraduationCap,
      badge: "TPAC"
    },
    {
      id: "quiz-generator",
      label: t("navQuizGenerator"),
      icon: Sparkles,
      badge: "AI",
      badgeColor: "bg-amber-400 text-slate-950 font-bold"
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
      badge: "AI",
      badgeColor: "bg-emerald-400 text-slate-950 font-bold"
    }
  ];
  const adminNavItems = [
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
      badge: "2,486"
    },
    {
      id: "competency-analytics",
      label: t("navCompetencyAnalytics"),
      icon: BarChart3,
      badge: "Heatmap"
    },
    {
      id: "skill-gap-analytics",
      label: t("navSkillGapAnalytics"),
      icon: PieChart,
      badge: "14"
    },
    {
      id: "training-analytics",
      label: t("navTrainingAnalytics"),
      icon: LineChart,
      badge: "74%"
    },
    {
      id: "emerging-skills",
      label: t("navEmergingSkills"),
      icon: Zap,
      badge: "+38%",
      badgeColor: "bg-amber-400 text-slate-950 font-bold"
    },
    {
      id: "ai-workforce-insights",
      label: t("navAiWorkforceInsights"),
      icon: FileText,
      badge: "Report",
      badgeColor: "bg-indigo-600 text-white"
    }
  ];
  const navItems = role === "admin" ? adminNavItems : learnerNavItems;
  return <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col flex-shrink-0 border-r border-slate-800 select-none h-full shadow-lg z-20">
      {
    /* Role Header Banner */
  }
      <div className="p-4 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          {role === "admin" ? <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-inner">
              <ShieldCheck className="w-5 h-5" />
            </div> : <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-inner">
              <Building2 className="w-5 h-5" />
            </div>}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {role === "admin" ? t("adminRole") : t("officialCadre")}
            </h3>
            <p className="text-[10px] text-slate-400">
              {role === "admin" ? t("navWorkforceIntelligence") : "Official Portal"}
            </p>
          </div>
        </div>
      </div>

      {
    /* Navigation List - Scrolls independently inside the sidebar if needed */
  }
      <div className="flex-1 py-3 px-2 overflow-y-auto space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {role === "admin" ? "Executive Analytics" : "Official Navigation"}
        </div>

        {navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return <button
      key={item.id}
      onClick={() => setActiveTab(item.id)}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${isActive ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
    >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-amber-400"}`} />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {item.badge && <span
      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.badgeColor || (isActive ? "bg-blue-700 text-blue-100" : "bg-slate-800 text-slate-300")}`}
    >
                    {item.badge}
                  </span>}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
              </div>
            </button>;
  })}
      </div>

      {
    /* Stable Footer status strip */
  }
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 space-y-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            iGOT Karmayogi
          </span>
          <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/40 font-mono">
            Connected
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-300 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            NSSTA TPAC
          </span>
          <span className="text-[9px] bg-sky-950 text-sky-300 px-1.5 py-0.5 rounded border border-sky-800/40 font-mono">
            Synced
          </span>
        </div>
      </div>
    </aside>;
};
