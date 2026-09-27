import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  UserCheck,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { ApplicationDocument } from '../types';
import { StatusBadge, Badge } from '../components/common/Badge';
import { CertificateViewer } from '../components/verification/CertificateViewer';
import { OCRExtractorPanel } from '../components/verification/OCRExtractorPanel';
import { DeficiencyModal } from '../components/verification/DeficiencyModal';

export const ScrutinyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    applications,
    raiseDeficiency,
    verifyDocument,
    approveApplicationByScrutiny,
    rejectApplicationByScrutiny,
    sendForManualReview,
    auditLogs
  } = useTribalAid();

  const application = applications.find((a) => a.id === id) || applications[0];

  const [selectedDocId, setSelectedDocId] = useState<string>(() => {
    // Default to deficiency doc if any, else income doc, else first doc
    const def = application.documents.find((d) => d.status === 'Deficiency');
    if (def) return def.id;
    const inc = application.documents.find((d) => d.type === 'Income Certificate');
    return inc ? inc.id : application.documents[0]?.id || '';
  });

  const [isDeficiencyModalOpen, setIsDeficiencyModalOpen] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const [approvalRemarks, setApprovalRemarks] = useState(
    'All statutory criteria verified. Income variance reconciled as agricultural gross. Academic merit validated. Recommended for selection committee screening.'
  );

  const currentDoc =
    application.documents.find((d) => d.id === selectedDocId) ||
    application.documents[0];

  const handleOpenDeficiency = () => {
    setIsDeficiencyModalOpen(true);
  };

  const handleSubmitDeficiency = (reason: string, remarks: string) => {
    raiseDeficiency(
      application.id,
      currentDoc.id,
      reason,
      remarks,
      'Dr. V. Radhakrishnan (Senior Scrutiny Officer)'
    );
  };

  const handleApproveDocument = () => {
    verifyDocument(
      application.id,
      currentDoc.id,
      'Dr. V. Radhakrishnan (Senior Scrutiny Officer)',
      'Document authenticated against Tamil Nadu e-Sevai database.'
    );
  };

  const handleFinalApproval = () => {
    approveApplicationByScrutiny(
      application.id,
      'Dr. V. Radhakrishnan (Senior Scrutiny Officer)',
      approvalRemarks
    );
    setShowApproveModal(false);
  };

  const handleFinalRejection = () => {
    if (!rejectionReason.trim()) {
      setRejectionError('Statutory rejection reason is required for administrative audit compliance.');
      return;
    }
    rejectApplicationByScrutiny(
      application.id,
      'Dr. V. Radhakrishnan (Senior Scrutiny Officer)',
      rejectionReason.trim()
    );
    setShowRejectModal(false);
    setRejectionReason('');
    setRejectionError('');
  };

  const handleSendManualReview = () => {
    sendForManualReview(
      application.id,
      'Dr. V. Radhakrishnan',
      'Forwarded to District Revenue Collector for local ground verification.'
    );
  };

  // Filter audit logs for this application
  const appAuditLogs = auditLogs.filter(
    (log) => log.applicationId === application.id || (log.reason && log.reason.includes(application.id))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Status Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/scrutiny')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                {application.id}
              </span>
              <StatusBadge status={application.status} />
              <Badge variant={application.scheme === 'NFST' ? 'info' : 'saffron'}>
                {application.scheme}
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1 tracking-tight">
              Scrutiny Dossier: {application.applicantName}
            </h2>
          </div>
        </div>

        {/* Global Action Header */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSendManualReview}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Send for Field Review
          </button>

          <button
            onClick={handleOpenDeficiency}
            className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Raise Deficiency</span>
          </button>

          <button
            onClick={() => setShowRejectModal(true)}
            className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Reject Application</span>
          </button>

          <button
            onClick={() => setShowApproveModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve Application</span>
          </button>
        </div>
      </div>

      {/* Applicant Information Card with SLA Mini-Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Tribe & Category
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              {application.tribeName} (ST)
            </span>
            <span className="text-[11px] text-slate-500">{application.state}, {application.district}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Post-Grad Academic Merit
            </span>
            <span className="font-bold text-emerald-700 mt-0.5 block text-sm">
              {application.academicScore}% Aggregate
            </span>
            <span className="text-[11px] text-slate-500">{application.degree}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Certified Family Income
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              ₹{application.annualIncome.toLocaleString('en-IN')} / yr
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Under ₹6L Ceiling</span>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
            <span className="text-blue-700 block text-[10px] font-bold uppercase">
              AI Risk Signal
            </span>
            <span className="font-bold text-slate-900 mt-0.5 block text-sm">
              {application.aiRisk} Risk ({application.aiRiskScore}%)
            </span>
            <span className="text-[11px] text-blue-600 font-medium">94.8% OCR Confidence</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">
              Verification SLA
            </span>
            <span className="font-bold font-mono text-slate-900 mt-0.5 block text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {application.slaHoursRemaining > 0 ? `${application.slaHoursRemaining}h remaining` : 'Breached'}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Statutory On-Track</span>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Verification Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Official Document Preview */}
        <div className="lg:col-span-6 min-h-[640px] flex flex-col">
          <CertificateViewer
            document={currentDoc}
            applicantName={application.applicantName}
          />
        </div>

        {/* Right Column: AI Extraction & Officer Decision Matrix */}
        <div className="lg:col-span-6 min-h-[640px] flex flex-col">
          <OCRExtractorPanel
            document={currentDoc}
            documents={application.documents}
            onSelectDocument={(d) => setSelectedDocId(d.id)}
            onOpenDeficiencyModal={handleOpenDeficiency}
            onApproveDocument={handleApproveDocument}
            isOfficerMode={true}
          />
        </div>
      </div>

      {/* Statutory Audit Trail & Case History */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Statutory Audit Trail & Chronology
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {appAuditLogs.length} logged events
          </span>
        </div>

        {appAuditLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 italic">
            Initial application record received from portal submission.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {appAuditLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                <div className="flex items-start sm:items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 sm:mt-0 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-slate-400 text-[11px] ml-2 font-mono">by {log.actor} ({log.actorRole.toUpperCase()})</span>
                    {log.reason && <p className="text-slate-600 text-[11px] mt-0.5">{log.reason}</p>}
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Deficiency Modal */}
      {currentDoc && (
        <DeficiencyModal
          isOpen={isDeficiencyModalOpen}
          onClose={() => setIsDeficiencyModalOpen(false)}
          document={currentDoc}
          applicationId={application.id}
          applicantName={application.applicantName}
          onSubmitDeficiency={handleSubmitDeficiency}
        />
      )}

      {/* Approve Application Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Approve Application for Selection Committee
                </h3>
                <p className="text-xs text-slate-500">
                  {application.id} • {application.applicantName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              By confirming, all uploaded documents will be certified as statutory compliant and the candidate will enter the National Selection Committee Merit Screening list.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Scrutiny Endorsement Remarks
              </label>
              <textarea
                rows={3}
                value={approvalRemarks}
                onChange={(e) => setApprovalRemarks(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowApproveModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalApproval}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95"
              >
                Confirm Approval & Forward
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Application Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-100 text-rose-700 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reject Application Dossier
                </h3>
                <p className="text-xs text-slate-500">
                  {application.id} • {application.applicantName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Formal rejection terminates scrutiny processing for this cycle. The candidate will receive official statutory notification citing the administrative reasons entered below.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mandatory Statutory Rejection Reason <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value);
                  if (rejectionError) setRejectionError('');
                }}
                placeholder="e.g. Ineligible category certificate: Non-notified tribe under Article 342; Income exceeded statutory ceiling with unverified returns."
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
              />
              {rejectionError && (
                <p className="text-[11px] text-rose-600 mt-1 font-medium">{rejectionError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionError('');
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleFinalRejection}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs active:scale-95"
              >
                Record Statutory Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
