import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole } from '../types';

interface AuthContextType {
  loggedIn: boolean;
  user: AuthUser | null;
  login: (role: UserRole, customData?: Partial<AuthUser>) => void;
  logout: () => void;
}

const DEFAULT_USERS: Record<UserRole, AuthUser> = {
  applicant: {
    role: 'applicant',
    name: 'Arun Kumar',
    id: 'APP-2026-00482',
    email: 'arunkumar.botany@univmadras.ac.in',
    designation: 'Ph.D. Scholar (Botany)',
    portalName: 'Applicant Portal'
  },
  scrutiny: {
    role: 'scrutiny',
    name: 'Dr. V. Radhakrishnan',
    id: 'SCR-2048',
    email: 'v.radhakrishnan@mota.gov.in',
    designation: 'Senior Scrutiny Officer',
    portalName: 'Scrutiny Officer Portal'
  },
  committee: {
    role: 'committee',
    name: 'Prof. Anirudh Marandi',
    id: 'SC-102',
    email: 'anirudh.marandi@mota.gov.in',
    designation: 'Selection Committee Chair',
    portalName: 'Selection Committee Portal'
  },
  admin: {
    role: 'admin',
    name: 'MoTA Administrator',
    id: 'ADM-001',
    email: 'jointsec.tribalaffairs@nic.in',
    designation: 'Joint Secretary (Tribal Affairs)',
    portalName: 'MoTA Administration'
  },
  fellowship: {
    role: 'fellowship',
    name: 'Fellowship Desk Officer',
    id: 'FEL-021',
    email: 'fellowship.cell@mota.gov.in',
    designation: 'Fellowship Management Officer',
    portalName: 'Fellowship Management'
  },
  grievance: {
    role: 'grievance',
    name: 'S. Ramanathan',
    id: 'GRV-014',
    email: 's.ramanathan@mota.gov.in',
    designation: 'Senior Grievance Redressal Officer',
    portalName: 'Grievance Redressal Desk'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('tribalaid_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loggedIn = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('tribalaid_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('tribalaid_auth');
    }
  }, [user]);

  const login = (role: UserRole, customData?: Partial<AuthUser>) => {
    const baseUser = DEFAULT_USERS[role];
    const updatedUser: AuthUser = {
      ...baseUser,
      ...customData
    };
    setUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tribalaid_auth');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
