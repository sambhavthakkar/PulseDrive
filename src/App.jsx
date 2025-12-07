import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AgentConsole = React.lazy(() => import('./pages/AgentConsole'));
const DigitalTwin = React.lazy(() => import('./pages/DigitalTwin'));
const VoiceAgent = React.lazy(() => import('./pages/VoiceAgent'));
const Scheduling = React.lazy(() => import('./pages/Scheduling'));
const UEBA = React.lazy(() => import('./pages/UEBA'));
const Diagnosis = React.lazy(() => import('./pages/Diagnosis'));
const DataAnalysis = React.lazy(() => import('./pages/DataAnalysis'));
const Manufacturing = React.lazy(() => import('./pages/Manufacturing'));
const Feedback = React.lazy(() => import('./pages/Feedback'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Placeholder components for other routes (to be implemented)
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-[50vh] flex-col gap-4 text-[var(--color-text-muted)]">
    <div className="text-4xl">🚧</div>
    <div className="text-xl font-medium">{title} Coming Soon</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          } />
          <Route path="agents" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AgentConsole />
            </Suspense>
          } />

          <Route path="diagnosis" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Diagnosis />
            </Suspense>
          } />
          <Route path="simulation" element={
            <Suspense fallback={<div>Loading...</div>}>
              <DigitalTwin />
            </Suspense>
          } />
          <Route path="voice" element={
            <Suspense fallback={<div>Loading...</div>}>
              <VoiceAgent />
            </Suspense>
          } />
          <Route path="schedule" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Scheduling />
            </Suspense>
          } />
          <Route path="ueba" element={
            <Suspense fallback={<div>Loading...</div>}>
              <UEBA />
            </Suspense>
          } />
          <Route path="analysis" element={
            <Suspense fallback={<div>Loading...</div>}>
              <DataAnalysis />
            </Suspense>
          } />
          <Route path="manufacturing" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Manufacturing />
            </Suspense>
          } />
          <Route path="feedback" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Feedback />
            </Suspense>
          } />
          <Route path="settings" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Settings />
            </Suspense>
          } />
          <Route path="profile" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
