import { test, expect } from "@playwright/test";

test("should export applications as CSV", async ({ page }) => {

    await page.goto("/");

    // Create an application
    await page.getByTestId("company-input").fill("Google");

    await page.getByTestId("role-input").fill("Software Engineer");

    await page.getByTestId("status-select").click();

    await page.getByRole("option", {
        name: "Applied"
    }).click();

    await page.getByTestId("submit-button").click();

    // Export
    const downloadPromise = page.waitForEvent("download");

    await page.getByTestId("export-button").click();

    const download = await downloadPromise;

    expect(download.suggestedFilename())
        .toBe("applications.csv");

});