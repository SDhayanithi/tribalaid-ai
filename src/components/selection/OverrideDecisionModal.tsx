import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Application } from '../../types';

interface OverrideDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application;
  onRecordDecision: (decision: 'Selected' | 'Waitlisted' | 'Not Selected', remarks: string, reviewer: string) => void;
}

export const OverrideDecisionModal: React.FC<OverrideDecisionModalProps> = ({
  isOpen,
  onClose,
  application,
  onRecordDecision
}) => {
  const [decision, setDecision] = useState<'Selected' | 'Waitlisted' | 'Not Selected'>('Selected');
  const [remarks, setRemarks] = useState<string>(
    'Unanimously approved by Selection Committee. Candidate demonstrates exceptional academic merit (94.2% M.Sc Botany) and high-impact doctoral research in indigenous tribal pharmacology.'
  );
  const [reviewerName, setReviewerName] = useState<string>('Prof. Anirudh Marandi (Selection Committee Chair)');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remarks.trim()) return;

    if (decision === 'Selected') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      onRecordDecision(decision, remarks, reviewerName);
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Record Committee Decision
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {application.id} • {application.applicantName}
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Decision Recorded Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Selection decision has been logged to the immutable MoTA audit trail. The candidate and regional nodal office have been notified.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-400">
              Audit ID: AUDIT-SEC-{Date.now().toString().slice(-6)} • Authorized by {reviewerName}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Candidate Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Academic Merit</span>
                <span className="font-bold text-slate-900 text-sm">
                  {application.academicScore.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">AI Pre-Screening</span>
                <span className="font-bold text-blue-700">
                  {application.aiRecommendation}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Annual Income</span>
                <span className="font-bold text-slate-800">
                  ₹{(application.annualIncome / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* Decision Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Statutory Committee Award Decision
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 'Selected' as const, label: 'Selected (Awarded)', color: 'text-emerald-700 border-emerald-300 bg-emerald-50' },
                  { val: 'Waitlisted' as const, label: 'Waitlisted', color: 'text-amber-800 border-amber-300 bg-amber-50' },
                  { val: 'Not Selected' as const, label: 'Not Selected', color: 'text-rose-700 border-rose-300 bg-rose-50' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setDecision(item.val)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                      decision === item.val
                        ? `${item.color} ring-2 ring-blue-500/20 shadow-xs`
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mandatory Reason for Override / Decision */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Mandatory Reason / Deliberation Minutes</span>
                <span className="text-[10px] text-amber-700 font-semibold">*Required for Audit</span>
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                required
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                placeholder="Document academic merits, committee justification, or policy reasons..."
              />
            </div>

            {/* Authorizing Official */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Authorized Reviewer / Committee Chair
              </label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Record Decision</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
