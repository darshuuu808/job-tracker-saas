import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

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

    );

}

export default function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <AppContent />

                <Toaster richColors />

            </AuthProvider>

        </BrowserRouter>

    );

}