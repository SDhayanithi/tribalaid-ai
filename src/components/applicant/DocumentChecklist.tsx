import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Eye,
  Sparkles,
  Bot
} from 'lucide-react';
import { ApplicationDocument } from '../../types';
import { StatusBadge } from '../common/Badge';

interface DocumentChecklistProps {
  documents: ApplicationDocument[];
  onOpenResubmit: (doc: ApplicationDocument) => void;
  onViewDoc: (doc: ApplicationDocument) => void;
}

export const DocumentChecklist: React.FC<DocumentChecklistProps> = ({
  documents,
  onOpenResubmit,
  onViewDoc
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Document Repository & Verification
            <span className="text-xs bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-full font-semibold">
              {documents.filter((d) => d.status === 'Verified').length}/{documents.length} Clear
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Documents analyzed by AI Document Intelligence and validated against issuing state registries
          </p>
        </div>

        <button
          onClick={() => navigate('/applicant/documents')}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Launch AI OCR Inspector</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {documents.map((doc) => {
          const isDeficiency = doc.status === 'Deficiency';
          const isResubmitted = doc.status === 'Resubmitted';

          return (
            <div
              key={doc.id}
              className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors rounded-xl px-2.5 ${
                isDeficiency ? 'bg-amber-50/50 -mx-2.5 border border-amber-200/60 my-1' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                    isDeficiency
                      ? 'bg-amber-100 text-amber-800'
                      : doc.status === 'Verified'
                      ? 'bg-emerald-100/70 text-emerald-800'
                      : 'bg-blue-100/70 text-blue-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{doc.type}</span>
                    <StatusBadge status={doc.status} />
                    <span className="text-[11px] text-slate-400 font-mono font-medium">
                      ({doc.fileSize})
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="truncate max-w-xs">{doc.fileName}</span>
                    <span>•</span>
                    <span>Uploaded {doc.uploadedAt}</span>
                  </p>

                  {/* AI Confidence Pill */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      AI OCR Confidence: <strong className="text-slate-800">{doc.aiConfidence}%</strong>
                    </span>

                    {doc.deficiencyReason && (
                      <span className="text-[11px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.2 rounded-full">
                        Deficiency: {doc.deficiencyReason}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onViewDoc(doc)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Details</span>
                </button>

                {(isDeficiency || isResubmitted) && (
                  <button
                    onClick={() => onOpenResubmit(doc)}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isResubmitted ? 'Re-upload Again' : 'Upload Document'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
