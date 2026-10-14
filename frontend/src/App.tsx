import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/login/LoginPage';
import { TeacherDashboardPage } from './pages/teacher/TeacherDashboardPage';
import { GenerateAssignmentPage } from './pages/teacher/GenerateAssignmentPage';
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { AssignmentDetailPage } from './pages/assignments/AssignmentDetailPage';
import './styles/global.css';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout">
      <DemoBanner />
      <Navbar />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

const RootRedirect: React.FC = () => {
  const { user } = useAuth();
  return <Navigate to={user.role === 'TEACHER' ? '/teacher' : '/student'} replace />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/teacher"
            element={
              <AppLayout>
                <TeacherDashboardPage />
              </AppLayout>
            }
          />

          <Route
            path="/teacher/generate"
            element={
              <AppLayout>
                <GenerateAssignmentPage />
              </AppLayout>
            }
          />

          <Route
            path="/student"
            element={
              <AppLayout>
                <StudentDashboardPage />
              </AppLayout>
            }
          />

          <Route
            path="/assignments/:id"
            element={
              <AppLayout>
                <AssignmentDetailPage />
              </AppLayout>
            }
          />

          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
