import React from 'react';
import { Wallet, CheckCircle2, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FellowRecord } from '../../types';
import { Badge } from '../common/Badge';

interface PaymentScheduleProps {
  fellow: FellowRecord;
  onTriggerDisbursement?: (amount: number, period: string) => void;
  isOfficer?: boolean;
}

export const PaymentSchedule: React.FC<PaymentScheduleProps> = ({
  fellow,
  onTriggerDisbursement,
  isOfficer = false
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Direct Benefit Transfer (DBT) Payment Audit
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              PFMS Integrated
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time transaction reconciliation with Public Financial Management System (PFMS)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400">Total Sanctioned Disbursed</span>
            <p className="text-base font-black text-slate-900 font-mono">
              ₹{(fellow.disbursedTotal / 100000).toFixed(2)} Lakh
            </p>
          </div>

          {isOfficer && (
            <button
              onClick={() => onTriggerDisbursement && onTriggerDisbursement(fellow.monthlyStipend, 'October 2026')}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              Trigger October DBT Release
            </button>
          )}
        </div>
      </div>

      {/* Payment Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-2.5 px-4">Period</th>
              <th className="py-2.5 px-3">Disbursed Amount</th>
              <th className="py-2.5 px-3">Disbursement Date</th>
              <th className="py-2.5 px-3">PFMS Status</th>
              <th className="py-2.5 px-4">Bank UTR Transaction Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fellow.paymentHistory.map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-bold text-slate-900">{pay.period}</td>
                <td className="py-3 px-3 font-mono font-bold text-slate-900">
                  ₹{pay.amount.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                  {pay.disbursementDate}
                </td>
                <td className="py-3 px-3">
                  <Badge variant={pay.dbtStatus === 'Credited' ? 'success' : 'info'} size="sm" dot>
                    {pay.dbtStatus}
                  </Badge>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                  {pay.utrNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
