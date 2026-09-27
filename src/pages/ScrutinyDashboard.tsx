import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearch,
  AlertTriangle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Filter,
  Users
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { StatCard } from '../components/common/StatCard';
import { SLATracker } from '../components/common/SLATracker';
import { ApplicationQueueTable } from '../components/scrutiny/ApplicationQueueTable';

export const ScrutinyDashboard: React.FC = () => {
  const { applications, setSelectedApplicationId } = useTribalAid();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Scrutiny Division
            </span>
            <span className="text-xs text-slate-500">Regional Desk: Tamil Nadu & Eastern Ghats Cell</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Scrutiny Operations</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review, verify, and resolve scholarship applications with automated AI fraud-anomaly alerts and statutory processing SLA tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setSelectedApplicationId('NFST-2026-00482');
              navigate('/scrutiny/application/NFST-2026-00482');
            }}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            Review Focus Case: Arun Kumar
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Pending Review"
          value="1,248"
          subtext="Assigned across 24 nodal officers"
          icon={Clock}
          variant="blue"
        />
        <StatCard
          title="AI Flagged"
          value="186"
          subtext="Anomalies & revenue discrepancies"
          icon={AlertTriangle}
          variant="amber"
        />
        <StatCard
          title="Deficiencies"
          value="214"
          subtext="Awaiting applicant rectification"
          icon={FileText}
          variant="indigo"
        />
        <StatCard
          title="SLA Breaches"
          value="18"
          subtext="Escalated to Nodal Director"
          icon={Clock}
          variant="rose"
        />
      </div>

      {/* SLA Tracker Component */}
      <SLATracker
        hoursRemaining={18}
        totalHours={48}
        status="On Track"
        stageName="Statutory Scrutiny SLA Window"
        showBenchmarks={true}
      />

      {/* Application Queue Table with filters */}
      <ApplicationQueueTable
        applications={applications}
        onSelectApplication={(app) => {
          setSelectedApplicationId(app.id);
        }}
      />
    </div>
  );
};
