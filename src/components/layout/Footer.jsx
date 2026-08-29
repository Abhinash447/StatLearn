import { ShieldCheck, Cpu, Database, Network } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-6 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
            <span>StatSkill AI — MoSPI National Capacity Building Ecosystem</span>
            <span className="bg-slate-800 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-slate-700">
              v1.0 SIH 2026
            </span>
          </div>
          <p className="text-slate-400 text-[11px] max-w-xl">
            Designed for Data Informatics & Innovation Division (DIID), Ministry of Statistics & Programme Implementation, Government of India.
            Compliant with DPDP Act 2023, GSBPM 5.1 & UN Fundamental Principles of Official Statistics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Psychometric Engine</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>iGOT Karmayogi API</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            <Network className="w-3.5 h-3.5 text-emerald-400" />
            <span>NSSTA Calendar</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>NIC Cloud Ready</span>
          </div>
        </div>
      </div>
    </footer>;
};
