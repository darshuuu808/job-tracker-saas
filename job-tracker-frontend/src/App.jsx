import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { AuthProvider, useAuth } from "./context/AuthContext";

import SkipToContent from "./components/layout/SkipToContent";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
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

                <Route
                    path="/login"
                    element={
                        isAuthenticated
                            ? <Navigate to="/" replace />
                            : <Login />
                    }
                />

                <Route
                    path="/"
                    element={
                        isAuthenticated
                            ? <Dashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        isAuthenticated
                            ? <Analytics />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/settings"
                    element={
                        isAuthenticated
                            ? <Settings />
                            : <Navigate to="/login" replace />
                    }
                />

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