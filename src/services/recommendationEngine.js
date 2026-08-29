export class RecommendationEngine {
  /**
   * Calculates recommendation score using the formula:
   * 40% Skill Gap Match + 25% Role Match + 15% Competency Level + 10% Learning History + 10% Dept Priority
   */
  static calculateCourseScore(course, profile, skillGaps, competencies) {
    let maxGap = 0;
    let primaryGapSkill = "";
    course.competencies.forEach((compName) => {
      const gapObj = skillGaps.find(
        (g) => g.name.toLowerCase().includes(compName.toLowerCase()) || compName.toLowerCase().includes(g.name.toLowerCase())
      );
      if (gapObj && gapObj.gap > maxGap) {
        maxGap = gapObj.gap;
        primaryGapSkill = gapObj.name;
      }
    });
    const gapScore = Math.min(100, maxGap * 2.2);
    const designation = profile?.designation || "Statistical Officer";
    const department = profile?.department || "National Sample Survey";
    const previousTraining = Array.isArray(profile?.previousTraining) ? profile.previousTraining : [];

    let roleScore = 70;
    if (designation.includes("Statistical Officer")) {
      if (course.competencyCategory === "technical" || course.competencyCategory === "statistical") {
        roleScore = 95;
      }
    }
    let levelScore = 80;
    if (course.level === "Intermediate" && maxGap > 20) levelScore = 95;
    if (course.level === "Beginner" && maxGap > 35) levelScore = 100;
    if (course.level === "Advanced" && maxGap < 15) levelScore = 90;
    let historyScore = 65;
    const hasRelatedTraining = previousTraining.some(
      (t) => course.competencies.some((c) => t.toLowerCase().includes(c.toLowerCase().split(" ")[0]))
    );
    if (hasRelatedTraining) historyScore = 90;
    let deptScore = 70;
    if (course.department.includes(department) || course.department.includes("All") || course.department.includes("Cross") || course.department.includes("Sample Survey")) {
      deptScore = 95;
    }
    const totalScore = Math.round(
      gapScore * 0.4 + roleScore * 0.25 + levelScore * 0.15 + historyScore * 0.1 + deptScore * 0.1
    );
    const isGapDriven = primaryGapSkill !== "";
    const clampedScore = isGapDriven 
      ? Math.min(99, Math.max(75, totalScore))
      : Math.min(85, Math.max(60, totalScore));

    let rationale = "";
    if (isGapDriven) {
      const comp = competencies.find((c) => c.name === primaryGapSkill);
      const current = comp ? comp.currentScore : 0;
      const required = comp ? comp.requiredScore : 75;
      rationale = `Directly remediates your assessed ${primaryGapSkill} skill gap (${current}% assessed vs ${required}% required benchmark for ${designation}).`;
    } else {
      rationale = `Foundational competency module for ${designation} in ${department}. Complete the AI Diagnostic Assessment to generate gap-targeted recommendations.`;
    }

    return { 
      score: clampedScore, 
      rationale, 
      isAssessmentDriven: isGapDriven,
      targetSkill: primaryGapSkill 
    };
  }
  /**
   * Sort and return courses with computed recommendation match scores and rationale
   */
  static getPersonalizedCourses(catalog, profile, skillGaps, competencies) {
    return catalog.map((course) => {
      const { score, rationale, isAssessmentDriven, targetSkill } = this.calculateCourseScore(course, profile, skillGaps, competencies);
      return {
        ...course,
        matchScore: score,
        matchRationale: rationale,
        isAssessmentDriven,
        targetSkill
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }
  /**
   * Build an adaptive 5-Phase Personalized Learning Roadmap
   */
  static generatePersonalizedLearningPath(profile, competencies, courses) {
    const aiComp = competencies.find((c) => c.name.includes("AI"))?.currentScore ?? 0;
    const pythonComp = competencies.find((c) => c.name.includes("Python"))?.currentScore ?? 0;
    const gisComp = competencies.find((c) => c.name.includes("GIS"))?.currentScore ?? 0;
    const cloudComp = competencies.find((c) => c.name.includes("Cloud"))?.currentScore ?? 0;
    const dpdpComp = competencies.find((c) => c.name.includes("Privacy") || c.name.includes("DPDP"))?.currentScore ?? 0;

    const getStepStatus = (courseId, compScore, targetThreshold) => {
      const course = courses?.find((c) => c.id === courseId);
      if (course?.isEnrolled && (course?.progress ?? 0) >= 100) return "Completed";
      if (compScore >= targetThreshold) return "Completed";
      if (course?.isEnrolled || compScore > 0) return "In Progress";
      return "Not Started";
    };

    return [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Foundation & Automation",
        phase: "Foundation",
        courseTitle: "Advanced Python for Official Statistics & Automation",
        skill: "Python & Data Wrangling",
        competencyCategory: "technical",
        level: "Intermediate",
        duration: "6 Weeks (20 Hours)",
        provider: "iGOT Karmayogi",
        matchScore: 92,
        status: getStepStatus("igot-py-01", pythonComp, 75),
        description: "Build reproducible pipelines for microdata ingestion, cleaning and weighted survey tabulations.",
        rationale: pythonComp > 0 
          ? `Your Python score is ${pythonComp}%. Mastering automated data scripts is a prerequisite for advanced machine learning workflows.`
          : `Recommended baseline technical capability. Mastering automated survey scripting reduces manual turnaround time.`,
        courseId: "igot-py-01"
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Spatial Analytics & Frame Mapping",
        phase: "Analytics",
        courseTitle: "GIS & Geospatial Analysis for Public Administration",
        skill: "GIS & Spatial Analytics",
        competencyCategory: "technical",
        level: "Intermediate",
        duration: "5 Weeks (15 Hours)",
        provider: "iGOT Karmayogi",
        matchScore: 89,
        status: getStepStatus("igot-gis-01", gisComp, 70),
        description: "Delimit Primary Sampling Units with QGIS, map thematic indicators, and run spatial autocorrelation.",
        rationale: `Vital for NSS Urban Frame Survey (UFS) modernizations and satellite cross-validation.`,
        courseId: "igot-gis-01"
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Machine Learning & Imputation",
        phase: "AI & Modeling",
        courseTitle: "Machine Learning for Government Analytics",
        skill: "AI & Machine Learning",
        competencyCategory: "technical",
        level: "Intermediate",
        duration: "6 Weeks (18 Hours)",
        provider: "iGOT Karmayogi",
        matchScore: 96,
        status: getStepStatus("igot-ai-01", aiComp, 70),
        description: "Apply supervised models to survey imputation, outlier screening, and automated classification.",
        rationale: `High-priority national capability. Directly enables intelligent official survey analytics and anomaly detection.`,
        courseId: "igot-ai-01"
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Residential Masterclass & Hands-on AI",
        phase: "Advanced Practice",
        courseTitle: "Advanced AI & ML in Official Statistics (Residential)",
        skill: "Applied AI & MLOps",
        competencyCategory: "technical",
        level: "Advanced",
        duration: "5 Days (Residential)",
        provider: "NSSTA Greater Noida",
        matchScore: 98,
        status: "Not Started",
        description: "Intensive residential program with MoSPI and ISI mentors on production-grade NLP/LLMs for official statistics.",
        rationale: "Hands-on capstone to certify capability in deploying mission-critical statistical models.",
        programId: "nssta-ai-2026"
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "DPDP Act Governance & Microdata Release",
        phase: "Governance & Ethics",
        courseTitle: "DPDP Act Compliance & Data Ethics for Government Officers",
        skill: "Data Privacy & Governance",
        competencyCategory: "governance",
        level: "Intermediate",
        duration: "3 Weeks (10 Hours)",
        provider: "iGOT Karmayogi",
        matchScore: 90,
        status: getStepStatus("igot-dpdp-01", dpdpComp, 75),
        description: "Master differential privacy, k-anonymity, and legal protocols for official survey microdata dissemination.",
        rationale: "Mandatory compliance with Digital Personal Data Protection Act 2023 for all data fiduciaries.",
        courseId: "igot-dpdp-01"
      }
    ];
  }
}
