import { test, expect } from "@playwright/test";

test("language switching", async ({ page }) => {

    await page.goto("/");

    await page.getByLabel("Select language").click();

    await page.getByText("தமிழ்").click();

    await expect(
        page.getByText("வேலை கண்காணிப்பு டாஷ்போர்டு")
    ).toBeVisible();

});