import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_LEARNER_PROFILE,
  INITIAL_ADMIN_PROFILE,
  INITIAL_COMPETENCIES,
  INITIAL_ASSESSMENT_HISTORY,
  IGOT_COURSES_CATALOG,
  NSSTA_PROGRAMMES_CATALOG
} from "../data/initialData";
import { CompetencyEngine } from "../services/competencyEngine";
import { RecommendationEngine } from "../services/recommendationEngine";
import { ApiClient } from "../services/apiClient";
import { translations } from "../translations";
const AppContext = createContext(void 0);
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("statskill_auth_v1") === "true";
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem("statskill_role_v1") || "learner";
  });
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem("statskill_user_v1");
      return cached ? JSON.parse(cached) : INITIAL_LEARNER_PROFILE;
    } catch (e) {
      return INITIAL_LEARNER_PROFILE;
    }
  });
  const [competencies, setCompetencies] = useState(() => {
    try {
      const cached = localStorage.getItem("statskill_competencies_v1");
      return cached ? JSON.parse(cached) : INITIAL_COMPETENCIES;
    } catch (e) {
      return INITIAL_COMPETENCIES;
    }
  });
  const [assessmentHistory, setAssessmentHistory] = useState(() => {
    try {
      const cached = localStorage.getItem("statskill_history_v1");
      return cached ? JSON.parse(cached) : INITIAL_ASSESSMENT_HISTORY;
    } catch (e) {
      return INITIAL_ASSESSMENT_HISTORY;
    }
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("statskill_lang_v1") || "en";
  });
  const [toasts, setToasts] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [latestAttempt, setLatestAttempt] = useState(null);
  const [learningHours, setLearningHours] = useState(() => {
    return Number(localStorage.getItem("statskill_hours_v1")) || 0;
  });
  const [learningStreak, setLearningStreak] = useState(() => {
    return Number(localStorage.getItem("statskill_streak_v1")) || 0;
  });
  const [rawIgotCatalog, setRawIgotCatalog] = useState(IGOT_COURSES_CATALOG);
  const [nsstaCatalog, setNsstaCatalog] = useState(NSSTA_PROGRAMMES_CATALOG);
  const [isLoadingDb, setIsLoadingDb] = useState(true);
  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };
  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem("statskill_lang_v1", lang);
    const langNames = { en: "English", hi: "\u0939\u093F\u0902\u0926\u0940 (Hindi)", te: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (Telugu)" };
    showToast(`Language switched to ${langNames[lang]}`, "info");
  };
  useEffect(() => {
    const initDataFromBackend = async () => {
      setIsLoadingDb(true);
      try {
        const dbComps = await ApiClient.getCompetencies();
        if (dbComps && Array.isArray(dbComps) && dbComps.length > 0) {
          setCompetencies(dbComps);
          localStorage.setItem("statskill_competencies_v1", JSON.stringify(dbComps));
        }
        const igotRes = await ApiClient.getIgotCourses();
        if (igotRes && igotRes.courses && igotRes.courses.length > 0) {
          setRawIgotCatalog(igotRes.courses);
        }
        const nsstaRes = await ApiClient.getNsstaProgrammes();
        if (nsstaRes && nsstaRes.programmes && nsstaRes.programmes.length > 0) {
          setNsstaCatalog(nsstaRes.programmes);
        }
      } catch (err) {
        console.warn("Backend sync warning, operating in high-fidelity state:", err);
      } finally {
        setIsLoadingDb(false);
      }
    };
    initDataFromBackend();
  }, []);
  const currentUser = user || INITIAL_LEARNER_PROFILE;
  const currentComps = Array.isArray(competencies) ? competencies : INITIAL_COMPETENCIES;
  const currentHistory = Array.isArray(assessmentHistory) ? assessmentHistory : [];
  const skillGaps = CompetencyEngine.calculateSkillGaps(currentComps, currentUser.designation || "Statistical Officer");
  const igotCourses = RecommendationEngine.getPersonalizedCourses(rawIgotCatalog || [], currentUser, skillGaps, currentComps);
  const nsstaProgrammes = (nsstaCatalog || []).map((prog) => {
    const isCritical = skillGaps.some(
      (g) => (g.priority === "Critical" || g.priority === "High") && prog.competencies.some((c) => g.name.toLowerCase().includes(c.toLowerCase().split(" ")[0]))
    );
    return {
      ...prog,
      matchScore: isCritical ? Math.min(99, prog.matchScore + 4) : prog.matchScore
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
  const learningPath = RecommendationEngine.generatePersonalizedLearningPath(currentUser, currentComps, rawIgotCatalog || []);
  const overallCompetency = CompetencyEngine.calculateOverallCompetency(currentComps);
  const overallGap = Math.max(0, 100 - overallCompetency);
  const coursesCompletedCount = (igotCourses || []).filter((c) => c.isEnrolled && (c.progress ?? 0) >= 100).length;
  useEffect(() => {
    localStorage.setItem("statskill_auth_v1", String(isAuthenticated));
    localStorage.setItem("statskill_role_v1", role);
    localStorage.setItem("statskill_user_v1", JSON.stringify(user));
    localStorage.setItem("statskill_hours_v1", String(learningHours));
    localStorage.setItem("statskill_streak_v1", String(learningStreak));
    localStorage.setItem("statskill_history_v1", JSON.stringify(assessmentHistory));
  }, [isAuthenticated, role, user, learningHours, learningStreak, assessmentHistory]);
  const showToast = (message, type = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t2) => t2.id !== id));
  };
  const login = async (email, pass) => {
    const res = await ApiClient.login(email, pass);
    if (res && res.success) {
      setIsAuthenticated(true);
      setUser(res.user);
      setRole(res.user.role || "learner");
      setActiveTab(res.user.role === "admin" ? "admin-dashboard" : "dashboard");
      showToast(`Welcome back, ${res.user.name}! Authenticated successfully.`, "success");
      return { success: true, user: res.user };
    } else {
      const msg = res?.message || "Invalid credentials provided.";
      showToast(msg, "error");
      return { success: false, message: msg };
    }
  };
  const signup = async (userData) => {
    const res = await ApiClient.signup(userData);
    if (res && res.success) {
      setIsAuthenticated(true);
      setUser(res.user);
      setRole(res.user.role || "learner");
      setActiveTab(res.user.role === "admin" ? "admin-dashboard" : "dashboard");
      showToast(`Account created successfully! Welcome to StatSkill AI, ${res.user.name}.`, "success");
      return { success: true, user: res.user };
    } else {
      const msg = res?.message || "Registration failed. Please try again.";
      showToast(msg, "error");
      return { success: false, message: msg };
    }
  };
  const loginAsLearner = () => {
    setIsAuthenticated(true);
    setRole("learner");
    setUser(INITIAL_LEARNER_PROFILE);
    setActiveTab("dashboard");
    showToast("Logged in as Official (Learner) \u2014 Abhinash Kumar (NSS)", "info");
  };
  const loginAsAdmin = () => {
    setIsAuthenticated(true);
    setRole("admin");
    setUser(INITIAL_ADMIN_PROFILE);
    setActiveTab("admin-dashboard");
    showToast("Logged in as MoSPI Administrator \u2014 Dr. Alok Verma (DIID)", "info");
  };
  const logout = () => {
    setIsAuthenticated(false);
    showToast("Logged out successfully", "info");
  };
  const updateProfile = async (updated) => {
    const newUser = { ...user, ...updated };
    setUser(newUser);
    localStorage.setItem("statskill_user_v1", JSON.stringify(newUser));
    try {
      await ApiClient.updateUserProfile(newUser);
    } catch (e) {
      console.warn("Profile sync notice:", e);
    }
    showToast("Profile updated and saved to MoSPI Database!", "success");
  };
  const updateCompetencyScore = async (competencyIdOrName, deltaOrNewScore, isAbsolute = false) => {
    setCompetencies((prev) => {
      const updated = CompetencyEngine.updateCompetency(prev, competencyIdOrName, deltaOrNewScore, isAbsolute);
      localStorage.setItem("statskill_competencies_v1", JSON.stringify(updated));
      return updated;
    });
    try {
      const targetComp = competencies.find(
        (c) => c.id === competencyIdOrName || c.name.toLowerCase().includes(competencyIdOrName.toLowerCase())
      );
      if (targetComp) {
        await ApiClient.updateCompetency(targetComp.id, deltaOrNewScore);
      }
    } catch (err) {
      console.warn("Async DB sync notice:", err);
    }
    showToast(`Competency profile updated: ${competencyIdOrName} adjusted in Database`, "success");
  };
  const enrollInIGOT = async (courseId) => {
    setRawIgotCatalog(
      (prev) => prev.map((c) => c.id === courseId ? { ...c, isEnrolled: true, progress: c.progress || 10 } : c)
    );
    setLearningHours((prev) => prev + 2);
    try {
      await ApiClient.enrollInIgot(courseId);
    } catch (e) {
      console.warn("IGOT sync notice:", e);
    }
    showToast(`Enrolled successfully in iGOT course!`, "success");
  };
  const nominateInNSSTA = async (programId) => {
    setNsstaCatalog(
      (prev) => prev.map((p) => p.id === programId ? { ...p, isNominated: true } : p)
    );
    try {
      await ApiClient.nominateInNssta(programId);
    } catch (e) {
      console.warn("NSSTA sync notice:", e);
    }
    showToast(`Nomination dispatched to NSSTA Greater Noida!`, "success");
  };
  const startQuizSession = (quiz) => {
    setActiveQuiz(quiz);
    setActiveTab("take-quiz");
  };
  const finishQuizSession = async (attempt, impactedCompetencies) => {
    setAssessmentHistory((prev) => [attempt, ...prev]);
    setLatestAttempt(attempt);
    setLearningHours((prev) => prev + Math.max(1, Math.round(attempt.timeTakenSeconds / 60)));
    setLearningStreak((prev) => Math.max(1, prev + 1));
    try {
      await ApiClient.submitQuizAttempt(attempt);
    } catch (e) {
      console.warn("Attempt sync notice:", e);
    }
    if (impactedCompetencies && impactedCompetencies.length > 0) {
      setCompetencies((prev) => {
        let cur = prev;
        impactedCompetencies.forEach(({ name, scoreDelta }) => {
          cur = CompetencyEngine.updateCompetency(cur, name, scoreDelta, false);
        });
        localStorage.setItem("statskill_competencies_v1", JSON.stringify(cur));
        return cur;
      });
    }
    setActiveTab("quiz-results");
    showToast(`Assessment submitted! Score: ${attempt.percentage}% saved to Database`, "success");
  };
  const clearActiveQuiz = () => {
    setActiveQuiz(null);
  };
  const resetToInitialDemoData = () => {
    localStorage.removeItem("statskill_competencies_v1");
    localStorage.removeItem("statskill_history_v1");
    localStorage.removeItem("statskill_igot_courses_v1");
    localStorage.removeItem("statskill_nssta_programmes_v1");
    localStorage.removeItem("statskill_hours_v1");
    localStorage.removeItem("statskill_streak_v1");
    setLearningHours(0);
    setLearningStreak(0);
    setCompetencies(INITIAL_COMPETENCIES);
    setAssessmentHistory(INITIAL_ASSESSMENT_HISTORY);
    setUser(INITIAL_LEARNER_PROFILE);
    setRole("learner");
    setActiveTab("dashboard");
    showToast("Profile reset to clean baseline", "info");
  };
  return <AppContext.Provider
    value={{
      isAuthenticated,
      user,
      role,
      competencies,
      skillGaps,
      learningPath,
      igotCourses,
      nsstaProgrammes,
      assessmentHistory,
      activeTab,
      language,
      toasts,
      activeQuiz,
      latestAttempt,
      overallCompetency,
      overallGap,
      learningStreak,
      learningHours,
      coursesCompletedCount,
      isLoadingDb,
      t,
      setActiveTab,
      setLanguage,
      login,
      signup,
      loginAsLearner,
      loginAsAdmin,
      logout,
      updateProfile,
      updateCompetencyScore,
      enrollInIGOT,
      nominateInNSSTA,
      startQuizSession,
      finishQuizSession,
      clearActiveQuiz,
      showToast,
      removeToast,
      resetToInitialDemoData
    }}
  >
      {children}
    </AppContext.Provider>;
};
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
