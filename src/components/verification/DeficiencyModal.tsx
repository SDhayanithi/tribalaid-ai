import React, { useState } from 'react';
import { X, AlertTriangle, Send } from 'lucide-react';
import { ApplicationDocument } from '../../types';

interface DeficiencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: ApplicationDocument;
  applicationId: string;
  applicantName: string;
  onSubmitDeficiency: (reason: string, remarks: string) => void;
}

export const DeficiencyModal: React.FC<DeficiencyModalProps> = ({
  isOpen,
  onClose,
  document,
  applicationId,
  applicantName,
  onSubmitDeficiency
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('Mismatch');
  const [remarks, setRemarks] = useState<string>(
    'Income value certified by Tahsildar (₹1,80,000) does not match application portal entry (₹1,50,000). Please provide clarification or updated income certificate.'
  );

  const reasons = [
    { value: 'Mismatch', label: 'Data Mismatch (Application vs Document)' },
    { value: 'Missing document', label: 'Missing Document or Incomplete Pages' },
    { value: 'Unreadable document', label: 'Unreadable / Low Resolution Scan' },
    { value: 'Invalid document', label: 'Expired / Unauthorized Issuing Authority' },
    { value: 'Other', label: 'Other Statutory Non-Compliance' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitDeficiency(selectedReason, remarks);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 text-white rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Raise Deficiency Notice</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {applicationId} • {applicantName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Flagged Document
            </label>
            <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>{document.type}</span>
              <span className="font-mono text-slate-500">{document.fileName}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Deficiency Reason Category
            </label>
            <div className="space-y-1.5">
              {reasons.map((r) => (
                <label
                  key={r.value}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedReason === r.value
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="deficiencyReason"
                    value={r.value}
                    checked={selectedReason === r.value}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Officer Clarification Remarks (Visible to Applicant)
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
              className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-slate-800"
              placeholder="State precise instructions for the applicant to rectify the deficiency..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Issue Deficiency Notice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
