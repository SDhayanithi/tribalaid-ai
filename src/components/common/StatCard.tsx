import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon: LucideIcon;
  variant?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  variant = 'blue',
  onClick,
  className = ''
}) => {
  const iconVariants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const topAccents = {
    blue: 'border-t-blue-600',
    indigo: 'border-t-indigo-600',
    emerald: 'border-t-emerald-600',
    amber: 'border-t-amber-500',
    rose: 'border-t-rose-500',
    slate: 'border-t-slate-400'
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden border-t-[3px] ${topAccents[variant]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h3>
          {(subtext || trend) && (
            <div className="flex items-center gap-2 mt-2">
              {trend && (
                <span
                  className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${
                    trend.isNeutral
                      ? 'bg-slate-100 text-slate-700'
                      : trend.isPositive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {trend.value}
                </span>
              )}
              {subtext && <span className="text-xs text-slate-600 font-medium">{subtext}</span>}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl border ${iconVariants[variant]} shrink-0 shadow-2xs`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
