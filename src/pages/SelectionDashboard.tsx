import React, { useState } from 'react';
import {
  Trophy,
  Users,
  Award,
  Clock,
  Sparkles,
  Columns,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { Application } from '../types';
import { StatCard } from '../components/common/StatCard';
import { MeritListTable } from '../components/selection/MeritListTable';
import { CandidateComparison } from '../components/selection/CandidateComparison';
import { OverrideDecisionModal } from '../components/selection/OverrideDecisionModal';

export const SelectionDashboard: React.FC = () => {
  const { applications, updateCommitteeDecision } = useTribalAid();

  const [selectedIdsForCompare, setSelectedIdsForCompare] = useState<string[]>([
    'NFST-2026-00482',
    'NFST-2026-00319'
  ]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedAppForOverride, setSelectedAppForOverride] = useState<Application | null>(null);
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);

  const handleToggleCompare = (appId: string) => {
    setSelectedIdsForCompare((prev) => {
      if (prev.includes(appId)) {
        return prev.filter((id) => id !== appId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, appId];
    });
  };

  const handleOpenOverride = (app: Application) => {
    setSelectedAppForOverride(app);
    setIsOverrideOpen(true);
  };

  const handleRecordDecision = (
    decision: 'Selected' | 'Waitlisted' | 'Not Selected',
    remarks: string,
    reviewer: string
  ) => {
    if (selectedAppForOverride) {
      updateCommitteeDecision(selectedAppForOverride.id, decision, remarks, reviewer);
    }
  };

  const comparisonCandidates = applications.filter((a) =>
    selectedIdsForCompare.includes(a.id)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Selection Division
            </span>
            <span className="text-xs text-slate-500 font-medium">
              National Selection & Quota Allocation Board
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Selection Committee
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Review eligible applicants, evaluate composite academic and socio-economic merit rankings, and record transparent statutory selection decisions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Columns className="w-4 h-4" />
            <span>Launch Comparison View ({selectedIdsForCompare.length})</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Eligible Candidates"
          value="4,821"
          subtext="Cleared by scrutiny officers"
          icon={Users}
          variant="blue"
        />
        <StatCard
          title="Shortlisted"
          value="1,240"
          subtext="Top percentile merit band"
          icon={Trophy}
          variant="indigo"
        />
        <StatCard
          title="Selected (Awarded)"
          value="824"
          subtext="Statutory sanction issued"
          icon={Award}
          variant="emerald"
        />
        <StatCard
          title="Pending Review"
          value="96"
          subtext="Quorum committee evaluation"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* AI Safeguard Banner */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Bot className="w-5 h-5 text-blue-400 shrink-0" />
          <span>
            <strong className="text-blue-300">AI-Assisted Merit Ranking:</strong> Scores represent composite normalized weightage (Academic 70% + Vulnerability 30%). Final award power remains exclusively with the authorized committee.
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
          Audited Decisions Only
        </span>
      </div>

      {/* Merit List Table */}
      <MeritListTable
        applications={applications}
        selectedIdsForCompare={selectedIdsForCompare}
        onToggleCompare={handleToggleCompare}
        onOpenOverrideModal={handleOpenOverride}
        onLaunchComparisonModal={() => setIsCompareOpen(true)}
      />

      {/* Candidate Comparison Modal */}
      <CandidateComparison
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        candidates={comparisonCandidates}
        onSelectCandidate={(cand) => handleOpenOverride(cand)}
      />

      {/* Override Decision Modal */}
      {selectedAppForOverride && (
        <OverrideDecisionModal
          isOpen={isOverrideOpen}
          onClose={() => setIsOverrideOpen(false)}
          application={selectedAppForOverride}
          onRecordDecision={handleRecordDecision}
        />
      )}
    </div>
  );
};
