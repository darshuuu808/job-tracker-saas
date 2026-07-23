import "./i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "next-themes";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

import "./index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >

            <ErrorBoundary>

                <App />

            </ErrorBoundary>

        </ThemeProvider>

    </React.StrictMode>

);