import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Reservations from './Tours/Reservations';


// Lazy load components
const DashboardHome = lazy(() => import('./DashboardHome'));
const Settings = lazy(() => import('./Settings'));
const RoleManagement = lazy(() => import('./RoleManagement'));
const Tours = lazy(() => import('./Tours/Tours'));
const TourAddToList = lazy(() => import('./Tours/TourAddToList'));
const DatabaseBackup = lazy(() => import('./DatabaseBackup'));
const Companies = lazy(() => import('./companies/Companies'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center p-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Yükleniyor...</span>
    </div>
  </div>
);

function MenuSliderRoute({ company, subscription, setIsLoggedIn }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<DashboardHome company={company} subscription={subscription} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/guides" element={<div>Rehberler (Yakında)</div>} />
        <Route path="/tours">
          <Route path="create" element={<Tours />} />
          <Route path="listeler" element={<TourAddToList />} />
          <Route path="rezervasyonlar" element={<Reservations />} />
        </Route>
        <Route path="/reports" element={<div>Raporlar (Yakında)</div>} />
        <Route path="/hotels" element={<div>Otel Gönder (Yakında)</div>} />
        <Route path="/settings" element={<Settings company={company} />} />
        <Route path="/role-management" element={<RoleManagement company={company} />} />
        <Route path="/database-backup" element={<DatabaseBackup />} />
      </Routes>
    </Suspense>
  );
}

export default MenuSliderRoute; 