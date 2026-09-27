import React from 'react';
import {
  User,
  Building,
  GraduationCap,
  Wallet,
  ShieldCheck,
  FileText,
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { useAuth } from '../context/AuthContext';
import { Badge, StatusBadge } from '../components/common/Badge';

export const ApplicantProfilePage: React.FC = () => {
  const { activeApplication } = useTribalAid();
  const { user } = useAuth();

  if (!activeApplication) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shrink-0">
            AK
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeApplication.id}
              </span>
              <StatusBadge status={activeApplication.status} />
              <Badge variant="saffron" size="sm">
                {activeApplication.tribeName} (ST)
              </Badge>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {activeApplication.applicantName}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeApplication.degree} • {activeApplication.institution}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Aadhaar DBT Seeding Active</span>
          </span>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic & Research Credentials */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic & Research Profile</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">
                Approved Ph.D. Research Dissertation Title
              </span>
              <p className="font-bold text-slate-900 mt-1 leading-snug">
                {activeApplication.researchTitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  Registered Institution
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {activeApplication.institution}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  M.Sc Aggregate Marks
                </span>
                <span className="font-black text-emerald-700 mt-0.5 block text-base">
                  {activeApplication.academicScore}% Distinction
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  Research Supervisor / Guide
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  Prof. Dr. S. Manickam
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                DRC Approved
              </span>
            </div>
          </div>
        </div>

        {/* Banking, DBT & Beneficiary Info */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-emerald-600" />
            <span>Direct Benefit Transfer (DBT) Information</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                PFMS Beneficiary Status
              </span>
              <p className="font-bold text-slate-900 text-sm">
                Aadhaar Authentication Bridge: Validated
              </p>
              <p className="text-[11px] text-emerald-700">
                Direct monthly stipend of ₹31,000 + annual contingency automatically creditable via National Automated Clearing House.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  Disbursement Bank
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {activeApplication.disbursement?.bankName || 'State Bank of India'}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {activeApplication.disbursement?.accountMasked || '•••• •••• •••• 4910'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  IFSC Code
                </span>
                <span className="font-bold font-mono text-slate-800 mt-0.5 block">
                  {activeApplication.disbursement?.ifsc || 'SBIN0001842'}
                </span>
                <span className="text-[11px] text-slate-500">Yercaud Main Branch</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] font-bold uppercase">
                  Certified Family Income
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  ₹{activeApplication.annualIncome.toLocaleString('en-IN')} / annum
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                Below ₹6.0L Ceiling
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
