import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TribalAidProvider } from './context/TribalAidContext';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { PortalSelectPage } from './pages/PortalSelectPage';
import { RoleLoginPage } from './pages/RoleLoginPage';

import { ApplicantDashboard } from './pages/ApplicantDashboard';
import { DocumentVerificationPage } from './pages/DocumentVerificationPage';
import { ApplicantGrievancesPage } from './pages/ApplicantGrievancesPage';
import { ApplicantProfilePage } from './pages/ApplicantProfilePage';

import { ScrutinyDashboard } from './pages/ScrutinyDashboard';
import { ScrutinyDetailPage } from './pages/ScrutinyDetailPage';

import { SelectionDashboard } from './pages/SelectionDashboard';

import { AdminDashboard } from './pages/AdminDashboard';
import { SchemeConfigPage } from './pages/SchemeConfigPage';

import { FellowshipDashboard } from './pages/FellowshipDashboard';
import { FellowProfilePage } from './pages/FellowProfilePage';

import { GrievanceDashboard } from './pages/GrievanceDashboard';

import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <AuthProvider>
      <TribalAidProvider>
        <HashRouter>
          <Routes>
            {/* Public Root Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public Portal Selection & Separate Login Experience */}
            <Route path="/portal-selection" element={<PortalSelectPage />} />
            <Route path="/login" element={<Navigate to="/portal-selection" replace />} />
            <Route path="/login/:role" element={<RoleLoginPage />} />

            {/* Authenticated Application Shell */}
            <Route element={<AppLayout />}>

              {/* Applicant Portal (Role: applicant) */}
              <Route
                path="/applicant"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ApplicantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applicant/application"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ApplicantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applicant/documents"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <DocumentVerificationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applicant/grievances"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ApplicantGrievancesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applicant/profile"
                element={
                  <ProtectedRoute allowedRoles={['applicant']}>
                    <ApplicantProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Scrutiny Officer Portal (Role: scrutiny) */}
              <Route
                path="/scrutiny"
                element={
                  <ProtectedRoute allowedRoles={['scrutiny']}>
                    <ScrutinyDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scrutiny/application/:id"
                element={
                  <ProtectedRoute allowedRoles={['scrutiny']}>
                    <ScrutinyDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* Selection Committee Portal (Role: committee) */}
              <Route
                path="/selection"
                element={
                  <ProtectedRoute allowedRoles={['committee']}>
                    <SelectionDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/selection/application/:id"
                element={
                  <ProtectedRoute allowedRoles={['committee']}>
                    <ScrutinyDetailPage />
                  </ProtectedRoute>
                }
              />

              {/* MoTA Administration Portal (Role: admin) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/schemes"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SchemeConfigPage />
                  </ProtectedRoute>
                }
              />

              {/* Fellowship Management Portal (Role: fellowship) */}
              <Route
                path="/fellowship"
                element={
                  <ProtectedRoute allowedRoles={['fellowship']}>
                    <FellowshipDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fellowship/:id"
                element={
                  <ProtectedRoute allowedRoles={['fellowship']}>
                    <FellowProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* Grievance Officer Portal (Role: grievance) */}
              <Route
                path="/grievances"
                element={
                  <ProtectedRoute allowedRoles={['grievance']}>
                    <GrievanceDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/grievances/:id"
                element={
                  <ProtectedRoute allowedRoles={['grievance']}>
                    <GrievanceDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Catch-all */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </TribalAidProvider>
    </AuthProvider>
  );
}

export default App;

