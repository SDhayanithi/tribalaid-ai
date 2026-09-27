import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, UserCheck, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { useTribalAid } from '../../context/TribalAidContext';
import { Badge } from './Badge';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    applications,
    fellows,
    grievances,
    setSelectedApplicationId
  } = useTribalAid();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = searchQuery.toLowerCase().trim();

  const matchedApplications = applications.filter(
    (a) =>
      a.id.toLowerCase().includes(q) ||
      a.applicantName.toLowerCase().includes(q) ||
      a.institution.toLowerCase().includes(q) ||
      a.state.toLowerCase().includes(q)
  );

  const matchedFellows = fellows.filter(
    (f) =>
      f.id.toLowerCase().includes(q) ||
      f.name.toLowerCase().includes(q) ||
      f.institution.toLowerCase().includes(q) ||
      f.researchArea.toLowerCase().includes(q)
  );

  const matchedGrievances = grievances.filter(
    (g) =>
      g.id.toLowerCase().includes(q) ||
      g.applicantName.toLowerCase().includes(q) ||
      g.subject.toLowerCase().includes(q) ||
      g.issueCategory.toLowerCase().includes(q)
  );

  const handleSelectApplication = (appId: string) => {
    setSelectedApplicationId(appId);
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/scrutiny/application/${appId}`);
  };

  const handleSelectFellow = (fellowId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/fellowship/${fellowId}`);
  };

  const handleSelectGrievance = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate('/grievances');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Application ID (e.g. NFST-2026-00482), Applicant Name, Fellow, or Grievance..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-500 bg-slate-100 border border-slate-200 rounded-md font-mono">
            ESC
          </kbd>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Applications */}
          {matchedApplications.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Scholarship Applications ({matchedApplications.length})</span>
                <span className="text-[11px] font-normal text-slate-400">Press item to open Scrutiny detail</span>
              </div>
              <div className="space-y-1">
                {matchedApplications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => handleSelectApplication(app.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-100 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{app.applicantName}</span>
                          <span className="text-xs font-mono font-semibold text-slate-500">{app.id}</span>
                          <Badge size="sm" variant={app.scheme === 'NFST' ? 'info' : 'saffron'}>
                            {app.scheme}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {app.degree} • {app.institution} ({app.state})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 group-hover:text-blue-600 font-medium flex items-center gap-1">
                        View <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fellows */}
          {matchedFellows.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Active Research Fellows ({matchedFellows.length})
              </div>
              <div className="space-y-1">
                {matchedFellows.map((fellow) => (
                  <div
                    key={fellow.id}
                    onClick={() => handleSelectFellow(fellow.id)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-100 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{fellow.name}</span>
                          <span className="text-xs font-mono font-semibold text-slate-500">{fellow.id}</span>
                          <Badge size="sm" variant="success">Year {fellow.currentYear}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {fellow.institution} • {fellow.researchArea}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 group-hover:text-emerald-600 font-medium flex items-center gap-1">
                        Open Profile <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grievances */}
          {matchedGrievances.length > 0 && (
            <div>
              <div className="px-2 pb-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Grievance Tickets ({matchedGrievances.length})
              </div>
              <div className="space-y-1">
                {matchedGrievances.map((g) => (
                  <div
                    key={g.id}
                    onClick={handleSelectGrievance}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-100 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{g.id}</span>
                          <span className="text-xs text-slate-600 font-medium">{g.applicantName}</span>
                          <Badge size="sm" variant={g.priority === 'High' ? 'error' : 'warning'}>{g.priority}</Badge>
                        </div>
                        <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">{g.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-amber-600 font-medium flex items-center gap-1">
                      Manage <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedApplications.length === 0 && matchedFellows.length === 0 && matchedGrievances.length === 0 && (
            <div className="text-center py-8">
              <Shield className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-600">No records found matching "{searchQuery}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching "NFST", "Arun Kumar", "Odisha", or "Grievance"
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Quick key: <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-sm font-mono">Ctrl+K</kbd>
            </span>
            <span>•</span>
            <span>All mock data searchable offline</span>
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
