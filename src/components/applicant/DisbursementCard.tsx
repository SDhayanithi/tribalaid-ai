import React from 'react';
import { Wallet, Building2, CheckCircle2, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Application } from '../../types';
import { StatusBadge } from '../common/Badge';

interface DisbursementCardProps {
  application: Application;
}

export const DisbursementCard: React.FC<DisbursementCardProps> = ({ application }) => {
  const isSelected = application.status === 'Selected' || application.status === 'Disbursement Active';
  const disb = application.disbursement;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Disbursement & Direct Benefit Transfer (DBT)
            <StatusBadge status={isSelected ? 'Credited' : 'Pending Selection'} />
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated Aadhaar-seeded PFMS disbursement protocol for fellowship stipend
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">Scheme Sanction Scale</span>
          <p className="text-sm font-bold text-slate-900">₹31,000 / month + Contingency</p>
        </div>
      </div>

      {isSelected && disb ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Monthly Fellowship
              </span>
              <p className="text-xl font-bold text-slate-900 mt-1">₹{disb.fellowshipAmountMonthly.toLocaleString('en-IN')}</p>
              <span className="text-[11px] text-slate-500 font-medium">+ ₹{disb.annualContingency.toLocaleString('en-IN')} annual grant</span>
            </div>

            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                Payment Cycle
              </span>
              <p className="text-xl font-bold text-slate-900 mt-1">{disb.paymentCycle}</p>
              <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PFMS Validated
              </span>
            </div>

            <div className="p-3.5 bg-purple-50/60 rounded-xl border border-purple-100">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                Next Disbursement
              </span>
              <p className="text-xl font-bold text-slate-900 mt-1">{disb.nextDisbursementDate}</p>
              <span className="text-[11px] text-purple-600 font-medium">Auto-credited to bank</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                DBT Mode
              </span>
              <p className="text-xl font-bold text-slate-900 mt-1">Aadhaar Bridge</p>
              <span className="text-[11px] text-slate-500 font-mono">Txn: {disb.transactionId || 'PFMS-ACTIVE'}</span>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-blue-700 shadow-2xs">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">
                  {disb.bankName} <span className="text-slate-400 font-mono font-normal">({disb.accountMasked})</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  IFSC: <span className="font-mono">{disb.ifsc}</span> • Aadhaar DBT Seeding: <span className="text-emerald-600 font-semibold">Active & Verified</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Sanction Cleared
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Selection Process Pending</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Disbursement schedule, monthly PFMS credit tracking, and institutional contingency grants activate automatically once the National Selection Committee approves final award.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Estimated Monthly Award: ₹31,000/mo (JRF) + HRA & Annual Grants
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
