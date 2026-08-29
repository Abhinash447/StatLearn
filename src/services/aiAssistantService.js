export class AIAssistantService {
  static llmApiKey = import.meta.env.VITE_LLM_API_KEY || "";
  static llmApiUrl = import.meta.env.VITE_LLM_API_URL || "https://api.openai.com/v1/chat/completions";
  static llmModel = import.meta.env.VITE_LLM_MODEL || "gpt-4o-mini";
  /**
   * Process a user query through the context-aware StatSkill AI Assistant
   */
  static async getAssistantResponse(query, profile, competencies, skillGaps, lang = "en") {
    if (this.llmApiKey) {
      try {
        return await this.callExternalLLMAssistant(query, profile, competencies, skillGaps, lang);
      } catch (err) {
        console.warn("External Assistant API failed, using StatSkill Context Engine:", err);
      }
    }
    return this.generateSmartContextualResponse(query, profile, competencies, skillGaps, lang);
  }
  static generateSmartContextualResponse(query, profile, competencies, skillGaps, lang) {
    const q = query.toLowerCase();
    const topGap = skillGaps[0] || { name: "AI & Machine Learning", gap: 40, current: 35, required: 75 };
    const secondGap = skillGaps[1] || { name: "Cloud Computing", gap: 40, current: 30, required: 70 };
    const samplingComp = competencies.find((c) => c.name.toLowerCase().includes("sampling"))?.currentScore ?? 82;
    if (q.includes("what skills") || q.includes("learn next") || q.includes("next skill") || q.includes("kya seekhein")) {
      if (lang === "hi") {
        return `\u0928\u092E\u0938\u094D\u0924\u0947 ${profile.name} \u091C\u0940! \u0906\u092A\u0915\u0947 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932 (${profile.designation}, ${profile.department}) \u0915\u0947 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930, \u0906\u092A\u0915\u0940 \u092E\u0941\u0916\u094D\u092F \u092A\u094D\u0930\u093E\u0925\u092E\u093F\u0915\u0924\u093E\u090F\u0902 \u0939\u0948\u0902:

1. **${topGap.name}** (\u0917\u0948\u092A: ${topGap.gap}%) \u2014 \u0906\u092A\u0915\u0940 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u0915\u094D\u0937\u092E\u0924\u093E ${topGap.current}% \u0939\u0948 \u091C\u092C\u0915\u093F \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E ${topGap.required}% \u0939\u0948\u0964
2. **${secondGap.name}** (\u0917\u0948\u092A: ${secondGap.gap}%) \u2014 \u0906\u0927\u0941\u0928\u093F\u0915 MoSPI \u0938\u0930\u094D\u0935\u0947 \u0921\u0947\u091F\u093E \u092A\u093E\u0907\u092A\u0932\u093E\u0907\u0928 \u0915\u0947 \u0932\u093F\u090F \u0906\u0935\u0936\u094D\u092F\u0915\u0964

**\u0938\u0941\u091D\u093E\u0935:** iGOT \u0915\u0930\u094D\u092E\u092F\u094B\u0917\u0940 \u092A\u0930 *"Machine Learning for Government Analytics"* \u0915\u094B\u0930\u094D\u0938 \u0938\u0947 \u0936\u0941\u0930\u0941\u0906\u0924 \u0915\u0930\u0947\u0902\u0964`;
      }
      if (lang === "te") {
        return `\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 ${profile.name} \u0C17\u0C3E\u0C30\u0C41! \u0C2E\u0C40 \u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24 \u0C2A\u0C4D\u0C30\u0C4A\u0C2B\u0C48\u0C32\u0C4D (${profile.designation}) \u0C35\u0C3F\u0C36\u0C4D\u0C32\u0C47\u0C37\u0C23 \u0C2A\u0C4D\u0C30\u0C15\u0C3E\u0C30\u0C02 \u0C2E\u0C40 \u0C24\u0C26\u0C41\u0C2A\u0C30\u0C3F \u0C05\u0C2D\u0C4D\u0C2F\u0C3E\u0C38 \u0C2A\u0C4D\u0C30\u0C3E\u0C27\u0C3E\u0C28\u0C4D\u0C2F\u0C24\u0C32\u0C41:

1. **${topGap.name}** (\u0C32\u0C4B\u0C2A\u0C02: ${topGap.gap}%) \u2014 \u0C2E\u0C40 \u0C2A\u0C4D\u0C30\u0C38\u0C4D\u0C24\u0C41\u0C24 \u0C38\u0C4D\u0C15\u0C4B\u0C30\u0C41 ${topGap.current}%, \u0C05\u0C35\u0C38\u0C30\u0C2E\u0C48\u0C28\u0C26\u0C3F ${topGap.required}%.
2. **${secondGap.name}** (\u0C32\u0C4B\u0C2A\u0C02: ${secondGap.gap}%) \u2014 \u0C06\u0C27\u0C41\u0C28\u0C3F\u0C15 \u0C17\u0C23\u0C3E\u0C02\u0C15 \u0C35\u0C3F\u0C36\u0C4D\u0C32\u0C47\u0C37\u0C23\u0C15\u0C41 \u0C05\u0C24\u0C4D\u0C2F\u0C35\u0C38\u0C30\u0C02.

**\u0C38\u0C3F\u0C2B\u0C3E\u0C30\u0C4D\u0C38\u0C41:** iGOT \u0C32\u0C4B *"Machine Learning for Government Analytics"* \u0C15\u0C4B\u0C30\u0C4D\u0C38\u0C41\u0C28\u0C41 \u0C2A\u0C4D\u0C30\u0C3E\u0C30\u0C02\u0C2D\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.`;
      }
      return `Hello ${profile.name}! Based on your current profile as **${profile.designation}** in **${profile.department}**, here are your highest-priority learning objectives:

1. **${topGap.name}** (Critical Gap: ${topGap.gap}%) \u2014 Your current capability is **${topGap.current}%** against the benchmark of **${topGap.required}%**. As MoSPI integrates automated survey processing, this is your primary growth area.
2. **${secondGap.name}** (Critical Gap: ${secondGap.gap}%) \u2014 Needed for hosting automated data pipelines and interfacing with MeghRaj Government Cloud.
3. **GIS & Spatial Analytics** (High Gap: 28%) \u2014 Critical for digital Urban Frame Survey (UFS) modernizations.

\u{1F449} **Immediate Action:** We recommend starting Step 1 of your **Personalized Learning Path**: *"Advanced Python for Official Statistics"* on iGOT Karmayogi.`;
    }
    if (q.includes("python")) {
      return `### Why Python is Recommended for ${profile.name} (${profile.designation})

* **Current Python Score:** 55% | **Required Role Level:** 80% (Gap: 25%)
* **Operational Impact:** Python provides essential automation libraries (Pandas, Polars, Samplics) that reduce manual tabulation time in large surveys like PLFS and ASI by up to 40%.
* **Prerequisite for AI/ML:** Python fluency is required before progressing to advanced machine learning for survey imputation.

You are already enrolled in **"Advanced Python for Official Statistics"** (45% completed). Completing the remaining modules will close your medium gap!`;
    }
    if (q.includes("ai/ml") || q.includes("machine learning") || q.includes("ai gap")) {
      return `### AI/ML Competency Diagnostic for ${profile.name}

* **Current Proficiency:** 35% (Beginner)
* **Required Standard:** 75% (Advanced for modern Survey Analytics)
* **Calculated Gap:** **40% (Critical Priority)**

**Context in Official Statistics:** MoSPI's Data Informatics and National Sample Survey divisions are actively deploying machine learning for:
1. **Automated Imputation:** Replacing missing item values without distorting covariance structures.
2. **NLP Classification:** Auto-coding unstructured text to National Industrial Classification (NIC) and National Classification of Occupations (NCO).
3. **Satellite Data Blending:** Merging ground crop surveys with ISRO remote sensing imagery.

Closing this gap will qualify you for the upcoming **NSSTA Residential AI Masterclass**.`;
    }
    if (q.includes("stratified sampling") || q.includes("sampling") || q.includes("sampl")) {
      return `### Overview of Stratified Random Sampling in MoSPI

**Definition:** Stratified Random Sampling is a probability sampling technique where a heterogeneous population of size $N$ is divided into $L$ non-overlapping, homogeneous subgroups called **strata** ($N_1, N_2, \\dots, N_L$).

**Key Benefits in National Surveys:**
* **Variance Reduction:** When elements within a stratum are homogeneous and between-strata differences are large, the sampling variance of the estimated mean is minimized.
* **Subgroup Precision:** Guarantees representation for vital administrative domains (e.g., Rural vs. Urban sectors, district tiers, factory size classes in ASI).
* **Neyman Optimum Allocation:** Sample sizes are distributed according to $n_h \\propto N_h S_h$, allocating more units to larger and more variable strata.

Your current Sampling competency is **${samplingComp}% (Advanced)**! You have strong foundational mastery in this domain.`;
    }
    if (q.includes("igot") || q.includes("courses")) {
      return `### Top iGOT Karmayogi Recommendations for Your Profile

1. \u{1F31F} **Machine Learning for Government Analytics** \u2014 *94% Match*
   \u2022 Addresses your #1 Critical Gap in AI/ML (35% -> 75%)
   \u2022 Duration: 6 Weeks | Includes Certificate from CBC & Wadhwani AI

2. \u{1F310} **Cloud Analytics & NIC GI Cloud Infrastructure** \u2014 *91% Match*
   \u2022 Addresses Cloud gap (30% -> 70%)
   \u2022 Duration: 4 Weeks | MeitY Certified

3. \u{1F5FA}\uFE0F **GIS & Geospatial Analysis for Public Administration** \u2014 *89% Match*
   \u2022 Addresses Spatial Analytics gap (42% -> 70%)
   \u2022 Delivered in partnership with ISRO IIRS

Navigate to the **iGOT Courses** tab in the sidebar to enroll in 1-click!`;
    }
    if (q.includes("nssta") || q.includes("training") || q.includes("tpac")) {
      return `### Recommended NSSTA Training Programmes (TPAC 2026-27)

1. \u{1F3DB}\uFE0F **Advanced AI & Machine Learning Applications in Official Statistics**
   \u2022 **Match Score:** 96% | **Mode:** 5 Days Residential at Greater Noida
   \u2022 **Target Role:** Statistical Officers with >3 yrs service
   \u2022 **Rationale:** Fast-track resolution of your 40% AI/ML gap through hands-on labs with ISI faculty.

2. \u{1F4CD} **GIS Applications & Spatial Sampling in NSS**
   \u2022 **Match Score:** 92% | **Mode:** 3 Days Residential
   \u2022 **Eligibility:** All NSS and Field Operations Personnel

You can submit your nomination request directly through the **NSSTA Training** tab!`;
    }
    return `Thank you for your question, ${profile.name}. As your **StatSkill AI Assistant**, I have integrated your complete competency matrix:

* **Overall Competency Score:** 72%
* **Top Strengths:** Sampling (82%), Data Quality (80%), Ethics (85%)
* **Top Gaps:** ${topGap.name} (${topGap.current}% / ${topGap.required}%), ${secondGap.name} (${secondGap.current}% / ${secondGap.required}%)

You can ask me to explain statistical concepts (e.g., *Neyman allocation*, *GSBPM*, *DPDP compliance*), recommend courses on iGOT Karmayogi, or generate custom quizzes from your training materials. How can I assist your capacity building today?`;
  }
  static async callExternalLLMAssistant(query, profile, competencies, skillGaps, lang) {
    const contextPrompt = `You are "StatSkill AI Assistant", an expert AI mentor for India's Ministry of Statistics and Programme Implementation (MoSPI).
User Profile:
- Name: ${profile.name}
- Designation: ${profile.designation}
- Department: ${profile.department}
- Experience: ${profile.experienceYears} years
- Current Competency Avg: 72%
- Top Gaps: ${skillGaps.slice(0, 3).map((g) => `${g.name}: ${g.current}% (req: ${g.required}%)`).join(", ")}

Respond in language: ${lang === "hi" ? "Hindi" : lang === "te" ? "Telugu" : "English"}.
Be encouraging, precise, professional, and reference MoSPI/iGOT/NSSTA workflows where applicable.

Query: ${query}`;
    const res = await fetch(this.llmApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.llmApiKey}`
      },
      body: JSON.stringify({
        model: this.llmModel,
        messages: [{ role: "user", content: contextPrompt }],
        temperature: 0.4
      })
    });
    if (!res.ok) throw new Error(`LLM Error ${res.status}`);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "Unable to generate response.";
  }
}
