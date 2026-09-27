import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  User,
  ShieldCheck,
  Lock,
  Clock,
  MessageSquare
} from 'lucide-react';
import { GrievanceTicket } from '../../types';
import { Badge, StatusBadge } from '../common/Badge';

interface GrievanceDetailDrawerProps {
  ticket: GrievanceTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignOfficer: (ticketId: string, officerName: string) => void;
  onAddResponse: (ticketId: string, msg: string, role: string, isInternal: boolean) => void;
  onResolveTicket: (ticketId: string, officerName: string, remarks: string) => void;
}

export const GrievanceDetailDrawer: React.FC<GrievanceDetailDrawerProps> = ({
  ticket,
  isOpen,
  onClose,
  onAssignOfficer,
  onAddResponse,
  onResolveTicket
}) => {
  if (!isOpen || !ticket) return null;

  const [newMessage, setNewMessage] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [resolutionRemarks, setResolutionRemarks] = useState(
    'Clarification accepted. Income certificate mismatch reconciled with Yercaud Taluk revenue database. Application status cleared for selection merit screening.'
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onAddResponse(ticket.id, newMessage, 'Grievance Desk Officer', isInternal);
    setNewMessage('');
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    onResolveTicket(ticket.id, 'S. Ramanathan (Senior Grievance Officer)', resolutionRemarks);
    setResolveModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-slate-100 bg-slate-50/70 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                {ticket.id}
              </span>
              <StatusBadge status={ticket.status} />
              <Badge variant={ticket.priority === 'High' ? 'error' : 'warning'}>
                {ticket.priority} Priority
              </Badge>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">{ticket.subject}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Applicant: <strong className="text-slate-800">{ticket.applicantName}</strong> • Scheme: {ticket.scheme}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
          {/* Issue Statement Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Grievance Description
            </span>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {ticket.description}
            </p>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Filed: {ticket.createdAt}</span>
              <span>Category: {ticket.issueCategory}</span>
            </div>
          </div>

          {/* Assigned Officer & Actions */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-blue-700 font-bold uppercase block">
                  Assigned Resolution Officer
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {ticket.assignedOfficer || 'Unassigned'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ticket.status !== 'Resolved' && (
                <button
                  onClick={() => setResolveModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark as Resolved</span>
                </button>
              )}
            </div>
          </div>

          {/* Resolution Card if resolved */}
          {ticket.status === 'Resolved' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Officially Resolved & Closed</span>
              </div>
              <p className="text-xs text-slate-700">{ticket.resolutionRemarks}</p>
              <div className="pt-2 text-[10px] text-emerald-700 font-mono flex items-center justify-between">
                <span>Resolved by: {ticket.resolvedBy}</span>
                <span>Timestamp: {ticket.resolvedAt}</span>
              </div>
            </div>
          )}

          {/* Conversation Thread */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Redressal Conversation & Audit Trail
            </span>

            <div className="space-y-3">
              {ticket.responses.map((rsp) => (
                <div
                  key={rsp.id}
                  className={`p-3.5 rounded-xl text-xs space-y-1 ${
                    rsp.isInternal
                      ? 'bg-amber-50/80 border border-amber-200 text-amber-950'
                      : rsp.senderRole === 'Applicant'
                      ? 'bg-slate-100 text-slate-900 border border-slate-200'
                      : 'bg-blue-50 text-blue-950 border border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold">
                    <span className="flex items-center gap-1.5">
                      {rsp.isInternal && <Lock className="w-3 h-3 text-amber-600" />}
                      <span>{rsp.sender}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        ({rsp.senderRole})
                      </span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rsp.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{rsp.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input Footer */}
        {ticket.status !== 'Resolved' && (
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInternal}
                  onChange={(e) => setIsInternal(e.target.checked)}
                  className="rounded-sm text-blue-600 focus:ring-blue-500"
                />
                <span>Internal Officer Note (Hidden from citizen)</span>
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type response or internal assessment..."
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0 shadow-2xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Resolve Modal */}
        {resolveModalOpen && (
          <div className="absolute inset-0 bg-slate-900/60 z-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Official Grievance Resolution Sign-off
              </h4>
              <p className="text-xs text-slate-500">
                Provide statutory redressal rationale. This response will be dispatched to the applicant and recorded in the audit trail.
              </p>
              <textarea
                rows={3}
                value={resolutionRemarks}
                onChange={(e) => setResolutionRemarks(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setResolveModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResolve}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                >
                  Confirm & Resolve Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
