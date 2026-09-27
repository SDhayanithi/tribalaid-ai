import React, { useState } from 'react';
import {
  Trophy,
  ArrowUpDown,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Columns,
  Edit3,
  Bot
} from 'lucide-react';
import { Application } from '../../types';
import { Badge, StatusBadge } from '../common/Badge';

interface MeritListTableProps {
  applications: Application[];
  selectedIdsForCompare: string[];
  onToggleCompare: (appId: string) => void;
  onOpenOverrideModal: (app: Application) => void;
  onLaunchComparisonModal: () => void;
}

export const MeritListTable: React.FC<MeritListTableProps> = ({
  applications,
  selectedIdsForCompare,
  onToggleCompare,
  onOpenOverrideModal,
  onLaunchComparisonModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [scoreFilter, setScoreFilter] = useState('ALL');

  // Filter only eligible or scrutinised candidates for merit list
  const eligibleCandidates = applications
    .filter((a) => a.academicScore !== undefined)
    .sort((a, b) => b.academicScore - a.academicScore);

  const filtered = eligibleCandidates.filter((app) => {
    const matchSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchState = stateFilter === 'ALL' || app.state === stateFilter;
    const matchScore =
      scoreFilter === 'ALL' ||
      (scoreFilter === '90+' && app.academicScore >= 90) ||
      (scoreFilter === '80-90' && app.academicScore >= 80 && app.academicScore < 90);

    return matchSearch && matchState && matchScore;
  });

  const states = Array.from(new Set(eligibleCandidates.map((a) => a.state)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header and Controls */}
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              National Merit & Quota Ranking
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                {filtered.length} Evaluated
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated composite scoring combining academic merit, community priority, and income eligibility
            </p>
          </div>

          {/* Compare Button */}
          {selectedIdsForCompare.length > 0 && (
            <button
              onClick={onLaunchComparisonModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all animate-bounce"
            >
              <Columns className="w-4 h-4" />
              <span>Compare Selected ({selectedIdsForCompare.length}/3)</span>
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, ID..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Scores</option>
            <option value="90+">Above 90%</option>
            <option value="80-90">80% - 90%</option>
          </select>

          <div className="text-[11px] text-slate-400 ml-auto hidden md:block">
            Select checkboxes to perform side-by-side applicant comparative review
          </div>
        </div>
      </div>

      {/* Merit Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-3 w-10 text-center">Compare</th>
              <th className="py-3 px-3 w-14">Rank</th>
              <th className="py-3 px-4">Applicant</th>
              <th className="py-3 px-3">State</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Academic Score</th>
              <th className="py-3 px-3">Annual Income</th>
              <th className="py-3 px-3">AI Recommendation</th>
              <th className="py-3 px-3">Committee Decision</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((app, index) => {
              const rank = index + 1;
              const isChecked = selectedIdsForCompare.includes(app.id);
              const isTopThree = rank <= 3;

              return (
                <tr
                  key={app.id}
                  className={`hover:bg-blue-50/40 transition-colors ${
                    isChecked ? 'bg-indigo-50/40' : ''
                  }`}
                >
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCompare(app.id)}
                      disabled={!isChecked && selectedIdsForCompare.length >= 3}
                      className="rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                  </td>

                  <td className="py-3.5 px-3 font-bold">
                    <div className="flex items-center gap-1.5">
                      {isTopThree ? (
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-2xs ${
                            rank === 1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : rank === 2
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-orange-100 text-orange-900'
                          }`}
                        >
                          #{rank}
                        </span>
                      ) : (
                        <span className="font-mono text-slate-500 pl-1">#{rank}</span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {app.id} • {app.institution}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-medium text-slate-800">{app.state}</td>

                  <td className="py-3.5 px-3">
                    <Badge variant="saffron" size="sm">
                      {app.category} ({app.tribeName})
                    </Badge>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 text-sm">
                    {app.academicScore.toFixed(1)}%
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-700">
                    ₹{(app.annualIncome / 100000).toFixed(1)}L
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                      <span
                        className={
                          app.aiRecommendation === 'Recommended'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }
                      >
                        {app.aiRecommendation}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <StatusBadge
                      status={app.committeeDecision || 'Pending Review'}
                    />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenOverrideModal(app)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Record Decision</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
