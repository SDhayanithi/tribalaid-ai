import React from 'react';
import { Check, Clock, CircleDot, ChevronRight, ShieldCheck, Award, WalletCards } from 'lucide-react';
import { Application } from '../../types';

interface JourneyTimelineProps {
  application: Application;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ application }) => {
  // Determine progression index based on status
  // 0: Submitted, 1: Under Review, 2: Document Verification, 3: Selection, 4: Disbursement
  const getStageIndex = () => {
    switch (application.status) {
      case 'Submitted':
        return 0;
      case 'Under Review':
        return 1;
      case 'Document Verification':
      case 'Deficiency Raised':
      case 'Resubmitted':
        return 2;
      case 'Scrutiny Verified':
      case 'Eligible for Selection':
      case 'Committee Shortlisted':
        return 3;
      case 'Selected':
      case 'Disbursement Active':
        return 4;
      default:
        return 2;
    }
  };

  const currentIndex = getStageIndex();

  const stages = [
    {
      title: 'Submitted',
      subtitle: 'Portal Acknowledgment',
      date: application.submittedAt.split(',')[0],
      icon: Check
    },
    {
      title: 'Under Review',
      subtitle: 'Initial Scrutiny Desk',
      date: '12 Sep 2026',
      icon: Clock
    },
    {
      title: 'Document Verification',
      subtitle: 'AI OCR & Officer Check',
      date: application.status === 'Deficiency Raised' ? 'Deficiency Raised' : '13 Sep 2026',
      icon: ShieldCheck
    },
    {
      title: 'Selection',
      subtitle: 'Committee Merit Award',
      date: application.status === 'Selected' ? 'Selected' : 'Expected 28 Sep',
      icon: Award
    },
    {
      title: 'Disbursement',
      subtitle: 'Direct Benefit Transfer',
      date: application.status === 'Selected' ? 'Active DBT' : 'Post Selection',
      icon: WalletCards
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Application Journey</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent milestone progression under Scheme: <span className="font-semibold text-blue-700">{application.schemeName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            Current Stage: {stages[currentIndex]?.title}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;
            const Icon = stage.icon;

            return (
              <div
                key={stage.title}
                className={`relative flex flex-col p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-blue-50/60 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                    : isCompleted
                    ? 'bg-slate-50/70 border-slate-200'
                    : 'bg-white border-dashed border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse-subtle'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Icon className="w-4 h-4" />}
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    0{idx + 1}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 tracking-tight">{stage.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{stage.subtitle}</p>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span
                    className={`font-semibold ${
                      isCompleted
                        ? 'text-emerald-700'
                        : isCurrent
                        ? 'text-blue-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">{stage.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
