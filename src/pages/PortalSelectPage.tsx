import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserRound,
  FileSearch,
  Trophy,
  BarChart3,
  GraduationCap,
  MessageSquareWarning,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Lock
} from 'lucide-react';
import { UserRole } from '../types';

export const PortalSelectPage: React.FC = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'applicant' as UserRole,
      title: 'Applicant Portal',
      subtitle: 'Candidate Enrollment & Tracking',
      description:
        'For tribal students applying for NFST and NOS scholarships. Track application status, fulfill document verifications, and monitor DBT disbursements.',
      icon: UserRound,
      color: 'blue',
      route: '/login/applicant',
      accessBadge: 'Citizen Access'
    },
    {
      id: 'scrutiny' as UserRole,
      title: 'Scrutiny Officer Portal',
      subtitle: 'Verification & Document Desk',
      description:
        'For designated state and central scrutiny officers. Inspect AI-assisted OCR data comparisons, identify anomalies, and issue statutory deficiency notices.',
      icon: FileSearch,
      color: 'indigo',
      route: '/login/scrutiny',
      accessBadge: 'Nodal Officer'
    },
    {
      id: 'committee' as UserRole,
      title: 'Selection Committee Portal',
      subtitle: 'Statutory Allocation Board',
      description:
        'For national selection committee members. Deliberate on composite merit rankings, conduct candidate comparisons, and record formal award decisions.',
      icon: Trophy,
      color: 'amber',
      route: '/login/committee',
      accessBadge: 'Committee Quorum'
    },
    {
      id: 'admin' as UserRole,
      title: 'MoTA Administration Portal',
      subtitle: 'Executive Programme Oversight',
      description:
        'For Ministry executive officers. Monitor national application funnels, state-wise penetration analytics, statutory budget commitments, and policy rules.',
      icon: BarChart3,
      color: 'slate',
      route: '/login/admin',
      accessBadge: 'Ministry Executive'
    },
    {
      id: 'fellowship' as UserRole,
      title: 'Fellowship Management Portal',
      subtitle: 'Post-Award Doctoral Administration',
      description:
        'For university supervisors and fellowship officers. Track 5-year doctoral research milestones, progress reports, and monthly PFMS DBT releases.',
      icon: GraduationCap,
      color: 'emerald',
      route: '/login/fellowship',
      accessBadge: 'Academic & DBT Cell'
    },
    {
      id: 'grievance' as UserRole,
      title: 'Grievance Redressal Portal',
      subtitle: 'Citizen Grievance Redressal Desk',
      description:
        'For public grievance officers. Investigate applicant inquiries, coordinate deficiency clarifications, and resolve tickets within statutory SLA windows.',
      icon: MessageSquareWarning,
      color: 'rose',
      route: '/login/grievance',
      accessBadge: 'CPGRAMS Nodal'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Government Identity Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 shadow-sm border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/assets/tribalaid-logo.png"
                alt="TribalAid AI"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">TRIBALAID</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-blue-600 text-white uppercase tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Ministry of Tribal Affairs • Government of India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>← Back to Overview</span>
            </button>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 block font-medium">
                National Scholarship & Fellowship Platform
              </span>
              <span className="text-[11px] text-slate-300 font-semibold">
                Integrated Workflow Environment
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Intro */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 lg:py-14 w-full flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Digital Governance Architecture
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Select Your Assigned Operational Portal
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to TribalAid AI. Please select the authorized portal corresponding to your role in the scholarship administration lifecycle to continue to secure login.
          </p>
        </div>

        {/* 6 Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 group relative shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                      {p.accessBadge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-xs text-blue-400 font-semibold block mt-0.5">
                    {p.subtitle}
                  </span>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => navigate(p.route)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                  >
                    <span>Continue to Login</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-5 px-6 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Designed for Ministry of Tribal Affairs scholarship and fellowship workflow</span>
          <span className="text-[11px] text-slate-400">
            Secure Role-Based Access Control • Audit Trail Active
          </span>
        </div>
      </footer>
    </div>
  );
};
