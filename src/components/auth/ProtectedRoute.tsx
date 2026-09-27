import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { loggedIn, user } = useAuth();
  const navigate = useNavigate();

  if (!loggedIn || !user) {
    return <Navigate to="/portal-selection" replace />;
  }

  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    const getDashboardPath = (role: UserRole) => {
      switch (role) {
        case 'applicant':
          return '/applicant';
        case 'scrutiny':
          return '/scrutiny';
        case 'committee':
          return '/selection';
        case 'admin':
          return '/admin';
        case 'fellowship':
          return '/fellowship';
        case 'grievance':
          return '/grievances';
        default:
          return '/portal-selection';
      }
    };

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-full font-mono mb-2">
          Statutory RBAC Authorization Boundary
        </span>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Access Restricted
        </h2>

        <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
          You do not have permission to access this workspace. Your authenticated credentials are registered under the{' '}
          <strong className="text-slate-800 font-bold">{user.portalName}</strong> ({user.role.toUpperCase()}).
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <button
            onClick={() => navigate(getDashboardPath(user.role))}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to {user.portalName}</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
