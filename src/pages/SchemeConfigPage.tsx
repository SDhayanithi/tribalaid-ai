import React, { useState } from 'react';
import {
  Settings2,
  Sliders,
  FileText,
  Clock,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useTribalAid } from '../context/TribalAidContext';
import { SchemeCode, SchemeConfig } from '../types';
import { Badge } from '../components/common/Badge';

export const SchemeConfigPage: React.FC = () => {
  const { schemes, updateScheme } = useTribalAid();

  const [activeSchemeCode, setActiveSchemeCode] = useState<SchemeCode>('NFST');
  const [saveToast, setSaveToast] = useState(false);

  const activeScheme = schemes.find((s) => s.code === activeSchemeCode) || schemes[0];

  const handleToggleDoc = (docId: string) => {
    const updatedDocs = activeScheme.requiredDocuments.map((d) =>
      d.id === docId ? { ...d, required: !d.required } : d
    );
    updateScheme(activeScheme.code, { requiredDocuments: updatedDocs });
  };

  const handleUpdateIncomeCeiling = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    updateScheme(activeScheme.code, {
      eligibility: { ...activeScheme.eligibility, maxAnnualIncome: val }
    });
  };

  const handleUpdateMinScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    updateScheme(activeScheme.code, {
      eligibility: { ...activeScheme.eligibility, minAcademicScore: val }
    });
  };

  const handleUpdateSLA = (key: 'scrutiny' | 'deficiencyResolution' | 'grievance', val: number) => {
    updateScheme(activeScheme.code, {
      slaHours: { ...activeScheme.slaHours, [key]: val }
    });
  };

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Policy & Rules Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">Dynamic Scheme Configuration</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Scheme Configuration & Rules
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Configure dynamic eligibility cut-offs, required verification document sets, statutory SLA windows, and disbursement triggers without code deployments.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleSave}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Publish Scheme Updates</span>
          </button>
        </div>
      </div>

      {/* Save Toast Indicator */}
      {saveToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Scheme parameters updated and synchronized across all verification desks!
          </span>
          <span className="font-mono text-[10px] text-emerald-600">Sync: Version 2026.4</span>
        </div>
      )}

      {/* Scheme Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {schemes.map((s) => {
          const isSelected = s.code === activeSchemeCode;
          return (
            <div
              key={s.code}
              onClick={() => setActiveSchemeCode(s.code)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded-md">
                    {s.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{s.name}</h3>
                </div>
                <Badge variant={s.isActive ? 'success' : 'neutral'}>
                  {s.isActive ? 'Active Scheme' : 'Archived'}
                </Badge>
              </div>

              <p className="text-xs text-slate-600 mt-2 line-clamp-2">{s.description}</p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">
                    Annual Budget
                  </span>
                  <span className="font-bold text-slate-800">₹{s.annualBudgetCr} Cr</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">
                    Total Slots
                  </span>
                  <span className="font-bold text-slate-800">{s.totalSlots} Scholars / yr</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Rule Editor Workspace */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Active Policy Matrix: {activeScheme.name} ({activeScheme.code})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live automated eligibility filters applied to incoming candidate submissions
            </p>
          </div>
          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Rules Active in Real-time
          </span>
        </div>

        {/* Section 1: Eligibility Cut-offs */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <span>Eligibility Criteria & Cut-offs</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Minimum Academic Score (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activeScheme.eligibility.minAcademicScore}
                  onChange={handleUpdateMinScore}
                  className="w-full text-sm font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">%</span>
              </div>
              <p className="text-[11px] text-slate-400">Post-graduation aggregate requirement</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Family Annual Income Ceiling (₹)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="50000"
                  value={activeScheme.eligibility.maxAnnualIncome}
                  onChange={handleUpdateIncomeCeiling}
                  className="w-full text-sm font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">INR</span>
              </div>
              <p className="text-[11px] text-slate-400">Upper limit for means test qualification</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Maximum Candidate Age
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activeScheme.eligibility.ageLimit}
                  readOnly
                  className="w-full text-sm font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">Years</span>
              </div>
              <p className="text-[11px] text-slate-400">Statutory age relaxations apply</p>
            </div>
          </div>
        </div>

        {/* Section 2: Required Documents & OCR Mandatory Flags */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Document Prerequisites & Automated Verification Rules</span>
          </h4>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {activeScheme.requiredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 bg-white flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{doc.name}</span>
                    <Badge variant={doc.required ? 'info' : 'neutral'} size="sm">
                      {doc.required ? 'Mandatory' : 'Optional'}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{doc.description}</p>
                </div>

                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.required}
                    onChange={() => handleToggleDoc(doc.id)}
                    className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
                  />
                  <span className="text-slate-700">Enforce Verification</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: SLA Turnaround Configurations */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Statutory Service Level Agreement (SLA) Windows</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">
                Nodal Scrutiny Window
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activeScheme.slaHours.scrutiny}
                  onChange={(e) => handleUpdateSLA('scrutiny', Number(e.target.value))}
                  className="w-full text-xs font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">Hours</span>
              </div>
              <span className="text-[10px] text-slate-400">Escalates after deadline</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">
                Deficiency Resolution Limit
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activeScheme.slaHours.deficiencyResolution}
                  onChange={(e) => handleUpdateSLA('deficiencyResolution', Number(e.target.value))}
                  className="w-full text-xs font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">Hours</span>
              </div>
              <span className="text-[10px] text-slate-400">Applicant response period</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">
                Grievance Resolution Target
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activeScheme.slaHours.grievance}
                  onChange={(e) => handleUpdateSLA('grievance', Number(e.target.value))}
                  className="w-full text-xs font-bold p-2 bg-white rounded-lg border border-slate-200 text-slate-900"
                />
                <span className="text-xs text-slate-500 font-mono">Hours</span>
              </div>
              <span className="text-[10px] text-slate-400">Citizen redressal SLA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
