import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  CheckCheck,
  Sparkles,
  ExternalLink,
  ChevronDown,
  User,
  Shield,
  LogOut,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTribalAid } from '../../context/TribalAidContext';

interface TopbarProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, title, subtitle }) => {
  const { user, logout } = useAuth();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsSearchOpen
  } = useTribalAid();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Filter notifications for the current role
  const roleNotifications = notifications.filter(
    (n) => !n.targetRole || n.targetRole === user?.role
  );
  const unreadCount = roleNotifications.filter((n) => !n.read).length;

  const handleSignOut = () => {
    logout();
    navigate('/portal-selection');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between px-4 lg:px-8 py-3">
        {/* Left: Mobile hamburger & Page Title */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                {title || 'TribalAid AI Platform'}
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-blue-600" />
                GovTech AI
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium hidden sm:block mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Search, Notifications, User Profile (NO role switcher) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 text-xs font-medium border border-slate-200 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden md:inline">Search applications, records...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] text-slate-400 bg-white border border-slate-200 rounded-sm font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Portal Notifications ({unreadCount} unread)
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2">
                    {roleNotifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        No new notifications for your assigned role.
                      </div>
                    ) : (
                      roleNotifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.linkTo) {
                              navigate(n.linkTo);
                              setIsNotifOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                            n.read
                              ? 'bg-white border-slate-100 text-slate-600'
                              : 'bg-blue-50/60 border-blue-100 text-slate-900 font-medium'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-slate-900">{n.title}</p>
                            <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                              {n.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{n.message}</p>
                          {n.linkTo && (
                            <div className="mt-2 flex items-center gap-1 text-[11px] text-blue-600 font-semibold">
                              <span>Open record</span>
                              <ExternalLink className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Badge & Menu (NO Role Switcher) */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user?.name.slice(0, 2).toUpperCase() || 'US'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.name || 'Authorized User'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {user?.designation || user?.portalName}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-40 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2 py-1.5 border-b border-slate-100 mb-2">
                    <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.designation}</p>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      ID: {user?.id}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        if (user?.role === 'applicant') navigate('/applicant/profile');
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setIsNotifOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <Bell className="w-4 h-4 text-slate-400" />
                      <span>Notifications ({unreadCount})</span>
                    </button>

                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>Security & 2FA</span>
                    </button>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-rose-700 hover:bg-rose-50 font-bold transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
