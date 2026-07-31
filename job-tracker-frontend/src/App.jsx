import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";

import SkipToContent from "./components/layout/SkipToContent";
import ProtectedRoute from "./components/ProtectedRoute";
import OfflineBanner from "./components/common/OfflineBanner";
import InstallAppButton from "./components/common/InstallAppButton";

import { Toaster } from "@/components/ui/sonner";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

        <>

            <OfflineBanner />

            <InstallAppButton />

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

                    {/* Landing */}

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

                    {/* Register */}

                    <Route

                        path="/register"

                        element={

                            isAuthenticated

                                ? <Navigate to="/dashboard" replace />

                                : <RegisterPage />

                        }

                    />

                    {/* Dashboard */}

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

        </>

    );

}

export default function App() {

    return (

        <BrowserRouter>

            <SkipToContent />

            <AuthProvider>

                <AppContent />

                <Toaster

                    richColors

                    position="top-right"

                />

            </AuthProvider>

        </BrowserRouter>

    );

}