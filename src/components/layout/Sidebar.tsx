import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserRound,
  FileSearch,
  Trophy,
  BarChart3,
  GraduationCap,
  MessageSquareWarning,
  Settings2,
  LifeBuoy,
  Shield,
  Layers,
  LogOut,
  FileCheck,
  CheckCircle2,
  Clock,
  Columns,
  FolderOpen,
  PieChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTribalAid } from '../../context/TribalAidContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { notifications } = useTribalAid();
  const navigate = useNavigate();

  const currentRole = user?.role || 'applicant';

  // Filter notifications for this role
  const unreadCount = notifications.filter(
    (n) => !n.read && (!n.targetRole || n.targetRole === currentRole)
  ).length;

  const handleSignOut = () => {
    logout();
    navigate('/portal-selection');
  };

  // Role-Specific Navigation Definitions
  const getNavItems = (role: UserRole) => {
    switch (role) {
      case 'applicant':
        return [
          { label: 'My Dashboard', to: '/applicant', icon: LayoutDashboard, badge: undefined },
          { label: 'My Application', to: '/applicant/profile', icon: UserRound, badge: 'NFST' },
          { label: 'Documents & OCR', to: '/applicant/documents', icon: Layers, badge: 'Verified' },
          {
            label: 'My Grievances',
            to: '/applicant/grievances',
            icon: MessageSquareWarning,
            badge: unreadCount > 0 ? `${unreadCount} update` : undefined
          },
          { label: 'Beneficiary Profile', to: '/applicant/profile', icon: Shield, badge: undefined }
        ];

      case 'scrutiny':
        return [
          { label: 'Scrutiny Dashboard', to: '/scrutiny', icon: LayoutDashboard, badge: undefined },
          { label: 'Application Queue', to: '/scrutiny', icon: FileSearch, badge: '1,248' },
          { label: 'AI Document Review', to: '/scrutiny/application/NFST-2026-00482', icon: Layers, badge: 'OCR Desk' },
          { label: 'SLA Monitoring', to: '/scrutiny', icon: Clock, badge: '18h left' }
        ];

      case 'committee':
        return [
          { label: 'Committee Dashboard', to: '/selection', icon: LayoutDashboard, badge: undefined },
          { label: 'National Merit List', to: '/selection', icon: Trophy, badge: '824 Awards' },
          { label: 'Applicant Comparison', to: '/selection', icon: Columns, badge: 'Side-by-Side' },
          { label: 'Selection Decisions', to: '/selection', icon: CheckCircle2, badge: 'Audited' }
        ];

      case 'admin':
        return [
          { label: 'Executive Overview', to: '/admin', icon: LayoutDashboard, badge: undefined },
          { label: 'Intake Funnel', to: '/admin', icon: BarChart3, badge: '24.8K' },
          { label: 'State & District Analytics', to: '/admin', icon: PieChart, badge: 'PAN-India' },
          { label: 'Budget & Disbursement', to: '/admin', icon: FolderOpen, badge: '₹18.4 Cr' },
          { label: 'Scheme Configuration', to: '/schemes', icon: Settings2, badge: 'Policy Rules' }
        ];

      case 'fellowship':
        return [
          { label: 'Fellowship Dashboard', to: '/fellowship', icon: LayoutDashboard, badge: undefined },
          { label: 'Active Fellows', to: '/fellowship', icon: GraduationCap, badge: '2,481' },
          { label: 'Annual Renewals', to: '/fellowship', icon: Clock, badge: '184 Due' },
          { label: 'Progress Reports', to: '/fellowship', icon: FileCheck, badge: '96 Pending' },
          { label: 'DBT Disbursements', to: '/fellowship', icon: Shield, badge: 'PFMS' }
        ];

      case 'grievance':
        return [
          { label: 'Grievance Dashboard', to: '/grievances', icon: LayoutDashboard, badge: undefined },
          { label: 'Open Tickets', to: '/grievances', icon: MessageSquareWarning, badge: '384 Open' },
          { label: 'SLA Monitoring', to: '/grievances', icon: Clock, badge: '72 Warning' },
          { label: 'Assigned Cases', to: '/grievances', icon: Shield, badge: 'Active' },
          { label: 'Resolution History', to: '/grievances', icon: CheckCircle2, badge: '821 Done' }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems(currentRole);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0F172A] text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 flex items-center justify-center shadow-md shrink-0">
              <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🏛️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">TRIBALAID</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-sm bg-gradient-to-r from-blue-700 to-indigo-600 text-white tracking-widest uppercase">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                Ministry of Tribal Affairs
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Government of India</span>
            <span className="text-[10px] text-blue-400 font-mono font-medium">
              National Portal
            </span>
          </div>
        </div>

        {/* Current Portal Indicator */}
        <div className="px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/80">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Operational Workspace</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">{user?.portalName || 'Workspace'}</span>
          </div>
        </div>

        {/* Role-Specific Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Portal Navigation
          </div>

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs shadow-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono group-hover:bg-slate-700/80">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Help, User Profile & Sign Out */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <LifeBuoy className="w-4 h-4 text-slate-400" />
              <span>Nodal Support Desk</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">1800-11-2244</span>
          </div>

          {/* User Dossier */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-inner">
                {user?.name.slice(0, 2).toUpperCase() || 'US'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.designation || user?.role}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              title="Sign Out of Portal"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
