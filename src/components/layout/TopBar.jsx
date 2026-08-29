import { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Bell,
  Search,
  Globe,
  UserCheck,
  ShieldCheck,
  LogOut,
  Sparkles,
  CheckCircle2,
  Layers
} from "lucide-react";
export const TopBar = () => {
  const {
    user,
    role,
    language,
    setLanguage,
    loginAsLearner,
    loginAsAdmin,
    logout,
    setActiveTab,
    overallCompetency,
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    t
  } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (role === "admin") {
      setActiveTab("workforce-intelligence");
    } else {
      setActiveTab("igot-courses");
    }
  };
  return <header className="flex-shrink-0 z-30 bg-gov-navy text-white shadow-md border-b border-slate-700 select-none">
      {
    /* Top micro-bar for Government branding */
  }
      <div className="bg-gov-navyDark text-slate-300 text-[11px] py-1 px-4 sm:px-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="font-medium tracking-wide flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t("govTitle")}
          </span>
        </div>
        <div className="flex items-center space-x-4 flex-shrink-0">
          <span className="hidden md:inline-block text-slate-400">Data Informatics & Innovation Division (DIID)</span>
          <span className="bg-slate-800 text-amber-300 font-semibold px-2 py-0.5 rounded text-[10px] border border-amber-500/30">
            {t("problemId")}
          </span>
        </div>
      </div>

      {
    /* Main navigation header */
  }
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {
    /* Left: Brand Identity / Interactive Logo that triggers Sidebar */
  }
        <div
          className="flex items-center space-x-3 cursor-pointer group select-none relative"
          onClick={toggleSidebar}
          onMouseEnter={() => setIsSidebarOpen(true)}
          title="Hover or click logo to open navigation sidebar"
        >
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-sky-500 to-indigo-600 p-0.5 shadow-md transition-all duration-200 group-hover:scale-105 group-hover:shadow-amber-400/20 ${isSidebarOpen ? "ring-2 ring-amber-400 scale-105" : ""}`}>
            <div className="w-full h-full bg-gov-navy rounded-[7px] flex items-center justify-center">
              <Layers className={`w-6 h-6 transition-colors duration-200 ${isSidebarOpen ? "text-amber-300" : "text-amber-400 group-hover:text-amber-300"}`} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-sans group-hover:text-amber-300 transition-colors">
                {t("appName")}
              </span>
              <span className="bg-blue-600/80 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider">
                MoSPI
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-none hidden sm:block">
              {t("appSubtitle")}
            </p>
          </div>
        </div>

        {
    /* Center: Search Bar */
  }
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
    type="text"
    placeholder={role === "admin" ? t("searchPlaceholderAdmin") : t("searchPlaceholderLearner")}
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
  />
          </div>
        </form>

        {
    /* Right Controls */
  }
        <div className="flex items-center space-x-2 sm:space-x-3">
          {
    /* Dynamic Language Switcher */
  }
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs shadow-inner">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
            <button
    onClick={() => setLanguage("en")}
    className={`px-2 py-1 rounded font-medium text-xs transition-all ${language === "en" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"}`}
    title="English"
  >
              English
            </button>
            <button
    onClick={() => setLanguage("hi")}
    className={`px-2 py-1 rounded font-medium text-xs transition-all ${language === "hi" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"}`}
    title="हिंदी (Hindi)"
  >
              हिंदी
            </button>
            <button
    onClick={() => setLanguage("te")}
    className={`px-2 py-1 rounded font-medium text-xs transition-all ${language === "te" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"}`}
    title="తెలుగు (Telugu)"
  >
              తెలుగు
            </button>
          </div>

          {
    /* Role Toggle Pill */
  }
          <div className="hidden sm:flex items-center bg-slate-800 border border-slate-700 rounded-lg p-0.5 text-xs">
            <button
    onClick={loginAsLearner}
    className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${role === "learner" ? "bg-blue-600 text-white font-semibold shadow" : "text-slate-400 hover:text-white"}`}
  >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t("learnerRole")?.split("/")[0]?.trim() || "Learner"}</span>
            </button>
            <button
    onClick={loginAsAdmin}
    className={`flex items-center gap-1 px-2.5 py-1 rounded transition-all ${role === "admin" ? "bg-amber-500 text-slate-900 font-bold shadow" : "text-slate-400 hover:text-white"}`}
  >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("adminRole") || "Admin"}</span>
            </button>
          </div>

          {
    /* Notifications */
  }
          <div className="relative">
            <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
    aria-label="Notifications"
  >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-gov-navy" />
            </button>

            {showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">{t("alerts")}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">{t("newAlerts")}</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 text-xs">
                  <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                    <p className="font-semibold text-blue-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> New NSSTA Cohort
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      "Advanced AI & ML for Official Statistics" is accepting nominations.
                    </p>
                  </div>
                  <div className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer">
                    <p className="font-semibold text-emerald-900 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> iGOT Course Progress
                    </p>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      You are 45% through "Advanced Python for Official Statistics".
                    </p>
                  </div>
                </div>
              </div>}
          </div>

          {
    /* User Profile Dropdown */
  }
          <div className="relative">
            <button
    onClick={() => setShowUserMenu(!showUserMenu)}
    className="flex items-center space-x-2 pl-2 pr-1.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition-all text-left"
  >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-xs text-slate-900 shadow">
                {(user?.name || "Official User").split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold leading-tight text-white">{user?.name || "Official User"}</p>
                <p className="text-[10px] text-amber-400 leading-tight">
                  {role === "admin" ? t("adminRole") : `${t("learnerRole")} (${overallCompetency}%)`}
                </p>
              </div>
            </button>

            {showUserMenu && <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                  <p className="font-bold text-sm text-slate-900">{user?.name || "Official User"}</p>
                  <p className="text-xs text-slate-600">{user?.designation || "Statistical Officer"}</p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">{user?.email || "official@statskill.gov.in"}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                    {user?.department || "National Sample Survey (NSS)"}
                  </div>
                </div>
                <div className="py-1 text-xs">
                  <button
    onClick={() => {
      setShowUserMenu(false);
      setActiveTab(role === "admin" ? "admin-dashboard" : "profile");
    }}
    className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2 text-slate-700"
  >
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span>{t("navProfile")}</span>
                  </button>
                  <button
    onClick={() => {
      setShowUserMenu(false);
      if (role === "learner") loginAsAdmin();
      else loginAsLearner();
    }}
    className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2 text-slate-700"
  >
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>{t("switchRole")}</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
    onClick={() => {
      setShowUserMenu(false);
      logout();
    }}
    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("signOut")}</span>
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </header>;
};
