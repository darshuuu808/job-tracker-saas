import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <HelmetProvider>

            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
            >

                <ErrorBoundary>

                    <App />

                </ErrorBoundary>

            </ThemeProvider>

        </HelmetProvider>

    </React.StrictMode>

);