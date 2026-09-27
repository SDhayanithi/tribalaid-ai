import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft, ShieldCheck, Sparkles, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { ApplicationDocument } from '../types';
import { CertificateViewer } from '../components/verification/CertificateViewer';
import { OCRExtractorPanel } from '../components/verification/OCRExtractorPanel';
import { ResubmitModal } from '../components/applicant/ResubmitModal';

export const DocumentVerificationPage: React.FC = () => {
  const { activeApplication, resubmitDocument } = useTribalAid();
  const navigate = useNavigate();

  if (!activeApplication) return null;

  // Selected document state
  const [selectedDocId, setSelectedDocId] = useState<string>(() => {
    // Default to Income Certificate if deficiency, or ST certificate
    const def = activeApplication.documents.find((d) => d.status === 'Deficiency');
    return def ? def.id : activeApplication.documents[0]?.id || '';
  });

  const [isResubmitOpen, setIsResubmitOpen] = useState(false);

  const currentDoc =
    activeApplication.documents.find((d) => d.id === selectedDocId) ||
    activeApplication.documents[0];

  const handleSelectDoc = (doc: ApplicationDocument) => {
    setSelectedDocId(doc.id);
  };

  const handleResubmit = (docId: string, notes: string, fileName: string) => {
    resubmitDocument(activeApplication.id, docId, notes, fileName);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/applicant')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {activeApplication.id}
              </span>
              <span className="text-xs font-bold text-slate-900">
                {activeApplication.applicantName}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 tracking-tight">
              AI Document Intelligence & Statutory Cross-Verification
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>TN e-District Registry Connected</span>
          </span>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Simulated Official Certificate Viewer */}
        <div className="lg:col-span-6 min-h-[620px] flex flex-col">
          <CertificateViewer
            document={currentDoc}
            applicantName={activeApplication.applicantName}
          />
        </div>

        {/* Right Column: AI Extraction & Comparison Panel */}
        <div className="lg:col-span-6 min-h-[620px] flex flex-col">
          <OCRExtractorPanel
            document={currentDoc}
            documents={activeApplication.documents}
            onSelectDocument={handleSelectDoc}
          />
        </div>
      </div>

      {/* Resubmit Modal */}
      {currentDoc && (
        <ResubmitModal
          isOpen={isResubmitOpen}
          onClose={() => setIsResubmitOpen(false)}
          document={currentDoc}
          onResubmit={handleResubmit}
        />
      )}
    </div>
  );
};
