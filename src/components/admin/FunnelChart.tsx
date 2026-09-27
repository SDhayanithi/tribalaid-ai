import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { Filter, Sparkles, ArrowDown } from 'lucide-react';

export const FunnelChart: React.FC = () => {
  const funnelData = [
    { stage: 'Applied', count: 24821, percentage: '100%', fill: '#1E3A8A', drop: null },
    { stage: 'Verified', count: 19462, percentage: '78.4%', fill: '#2563EB', drop: '-21.6%' },
    { stage: 'Eligible', count: 14821, percentage: '59.7%', fill: '#3B82F6', drop: '-23.8%' },
    { stage: 'Selected', count: 8214, percentage: '33.1%', fill: '#059669', drop: '-44.6%' },
    { stage: 'Disbursed', count: 7962, percentage: '32.1%', fill: '#D97706', drop: '-3.1%' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            National Application Funnel
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              FY 2026-27 Intake
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage-by-stage applicant conversion velocity and administrative attrition rates
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>78.4% Automated AI Throughput</span>
        </div>
      </div>

      {/* Visual Stepped Funnel */}
      <div className="space-y-3 mb-6">
        {funnelData.map((item, idx) => {
          const widthPercent = (item.count / 24821) * 100;
          return (
            <div key={item.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-mono text-[10px]">
                    0{idx + 1}
                  </span>
                  <span>{item.stage}</span>
                </span>
                <div className="flex items-center gap-3">
                  {item.drop && (
                    <span className="text-[10px] text-slate-600 font-medium font-mono">
                      (Drop: {item.drop})
                    </span>
                  )}
                  <span className="font-mono text-slate-900 text-sm font-extrabold">
                    {item.count.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-blue-700 font-semibold w-12 text-right">
                    {item.percentage}
                  </span>
                </div>
              </div>

              {/* Bar track */}
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 flex items-center">
                <div
                  className="h-full rounded-full transition-all duration-700 relative group"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.fill
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs text-blue-900">
        <span className="font-medium">
          Overall Intake Success Efficiency: <strong>32.1% of all registered ST applicants</strong> successfully receive direct benefit disbursals.
        </span>
        <span className="text-[11px] font-mono font-bold text-blue-700 shrink-0">
          Target Quota: 100% Filled
        </span>
      </div>
    </div>
  );
};
