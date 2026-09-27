import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  GraduationCap,
  Building,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Wallet
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { useAuth } from '../context/AuthContext';
import { Badge, StatusBadge } from '../components/common/Badge';
import { MilestoneProgress } from '../components/fellowship/MilestoneProgress';
import { PaymentSchedule } from '../components/fellowship/PaymentSchedule';

export const FellowProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { fellows, approveProgressReport, triggerFellowDisbursement } =
    useTribalAid();

  const fellow = fellows.find((f) => f.id === id) || fellows[0];

  const isOfficer =
    user?.role === 'fellowship' ||
    user?.role === 'admin';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/fellowship')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {fellow.id}
              </span>
              <StatusBadge status={fellow.renewalStatus} />
              <Badge variant={fellow.scheme === 'NFST' ? 'info' : 'saffron'}>
                {fellow.scheme}
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1 tracking-tight">
              Fellow Dossier: {fellow.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>DBT Monthly Mandate Active</span>
          </span>
        </div>
      </div>

      {/* Fellow Summary Dossier Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Host University & Department
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              {fellow.institution}
            </span>
            <span className="text-[11px] text-slate-500">{fellow.department}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Approved Doctoral Research Topic
            </span>
            <p className="font-semibold text-slate-800 mt-0.5 line-clamp-2">
              {fellow.researchArea}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Research Guide / Supervisor
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              {fellow.guideName}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Departmental Endorsement</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
            <span className="text-blue-700 block text-[10px] font-bold uppercase">
              Current Fellowship Scale
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              ₹{fellow.monthlyStipend.toLocaleString('en-IN')} / mo (SRF)
            </span>
            <span className="text-[11px] text-blue-600 font-medium">+ ₹{fellow.contingencyAnnual.toLocaleString('en-IN')} Annual Grant</span>
          </div>
        </div>
      </div>

      {/* 5-Year Milestone Progress Pipeline */}
      <MilestoneProgress
        fellow={fellow}
        onApproveProgress={(remarks) => approveProgressReport(fellow.id, remarks)}
        isOfficer={isOfficer}
      />

      {/* DBT Payment Schedule & Transaction Logs */}
      <PaymentSchedule
        fellow={fellow}
        onTriggerDisbursement={(amount, period) =>
          triggerFellowDisbursement(fellow.id, amount, period)
        }
        isOfficer={isOfficer}
      />
    </div>
  );
};
