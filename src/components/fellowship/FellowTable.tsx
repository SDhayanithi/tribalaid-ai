import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, ChevronRight, CheckCircle2, Clock, Eye } from 'lucide-react';
import { FellowRecord } from '../../types';
import { Badge, StatusBadge } from '../common/Badge';

interface FellowTableProps {
  fellows: FellowRecord[];
}

export const FellowTable: React.FC<FellowTableProps> = ({ fellows }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [renewalFilter, setRenewalFilter] = useState('ALL');

  const filtered = fellows.filter((f) => {
    const matchSearch =
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRenewal =
      renewalFilter === 'ALL' || f.renewalStatus === renewalFilter;

    return matchSearch && matchRenewal;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/50 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Active Doctoral & Research Fellows Directory
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {fellows.length} Tracked
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous academic performance monitoring, annual renewals, and DBT payment disbursements
            </p>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fellow ID, name..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Fellow ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-3">Scheme</th>
              <th className="py-3 px-4">Institution & Topic</th>
              <th className="py-3 px-3">Tenure Year</th>
              <th className="py-3 px-3">Annual Renewal</th>
              <th className="py-3 px-3">Progress Report</th>
              <th className="py-3 px-3">DBT Payment</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((fellow) => (
              <tr
                key={fellow.id}
                onClick={() => navigate(`/fellowship/${fellow.id}`)}
                className="hover:bg-blue-50/50 cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                  {fellow.id}
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900">{fellow.name}</div>
                  <div className="text-[11px] text-slate-500">Guide: {fellow.guideName}</div>
                </td>

                <td className="py-3.5 px-3">
                  <Badge variant={fellow.scheme === 'NFST' ? 'info' : 'saffron'} size="sm">
                    {fellow.scheme}
                  </Badge>
                </td>

                <td className="py-3.5 px-4 max-w-xs">
                  <div className="font-medium text-slate-900 truncate">{fellow.institution}</div>
                  <div className="text-[11px] text-slate-400 truncate">{fellow.researchArea}</div>
                </td>

                <td className="py-3.5 px-3 font-semibold text-slate-800">
                  Year {fellow.currentYear} of {fellow.totalYears}
                </td>

                <td className="py-3.5 px-3">
                  <StatusBadge status={fellow.renewalStatus} />
                </td>

                <td className="py-3.5 px-3 font-medium text-slate-700">
                  {fellow.progressReportStatus}
                </td>

                <td className="py-3.5 px-3">
                  <Badge variant={fellow.paymentStatus === 'Active' ? 'success' : 'warning'} size="sm">
                    {fellow.paymentStatus}
                  </Badge>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/fellowship/${fellow.id}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Dossier</span>
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
