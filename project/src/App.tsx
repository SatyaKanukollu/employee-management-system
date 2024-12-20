import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { EvaluationProvider } from './contexts/EvaluationContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Evaluations from './pages/Evaluations';
import Settings from './pages/Settings';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <EvaluationProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/employees" element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <AppLayout>
                    <Employees />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/evaluations" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Evaluations />
                  </AppLayout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </EvaluationProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;