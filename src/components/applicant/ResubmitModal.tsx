import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ApplicationDocument } from '../../types';

interface ResubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: ApplicationDocument;
  onResubmit: (docId: string, notes: string, fileName: string) => void;
}

export const ResubmitModal: React.FC<ResubmitModalProps> = ({
  isOpen,
  onClose,
  document,
  onResubmit
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('Rectified_Income_Certificate_2026_Endorsed.pdf');
  const [remarks, setRemarks] = useState<string>(
    'Attached updated certificate endorsed by Tahsildar, Yercaud with notary affidavit clarifying total net family income is ₹1,50,000 for FY 2026-27.'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onResubmit(document.id, remarks, selectedFile);
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Resubmit Document: {document.type}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Clear outstanding deficiency flagged during scrutiny
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Document Resubmitted Successfully!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              AI Document Intelligence has re-indexed the file with 98% confidence. The application is now forwarded to the scrutiny officer desk.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Deficiency Notice Card */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Deficiency Reason: {document.deficiencyReason || 'Value Mismatch'}
              </span>
              <p className="text-slate-700">{document.deficiencyRemarks}</p>
            </div>

            {/* File Upload Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Upload Rectified Document (PDF / JPEG max 5MB)
              </label>
              <div className="border-2 border-dashed border-blue-200 hover:border-blue-400 rounded-xl p-4 bg-blue-50/30 text-center transition-colors cursor-pointer">
                <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-slate-800">{selectedFile}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Click to browse or replace document</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Ready for AI Instant OCR Parse
                </div>
              </div>
            </div>

            {/* Clarification Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Clarification Remarks for Scrutiny Officer
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                required
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800"
                placeholder="Explain the correction or reason for discrepancies..."
              />
            </div>

            {/* Actions */}
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
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Uploading & Analyzing...' : 'Submit Document'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
