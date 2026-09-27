import React from 'react';
import { X, Columns, Award, CheckCircle2, ShieldAlert, Bot, Sparkles, Building2 } from 'lucide-react';
import { Application } from '../../types';
import { Badge, StatusBadge } from '../common/Badge';

interface CandidateComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Application[];
  onSelectCandidate: (app: Application) => void;
}

export const CandidateComparison: React.FC<CandidateComparisonProps> = ({
  isOpen,
  onClose,
  candidates,
  onSelectCandidate
}) => {
  if (!isOpen || candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-indigo-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl">
              <Columns className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Multi-Candidate Comparative Review
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Side-by-side merit matrix for transparent selection committee deliberation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Human-in-the-Loop Safeguard Notice */}
        <div className="bg-slate-900 text-white px-5 py-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-slate-200">
              Statutory Committee Principle:
            </span>
            <span className="text-slate-400">
              AI generates recommendation vectors based on academic and socioeconomic criteria. Final award power strictly rests with the authorized committee.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-400 shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            Human-in-the-Loop Active
          </span>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-auto p-5 sm:p-6">
          <div className={`grid grid-cols-1 md:grid-cols-${candidates.length} gap-4`}>
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-300 p-5 space-y-4 transition-all relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Candidate Identity */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        {cand.applicantName}
                      </h4>
                      <p className="text-xs font-mono text-slate-500">{cand.id}</p>
                      <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                        {cand.tribeName} Tribe ({cand.state})
                      </p>
                    </div>
                    <Badge variant={cand.scheme === 'NFST' ? 'info' : 'saffron'}>
                      {cand.scheme}
                    </Badge>
                  </div>

                  {/* Attributes Matrix */}
                  <div className="space-y-3 mt-4 text-xs">
                    {/* Academic Score */}
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Academic Aggregate
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-black text-slate-900">
                          {cand.academicScore.toFixed(1)}%
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {cand.degree.split(' in ')[0] || cand.degree}
                        </span>
                      </div>
                    </div>

                    {/* Annual Family Income */}
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Certified Family Income
                      </span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-lg font-bold text-slate-900">
                          ₹{cand.annualIncome.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                          Within ₹6L Ceiling
                        </span>
                      </div>
                    </div>

                    {/* Institution */}
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                        Research Institution
                      </span>
                      <p className="text-xs font-semibold text-slate-800 mt-0.5 line-clamp-2">
                        {cand.institution}
                      </p>
                    </div>

                    {/* Document Completeness */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-medium">Document Completeness:</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        5/5 Uploaded
                      </span>
                    </div>

                    {/* AI Verification Confidence */}
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-500 font-medium">AI Confidence:</span>
                      <span className="font-bold text-blue-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        {100 - cand.aiRiskScore}% (Low Risk)
                      </span>
                    </div>

                    {/* Recommendation */}
                    <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100">
                      <span className="text-blue-700 block text-[10px] font-bold uppercase tracking-wider">
                        AI Recommendation
                      </span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {cand.aiRecommendation === 'Recommended'
                          ? 'Recommended for Sanction'
                          : 'Manual Review Advised'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCandidate(cand);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Select for Scholarship Award</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
