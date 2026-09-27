import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Application, SchemeCode, AIRiskLevel } from '../../types';
import { StatusBadge, Badge } from '../common/Badge';

interface ApplicationQueueTableProps {
  applications: Application[];
  onSelectApplication?: (app: Application) => void;
}

export const ApplicationQueueTable: React.FC<ApplicationQueueTableProps> = ({
  applications,
  onSelectApplication
}) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Filter applications
  const filtered = applications.filter((app) => {
    const matchSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchScheme = selectedScheme === 'ALL' || app.scheme === selectedScheme;
    const matchState = selectedState === 'ALL' || app.state === selectedState;
    const matchRisk = selectedRisk === 'ALL' || app.aiRisk === selectedRisk;
    const matchStatus = selectedStatus === 'ALL' || app.status === selectedStatus;

    return matchSearch && matchScheme && matchState && matchRisk && matchStatus;
  });

  const states = Array.from(new Set(applications.map((a) => a.state)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Filter Controls */}
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Application ID, Applicant, or Institution..."
              className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing {filtered.length} of {applications.length} applications</span>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Scheme Filter */}
          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Schemes</option>
            <option value="NFST">NFST</option>
            <option value="NOS">NOS</option>
          </select>

          {/* State Filter */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* AI Risk Filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All AI Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
          >
            <option value="ALL">All Statuses</option>
            <option value="Document Verification">Document Verification</option>
            <option value="Under Review">Under Review</option>
            <option value="Deficiency Raised">Deficiency Raised</option>
            <option value="Resubmitted">Resubmitted</option>
            <option value="Scrutiny Verified">Scrutiny Verified</option>
          </select>

          {(selectedScheme !== 'ALL' || selectedState !== 'ALL' || selectedRisk !== 'ALL' || selectedStatus !== 'ALL' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedScheme('ALL');
                setSelectedState('ALL');
                setSelectedRisk('ALL');
                setSelectedStatus('ALL');
                setSearchTerm('');
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Application ID</th>
              <th className="py-3 px-4">Applicant</th>
              <th className="py-3 px-4">Scheme</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4">Submitted</th>
              <th className="py-3 px-4">AI Risk</th>
              <th className="py-3 px-4">SLA Window</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((app) => {
              const isHighlightTarget = app.id === 'NFST-2026-00482';

              return (
                <tr
                  key={app.id}
                  onClick={() => {
                    if (onSelectApplication) onSelectApplication(app);
                    navigate(`/scrutiny/application/${app.id}`);
                  }}
                  className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                    isHighlightTarget ? 'bg-blue-50/30 font-medium' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {app.id}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                      {app.institution}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={app.scheme === 'NFST' ? 'info' : 'saffron'} size="sm">
                      {app.scheme}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-700">{app.state}</td>

                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {app.submittedAt.split(',')[0]}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        app.aiRisk === 'Low'
                          ? 'success'
                          : app.aiRisk === 'Medium'
                          ? 'warning'
                          : 'error'
                      }
                      size="sm"
                      dot
                    >
                      {app.aiRisk} ({app.aiRiskScore}%)
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className={`w-3.5 h-3.5 ${
                          app.slaStatus === 'SLA Breached'
                            ? 'text-rose-500'
                            : app.slaStatus === 'Approaching SLA'
                            ? 'text-amber-500'
                            : 'text-emerald-500'
                        }`}
                      />
                      <span
                        className={`font-semibold font-mono text-[11px] ${
                          app.slaStatus === 'SLA Breached'
                            ? 'text-rose-700'
                            : app.slaStatus === 'Approaching SLA'
                            ? 'text-amber-700'
                            : 'text-slate-700'
                        }`}
                      >
                        {app.slaHoursRemaining > 0 ? `${app.slaHoursRemaining}h` : 'Breached'}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={app.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/scrutiny/application/${app.id}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
