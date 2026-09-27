import React, { useState } from 'react';
import { Search, Clock, Eye, AlertCircle, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { GrievanceTicket } from '../../types';
import { Badge, StatusBadge } from '../common/Badge';

interface GrievanceTableProps {
  grievances: GrievanceTicket[];
  onSelectTicket: (ticket: GrievanceTicket) => void;
}

export const GrievanceTable: React.FC<GrievanceTableProps> = ({
  grievances,
  onSelectTicket
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = grievances.filter((g) => {
    const matchSearch =
      g.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === 'ALL' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Citizen Grievance & Escalation Desk
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                {grievances.length} Active Tickets
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory grievance redressal with automated escalation and officer accountability
            </p>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket ID, applicant..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Ticket ID</th>
              <th className="py-3 px-4">Applicant</th>
              <th className="py-3 px-3">Scheme</th>
              <th className="py-3 px-4">Category & Subject</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3">Assigned Officer</th>
              <th className="py-3 px-3">SLA Status</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((g) => (
              <tr
                key={g.id}
                onClick={() => onSelectTicket(g)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{g.id}</td>

                <td className="py-3.5 px-4 font-bold text-slate-900">{g.applicantName}</td>

                <td className="py-3.5 px-3">
                  <Badge variant={g.scheme === 'NFST' ? 'info' : 'saffron'} size="sm">
                    {g.scheme}
                  </Badge>
                </td>

                <td className="py-3.5 px-4 max-w-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {g.issueCategory}
                  </span>
                  <div className="font-semibold text-slate-800 truncate mt-0.5">{g.subject}</div>
                </td>

                <td className="py-3.5 px-3">
                  <Badge
                    variant={g.priority === 'High' ? 'error' : g.priority === 'Medium' ? 'warning' : 'neutral'}
                    size="sm"
                  >
                    {g.priority}
                  </Badge>
                </td>

                <td className="py-3.5 px-3 text-slate-600 font-medium">
                  {g.assignedOfficer || 'Unassigned'}
                </td>

                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{g.slaHoursRemaining > 0 ? `${g.slaHoursRemaining}h left` : 'Resolved / Breached'}</span>
                  </div>
                </td>

                <td className="py-3.5 px-3">
                  <StatusBadge status={g.status} />
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTicket(g);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Manage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
