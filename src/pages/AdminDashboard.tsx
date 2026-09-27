import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  CheckCircle2,
  Award,
  Wallet,
  IndianRupee,
  Calendar,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { FunnelChart } from '../components/admin/FunnelChart';
import { StateAnalyticsMap } from '../components/admin/StateAnalyticsMap';
import { BottlenecksPanel } from '../components/admin/BottlenecksPanel';
import { BudgetOverview } from '../components/admin/BudgetOverview';
import { YoYTrendChart } from '../components/admin/YoYTrendChart';

export const AdminDashboard: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState('2026-27');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Executive Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Executive Cockpit
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Informatics Centre (NIC) Live Gateway
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            MoTA Programme Overview
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Real-time operational monitoring of Scheduled Tribe scholarship and fellowship administration across all Indian States and Union Territories.
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <select
            value={selectedCycle}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
          >
            <option value="2026-27">Academic Year 2026-27</option>
            <option value="2025-26">Academic Year 2025-26</option>
          </select>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Brief</span>
          </button>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Applications"
          value="24,821"
          subtext="+14.2% vs last cycle"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Verified Applications"
          value="19,462"
          subtext="78.4% clearance rate"
          icon={CheckCircle2}
          variant="indigo"
        />
        <StatCard
          title="Selected Beneficiaries"
          value="8,214"
          subtext="100% quota saturated"
          icon={Award}
          variant="emerald"
        />
        <StatCard
          title="Disbursed Beneficiaries"
          value="7,962"
          subtext="96.9% DBT active"
          icon={Wallet}
          variant="amber"
        />
        <StatCard
          title="Budget Utilized"
          value="₹18.4 Cr"
          subtext="of ₹25 Cr sanction"
          icon={IndianRupee}
          variant="rose"
        />
      </div>

      {/* Visual Application Conversion Funnel */}
      <FunnelChart />

      {/* State-wise Map & Regional Analysis */}
      <StateAnalyticsMap />

      {/* AI Operational Insights / Bottlenecks Panel */}
      <BottlenecksPanel />

      {/* Two Column Section: Budget Overview & YoY Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <BudgetOverview />
        </div>
        <div className="lg:col-span-6">
          <YoYTrendChart />
        </div>
      </div>
    </div>
  );
};
