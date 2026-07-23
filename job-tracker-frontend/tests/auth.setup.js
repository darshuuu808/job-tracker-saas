import { test, expect } from "@playwright/test";

test("authenticate", async ({ page }) => {

    await page.goto("/");

    await page.getByPlaceholder("you@example.com")
        .fill("darshan@test.com");

    await page.getByPlaceholder("Enter your password")
        .fill("123456");

    await page.getByRole("button", {
        name: "Login"
    }).click();

    // Wait until login finishes and redirects to the dashboard
    await expect(page).toHaveURL("/");

    await page.context().storageState({
        path: "playwright/.auth/user.json"
    });

});