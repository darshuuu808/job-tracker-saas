import { test, expect } from "@playwright/test";

test("theme toggle", async ({ page }) => {

    await page.goto("/");

    await page.getByTestId("theme-toggle").click();

    await expect(page.locator("html"))
        .toHaveClass(/dark/);

});