import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, XCircle, TrendingDown } from 'lucide-react';

interface SLATrackerProps {
  hoursRemaining?: number;
  totalHours?: number;
  status?: 'On Track' | 'Approaching SLA' | 'SLA Breached';
  stageName?: string;
  showBenchmarks?: boolean;
  className?: string;
}

export const SLATracker: React.FC<SLATrackerProps> = ({
  hoursRemaining = 18,
  totalHours = 48,
  status = 'On Track',
  stageName = 'Document Verification SLA',
  showBenchmarks = true,
  className = ''
}) => {
  const percentage = Math.max(0, Math.min(100, (hoursRemaining / totalHours) * 100));

  const getStatusConfig = () => {
    if (status === 'SLA Breached' || hoursRemaining <= 0) {
      return {
        label: 'SLA Breached',
        textColor: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        barColor: 'bg-rose-500',
        icon: XCircle,
        description: 'Exceeded statutory operational timeline. Escalated to Nodal Officer.'
      };
    }
    if (status === 'Approaching SLA' || hoursRemaining <= 12) {
      return {
        label: 'Approaching SLA Deadline',
        textColor: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        barColor: 'bg-amber-500',
        icon: AlertTriangle,
        description: 'Less than 12 hours remaining before escalation.'
      };
    }
    return {
      label: 'On Track',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      barColor: 'bg-emerald-500',
      icon: CheckCircle2,
      description: 'Within permissible statutory processing window.'
    };
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-700" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">{stageName}</h4>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-1.5">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            {hoursRemaining > 0 ? `${hoursRemaining}h 24m` : '0h (Breached)'}
          </span>
          <span className="text-xs text-slate-600 font-medium">
            of {totalHours}h configured standard
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${config.barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-slate-600 mt-2 font-medium">{config.description}</p>
      </div>

      {showBenchmarks && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Average Scheme Processing Times</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> -18% YoY
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-sm font-bold text-slate-900">1.8 days</div>
              <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">Doc Verification</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-sm font-bold text-slate-900">0.9 days</div>
              <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">Eligibility Review</div>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-sm font-bold text-slate-900">2.2 days</div>
              <div className="text-[11px] text-slate-600 font-medium leading-tight mt-0.5">Selection Review</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
