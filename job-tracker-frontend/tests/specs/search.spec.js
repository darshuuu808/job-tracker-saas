import { test, expect } from "@playwright/test";

test("should search applications", async ({ page }) => {

    await page.goto("/");

    await page.getByTestId("search-input")
        .fill("Google");

    await expect(
        page.getByText("Google")
    ).toBeVisible();

});