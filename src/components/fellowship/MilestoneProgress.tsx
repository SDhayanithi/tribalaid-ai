import React from 'react';
import { CheckCircle2, Clock, Calendar, Award, Check, FileCheck } from 'lucide-react';
import { FellowRecord } from '../../types';

interface MilestoneProgressProps {
  fellow: FellowRecord;
  onApproveProgress?: (remarks: string) => void;
  isOfficer?: boolean;
}

export const MilestoneProgress: React.FC<MilestoneProgressProps> = ({
  fellow,
  onApproveProgress,
  isOfficer = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Doctoral Milestone Timeline (5-Year Tenure)
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Year {fellow.currentYear} Active
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Annual progression requirements: Supervisor review, DRC clearance, and publication milestone
          </p>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Tenure Commencement: <strong>{fellow.startDate}</strong>
        </div>
      </div>

      {/* Year-by-Year Horizontal Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
        {fellow.milestones.map((m) => {
          const isDone = m.status === 'Completed';
          const isCurr = m.status === 'Current';

          return (
            <div
              key={m.year}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                isCurr
                  ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-slate-50/50 border-slate-200 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900">Year {m.year}</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isCurr
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : m.year}
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-tight">
                  {isDone
                    ? 'Cleared & Disbursed'
                    : isCurr
                    ? 'Current Review Cycle'
                    : 'Future Milestone'}
                </p>

                {m.progressReportDate && (
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    {m.progressReportDate}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Disbursed:</span>
                <span className="font-bold font-mono text-slate-800">
                  {m.disbursedAmount > 0
                    ? `₹${(m.disbursedAmount / 100000).toFixed(2)}L`
                    : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current Year Review Status Box */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 text-white rounded-xl shadow-2xs">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Year {fellow.currentYear} Annual Progress Dossier
              </h4>
              <p className="text-[11px] text-slate-500">
                Status: <strong className="text-emerald-700">{fellow.progressReportStatus}</strong> • Guide: {fellow.guideName}
              </p>
            </div>
          </div>

          {isOfficer && fellow.progressReportStatus !== 'Approved' && (
            <button
              onClick={() => onApproveProgress && onApproveProgress('Approved based on University Research Council satisfactory endorsement.')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              Approve Annual Progress
            </button>
          )}
        </div>

        {fellow.milestones.find((m) => m.status === 'Current')?.reviewerRemarks && (
          <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
            <strong>Supervisor Endorsement:</strong> {fellow.milestones.find((m) => m.status === 'Current')?.reviewerRemarks}
          </div>
        )}
      </div>
    </div>
  );
};
