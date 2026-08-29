import { IGOT_COURSES_CATALOG } from "../data/initialData";
export class IGOTService {
  static storageKey = "statskill_igot_courses_v1";
  static apiUrl = import.meta.env.VITE_IGOT_API_URL || "";
  static apiKey = import.meta.env.VITE_IGOT_API_KEY || "";
  static isLiveApiConnected() {
    return Boolean(this.apiUrl && this.apiKey);
  }
  static getCourses(filters) {
    const raw = localStorage.getItem(this.storageKey);
    let courses = raw ? JSON.parse(raw) : IGOT_COURSES_CATALOG;
    if (!raw) {
      this.saveCourses(courses);
    }
    if (filters) {
      if (filters.category && filters.category !== "all") {
        courses = courses.filter(
          (c) => c.competencyCategory === filters.category || c.competencies.includes(filters.category)
        );
      }
      if (filters.level && filters.level !== "all") {
        courses = courses.filter((c) => c.level.toLowerCase() === filters.level.toLowerCase());
      }
      if (filters.department && filters.department !== "all") {
        courses = courses.filter(
          (c) => c.department.toLowerCase().includes(filters.department.toLowerCase()) || c.department.includes("All") || c.department.includes("Cross")
        );
      }
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        courses = courses.filter(
          (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.competencies.some((comp) => comp.toLowerCase().includes(q))
        );
      }
    }
    return courses;
  }
  static getCourseDetails(courseId) {
    const courses = this.getCourses();
    return courses.find((c) => c.id === courseId);
  }
  static enrollCourse(courseId) {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex((c) => c.id === courseId);
    if (courseIndex === -1) {
      return { success: false, message: "Course not found in iGOT repository" };
    }
    courses[courseIndex] = {
      ...courses[courseIndex],
      isEnrolled: true,
      progress: courses[courseIndex].progress ?? 5,
      enrolledCount: (courses[courseIndex].enrolledCount || 0) + 1
    };
    this.saveCourses(courses);
    return {
      success: true,
      message: `Successfully enrolled in "${courses[courseIndex].title}" on iGOT Karmayogi!`,
      course: courses[courseIndex]
    };
  }
  static getEnrollmentStatus(courseId) {
    const course = this.getCourseDetails(courseId);
    return {
      isEnrolled: course?.isEnrolled ?? false,
      progress: course?.progress ?? 0
    };
  }
  static updateCourseProgress(courseId, progress) {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex((c) => c.id === courseId);
    if (courseIndex !== -1) {
      courses[courseIndex].progress = Math.min(100, Math.max(0, progress));
      this.saveCourses(courses);
    }
  }
  static getLearningHistory(_userId) {
    const courses = this.getCourses();
    return courses.filter((c) => c.isEnrolled);
  }
  static saveCourses(courses) {
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }
}
