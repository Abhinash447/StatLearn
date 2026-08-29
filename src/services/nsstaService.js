import { NSSTA_PROGRAMMES_CATALOG } from "../data/initialData";
export class NSSTAService {
  static storageKey = "statskill_nssta_programmes_v1";
  static apiUrl = import.meta.env.VITE_NSSTA_API_URL || "";
  static apiKey = import.meta.env.VITE_NSSTA_API_KEY || "";
  static isLiveApiConnected() {
    return Boolean(this.apiUrl && this.apiKey);
  }
  static getTrainingPrograms() {
    const raw = localStorage.getItem(this.storageKey);
    let programmes = raw ? JSON.parse(raw) : NSSTA_PROGRAMMES_CATALOG;
    if (!raw) {
      this.saveProgrammes(programmes);
    }
    return programmes;
  }
  static getRecommendedPrograms(profile, skillGaps) {
    const programmes = this.getTrainingPrograms();
    return programmes.map((p) => {
      const matchesCriticalGap = skillGaps.some(
        (g) => (g.priority === "Critical" || g.priority === "High") && p.competencies.some((c) => g.name.toLowerCase().includes(c.toLowerCase().split(" ")[0]))
      );
      const isRoleTargeted = p.targetRoles.some((r) => r.toLowerCase().includes(profile.designation.toLowerCase()));
      let adjustedMatchScore = p.matchScore;
      if (matchesCriticalGap && isRoleTargeted) {
        adjustedMatchScore = Math.min(99, p.matchScore + 5);
      }
      return {
        ...p,
        matchScore: adjustedMatchScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }
  static nominateOfficer(programId, _officer) {
    const programmes = this.getTrainingPrograms();
    const index = programmes.findIndex((p) => p.id === programId);
    if (index === -1) {
      return { success: false, message: "Programme not found in NSSTA calendar" };
    }
    programmes[index] = {
      ...programmes[index],
      isNominated: true,
      seatsAvailable: Math.max(0, (programmes[index].seatsAvailable || 10) - 1)
    };
    this.saveProgrammes(programmes);
    return {
      success: true,
      message: `Nomination submitted to Head of Division for "${programmes[index].title}". Confirmation token dispatched.`,
      programme: programmes[index]
    };
  }
  static getNominationStatus(programId) {
    const programmes = this.getTrainingPrograms();
    const prog = programmes.find((p) => p.id === programId);
    return prog?.isNominated ?? false;
  }
  static saveProgrammes(programmes) {
    localStorage.setItem(this.storageKey, JSON.stringify(programmes));
  }
}
