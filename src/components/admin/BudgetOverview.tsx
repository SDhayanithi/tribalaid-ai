import React from 'react';
import { IndianRupee, PieChart, ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

export const BudgetOverview: React.FC = () => {
  const schemesBudget = [
    {
      code: 'NFST',
      name: 'National Fellowship for ST Students',
      allocatedCr: 20.0,
      disbursedCr: 15.2,
      committedCr: 17.5,
      utilizationPercent: 76.0
    },
    {
      code: 'NOS',
      name: 'National Overseas Scholarship',
      allocatedCr: 5.0,
      disbursedCr: 3.2,
      committedCr: 3.8,
      utilizationPercent: 64.0
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Statutory Budget Sanctions & PFMS Utilization
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
              FY 2026-27 Sanctions
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Macro fiscal envelope tracking DBT direct disbursements and committed fellowship reserves
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>73.6% Overall Financial Utilization</span>
        </div>
      </div>

      {/* KPI Financial Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Total Allocated
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹25.0 Cr</p>
          <span className="text-[11px] text-slate-500 font-medium">Parliamentary Budget</span>
        </div>

        <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
            Committed Reserves
          </span>
          <p className="text-2xl font-black text-blue-900 mt-1">₹21.3 Cr</p>
          <span className="text-[11px] text-blue-600 font-medium">85.2% earmarked for active fellows</span>
        </div>

        <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            Disbursed via DBT
          </span>
          <p className="text-2xl font-black text-emerald-900 mt-1">₹18.4 Cr</p>
          <span className="text-[11px] text-emerald-600 font-medium">7,962 direct electronic credits</span>
        </div>

        <div className="p-3.5 bg-purple-50/70 rounded-xl border border-purple-100">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
            Remaining Headroom
          </span>
          <p className="text-2xl font-black text-purple-900 mt-1">₹6.6 Cr</p>
          <span className="text-[11px] text-purple-600 font-medium">Available for supplemental quotas</span>
        </div>
      </div>

      {/* Scheme-wise Utilization Bars */}
      <div className="space-y-4">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Scheme-Wise Financial Health
        </span>

        {schemesBudget.map((scheme) => (
          <div key={scheme.code} className="p-4 bg-slate-50/60 rounded-xl border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-900 gap-1 mb-2">
              <span className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[11px]">
                  {scheme.code}
                </span>
                <span>{scheme.name}</span>
              </span>
              <span className="font-mono text-slate-700">
                ₹{scheme.disbursedCr} Cr disbursed of ₹{scheme.allocatedCr} Cr (
                <strong className="text-blue-700">{scheme.utilizationPercent}%</strong>)
              </span>
            </div>

            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-700"
                style={{ width: `${scheme.utilizationPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
              <span>Committed: ₹{scheme.committedCr} Cr</span>
              <span>Available Liquidity: ₹{(scheme.allocatedCr - scheme.disbursedCr).toFixed(1)} Cr</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
