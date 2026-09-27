import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { SearchModal } from '../common/SearchModal';
import { TrustBanner } from '../common/TrustBanner';

export const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Dynamic header titles based on pathname
  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path.startsWith('/applicant/documents')) {
      return {
        title: 'Document Intelligence & Verification',
        subtitle: 'Sub-second OCR extraction, cross-field integrity checks, and human-in-the-loop review'
      };
    }
    if (path.startsWith('/applicant/grievances')) {
      return {
        title: 'Applicant Grievance Portal',
        subtitle: 'Direct grievance submission, officer tracking, and transparent dispute redressal'
      };
    }
    if (path.startsWith('/applicant/profile')) {
      return {
        title: 'Applicant Dossier & Scholar Profile',
        subtitle: 'Verified academic profile, research supervisor credentials, and Aadhaar DBT mapping'
      };
    }
    if (path.startsWith('/applicant')) {
      return {
        title: 'Applicant Scholarship Workspace',
        subtitle: 'Track application progress, fulfill document requirements, and verify DBT status'
      };
    }
    if (path.startsWith('/scrutiny/application/')) {
      return {
        title: 'Scrutiny Officer Workspace',
        subtitle: 'Split-screen human-in-the-loop verification, deficiency resolution & statutory clearance'
      };
    }
    if (path.startsWith('/scrutiny')) {
      return {
        title: 'Scrutiny Operations & Queue',
        subtitle: 'Review, verify and resolve scholarship applications with statutory SLA tracking'
      };
    }
    if (path.startsWith('/selection')) {
      return {
        title: 'National Selection Committee',
        subtitle: 'Transparent merit list screening, side-by-side comparison, and auditable decisions'
      };
    }
    if (path.startsWith('/admin')) {
      return {
        title: 'MoTA Programme Executive Overview',
        subtitle: 'Holistic funnel intelligence, regional state analytics, and budget monitoring'
      };
    }
    if (path.startsWith('/fellowship/')) {
      return {
        title: 'Doctoral Fellow Dossier',
        subtitle: 'Post-award academic progress, research supervisor reviews, and DBT release schedule'
      };
    }
    if (path.startsWith('/fellowship')) {
      return {
        title: 'Fellowship Lifecycle Management',
        subtitle: 'Active doctoral researchers, annual progress renewals, and direct benefit transfers'
      };
    }
    if (path.startsWith('/grievances')) {
      return {
        title: 'Grievance Redressal Mechanism',
        subtitle: 'Citizen grievance tracking, escalation hierarchy, and transparent resolution'
      };
    }
    if (path.startsWith('/schemes')) {
      return {
        title: 'Scheme Configuration & Policy Engine',
        subtitle: 'Dynamic eligibility rules, document prerequisites, and statutory SLA thresholds'
      };
    }
    return {
      title: 'TribalAid AI Platform',
      subtitle: 'Ministry of Tribal Affairs, Government of India'
    };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          <Topbar
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            title={headerInfo.title}
            subtitle={headerInfo.subtitle}
          />

          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            <Outlet />
          </main>

          {/* Subdued Footer */}
          <footer className="mt-auto border-t border-slate-200/80 bg-white py-4 px-6 text-xs text-slate-500">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <TrustBanner compact />
              <div className="text-right text-[11px] text-slate-400">
                <span>Designed for Ministry of Tribal Affairs scholarship & fellowship workflow</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Global Search Modal */}
      <SearchModal />
    </div>
  );
};
