export class CompetencyEngine {
  /**
   * Determine priority level based on the mathematical gap
   * 0–10 = Low, 11–25 = Medium, 26–40 = High, 41+ = Critical
   */
  static getPriorityFromGap(gap) {
    if (gap >= 41) return "Critical";
    if (gap >= 26) return "High";
    if (gap >= 11) return "Medium";
    return "Low";
  }
  /**
   * Determine competency tier level
   */
  static getLevelFromScore(score) {
    if (!score || score <= 0) return "Unassessed";
    if (score >= 85) return "Expert";
    if (score >= 70) return "Advanced";
    if (score >= 50) return "Intermediate";
    return "Beginner";
  }
  /**
   * Calculate all skill gaps for a given set of competencies
   * Gap = Required Competency - Current Competency
   */
  static calculateSkillGaps(competencies, role = "Statistical Officer") {
    // Skill gaps are only identified once an officer's competency has been empirically assessed
    const assessedComps = (competencies || []).filter(
      (c) => c.lastAssessed != null || (c.currentScore > 0 && c.level !== "Unassessed")
    );

    return assessedComps
      .filter((c) => c.currentScore < c.requiredScore)
      .map((c) => {
        const gap = Math.max(0, c.requiredScore - c.currentScore);
        const priority = this.getPriorityFromGap(gap);
        const aiExplanation = this.generateAiGapExplanation(c.name, c.currentScore, c.requiredScore, role);
        const recommendedAction = this.generateRecommendedAction(c.name, gap);
        const urgencyDays = priority === "Critical" ? 14 : priority === "High" ? 30 : priority === "Medium" ? 60 : 90;
        return {
          competencyId: c.id,
          name: c.name,
          category: c.category,
          current: c.currentScore,
          required: c.requiredScore,
          gap,
          priority,
          aiExplanation,
          recommendedAction,
          urgencyDays,
          lastAssessed: c.lastAssessed
        };
      })
      .sort((a, b) => b.gap - a.gap);
  }
  /**
   * Calculate overall competency percentage (weighted average)
   */
  static calculateOverallCompetency(competencies) {
    if (!competencies.length) return 0;
    const sum = competencies.reduce((acc, c) => acc + c.currentScore, 0);
    return Math.round(sum / competencies.length);
  }
  /**
   * Calculate overall required benchmark
   */
  static calculateOverallRequired(competencies) {
    if (!competencies.length) return 0;
    const sum = competencies.reduce((acc, c) => acc + c.requiredScore, 0);
    return Math.round(sum / competencies.length);
  }
  /**
   * Calculate Category level summaries
   */
  static calculateCategoryAverages(competencies) {
    const categories = ["statistical", "technical", "governance", "behavioral"];
    const result = {
      statistical: { current: 0, required: 0, gap: 0 },
      technical: { current: 0, required: 0, gap: 0 },
      governance: { current: 0, required: 0, gap: 0 },
      behavioral: { current: 0, required: 0, gap: 0 }
    };
    categories.forEach((cat) => {
      const catComps = competencies.filter((c) => c.category === cat);
      if (catComps.length > 0) {
        const avgCurrent = Math.round(catComps.reduce((acc, c) => acc + c.currentScore, 0) / catComps.length);
        const avgRequired = Math.round(catComps.reduce((acc, c) => acc + c.requiredScore, 0) / catComps.length);
        result[cat] = {
          current: avgCurrent,
          required: avgRequired,
          gap: Math.max(0, avgRequired - avgCurrent)
        };
      }
    });
    return result;
  }
  /**
   * Update a specific competency score after a quiz or assessment, recalculating levels & progress
   */
  static updateCompetency(competencies, competencyNameOrId, deltaOrNewScore, isAbsolute = false) {
    return competencies.map((c) => {
      const match = c.id === competencyNameOrId || c.name.toLowerCase().includes(competencyNameOrId.toLowerCase()) || competencyNameOrId.toLowerCase().includes(c.name.toLowerCase());
      if (!match) return c;
      const newScore = isAbsolute ? Math.min(100, Math.max(0, Math.round(deltaOrNewScore))) : Math.min(100, Math.max(0, Math.round(c.currentScore + deltaOrNewScore)));
      const gap = Math.max(0, c.requiredScore - newScore);
      const progress = Math.min(100, Math.round(newScore / c.requiredScore * 100));
      const level = this.getLevelFromScore(newScore);
      const priority = this.getPriorityFromGap(gap);
      const history = c.historicalScores || [];
      const newHistory = [...history, { date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0], score: newScore }];
      return {
        ...c,
        currentScore: newScore,
        gap,
        progress,
        level,
        priority,
        lastAssessed: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        historicalScores: newHistory
      };
    });
  }
  /**
   * Generate realistic, context-specific AI diagnostic explanations for skill gaps
   */
  static generateAiGapExplanation(skillName, current, required, role) {
    const gap = required - current;
    if (!current || current <= 0) {
      return `Your ${skillName} competency is currently unassessed (target: ${required}%). Complete the 10-question AI Diagnostic Assessment or generate a topic quiz to calibrate your baseline capability score.`;
    }
    if (skillName.includes("AI") || skillName.includes("Machine Learning")) {
      return `Your current ${skillName} competency is ${current}%, compared with the required ${required}% for a ${role}. As MoSPI transitions towards automated outlier detection, AI survey imputation, and NLP-assisted classifications, this represents a ${gap}% critical capability gap.`;
    }
    if (skillName.includes("Cloud")) {
      return `Your Cloud Computing competency stands at ${current}% against ${required}% required. Cloud infrastructure knowledge is vital for interfacing with MeghRaj GI Cloud, hosting microdata APIs, and running distributed survey computation pipelines.`;
    }
    if (skillName.includes("GIS") || skillName.includes("Spatial")) {
      return `GIS competency is currently ${current}% (required: ${required}%). Modern sample survey design requires geospatial stratification, digital Urban Frame Survey (UFS) boundary reconciliation, and satellite-based crop estimation.`;
    }
    if (skillName.includes("Python")) {
      return `Python proficiency is ${current}% vs ${required}% required for modern statistical officers. Automating repetitive data cleaning in PLFS/ASI and creating reproducible statistical scripts can cut publication lead times by over 40%.`;
    }
    if (skillName.includes("Data Privacy") || skillName.includes("DPDP")) {
      return `Data Privacy stands at ${current}%. In accordance with the Digital Personal Data Protection (DPDP) Act 2023, statistical officers must apply strict k-anonymity and differential privacy controls before public dissemination.`;
    }
    if (skillName.includes("Sampling")) {
      return `Sampling is strong at ${current}% (target: ${required}%). Maintaining high precision in multi-stage stratified designs guarantees low standard errors in national indicators.`;
    }
    if (gap > 0) {
      return `${skillName} has a ${gap}% gap (${current}% current vs ${required}% required). Closing this gap will elevate analytical reliability and enhance decision-making across ${role} assignments.`;
    }
    return `Proficiency in ${skillName} (${current}%) meets or exceeds the official benchmark (${required}%). You are eligible to act as a departmental subject matter mentor.`;
  }
  static generateRecommendedAction(skillName, gap) {
    if (gap >= 26) {
      return `Prioritize intensive iGOT / NSSTA course cohort and complete 2 targeted practical assessments within 30 days.`;
    }
    if (gap >= 11) {
      return `Complete interactive self-paced modular training and apply methods to current survey workflow.`;
    }
    return `Maintain competency through continuous practice and periodic refresher micro-quizzes.`;
  }
}
