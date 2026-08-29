import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AIEngine } from "../../services/aiEngine";
import { DEMO_SAMPLE_MATERIAL } from "../../data/initialData";
import { LoadingModal } from "../common/LoadingModal";
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Settings2,
  FileCheck
} from "lucide-react";
export const QuizGenerator = () => {
  const { startQuizSession, showToast, t } = useApp();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [materialTitle, setMaterialTitle] = useState("");
  const [isUsingDemo, setIsUsingDemo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [topic, setTopic] = useState("Auto Detect");

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      showToast("File is too large. Please upload files under 25MB.", "error");
      return;
    }
    setUploadedFile(file);
    setIsUsingDemo(false);
    setMaterialTitle(file.name);
    try {
      const text = await AIEngine.extractTextFromFile(file);
      setExtractedText(text);
      showToast(`Processed "${file.name}" (${text.length} characters extracted)`, "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to extract text from document", "error");
    }
  };

  const handleLoadDemoMaterial = () => {
    setIsUsingDemo(true);
    setUploadedFile(null);
    setMaterialTitle(DEMO_SAMPLE_MATERIAL.title);
    setExtractedText(DEMO_SAMPLE_MATERIAL.content);
    setTopic("Survey Sampling Methods & Precision");
    showToast("Loaded MoSPI Demo Material: Introduction to Sampling Methods", "info");
  };

  const handleGenerateQuiz = async () => {
    const textToUse = extractedText.trim() || DEMO_SAMPLE_MATERIAL.content;
    const fileNameToUse = materialTitle || DEMO_SAMPLE_MATERIAL.title;
    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2200));
      const quiz = await AIEngine.generateQuiz({
        questionCount,
        difficulty,
        topic,
        sourceText: textToUse,
        sourceFileName: fileNameToUse
      });
      setIsProcessing(false);
      showToast(`Generated ${quiz.questions.length} AI MCQs for "${quiz.topic}"!`, "success");
      startQuizSession(quiz);
    } catch (err) {
      setIsProcessing(false);
      console.error(err);
      showToast("Error generating AI assessment. Using statistical fallback.", "warning");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <LoadingModal
        isOpen={isProcessing}
        title="Generating AI Psychometric Assessment"
        steps={[
          "Ingesting official statistical document text...",
          "Extracting core concepts (Sampling, GSBPM, Survey Weights)...",
          "Synthesizing psychometric MCQs with distractor options...",
          "Calibrating difficulty levels & tagging MoSPI competencies..."
        ]}
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                SIH Core Requirement 19-24
              </span>
              <span className="text-xs text-slate-300">Document to Psychometric Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {t("quizGenTitle")}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {t("quizGenSubtitle")}
            </p>
          </div>

          <button
            onClick={handleLoadDemoMaterial}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all flex-shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("tryDemoBtn")}</span>
          </button>
        </div>
      </div>

      {/* Main Upload and Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upload Zone */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-blue-600" />
              {t("uploadDocTitle")}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Supported formats: <strong>PDF</strong>, <strong>DOCX</strong>, <strong>PPTX</strong>, <strong>TXT</strong> (Max 25MB)
            </p>

            {/* Drag and Drop Box */}
            <label className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${uploadedFile || isUsingDemo ? "border-emerald-400 bg-emerald-50/40" : "border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/30"}`}>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.csv,.md"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedFile || isUsingDemo ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{materialTitle}</h4>
                  <p className="text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isUsingDemo ? "Preloaded MoSPI Training Document" : "Document Parsed Successfully"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {extractedText.length} characters ready for AI question generation
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800">
                    Click to browse or drag & drop document here
                  </h4>
                  <p className="text-xs text-slate-400">
                    NSS manuals, PLFS methodology, SNA guidelines, Python scripts
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Document Preview Snippet */}
          {extractedText && (
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Text Excerpt:</span>
              <p className="text-slate-600 line-clamp-3 font-mono text-[11px] leading-relaxed">
                {extractedText}
              </p>
            </div>
          )}
        </div>

        {/* Right: Quiz Configuration */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-600" />
              {t("quizConfigTitle")}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Customize question volume, difficulty distribution, and competency tags.
            </p>

            <div className="space-y-4 text-xs">
              {/* Question Count */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("numMcqs")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`py-2 rounded-xl font-bold transition-all ${questionCount === num ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("difficultyLevel")}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["Easy", "Medium", "Hard", "Mixed"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2 rounded-xl font-bold transition-all ${difficulty === diff ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("assessmentTopic")}
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Auto Detect">Auto Detect from Document Text</option>
                  <option value="Survey Sampling Methods & Precision">Survey Sampling Methods & Precision</option>
                  <option value="AI & Machine Learning for Official Statistics">AI & Machine Learning for Official Statistics</option>
                  <option value="Python Data Wrangling & Tabulation Automation">Python Data Wrangling & Tabulation Automation</option>
                  <option value="Geospatial Analytics & Primary Sampling Units">Geospatial Analytics & Primary Sampling Units</option>
                  <option value="Data Privacy, DPDP Act & Cybersecurity">Data Privacy, DPDP Act & Cybersecurity</option>
                  <option value="Data Quality Frameworks & Error Estimation">Data Quality Frameworks & Error Estimation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleGenerateQuiz}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t("generateQuizBtn")}</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Evaluation results immediately update your live competency scores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
