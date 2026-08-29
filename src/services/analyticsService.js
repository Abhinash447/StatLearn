import {
  ADMIN_DEPARTMENTS_DATA,
  EMERGING_SKILLS_DATA,
  COURSE_EFFECTIVENESS_DATA,
  WORKFORCE_INSIGHTS_DATA
} from "../data/initialData";
export class AnalyticsService {
  static getKPIs() {
    return {
      totalOfficials: 2486,
      avgCompetency: 68,
      criticalSkillGaps: 14,
      trainingCompletion: 74,
      aiReadiness: 42,
      learningHours: 18642
    };
  }
  static getDepartments() {
    return ADMIN_DEPARTMENTS_DATA;
  }
  static getEmergingSkills() {
    return EMERGING_SKILLS_DATA;
  }
  static getCourseEffectiveness() {
    return COURSE_EFFECTIVENESS_DATA;
  }
  static getWorkforceInsights() {
    return WORKFORCE_INSIGHTS_DATA;
  }
  /**
   * Generates a dynamic, executive-level MoSPI Workforce Capacity Building Report
   */
  static generateExecutiveReport() {
    return {
      generatedAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      reportTitle: "MoSPI National Statistical Cadre \u2014 Workforce Skill Intelligence & AI Readiness Report (2026-27)",
      executiveSummary: "This comprehensive diagnostic covers 2,486 statistical personnel across all 6 central statistical divisions. While domain mastery in classical survey sampling (82%) and ethical standards (85%) remains exemplary, a systemic 40% capability deficit in AI/ML, Cloud Architecture, and GIS spatial sampling requires immediate policy intervention through accelerated iGOT cohorts and NSSTA residential academies.",
      keyFindings: [
        "AI/ML capability deficit of 40% across 1,850+ technical officers is the largest barrier to implementing automated microdata imputation.",
        "Data Informatics Division (DIID) leads organizational capability at 76% average competency, whereas Social Statistics Division (SSD) and Field Operations (FOD) require targeted spatial tool upskilling.",
        "Courses with hands-on lab components (e.g. NSSTA AI Residential Masterclass) delivered a +32% measured post-training competency surge compared to 16% in pure theoretical courses.",
        "Predictive models indicate demand for Python data automation and Open API architecture will expand by 38% over the next 12-18 months."
      ],
      priorityInterventions: [
        'Mandate 4-week iGOT "Machine Learning for Government Analytics" for all Statistical Officers under 45 years.',
        "Expand NSSTA Greater Noida campus residential seating capacity by 25% for high-demand GIS & AI cohorts.",
        "Institute MoSPI National Statistical Innovation Badges and accelerated promotion weightage for certified officers.",
        "Deploy local offline LLM and open data workbench environments across all regional NSS and FOD offices."
      ],
      departmentBreakdown: ADMIN_DEPARTMENTS_DATA.map((d) => ({
        department: d.name,
        readiness: d.aiReadiness,
        gap: 100 - d.avgCompetency
      }))
    };
  }
}
