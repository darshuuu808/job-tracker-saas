import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";

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
                        ? <Navigate to="/" />
                        : <Login />
                }
            />

            <Route
                path="/"
                element={
                    isAuthenticated
                        ? <Dashboard />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/analytics"
                element={
                    isAuthenticated
                        ? <Analytics />
                        : <Navigate to="/login" />
                }
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