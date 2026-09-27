import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { ApplicationDocument } from '../../types';
import { StatusBadge } from '../common/Badge';

interface OCRExtractorPanelProps {
  document: ApplicationDocument;
  documents: ApplicationDocument[];
  onSelectDocument: (doc: ApplicationDocument) => void;
  onOpenDeficiencyModal?: () => void;
  onApproveDocument?: () => void;
  isOfficerMode?: boolean;
}

export const OCRExtractorPanel: React.FC<OCRExtractorPanelProps> = ({
  document,
  documents,
  onSelectDocument,
  onOpenDeficiencyModal,
  onApproveDocument,
  isOfficerMode = false
}) => {
  const isHighConfidence = document.aiConfidence >= 90;
  const hasMismatch = document.formFieldMatches.some((m) => !m.isMatch);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col h-full">
      {/* Top Document Selector Pills */}
      <div className="pb-4 mb-4 border-b border-slate-100">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Select Document for AI Deep Analysis
        </label>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {documents.map((d) => {
            const isSelected = d.id === document.id;
            return (
              <button
                key={d.id}
                onClick={() => onSelectDocument(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <span>{d.type}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.status === 'Verified'
                      ? 'bg-emerald-400'
                      : d.status === 'Deficiency'
                      ? 'bg-amber-400'
                      : 'bg-blue-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Intelligence Header */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-100 mb-5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs mt-0.5">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">AI Document Intelligence</h3>
              <span className="text-[11px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                MoTA Vision OCR v3.4
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Automated data extraction with cross-database registry validation
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs font-semibold text-slate-500">AI Confidence</div>
          <div className="text-2xl font-black text-slate-900 leading-none mt-0.5">
            {document.aiConfidence}%
          </div>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
              isHighConfidence
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isHighConfidence ? 'High Confidence' : 'Review Required'}
          </span>
        </div>
      </div>

      {/* Main Extracted Fields vs Application Match Matrix */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
            <span>Field Comparison: Application vs OCR Document</span>
            <span className="text-[11px] font-normal text-slate-400">
              {document.formFieldMatches.filter((m) => m.isMatch).length}/
              {document.formFieldMatches.length} Matches
            </span>
          </h4>

          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
            {document.formFieldMatches.map((match, i) => (
              <div
                key={i}
                className={`p-3 text-xs transition-colors ${
                  !match.isMatch ? 'bg-amber-50/70 border-l-4 border-l-amber-500' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-700 font-bold">{match.field}</span>
                  {match.isMatch ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Match
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" /> Mismatch Detected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] mt-1.5">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] font-medium uppercase">
                      Application Form Data
                    </span>
                    <strong className="text-slate-900">{match.formValue}</strong>
                  </div>
                  <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                    <span className="text-blue-500 block text-[10px] font-medium uppercase">
                      OCR Extracted Data
                    </span>
                    <strong className="text-slate-900">{match.ocrValue}</strong>
                  </div>
                </div>

                {match.remark && (
                  <p className="text-[11px] text-amber-900 mt-2 bg-amber-100/60 p-2 rounded-md font-medium leading-relaxed">
                    ⚠ {match.remark}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Raw OCR Entities */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Structured OCR Metadata
          </h4>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs font-mono grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(document.ocrExtracted).map(([k, v]) => (
              <div key={k} className="p-1.5 bg-white rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px]">{k}</span>
                <span className="text-slate-800 font-bold truncate block">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deficiency Status if any */}
        {document.status === 'Deficiency' && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Active Deficiency Notice
            </span>
            <p className="text-slate-700">{document.deficiencyRemarks}</p>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Raised by {document.deficiencyRaisedBy || 'Officer'} on {document.deficiencyRaisedAt}
            </p>
          </div>
        )}
      </div>

      {/* Human Officer Control Bar */}
      {isOfficerMode && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Current Document Status: <StatusBadge status={document.status} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenDeficiencyModal}
              className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Raise Deficiency</span>
            </button>

            <button
              onClick={onApproveDocument}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Approve Document</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
