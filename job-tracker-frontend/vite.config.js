import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        tsconfigPaths(),

        VitePWA({
            registerType: "autoUpdate",

            devOptions: {
                enabled: true
            },

            includeAssets: [
                "favicon.svg",
                "robots.txt",
                "sitemap.xml"
            ],

            manifest: {
                name: "Job Tracker",
                short_name: "JobTracker",
                description:
                    "Track job applications, resumes, interviews and opportunities.",

                theme_color: "#2563eb",
                background_color: "#ffffff",

                display: "standalone",
                orientation: "portrait",
                start_url: "/",

                icons: [
                    {
                        src: "/icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "/icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable"
                    }
                ]
            },

            workbox: {
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                skipWaiting: true,

                runtimeCaching: [
                    {
                        // Cache only your Flask API
                        urlPattern: ({ url }) => {
                            return (
                                url.origin === "http://127.0.0.1:5000" &&
                                url.pathname.startsWith("/api/") &&
                                !url.pathname.startsWith("/api/notifications/stream")
                            );
                        },
                        handler: "NetworkFirst",

                        options: {
                            cacheName: "job-tracker-api-cache",

                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 // 24 hours
                            },

                            cacheableResponse: {
                                statuses: [0, 200]
                            },

                            networkTimeoutSeconds: 5
                        }
                    }
                ]
            }
        })
    ],

    server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true
    }
});