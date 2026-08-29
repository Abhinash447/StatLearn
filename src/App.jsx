import { useApp } from "./context/AppContext";
import { TopBar } from "./components/layout/TopBar";
import { Sidebar } from "./components/layout/Sidebar";
import { ToastContainer } from "./components/common/ToastContainer";
import { JudgeDemoBar } from "./components/common/JudgeDemoBar";
import { LoginPage } from "./components/auth/LoginPage";
import { LearnerDashboard } from "./components/learner/LearnerDashboard";
import { LearnerProfile } from "./components/learner/LearnerProfile";
import { MyCompetencies } from "./components/learner/MyCompetencies";
import { CompetencyAssessment } from "./components/learner/CompetencyAssessment";
import { SkillGapAnalysis } from "./components/learner/SkillGapAnalysis";
import { PersonalizedLearningPath } from "./components/learner/PersonalizedLearningPath";
import { IgotCourses } from "./components/learner/IgotCourses";
import { NsstaTraining } from "./components/learner/NsstaTraining";
import { QuizGenerator } from "./components/learner/QuizGenerator";
import { QuizTaking } from "./components/learner/QuizTaking";
import { QuizResults } from "./components/learner/QuizResults";
import { MyAssessments } from "./components/learner/MyAssessments";
import { AiAssistant } from "./components/learner/AiAssistant";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { WorkforceIntelligence } from "./components/admin/WorkforceIntelligence";
import { CompetencyAnalytics } from "./components/admin/CompetencyAnalytics";
import { SkillGapAnalytics } from "./components/admin/SkillGapAnalytics";
import { TrainingAnalytics } from "./components/admin/TrainingAnalytics";
import { EmergingSkills } from "./components/admin/EmergingSkills";
import { AiWorkforceInsights } from "./components/admin/AiWorkforceInsights";
export const App = () => {
  const { isAuthenticated, activeTab, role } = useApp();
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        <LoginPage />
        <ToastContainer />
      </div>;
  }
  const renderContent = () => {
    switch (activeTab) {
      // Learner Routes
      case "dashboard":
        return <LearnerDashboard />;
      case "profile":
        return <LearnerProfile />;
      case "competencies":
        return <MyCompetencies />;
      case "assessment":
        return <CompetencyAssessment />;
      case "skill-gaps":
        return <SkillGapAnalysis />;
      case "learning-path":
        return <PersonalizedLearningPath />;
      case "igot-courses":
        return <IgotCourses />;
      case "nssta-training":
        return <NsstaTraining />;
      case "quiz-generator":
        return <QuizGenerator />;
      case "take-quiz":
        return <QuizTaking />;
      case "quiz-results":
        return <QuizResults />;
      case "my-assessments":
        return <MyAssessments />;
      case "ai-assistant":
        return <AiAssistant />;
      // Admin Routes
      case "admin-dashboard":
        return <AdminDashboard />;
      case "workforce-intelligence":
        return <WorkforceIntelligence />;
      case "competency-analytics":
        return <CompetencyAnalytics />;
      case "skill-gap-analytics":
        return <SkillGapAnalytics />;
      case "training-analytics":
        return <TrainingAnalytics />;
      case "emerging-skills":
        return <EmergingSkills />;
      case "ai-workforce-insights":
        return <AiWorkforceInsights />;
      default:
        return role === "admin" ? <AdminDashboard /> : <LearnerDashboard />;
    }
  };
  return <div className="h-screen flex flex-col bg-slate-100 text-slate-900 font-sans overflow-hidden">
      {
    /* Sticky TopBar */
  }
      <TopBar />

      {
    /* Main App Body with STABLE Sidebar and independent scrollable content area */
  }
      <div className="flex-1 flex flex-row overflow-hidden relative">
        {
    /* Stable Fixed Sidebar */
  }
        <Sidebar />

        {
    /* Dynamic Page Component Workspace - Smoothly scrolls while sidebar stays anchored */
  }
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-28 bg-slate-100/90">
          <div className="max-w-7xl mx-auto transition-all duration-200 animate-in fade-in">
            {renderContent()}
          </div>
        </main>
      </div>

      {
    /* Persistent Judge Demo Toolbar & Floating Alerts */
  }
      <JudgeDemoBar />
      <ToastContainer />
    </div>;
};
