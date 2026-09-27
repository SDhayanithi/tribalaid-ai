import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Upload,
  Layers,
  HelpCircle,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { ApplicationDocument } from '../types';
import { StatCard } from '../components/common/StatCard';
import { JourneyTimeline } from '../components/applicant/JourneyTimeline';
import { DocumentChecklist } from '../components/applicant/DocumentChecklist';
import { DeficiencyAlert } from '../components/applicant/DeficiencyAlert';
import { DisbursementCard } from '../components/applicant/DisbursementCard';
import { ResubmitModal } from '../components/applicant/ResubmitModal';
import { StatusBadge } from '../components/common/Badge';

export const ApplicantDashboard: React.FC = () => {
  const {
    activeApplication,
    resubmitDocument,
    selectedApplicationId
  } = useTribalAid();

  const navigate = useNavigate();

  const [selectedDocForResubmit, setSelectedDocForResubmit] = useState<ApplicationDocument | null>(null);
  const [isResubmitOpen, setIsResubmitOpen] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);

  if (!activeApplication) return null;

  // Find deficiency document
  const deficiencyDoc = activeApplication.documents.find((d) => d.status === 'Deficiency');
  const verifiedDocsCount = activeApplication.documents.filter((d) => d.status === 'Verified').length;

  const handleOpenResubmit = (doc: ApplicationDocument) => {
    setSelectedDocForResubmit(doc);
    setIsResubmitOpen(true);
  };

  const handleViewDoc = (doc: ApplicationDocument) => {
    navigate('/applicant/documents');
  };

  const handleResubmitSubmit = (docId: string, notes: string, fileName: string) => {
    resubmitDocument(activeApplication.id, docId, notes, fileName);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {activeApplication.id}
            </span>
            <StatusBadge status={activeApplication.status} />
            <span className="text-xs text-slate-500 font-medium">
              Intake: 2026-27 (NFST)
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {activeApplication.applicantName}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Track your doctoral scholarship application, resolve pending verification actions, and review direct DBT disbursement schedules.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => navigate('/applicant/documents')}
            className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>AI Verification Dossier</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Application Status"
          value={activeApplication.status}
          subtext="Under active nodal scrutiny"
          icon={Clock}
          variant="blue"
        />
        <StatCard
          title="Document Status"
          value={`${verifiedDocsCount} / ${activeApplication.documents.length}`}
          subtext="AI verified with 95% confidence"
          icon={FileText}
          variant="emerald"
        />
        <StatCard
          title="Pending Deficiencies"
          value={deficiencyDoc ? '1 Action Needed' : '0 (All Clear)'}
          subtext={deficiencyDoc ? 'Income certificate review' : 'No queries pending'}
          icon={AlertTriangle}
          variant={deficiencyDoc ? 'amber' : 'emerald'}
        />
        <StatCard
          title="Disbursement Staging"
          value={activeApplication.status === 'Selected' ? '₹31,000 / mo' : 'Awaiting Award'}
          subtext="Direct Benefit Transfer"
          icon={ShieldCheck}
          variant="indigo"
        />
      </div>

      {/* Prominent Deficiency Alert if present */}
      {deficiencyDoc && (
        <DeficiencyAlert
          document={deficiencyDoc}
          onUploadClick={() => handleOpenResubmit(deficiencyDoc)}
          onViewRequirement={() => setShowRequirementModal(true)}
        />
      )}

      {/* Application Journey Timeline */}
      <JourneyTimeline application={activeApplication} />

      {/* Two Column Layout: Document Checklist & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Document Checklist */}
          <DocumentChecklist
            documents={activeApplication.documents}
            onOpenResubmit={handleOpenResubmit}
            onViewDoc={handleViewDoc}
          />

          {/* Payment & Disbursement Component */}
          <DisbursementCard application={activeApplication} />
        </div>

        {/* Right Sidebar: Timeline Activity & Scheme Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Activity Log */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Application Activity Log</span>
              <span className="text-[11px] font-mono text-slate-400">Audit Trail</span>
            </h3>

            <div className="space-y-4">
              {activeApplication.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-5 text-xs">
                  {/* Timeline bullet line */}
                  {idx !== activeApplication.timeline.length - 1 && (
                    <div className="absolute left-1.5 top-3.5 bottom-0 w-0.5 bg-slate-200" />
                  )}
                  <div
                    className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 ${
                      item.status === 'completed'
                        ? 'bg-emerald-500 border-white ring-2 ring-emerald-100'
                        : item.status === 'current'
                        ? 'bg-blue-600 border-white ring-2 ring-blue-100 animate-pulse'
                        : 'bg-slate-300 border-white'
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{item.stage}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Dossier Summary */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs text-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight pb-2 border-b border-slate-100">
              Registered Profile Details
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Community / Tribe:</span>
                <span className="font-bold text-slate-800">
                  {activeApplication.tribeName} (ST)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Degree & Specialization:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                  {activeApplication.degree}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">University / Center:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                  {activeApplication.institution}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400">Post-Grad Aggregate:</span>
                <span className="font-bold text-emerald-700">{activeApplication.academicScore}%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">State of Origin:</span>
                <span className="font-bold text-slate-800">
                  {activeApplication.state} ({activeApplication.district})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resubmit Modal */}
      {selectedDocForResubmit && (
        <ResubmitModal
          isOpen={isResubmitOpen}
          onClose={() => setIsResubmitOpen(false)}
          document={selectedDocForResubmit}
          onResubmit={handleResubmitSubmit}
        />
      )}

      {/* View Requirement Modal */}
      {showRequirementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Income Certificate Requirement (NFST Guidelines)
            </h4>
            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <p>
                1. <strong>Ceiling:</strong> Total family annual income from all sources must not exceed <strong>₹6,00,000</strong> per annum.
              </p>
              <p>
                2. <strong>Issuing Authority:</strong> Certificate must be signed by an officer not below the rank of Tahsildar / Revenue Divisional Officer.
              </p>
              <p>
                3. <strong>Validity:</strong> Issued within the preceding 12 months for Assessment Year 2026-27.
              </p>
              <p>
                4. <strong>Clarification on Arun Kumar's Case:</strong> The portal form indicated ₹1,50,000 while the initial scan listed ₹1,80,000. Both are well within the ceiling. Please upload the endorsed certificate or affidavit clarifying net family income.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowRequirementModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
