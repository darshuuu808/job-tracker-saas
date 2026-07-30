import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";

import SkipToContent from "./components/layout/SkipToContent";
import ProtectedRoute from "./components/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { Toaster } from "@/components/ui/sonner";

function AppContent() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <h2 className="text-xl font-semibold">
                        Loading...
                    </h2>
                </div>
            }
        >
            <Routes>

                {/* Public Landing Page */}
                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Navigate to="/dashboard" replace />
                            : <LandingPage />
                    }
                />

                {/* Login */}
                <Route
                    path="/login"
                    element={
                        isAuthenticated
                            ? <Navigate to="/dashboard" replace />
                            : <Login />
                    }
                />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Analytics */}
                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                {/* Settings */}
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                {/* Admin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </Suspense>
    );
}

export default function App() {
    return (
        <BrowserRouter>

            <SkipToContent />

            <AuthProvider>

                <AppContent />

                <Toaster richColors />

            </AuthProvider>

        </BrowserRouter>
    );
}