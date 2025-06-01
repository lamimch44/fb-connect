import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BusinessProvider } from './context/BusinessContext';
import { OnboardingProvider } from './context/OnboardingContext';
import LoginPage from './pages/LoginPage';
import ConnectPage from './pages/ConnectPage';
import BusinessInfoPage from './pages/BusinessInfoPage';
import SummaryPage from './pages/SummaryPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusinessProvider>
          <OnboardingProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/connect" element={<ConnectPage />} />
                <Route path="/business-info" element={<BusinessInfoPage />} />
                <Route path="/summary" element={<SummaryPage />} />
              </Route>
              <Route path="/" element={<Navigate to="/login\" replace />} />
            </Routes>
          </OnboardingProvider>
        </BusinessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;