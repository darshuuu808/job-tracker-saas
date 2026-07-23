import { test, expect } from "@playwright/test";

test.describe("Application CRUD", () => {

    test("should add a new application", async ({ page }) => {

        await page.goto("/");

        await page.getByTestId("company-input").fill("Google");

        await page.getByTestId("role-input").fill("Software Engineer");

        await page.getByTestId("status-select").click();

        await page.getByRole("option", {
            name: "Applied"
        }).click();

        await page.getByTestId("date-input").fill("2026-07-23");

        await page.getByTestId("notes-input").fill("Playwright Test");

        await page.getByTestId("submit-button").click();

        await expect(
            page.getByText("Google")
        ).toBeVisible();

        await expect(
            page.getByText("Software Engineer")
        ).toBeVisible();

    });

});