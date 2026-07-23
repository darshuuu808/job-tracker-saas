import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    testDir: "./tests",

    timeout: 30000,

    fullyParallel: true,

    use: {

        baseURL: "http://127.0.0.1:5173",

        trace: "on-first-retry",

        screenshot: "only-on-failure",

        video: "retain-on-failure"

    },

    webServer: {

        command: "npm run dev",

        url: "http://127.0.0.1:5173",

        reuseExistingServer: true

    },

    projects: [
      {
        name: "setup",
        testMatch: /auth\.setup\.js/
      },
      {
        name: "chromium",
        use: {
            ...devices["Desktop Chrome"],
            storageState: "playwright/.auth/user.json"
          },
        dependencies: ["setup"]
      }
    ]
});