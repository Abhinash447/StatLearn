export class ApiClient {
  static baseUrl = "/api";
  static async getHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`);
      return await res.json();
    } catch (e) {
      return { status: "offline_fallback" };
    }
  }
  static async login(email, password) {
    try {
      const res = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Network error connecting to backend' };
    }
  }
  static async signup(userData) {
    try {
      const res = await fetch(`${this.baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Network error connecting to backend' };
    }
  }
  static async getCompetencies() {
    try {
      const res = await fetch(`${this.baseUrl}/competencies`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async updateCompetency(id, scoreDelta) {
    try {
      const res = await fetch(`${this.baseUrl}/competencies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreDelta })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async getIgotCourses() {
    try {
      const res = await fetch(`${this.baseUrl}/igot/courses`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async getNsstaProgrammes() {
    try {
      const res = await fetch(`${this.baseUrl}/nssta/programmes`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async generateQuizFromDocument(formData) {
    try {
      const res = await fetch(`${this.baseUrl}/quiz/generate`, {
        method: "POST",
        body: formData
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async submitQuizAttempt(attemptData) {
    try {
      const res = await fetch(`${this.baseUrl}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attemptData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async sendChatMessage(message, language = "en", userProfile) {
    try {
      const res = await fetch(`${this.baseUrl}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language, userProfile })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async enrollInIgot(courseId) {
    try {
      const res = await fetch(`${this.baseUrl}/igot/enroll/${courseId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async nominateInNssta(programmeId) {
    try {
      const res = await fetch(`${this.baseUrl}/nssta/nominate/${programmeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async getQuizHistory() {
    try {
      const res = await fetch(`${this.baseUrl}/quiz/history`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async updateUserProfile(profileData) {
    try {
      const res = await fetch(`${this.baseUrl}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
  static async getAdminAnalytics() {
    try {
      const res = await fetch(`${this.baseUrl}/admin/analytics`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
}
