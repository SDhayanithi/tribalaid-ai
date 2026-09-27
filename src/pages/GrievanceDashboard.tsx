import React, { useState } from 'react';
import {
  MessageSquareWarning,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Plus
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { GrievanceTicket } from '../types';
import { StatCard } from '../components/common/StatCard';
import { GrievanceTable } from '../components/grievance/GrievanceTable';
import { GrievanceDetailDrawer } from '../components/grievance/GrievanceDetailDrawer';

export const GrievanceDashboard: React.FC = () => {
  const {
    grievances,
    assignGrievanceOfficer,
    resolveGrievance,
    addGrievanceResponse
  } = useTribalAid();

  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(
    grievances[0] || null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectTicket = (ticket: GrievanceTicket) => {
    setSelectedTicket(ticket);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Citizen Redressal Cell
            </span>
            <span className="text-xs text-slate-500 font-medium">CPGRAMS Integrated MoTA Desk</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Grievance Redressal Mechanism
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Track and resolve applicant queries, deficiency clarifications, and disbursement issues with legally mandated SLA accountability.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (grievances[0]) handleSelectTicket(grievances[0]);
            }}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            Review Focus Ticket: Arun Kumar
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Open Grievances"
          value="384"
          subtext="Under active investigation"
          icon={MessageSquareWarning}
          variant="blue"
        />
        <StatCard
          title="SLA Warning"
          value="72"
          subtext="Under 12h resolution window"
          icon={AlertTriangle}
          variant="amber"
        />
        <StatCard
          title="SLA Breached"
          value="18"
          subtext="Escalated to Appellate Nodal"
          icon={Clock}
          variant="rose"
        />
        <StatCard
          title="Resolved Tickets"
          value="821"
          subtext="92.4% Citizen Satisfaction"
          icon={CheckCircle2}
          variant="emerald"
        />
      </div>

      {/* Grievance Table */}
      <GrievanceTable
        grievances={grievances}
        onSelectTicket={handleSelectTicket}
      />

      {/* Grievance Detail Drawer */}
      <GrievanceDetailDrawer
        ticket={selectedTicket}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAssignOfficer={assignGrievanceOfficer}
        onAddResponse={addGrievanceResponse}
        onResolveTicket={resolveGrievance}
      />
    </div>
  );
};
