import React from 'react';
import { AlertTriangle, Upload, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { ApplicationDocument } from '../../types';

interface DeficiencyAlertProps {
  document?: ApplicationDocument;
  onUploadClick: () => void;
  onViewRequirement: () => void;
}

export const DeficiencyAlert: React.FC<DeficiencyAlertProps> = ({
  document,
  onUploadClick,
  onViewRequirement
}) => {
  if (!document || document.status !== 'Deficiency') return null;

  return (
    <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                Action Required
              </span>
              <span className="text-xs font-semibold text-amber-800">
                Statutory Deficiency Notice
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-1">
              Income Certificate could not be verified
            </h3>

            <p className="text-xs text-slate-700 mt-1 max-w-2xl leading-relaxed">
              <strong>Reason:</strong>{' '}
              {document.deficiencyRemarks ||
                'Income value differs between application form (₹1,50,000) and uploaded certificate (₹1,80,000). Please upload an updated revenue certificate or affidavit.'}
            </p>

            {document.deficiencyRaisedBy && (
              <p className="text-[11px] text-amber-900/80 font-medium mt-1.5 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Issued by: {document.deficiencyRaisedBy} on {document.deficiencyRaisedAt || '13 Sep 2026'}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
          <button
            onClick={onViewRequirement}
            className="px-3.5 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 hover:bg-amber-100/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>View Requirement</span>
          </button>

          <button
            onClick={onUploadClick}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
