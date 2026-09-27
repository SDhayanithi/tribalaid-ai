import React from 'react';
import { AlertTriangle, TrendingUp, Info, Bot, Sparkles, ArrowRight } from 'lucide-react';

export const BottlenecksPanel: React.FC = () => {
  const insights = [
    {
      type: 'warning',
      badge: 'Operational Bottleneck',
      title: 'Verification Delay in Select Nodal Desks',
      message:
        'Document verification in 18 regional queues is currently pacing at 2.4 days against the configured 48-hour SLA threshold, driven by revenue manual re-checks.',
      actionText: 'Optimize SLA Routing',
      icon: AlertTriangle,
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-200/80 text-amber-900',
      iconBg: 'bg-amber-500 text-white'
    },
    {
      type: 'improving',
      badge: 'Efficiency Gain',
      title: 'Deficiency Resolution Time Down 34%',
      message:
        'Applicant response time to deficiency notices improved from 4.2 days to 2.8 days following automated SMS and WhatsApp portal alerts.',
      actionText: 'View Channel Telemetry',
      icon: TrendingUp,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-200/80 text-emerald-900',
      iconBg: 'bg-emerald-600 text-white'
    },
    {
      type: 'info',
      badge: 'Action Required',
      title: '214 Applications Awaiting Applicant Response',
      message:
        'Deficiencies flagged on income or university registration certificates are pending re-upload. Automated reminder notifications scheduled for dispatch.',
      actionText: 'Trigger Bulk Reminder',
      icon: Info,
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      badgeColor: 'bg-blue-200/80 text-blue-900',
      iconBg: 'bg-blue-600 text-white'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-blue-700 to-indigo-600 text-white rounded-xl shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              AI Operational Insights & Bottleneck Detection
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-mono px-2 py-0.5 rounded-full font-bold">
                Automated Signals
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous telemetry identifying workflow friction, SLA breach risks, and throughput optimizations
            </p>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Automated Operational Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-4 rounded-xl border flex flex-col justify-between ${item.color} shadow-2xs`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                  <div className={`p-1.5 rounded-lg ${item.iconBg}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">{item.message}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer flex items-center gap-1">
                  {item.actionText} <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Updated 10m ago</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
