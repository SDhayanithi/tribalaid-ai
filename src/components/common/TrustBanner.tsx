import React from 'react';
import { ShieldCheck, UserCheck, FileText, Bot } from 'lucide-react';

interface TrustBannerProps {
  className?: string;
  compact?: boolean;
}

export const TrustBanner: React.FC<TrustBannerProps> = ({ className = '', compact = false }) => {
  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-slate-50/80 px-3 py-2 rounded-xl border border-slate-200/80 ${className}`}>
        <span className="flex items-center gap-1.5 font-medium">
          <Bot className="w-3.5 h-3.5 text-blue-700" />
          AI-Assisted Verification • Human Decision Required
        </span>
        <span className="hidden sm:inline text-slate-300">|</span>
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          Role-Based Access
        </span>
        <span className="hidden sm:inline text-slate-300">|</span>
        <span className="flex items-center gap-1.5 font-medium">
          <FileText className="w-3.5 h-3.5 text-indigo-700" />
          Immutable Audit Trail
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-4 lg:p-5 shadow-xs border border-slate-800 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700/30 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-300">
            <Bot className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              Responsible AI Governance Framework
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
                Human-in-the-Loop
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              AI algorithms assist in OCR parsing, fraud-risk signals, and data cross-referencing. Final award decisions strictly rest with authorized government scrutiny officers and statutory selection committees.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0 border-t md:border-t-0 md:border-l border-slate-700 pt-3 md:pt-0 md:pl-5">
          <div className="flex items-center gap-2 text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Role-Based Access</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Verified Officers</span>
          </div>
          <div className="flex items-center gap-2 text-slate-200">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span>Audit Trail Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
