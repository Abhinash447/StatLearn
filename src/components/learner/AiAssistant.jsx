import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { AIAssistantService } from "../../services/aiAssistantService";
import {
  Bot,
  Send,
  User,
  Globe,
  RefreshCw
} from "lucide-react";
export const AiAssistant = () => {
  const { user, competencies, skillGaps, language, setLanguage, setActiveTab, t } = useApp();
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "msg-init",
      sender: "assistant",
      text: `Hello ${user.name}! I am **StatSkill AI Assistant**, your specialized capacity building mentor for India's Official Statistical System.

I have loaded your complete competency dossier (${user.designation}, ${user.department}). How can I assist your statistical learning journey today?`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const messagesEndRef = useRef(null);

  const starterQuestions = [
    language === "hi" ? "मुझे आगे कौन से कौशल सीखने चाहिए?" : language === "te" ? "నేను తరువాత ఏ నైపుణ్యాలను నేర్చుకోవాలి?" : "What skills should I learn next?",
    language === "hi" ? "पायथन की अनुशंसा क्यों की गई?" : language === "te" ? "పైథాన్ ఎందుకు సిఫార్సు చేయబడింది?" : "Why was Python recommended?",
    language === "hi" ? "AI/ML में कौशल अंतर क्यों है?" : language === "te" ? "AI/ML ఎందుకు నైపుణ్య లోపంగా ఉంది?" : "Why is AI/ML a skill gap?",
    language === "hi" ? "स्तरीकृत नमूनाकरण समझाइए।" : language === "te" ? "స్తరీకరించిన నమూనా సేకరణను వివరించండి." : "Explain stratified sampling.",
    language === "hi" ? "मेरे लिए iGOT पाठ्यक्रमों की अनुशंसा करें।" : language === "te" ? "నా కోసం iGOT కోర్సులను సిఫార్సు చేయండి." : "Recommend iGOT courses for me.",
    language === "hi" ? "मुझे कौन सा NSSTA प्रशिक्षण लेना चाहिए?" : language === "te" ? "నేను ఏ NSSTA శిక్షణకు హాజరు కావాలి?" : "What NSSTA training should I attend?",
    language === "hi" ? "मैं अपनी दक्षता कैसे सुधार सकता हूँ?" : language === "te" ? "నేను నా నైపుణ్యాన్ని ఎలా మెరుగుపరచుకోవాలి?" : "How can I improve my competency?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: textToSend.trim(),
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);
    try {
      const reply = await AIAssistantService.getAssistantResponse(
        textToSend,
        user,
        competencies,
        skillGaps,
        language
      );
      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: "assistant",
        text: reply,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: "assistant",
          text: "I encountered an error retrieving live advice. Please try asking again.",
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gov-navy via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-slate-700 flex items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-lg text-white">
                {t("assistantTitle")}
              </h1>
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                Profile-Aware
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              {t("assistantSubtitle")}
            </p>
          </div>
        </div>

        {/* Language selector in Chat */}
        <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1 text-xs">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
          {["en", "hi", "te"].map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === lang ? "bg-amber-400 text-slate-950 shadow-sm" : "text-slate-300 hover:text-white"
              }`}
            >
              {lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "తెలుగు"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isBot ? "justify-start" : "justify-end"}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    isBot
                      ? "bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap"
                      : "bg-blue-600 text-white font-medium rounded-tr-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-2 font-mono ${
                      isBot ? "text-slate-400" : "text-blue-200 text-right"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs flex-shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>StatSkill AI is analyzing your competency profile & curriculum...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Starter Question Chips */}
        <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap pl-1">
            {t("suggestedPrompts") || "Suggested Prompts"}:
          </span>
          {starterQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 whitespace-nowrap transition-all shadow-2xs font-medium flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputQuery);
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t("chatPlaceholder") || "Ask about your skill gaps, recommended courses, or statistical concepts..."}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <span>{t("sendBtn") || "Send"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
