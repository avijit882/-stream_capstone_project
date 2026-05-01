// src/App.jsx
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store          from './redux/store';
import ErrorBoundary  from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// ── Code splitting: each page loads only when navigated to ─────────────────
const LoginPage      = lazy(() => import('./pages/LoginPage'));
const ProfilesPage   = lazy(() => import('./pages/ProfilesPage'));
const HomePage       = lazy(() => import('./pages/HomePage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const WatchPage      = lazy(() => import('./pages/WatchPage'));
const WatchlistPage  = lazy(() => import('./pages/WatchlistPage'));
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage'));

// ── Full-screen loader shown during lazy page load ─────────────────────────
function Loader() {
  return (
    <div className="min-h-screen bg-sv-dark flex flex-col items-center justify-center gap-5">
      <span className="font-display text-4xl tracking-widest text-sv-red animate-pulse">
        STREAM<span className="text-white">VAULT</span>
      </span>
      <div className="w-7 h-7 border-[3px] border-sv-red border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Applies dark class from Redux theme state ──────────────────────────────
function ThemeSync() {
  const dark = useSelector(s => s.theme.dark);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  return null;
}

// ── Require login but NOT profile (for /profiles route) ───────────────────
function RequireAuth({ children }) {
  const auth = useSelector(s => s.auth.isAuthenticated);
  return auth ? children : <Navigate to="/login" replace />;
}

// ── All routes ─────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/"       element={<Navigate to="/login" replace />} />
        <Route path="/login"  element={<LoginPage />} />

        <Route path="/profiles" element={
          <RequireAuth><ProfilesPage /></RequireAuth>
        } />

        <Route path="/home"       element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/watchlist"  element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
        <Route path="/watch/:id"  element={<ProtectedRoute><WatchPage /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

// ── Root export ────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeSync />
          <AppRoutes />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}
