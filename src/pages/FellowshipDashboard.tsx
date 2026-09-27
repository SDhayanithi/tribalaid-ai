import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Calendar,
  FileCheck,
  Wallet,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { StatCard } from '../components/common/StatCard';
import { FellowTable } from '../components/fellowship/FellowTable';

export const FellowshipDashboard: React.FC = () => {
  const { fellows } = useTribalAid();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Post-Award Administration
            </span>
            <span className="text-xs text-slate-500 font-medium">NFST Doctoral Fellowship Cell</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Fellowship Management
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Track multi-year doctoral research milestones, university guide reviews, annual renewals, and automated monthly Direct Benefit Transfers (DBT).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/fellowship/FST-2026-00231')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            Open Fellow Profile: Arun Kumar
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Active Fellows"
          value="2,481"
          subtext="Enrolled in Ph.D. / M.Phil"
          icon={GraduationCap}
          variant="blue"
        />
        <StatCard
          title="Renewals Due"
          value="184"
          subtext="Annual DRC clearance pending"
          icon={Calendar}
          variant="amber"
        />
        <StatCard
          title="Reports Pending"
          value="96"
          subtext="Research guide appraisal"
          icon={FileCheck}
          variant="indigo"
        />
        <StatCard
          title="Payments Processing"
          value="72"
          subtext="PFMS electronic batch"
          icon={Wallet}
          variant="emerald"
        />
      </div>

      {/* Fellow Table */}
      <FellowTable fellows={fellows} />
    </div>
  );
};
