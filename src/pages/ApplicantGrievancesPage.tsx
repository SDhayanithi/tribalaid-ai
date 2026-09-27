import React, { useState } from 'react';
import {
  MessageSquareWarning,
  Plus,
  Clock,
  CheckCircle2,
  FileText,
  Send,
  X,
  ShieldAlert,
  ArrowRight,
  Upload,
  AlertCircle
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { useAuth } from '../context/AuthContext';
import { GrievanceTicket, SchemeCode } from '../types';
import { Badge, StatusBadge } from '../components/common/Badge';

export const ApplicantGrievancesPage: React.FC = () => {
  const { grievances, createGrievance, addGrievanceResponse, activeApplication } = useTribalAid();
  const { user } = useAuth();

  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<GrievanceTicket['issueCategory']>('Document Verification');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('Revenue_Endorsement_Clarification.pdf');

  // Filter applicant's grievances
  const myGrievances = grievances.filter(
    (g) => g.applicationId === activeApplication?.id || g.applicantName === 'Arun Kumar'
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    createGrievance({
      applicantName: user?.name || 'Arun Kumar',
      applicantEmail: user?.email || 'arunkumar.botany@univmadras.ac.in',
      applicationId: activeApplication?.id || 'NFST-2026-00482',
      scheme: (activeApplication?.scheme || 'NFST') as SchemeCode,
      issueCategory: category,
      subject,
      description,
      attachmentName
    });

    setSubject('');
    setDescription('');
    setIsRaiseModalOpen(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;

    addGrievanceResponse(selectedTicket.id, replyMessage, 'Applicant', false);
    setReplyMessage('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Citizen Redressal
            </span>
            <span className="text-xs text-slate-500 font-medium">Application ID: {activeApplication?.id}</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Grievance Redressal Dossier
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Submit clarification queries regarding scrutiny deficiency notices, verification status, or PFMS DBT bank account mapping directly to nodal grievance officers.
          </p>
        </div>

        <button
          onClick={() => setIsRaiseModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Grievance</span>
        </button>
      </div>

      {/* Tickets List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tickets List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block px-1">
            My Submitted Tickets ({myGrievances.length})
          </span>

          {myGrievances.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/90">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">No Open Grievances</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                All application queries and documents are currently in good order.
              </p>
            </div>
          ) : (
            myGrievances.map((g) => {
              const isSelected = selectedTicket?.id === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedTicket(g)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {g.id} • {g.createdAt}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-0.5">{g.subject}</h4>
                    </div>
                    <StatusBadge status={g.status} />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {g.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      Category: <strong>{g.issueCategory}</strong>
                    </span>
                    <span className="text-blue-600 font-semibold flex items-center gap-1">
                      View Thread <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Active Ticket Conversation Dossier */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
              <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {selectedTicket.id}
                    </span>
                    <StatusBadge status={selectedTicket.status} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{selectedTicket.subject}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assigned Officer: <strong className="text-slate-800">{selectedTicket.assignedOfficer}</strong>
                  </p>
                </div>
              </div>

              {/* Status Banner */}
              {selectedTicket.status === 'Resolved' && (
                <div className="p-3.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Resolved:</strong> {selectedTicket.resolutionRemarks || 'Official redressal completed.'}
                  </span>
                </div>
              )}

              {/* Conversation Messages */}
              <div className="p-5 space-y-3.5 max-h-[420px] overflow-y-auto">
                {selectedTicket.responses.map((rsp) => (
                  <div
                    key={rsp.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1 ${
                      rsp.senderRole === 'Applicant'
                        ? 'bg-blue-50/80 border border-blue-200 ml-4'
                        : 'bg-slate-100 border border-slate-200 mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-slate-900 font-bold">
                        {rsp.sender}{' '}
                        <span className="text-[10px] text-slate-500 font-normal">
                          ({rsp.senderRole})
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{rsp.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{rsp.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              {selectedTicket.status !== 'Resolved' && (
                <form onSubmit={handleReplySubmit} className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type an additional clarification message..."
                    className="flex-1 text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-500">
              Select a ticket from the left column to view the official conversation thread and officer responses.
            </div>
          )}
        </div>
      </div>

      {/* Raise Grievance Modal */}
      {isRaiseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/60">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Raise Citizen Grievance Ticket
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ministry of Tribal Affairs CPGRAMS Redressal Mechanism
                </p>
              </div>
              <button
                onClick={() => setIsRaiseModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                >
                  <option value="Document Verification">Document Verification & Deficiency Clarification</option>
                  <option value="Disbursement">Disbursement / PFMS Bank Transfer</option>
                  <option value="Eligibility">Eligibility & Academic Qualification</option>
                  <option value="Portal Technical">Portal Technical Inquiry</option>
                  <option value="Other">Other Statutory Administrative Grievance</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Clarification regarding Tahsildar income certificate"
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Detailed Description of Issue
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide complete explanation of your query, certificate dates, or taluk officer reference..."
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Attachment (PDF / JPEG)
                </label>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <span className="font-mono text-slate-700">{attachmentName}</span>
                  <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">
                    Change file
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRaiseModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                >
                  Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
