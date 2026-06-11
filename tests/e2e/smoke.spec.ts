import { test, expect } from "@playwright/test";

const email = process.env.TEST_ADMIN_EMAIL ?? "";
const password = process.env.TEST_ADMIN_PASSWORD ?? "";

test.describe("epos-admin browser smoke", () => {
  test("login page renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  test.skip(!email || !password, "requires TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD");

  test("admin login redirects to dashboard", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole("button", { name: /sign in|log in|login/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30_000 });
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("key admin pages load", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole("button", { name: /sign in|log in|login/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 30_000 });

    for (const route of [
      "/dashboard",
      "/dashboard/businesses",
      "/dashboard/revenue",
    ]) {
      const response = await page.goto(route);
      expect(response?.status() ?? 0).toBeLessThan(500);
    }
  });
});
