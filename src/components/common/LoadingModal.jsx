import { useEffect, useState } from "react";
import { Sparkles, Brain, Cpu, CheckCircle2 } from "lucide-react";
export const LoadingModal = ({
  isOpen,
  title = "AI Intelligence Processing",
  steps = [
    "Processing learning material...",
    "Extracting statistical concepts & metadata...",
    "Generating psychometric MCQs & distractor options...",
    "Calibrating difficulty and tagging MoSPI competencies..."
  ]
}) => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if (!isOpen) {
      setActiveStep(0);
      return;
    }
    const interval = setInterval(() => {
      setActiveStep((prev) => prev < steps.length - 1 ? prev + 1 : prev);
    }, 700);
    return () => clearInterval(interval);
  }, [isOpen, steps.length]);
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        {
    /* Top accent gradient bar */
  }
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-600" />

        {
    /* Animated AI Brain Icon */
  }
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 relative">
          <Brain className="w-8 h-8 animate-pulse text-blue-600" />
          <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1 animate-spin" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-xs text-slate-500 mb-6 flex items-center justify-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-blue-600" />
          MoSPI Statistical AI Psychometric Model
        </p>

        {
    /* Stepper Progress */
  }
        <div className="space-y-3 text-left">
          {steps.map((step, idx) => {
    const isCompleted = idx < activeStep;
    const isCurrent = idx === activeStep;
    return <div
      key={idx}
      className={`flex items-center gap-3 p-2.5 rounded-lg text-xs transition-all ${isCurrent ? "bg-blue-50 text-blue-900 font-semibold border border-blue-200 shadow-sm" : isCompleted ? "text-emerald-700 font-medium" : "text-slate-400"}`}
    >
                <div className="flex-shrink-0">
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : isCurrent ? <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />}
                </div>
                <span className="flex-1">{step}</span>
              </div>;
  })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          Compliant with National Statistical Capacity Building Guidelines
        </div>
      </div>
    </div>;
};
