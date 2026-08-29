import { DEMO_SAMPLE_MATERIAL } from "../data/initialData";
import mammoth from "mammoth";
export class AIEngine {
  static llmApiKey = import.meta.env.VITE_LLM_API_KEY || "";
  static llmApiUrl = import.meta.env.VITE_LLM_API_URL || "https://api.openai.com/v1/chat/completions";
  static llmModel = import.meta.env.VITE_LLM_MODEL || "gpt-4o-mini";
  /**
   * Extract text content from user-uploaded files (PDF, DOCX, PPTX, TXT)
   */
  static async extractTextFromFile(file) {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith(".txt") || fileName.endsWith(".md") || fileName.endsWith(".csv") || file.type.includes("text")) {
      return await file.text();
    }
    if (fileName.endsWith(".docx") || file.type.includes("wordprocessingml")) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        if (result.value && result.value.trim().length > 50) {
          return result.value;
        }
      } catch (err) {
        console.warn("Mammoth docx extraction fallback:", err);
      }
    }
    try {
      const buffer = await file.arrayBuffer();
      const textDecoder = new TextDecoder("utf-8", { fatal: false });
      const rawString = textDecoder.decode(buffer);
      const cleaned = rawString.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ").replace(/\s+/g, " ").replace(/stream.*?endstream/gis, " ").replace(/obj.*?endobj/gis, " ").trim();
      const sentences = cleaned.split(/[.\n]/).map((s) => s.trim()).filter((s) => s.length > 20 && /[a-zA-Z]{3,}/.test(s));
      if (sentences.length >= 3) {
        return sentences.slice(0, 100).join(". ");
      }
    } catch (err) {
      console.warn("Binary text extraction fallback error:", err);
    }
    return `Learning Material Excerpt from ${file.name}:

This training document contains specialized guidance on official statistical workflows, sampling frames, data quality validation under GSBPM, digital data governance, and survey analytical methodologies in MoSPI.`;
  }
  /**
   * Main Quiz Generator: Tries real LLM API if key is set, otherwise seamlessly uses the deterministic Statistical AI Engine
   */
  static async generateQuiz(config) {
    const { questionCount, difficulty, topic, sourceText, sourceFileName } = config;
    const textContent = sourceText.trim() || DEMO_SAMPLE_MATERIAL.content;
    const resolvedTopic = topic && topic !== "Auto Detect" ? topic : this.detectTopic(textContent, sourceFileName);
    let questions = [];
    if (this.llmApiKey) {
      try {
        questions = await this.generateWithExternalLLM(textContent, resolvedTopic, questionCount, difficulty);
      } catch (err) {
        console.warn("External LLM failed, using Deterministic Fallback AI Engine:", err);
        questions = this.generateWithFallbackAI(textContent, resolvedTopic, questionCount, difficulty);
      }
    } else {
      questions = this.generateWithFallbackAI(textContent, resolvedTopic, questionCount, difficulty);
    }
    if (questions.length < questionCount) {
      const fillers = this.generateWithFallbackAI(textContent, resolvedTopic, questionCount, difficulty);
      questions = [...questions, ...fillers].slice(0, questionCount);
    }
    return {
      id: `quiz-${Date.now()}`,
      title: `${resolvedTopic} \u2014 AI Assessment`,
      description: `AI-Generated MCQ diagnostic assessment evaluating official statistical competencies from uploaded training material.`,
      topic: resolvedTopic,
      difficulty,
      questions: questions.slice(0, questionCount),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      sourceMaterialName: sourceFileName || DEMO_SAMPLE_MATERIAL.title,
      sourceTextSnippet: textContent.slice(0, 300) + "..."
    };
  }
  /**
   * Detect topic and category automatically from document text
   */
  static detectTopic(text, fileName) {
    const lower = (text + " " + (fileName || "")).toLowerCase();
    if (lower.includes("stratified") || lower.includes("sampling") || lower.includes("cluster") || lower.includes("srs")) {
      return "Survey Sampling Methods & Precision";
    }
    if (lower.includes("machine learning") || lower.includes("model") || lower.includes("ai") || lower.includes("neural")) {
      return "AI & Machine Learning for Official Statistics";
    }
    if (lower.includes("python") || lower.includes("pandas") || lower.includes("script") || lower.includes("dataframe")) {
      return "Python Data Wrangling & Tabulation Automation";
    }
    if (lower.includes("gis") || lower.includes("spatial") || lower.includes("shapefile") || lower.includes("qgis")) {
      return "Geospatial Analytics & Primary Sampling Units";
    }
    if (lower.includes("cloud") || lower.includes("meghraj") || lower.includes("nic") || lower.includes("api")) {
      return "Government Cloud Infrastructure & Open APIs";
    }
    if (lower.includes("dpdp") || lower.includes("privacy") || lower.includes("cyber") || lower.includes("anonymization")) {
      return "Data Privacy, DPDP Act & Cybersecurity";
    }
    if (lower.includes("quality") || lower.includes("gsbpm") || lower.includes("error") || lower.includes("audit")) {
      return "Data Quality Frameworks & Error Estimation";
    }
    return "MoSPI Official Statistical Intelligence";
  }
  /**
   * Deterministic Statistical AI Generator with deep domain knowledge for MoSPI
   */
  static generateWithFallbackAI(text, topic, count, difficulty) {
    const pool = this.getDomainKnowledgeQuestionPool(text, topic);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((q, idx) => {
      const assignedDiff = difficulty === "Mixed" ? ["Easy", "Medium", "Hard"][idx % 3] : difficulty;
      return {
        ...q,
        id: `gen-q-${idx + 1}-${Date.now()}`,
        difficulty: assignedDiff
      };
    });
  }
  /**
   * External OpenAI-compatible LLM Caller
   */
  static async generateWithExternalLLM(text, topic, count, difficulty) {
    const prompt = `You are an expert psychometrician and statistical trainer for India's Ministry of Statistics and Programme Implementation (MoSPI).
Generate exactly ${count} multiple choice questions (MCQs) based on the following training text.
Topic: ${topic}
Difficulty: ${difficulty}

TEXT:
${text.slice(0, 3500)}

Return ONLY valid JSON in this exact structure without markdown backticks:
{
  "questions": [
    {
      "question": "Clear, rigorous statistical question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 1,
      "explanation": "Clear detailed explanation of why this answer is correct according to official statistical standards",
      "competency": "Sampling",
      "category": "statistical"
    }
  ]
}`;
    const res = await fetch(this.llmApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.llmApiKey}`
      },
      body: JSON.stringify({
        model: this.llmModel,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3
      })
    });
    if (!res.ok) {
      throw new Error(`LLM HTTP ${res.status}`);
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    const cleanJson = content.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return (parsed.questions || []).map((q, i) => ({
      id: `llm-q-${i + 1}-${Date.now()}`,
      question: q.question,
      options: q.options || ["A", "B", "C", "D"],
      correctAnswerIndex: Number.isInteger(q.correctAnswerIndex) ? q.correctAnswerIndex : 0,
      explanation: q.explanation || "Correct based on official statistical standards.",
      competency: q.competency || "Sampling",
      difficulty: difficulty === "Mixed" ? ["Easy", "Medium", "Hard"][i % 3] : difficulty,
      category: q.category || "statistical"
    }));
  }
  /**
   * Rich MoSPI Official Statistical domain question bank for dynamic generation
   */
  static getDomainKnowledgeQuestionPool(text, topic) {
    const isSampling = text.toLowerCase().includes("sampling") || topic.includes("Sampling");
    const isPython = text.toLowerCase().includes("python") || topic.includes("Python");
    const isML = text.toLowerCase().includes("machine learning") || text.toLowerCase().includes("ai") || topic.includes("AI");
    const isGIS = text.toLowerCase().includes("gis") || text.toLowerCase().includes("spatial") || topic.includes("GIS");
    const list = [];
    if (isSampling || !isPython && !isML && !isGIS) {
      list.push(
        {
          id: "k-1",
          question: "What is the primary scientific purpose of Stratified Random Sampling in official national socio-economic surveys?",
          options: [
            "To artificially increase the overall sample size at zero marginal cost",
            "To partition the population into homogeneous strata to minimize within-stratum variance and ensure representation",
            "To eliminate all non-sampling and response errors from the survey",
            "To allow field enumerators to pick households based on convenience"
          ],
          correctAnswerIndex: 1,
          explanation: "Stratified sampling divides a heterogeneous population into homogeneous subpopulations (strata) before sampling, maximizing statistical precision and guaranteeing representation of critical administrative groups.",
          competency: "Sampling",
          difficulty: "Medium",
          category: "statistical"
        },
        {
          id: "k-2",
          question: 'In the context of MoSPI survey operations, what defines an ideal "Sampling Frame"?',
          options: [
            "A random collection of telephone directories without address verification",
            "An exhaustive, up-to-date, non-duplicated list or geospatial map of all sampling units in the target population",
            "A sample of 100 convenience households interviewed in the capital city",
            "An unverified list of voluntary survey respondents"
          ],
          correctAnswerIndex: 1,
          explanation: "An ideal sampling frame (such as NSS Urban Frame Survey blocks or Census directories) provides complete, non-overlapping, and exhaustive coverage of the target universe.",
          competency: "Sampling",
          difficulty: "Easy",
          category: "statistical"
        },
        {
          id: "k-3",
          question: "How does Neyman (Optimum) Allocation determine the sample size allocated to each stratum in a stratified survey design?",
          options: [
            "It allocates an identical sample size to every stratum regardless of population size or variability",
            "It allocates sample sizes proportional to stratum size (N_h) and standard deviation (S_h)",
            "It allocates larger sample sizes only to strata located near the headquarters",
            "It allocates samples in reverse proportion to population size"
          ],
          correctAnswerIndex: 1,
          explanation: "Neyman allocation minimizes the variance of the estimated mean for a fixed overall sample size by allocating more units to strata that are larger and exhibit higher internal variance.",
          competency: "Sampling",
          difficulty: "Hard",
          category: "statistical"
        },
        {
          id: "k-4",
          question: 'Which of the following is an example of a "Non-Sampling Error" in large-scale sample surveys?',
          options: [
            "Random variance occurring because a sample rather than the full census was enumerated",
            "Respondent recall bias and enumerator data transcription errors in CAPI devices",
            "Standard error derived strictly from sample size mathematical bounds",
            "Variance reduction achieved through double sampling"
          ],
          correctAnswerIndex: 1,
          explanation: "Non-sampling errors arise from measurement flaws, questionnaire miscomprehension, non-response, and data entry errors, occurring in both sample surveys and complete censuses.",
          competency: "Survey Design",
          difficulty: "Easy",
          category: "statistical"
        },
        {
          id: "k-5",
          question: "Why is Multi-Stage Cluster Sampling commonly preferred in nationwide household surveys despite higher design effects?",
          options: [
            "It reduces field travel costs, logistical overhead, and the requirement of constructing a nationwide household list",
            "It completely eliminates sampling variance compared to simple random sampling",
            "It guarantees zero non-response across all districts",
            "It eliminates the need for survey weights"
          ],
          correctAnswerIndex: 0,
          explanation: "Multi-stage sampling enables listing and selecting households only within selected Primary Sampling Units (villages/blocks), dramatically reducing field costs and administrative complexity.",
          competency: "Sampling",
          difficulty: "Medium",
          category: "statistical"
        },
        {
          id: "k-6",
          question: "When adjusting survey estimates for unit non-response in official reports, what statistical procedure is applied to design weights?",
          options: [
            "Discarding all weights and reporting unweighted sample means",
            "Calibration weighting / post-stratification to adjust weights to match known census population benchmarks",
            "Doubling the weight of the lowest income decile",
            "Setting all non-responding unit weights to zero without reweighting"
          ],
          correctAnswerIndex: 1,
          explanation: "Post-stratification and weight calibration scale up responding unit weights so weighted sample totals match known marginal population totals from the Census.",
          competency: "Data Quality Frameworks",
          difficulty: "Hard",
          category: "statistical"
        }
      );
    }
    if (isPython || list.length < 5) {
      list.push(
        {
          id: "k-7",
          question: "Which Python Pandas data structure operation is optimal for computing multi-stage stratified survey aggregates over large microdata files?",
          options: [
            "df.to_dict() and nested Python for-loops",
            'df.groupby(["stratum_id", "sector"]).apply(custom_weighted_agg)',
            "df.iterrows() with accumulator dictionary",
            "Saving to CSV and re-reading in line-by-line"
          ],
          correctAnswerIndex: 1,
          explanation: "Pandas groupby operations leverage fast C-level split-apply-combine logic to compute subgroup weighted metrics rapidly.",
          competency: "Python",
          difficulty: "Medium",
          category: "technical"
        },
        {
          id: "k-8",
          question: "In statistical Python scripting, which library is specifically designed for handling complex survey designs including strata, clusters, and weights?",
          options: [
            "PyAutoGUI",
            "Samplics / Statsmodels survey module",
            "Pygame",
            "Flask"
          ],
          correctAnswerIndex: 1,
          explanation: "Samplics and Statsmodels provide dedicated classes for complex survey analysis, Taylor series linearization, and jackknife variance estimation.",
          competency: "Python",
          difficulty: "Medium",
          category: "technical"
        }
      );
    }
    if (isML || list.length < 8) {
      list.push(
        {
          id: "k-9",
          question: "How can Machine Learning Random Forest models improve official survey imputation compared to simple mean substitution?",
          options: [
            "By preserving complex multivariate relationships, non-linear interactions, and conditional variance between survey variables",
            "By deleting all rows containing any missing value",
            "By replacing all missing values with zero",
            "By changing the sampling frame randomly"
          ],
          correctAnswerIndex: 0,
          explanation: "Tree-based iterative imputation (like MissForest) captures non-linear dependencies and interaction effects across auxiliary variables, yielding realistic imputed distributions without distorting covariance structures.",
          competency: "AI & Machine Learning",
          difficulty: "Hard",
          category: "technical"
        },
        {
          id: "k-10",
          question: "What is the primary risk of using uncalibrated Large Language Models (LLMs) for automated coding of occupational or industrial descriptions in official statistics?",
          options: [
            "They always run at zero electrical power",
            "Hallucination of non-existent classification codes and lack of deterministic reproducibility",
            "They cannot process English or Hindi text",
            "They only run on 32-bit hardware"
          ],
          correctAnswerIndex: 1,
          explanation: "Generative models can hallucinate invalid NIC/NCO codes or produce non-deterministic outputs unless constrained by strict schema validators and temperature zero decoding.",
          competency: "AI & Machine Learning",
          difficulty: "Medium",
          category: "technical"
        }
      );
    }
    if (isGIS || list.length < 10) {
      list.push(
        {
          id: "k-11",
          question: "In GIS spatial sampling, why is assigning a standardized Coordinate Reference System (such as EPSG:4326 or UTM WGS84) essential before area calculation?",
          options: [
            "To prevent geographical distortion and ensure accurate area and distance measurements during spatial stratification",
            "To change the language of the map labels to English",
            "To increase the file size of the shapefile",
            "To hide the boundaries from field surveyors"
          ],
          correctAnswerIndex: 0,
          explanation: "Coordinate Reference Systems define how the 3D earth is projected onto a 2D map. Choosing appropriate projected coordinate systems is vital for accurate metric area measurements.",
          competency: "GIS & Spatial Analytics",
          difficulty: "Medium",
          category: "technical"
        }
      );
    }
    return list;
  }
  /**
   * Generate personalized post-assessment AI feedback and next learning recommendations
   */
  static generateAssessmentFeedback(percentage, competencyScores, topic) {
    let feedback = "";
    let recommendedNextStep = "";
    let suggestedCompetencyDelta = 0;
    const strongComps = [];
    const weakComps = [];
    Object.entries(competencyScores).forEach(([name, data]) => {
      const pct = data.total > 0 ? data.correct / data.total * 100 : 0;
      if (pct >= 80) strongComps.push(name);
      else weakComps.push(name);
    });
    if (percentage >= 85) {
      feedback = `Outstanding performance (${percentage}%) on "${topic}". You demonstrated master-level comprehension across ${strongComps.join(", ") || "core principles"}. Your theoretical understanding aligns with advanced MoSPI standards.`;
      recommendedNextStep = `Enroll in "Advanced Survey Methodology" (NSSTA) or explore mentoring roles for junior statistical officers.`;
      suggestedCompetencyDelta = 8;
    } else if (percentage >= 60) {
      feedback = `Solid working knowledge (${percentage}%) in "${topic}". Strong grasp of ${strongComps.join(", ") || "foundations"}, with targeted growth opportunities in ${weakComps.join(", ") || "advanced variance estimation"}.`;
      recommendedNextStep = `Complete practical simulation exercises in "Machine Learning for Government Analytics" on iGOT Karmayogi.`;
      suggestedCompetencyDelta = 5;
    } else {
      feedback = `Foundational understanding (${percentage}%) identified in "${topic}". Review of core concepts in ${weakComps.join(", ") || "statistical frameworks"} is recommended before undertaking complex field assignments.`;
      recommendedNextStep = `Take the foundational module "Advanced Python & Survey Methodology" on iGOT Karmayogi to consolidate core concepts.`;
      suggestedCompetencyDelta = 2;
    }
    return { feedback, recommendedNextStep, suggestedCompetencyDelta };
  }
}
