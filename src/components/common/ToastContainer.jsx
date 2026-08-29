import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";
export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();
  if (toasts.length === 0) return null;
  return <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
    const isSuccess = toast.type === "success";
    const isError = toast.type === "error";
    const isWarning = toast.type === "warning";
    return <div
      key={toast.id}
      className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 duration-200 ${isSuccess ? "bg-emerald-950/90 text-emerald-100 border-emerald-700/60" : isError ? "bg-rose-950/90 text-rose-100 border-rose-700/60" : isWarning ? "bg-amber-950/90 text-amber-100 border-amber-700/60" : "bg-slate-900/90 text-slate-100 border-slate-700/60"}`}
    >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />}
            {isError && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />}
            {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />}
            {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs leading-relaxed font-medium">
              {toast.message}
            </div>

            <button
      onClick={() => removeToast(toast.id)}
      className="text-slate-400 hover:text-white transition-colors"
    >
              <X className="w-4 h-4" />
            </button>
          </div>;
  })}
    </div>;
};
