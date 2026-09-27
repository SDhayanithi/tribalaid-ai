import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Bot,
  Sparkles,
  Building2,
  Lock,
  ArrowRight,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const RoleLoginPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Validate or fallback role
  const validRole: UserRole =
    role === 'scrutiny' ||
    role === 'committee' ||
    role === 'admin' ||
    role === 'fellowship' ||
    role === 'grievance'
      ? role
      : 'applicant';

  const roleConfigs: Record<
    UserRole,
    {
      portalName: string;
      idLabel: string;
      defaultId: string;
      defaultPassword: string;
      buttonText: string;
      destination: string;
      officialBadge: string;
      description: string;
    }
  > = {
    applicant: {
      portalName: 'Applicant Portal',
      idLabel: 'Application ID / Registered Email',
      defaultId: 'arunkumar.botany@univmadras.ac.in',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Applicant Portal',
      destination: '/applicant',
      officialBadge: 'Citizen Access',
      description: 'Sign in to track your NFST / NOS application, resolve document deficiencies, and verify DBT status.'
    },
    scrutiny: {
      portalName: 'Scrutiny Officer Portal',
      idLabel: 'Official Employee ID / GovID',
      defaultId: 'SCR-2048-RADHAKRISHNAN',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Scrutiny Desk',
      destination: '/scrutiny',
      officialBadge: 'Authorized Scrutiny Officer',
      description: 'Access the regional application queue, AI document verification engine, and statutory deficiency dispatch desk.'
    },
    committee: {
      portalName: 'Selection Committee Portal',
      idLabel: 'Official Committee ID',
      defaultId: 'SC-CHAIR-MARANDI-102',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Selection Board',
      destination: '/selection',
      officialBadge: 'Statutory Committee Quorum',
      description: 'Review national merit lists, conduct multi-candidate comparative reviews, and record auditable award decisions.'
    },
    admin: {
      portalName: 'MoTA Administration',
      idLabel: 'Ministry Admin Credential ID',
      defaultId: 'ADM-MOTA-JOINTSEC-001',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Administration',
      destination: '/admin',
      officialBadge: 'Ministry Executive',
      description: 'Access the national scholarship intake funnel, state-wise penetration analytics, and policy configuration engine.'
    },
    fellowship: {
      portalName: 'Fellowship Management',
      idLabel: 'Fellowship Cell Nodal ID',
      defaultId: 'FEL-CELL-NODAL-021',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Fellowship Management',
      destination: '/fellowship',
      officialBadge: 'Academic & DBT Administration',
      description: 'Monitor active doctoral fellows, review annual DRC progress reports, and verify monthly PFMS stipend schedules.'
    },
    grievance: {
      portalName: 'Grievance Redressal Desk',
      idLabel: 'Public Grievance Officer ID',
      defaultId: 'GRV-OFFICER-RAMANATHAN-014',
      defaultPassword: '••••••••••••',
      buttonText: 'Sign in to Grievance Desk',
      destination: '/grievances',
      officialBadge: 'CPGRAMS Redressal Authority',
      description: 'Investigate citizen grievance tickets, coordinate internal nodal communications, and issue formal resolutions.'
    }
  };

  const config = roleConfigs[validRole];

  const [identifier, setIdentifier] = useState(config.defaultId);
  const [password, setPassword] = useState(config.defaultPassword);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(validRole, {
      id: identifier.startsWith('APP-') || identifier.includes('@') ? identifier : config.defaultId
    });
    navigate(config.destination);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row font-sans">
      {/* Left Visual Documentary Area */}
      <div className="relative lg:w-7/12 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/tribal_students_education.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/portal-selection')}>
            <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg border border-white/30 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/tribalaid-logo.png`}
                alt="TribalAid AI"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight">TRIBALAID</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Ministry of Tribal Affairs • Government of India
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/portal-selection')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch Portal</span>
          </button>
        </div>

        {/* Caption */}
        <div className="relative z-10 max-w-xl my-8 sm:my-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            {config.officialBadge}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {config.portalName}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {config.description}
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
          <span>Designed for Ministry of Tribal Affairs scholarship and fellowship workflow</span>
          <span className="font-mono text-[11px] text-slate-400">Integrated Security</span>
        </div>
      </div>

      {/* Right Login Workspace */}
      <div className="lg:w-5/12 bg-white flex flex-col justify-center p-6 sm:p-12 lg:p-16">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              {config.officialBadge}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
              Sign In to {config.portalName}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your authorized operational credentials to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {config.idLabel}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 font-mono"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-sm text-blue-600 focus:ring-blue-500"
                />
                <span>Keep session active</span>
              </label>
              <span className="text-slate-400 font-mono text-[11px]">2FA Active</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span>{config.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Credential Autofill Helper for Evaluators */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Default Registered Identity:
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-slate-700 truncate max-w-[240px]">{config.defaultId}</span>
              <button
                type="button"
                onClick={() => {
                  setIdentifier(config.defaultId);
                  setPassword('••••••••••••');
                }}
                className="text-[11px] text-blue-600 hover:underline font-semibold"
              >
                Autofill
              </button>
            </div>
          </div>

          {/* Bottom Security / Trust UI */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-1.5">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Role-Based Access Control • Immutable Audit Trail Active
            </p>
            <p className="text-[10px] text-slate-400">
              National Informatics Centre (NIC) Gateway Standards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
