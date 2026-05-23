import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import LeadManagementPage from './pages/LeadManagementPage';
import KanbanPipelinePage from './pages/KanbanPipelinePage';
import TeamPerformancePage from './pages/TeamPerformancePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadManagementPage />} />
          <Route path="pipeline" element={<KanbanPipelinePage />} />
          <Route path="performance" element={<TeamPerformancePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
