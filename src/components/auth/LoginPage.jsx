import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Layers,
  Lock,
  Mail,
  User,
  Building,
  ArrowRight,
  UserPlus,
  LogIn,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from "lucide-react";

export const LoginPage = ({ onLoginSuccess }) => {
  const { login, signup } = useApp();
  
  // Tab Mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState("login");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("abhinash@statskill.gov.in");
  const [loginPassword, setLoginPassword] = useState("password123");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup state
  const [signupData, setSignupData] = useState({
    name: "Abhinash Kumar",
    email: "abhinash@statskill.gov.in",
    password: "password123",
    confirmPassword: "password123",
    role: "learner",
    designation: "Statistical Officer",
    department: "National Sample Survey (NSS)"
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // Status state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const departments = [
    "National Sample Survey (NSS)",
    "Data Informatics & Innovation Division (DIID)",
    "National Accounts Division (NAD)",
    "Field Operations Division (FOD)",
    "Economic Statistics Division (ESD)",
    "Price Statistics Division (PSD)",
    "National Statistical Systems Training Academy (NSSTA)"
  ];

  const designations = [
    "Statistical Officer",
    "Senior Statistical Officer",
    "Data Analyst / Scientist",
    "Assistant Director",
    "Deputy Director",
    "Director / Joint Director",
    "Additional Director General"
  ];

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg("Please enter both official email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(loginEmail.trim(), loginPassword);
      if (res && res.success) {
        onLoginSuccess?.();
      } else {
        setErrorMsg(res?.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setErrorMsg("Network error connecting to official authentication service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!signupData.name.trim() || !signupData.email.trim() || !signupData.password.trim()) {
      setErrorMsg("Please fill in all required official registration fields.");
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify your password confirmation.");
      return;
    }

    if (signupData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters for official system security.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await signup({
        name: signupData.name.trim(),
        email: signupData.email.trim(),
        password: signupData.password,
        role: signupData.role,
        designation: signupData.designation,
        department: signupData.department
      });

      if (res && res.success) {
        onLoginSuccess?.();
      } else {
        setErrorMsg(res?.message || "Registration failed. This official email may already be registered.");
      }
    } catch (err) {
      setErrorMsg("Network error registering official account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-500 to-indigo-600 p-0.5 shadow-md">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">
                StatSkill <span className="text-amber-400">AI</span>
              </span>
              <span className="bg-blue-600/80 text-[10px] font-extrabold px-2 py-0.5 rounded text-white uppercase tracking-wider">
                MoSPI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Ministry of Statistics & Programme Implementation • Govt. of India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Official Portal</span>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6 z-10">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          
          {/* Header Icon & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Official Skill Intelligence Platform</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {authMode === "login" ? "Official Portal Sign In" : "Register Official Account"}
            </h2>
            <p className="text-xs text-slate-400">
              {authMode === "login"
                ? "Enter your registered credentials to access your capacity building dashboard."
                : "Create a new MoSPI official account to build your dynamic competency dossier."}
            </p>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authMode === "login"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                authMode === "signup"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-700/60 text-xs text-rose-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-xs text-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authMode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Official Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    placeholder="abhinash@statskill.gov.in"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    placeholder="••••••••"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Credential guide hint */}
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Official Account: <strong className="text-amber-400 font-mono">abhinash@statskill.gov.in</strong></span>
                <span className="text-slate-400 font-mono">password123</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* SIGN UP / REGISTRATION FORM */
            <form onSubmit={handleSignup} className="space-y-3.5 text-xs max-h-[480px] overflow-y-auto pr-1">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    placeholder="e.g. Abhinash Kumar"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Official Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    placeholder="abhinash@statskill.gov.in"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Role
                  </label>
                  <select
                    value={signupData.role}
                    onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/90 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="learner">Official (Learner)</option>
                    <option value="admin">Administrator (DIID)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Designation
                  </label>
                  <select
                    value={signupData.designation}
                    onChange={(e) => setSignupData({ ...signupData, designation: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/90 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    {designations.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  MoSPI Department / Division
                </label>
                <div className="relative">
                  <select
                    value={signupData.department}
                    onChange={(e) => setSignupData({ ...signupData, department: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      placeholder="••••••••"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      required
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      placeholder="••••••••"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-3"
              >
                {isSubmitting ? (
                  <span>Registering Official Account...</span>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Official Account & Enter</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom Switch Link */}
          <div className="pt-2 text-center text-xs text-slate-400">
            {authMode === "login" ? (
              <span>
                New government official?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setErrorMsg("");
                  }}
                  className="font-bold text-amber-400 hover:underline"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an official account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setErrorMsg("");
                  }}
                  className="font-bold text-blue-400 hover:underline"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="p-4 border-t border-slate-800 bg-slate-900/60 text-center text-xs text-slate-500">
        Ministry of Statistics & Programme Implementation (MoSPI) • Data Informatics & Innovation Division (DIID)
      </footer>
    </div>
  );
};
