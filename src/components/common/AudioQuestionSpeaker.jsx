import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Square, Play, Sparkles } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AudioQuestionSpeaker = ({ questionNumber, questionText, options = [], competency = "" }) => {
  const { language } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Stop any ongoing speech when question changes or component unmounts
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [questionNumber, questionText]);

  const speakQuestion = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }

    // Compose formatted speech text based on active language
    let speechContent = "";
    const letters = ["A", "B", "C", "D"];

    if (language === "hi") {
      speechContent = `प्रश्न संख्या ${questionNumber}. ${questionText}. `;
      if (options && options.length > 0) {
        speechContent += "विकल्प हैं: ";
        options.forEach((opt, idx) => {
          speechContent += `विकल्प ${letters[idx] || idx + 1}: ${opt}. `;
        });
      }
    } else if (language === "te") {
      speechContent = `ప్రశ్న సంఖ్య ${questionNumber}. ${questionText}. `;
      if (options && options.length > 0) {
        speechContent += "ఎంపికలు: ";
        options.forEach((opt, idx) => {
          speechContent += `ఎంపిక ${letters[idx] || idx + 1}: ${opt}. `;
        });
      }
    } else {
      speechContent = `Question ${questionNumber}. ${questionText}. `;
      if (options && options.length > 0) {
        speechContent += "Options are: ";
        options.forEach((opt, idx) => {
          speechContent += `Option ${letters[idx] || idx + 1}: ${opt}. `;
        });
      }
    }

    const utterance = new SpeechSynthesisUtterance(speechContent);
    
    // Choose appropriate voice/language code
    if (language === "hi") {
      utterance.lang = "hi-IN";
    } else if (language === "te") {
      utterance.lang = "te-IN";
    } else {
      utterance.lang = "en-IN";
    }

    // Try finding installed voices for better quality
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const matchVoice = voices.find((v) => 
        (language === "hi" && (v.lang.includes("hi") || v.name.toLowerCase().includes("hindi"))) ||
        (language === "te" && (v.lang.includes("te") || v.name.toLowerCase().includes("telugu"))) ||
        (language === "en" && (v.lang === "en-IN" || v.lang.startsWith("en")))
      );
      if (matchVoice) {
        utterance.voice = matchVoice;
      }
    }

    utterance.rate = 0.95; // Slightly slower for clarity during assessments
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis notice:", e);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const getLabel = () => {
    if (isSpeaking) {
      if (language === "hi") return "ऑडियो बंद करें";
      if (language === "te") return "ఆడియో ఆపండి";
      return "Stop Audio";
    }
    if (language === "hi") return "प्रश्न सुनें (Audio)";
    if (language === "te") return "ప్రశ్న వినండి (Audio)";
    return "Listen to Question";
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={speakQuestion}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
          isSpeaking
            ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-300 animate-pulse"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20 hover:shadow"
        }`}
        title="Text-to-Speech audio reader for official questions"
      >
        {isSpeaking ? (
          <>
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>{getLabel()}</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-2 bg-white animate-bounce" />
              <span className="w-0.5 h-3 bg-white animate-bounce delay-100" />
              <span className="w-0.5 h-1.5 bg-white animate-bounce delay-200" />
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>{getLabel()}</span>
          </>
        )}
      </button>
    </div>
  );
};
