import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("queue, evidence and exact simulated decision persist through refresh", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Work in focus" })).toBeVisible();
  await expect(page.getByText("25% of tasks completed")).toBeVisible();
  await page.getByRole("button", { name: "Work queue", exact: true }).click();
  await page.getByLabel("Search work").fill("no match");
  await expect(page.getByRole("heading", { name: "No matching work" })).toBeVisible();
  await page.getByLabel("Search work").fill("SYN-003");
  await page.getByRole("button", { name: "Open SYN-003: Review receipt layout" }).click();
  await expect(page.getByText("Blocked by SYN-002", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Evidence", exact: true }).click();
  await page.getByRole("button", { name: /SYN-EVD-002/ }).click();
  await expect(page.getByText(/Illustrative fixture: 8 of 8/)).toBeVisible();
  await page.getByRole("button", { name: "Approvals", exact: false }).first().click();
  await expect(page.getByText("synthetic-commit-7c21e90", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Simulate approval", exact: true }).click();
  await expect(page.getByRole("button", { name: "Record demo decision" })).toBeDisabled();
  await page.getByLabel("Decision rationale").fill("Checked the exact synthetic evidence and target");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Record demo decision" }).click();
  await expect(page.getByRole("heading", { name: "No pending approvals" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "No pending approvals" })).toBeVisible();
  await page.getByRole("button", { name: "Audit", exact: true }).click();
  await expect(page.getByText(/Simulated approved: SYN-APR-001/)).toBeVisible();
});

test("responsive screens have no overflow or automated WCAG A/AA violations", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Work in focus" })).toBeVisible();
    for (const view of ["Overview", "Projects", "Work queue", "Active run", "Approvals", "Team", "Capabilities", "Evidence", "Audit", "Improvements", "Settings"]) {
      await page.getByRole("navigation").getByRole("button", { name: view, exact: view !== "Approvals" }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations, `${view} at ${width}px`).toEqual([]);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1050 });
  await page.getByRole("button", { name: "Overview", exact: true }).click();
  await page.screenshot({ path: "../../.cache/ui-001-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "../../.cache/ui-001-mobile.png", fullPage: true });
});

test("keyboard skip link, loading, service failure and retry are usable", async ({ page }) => {
  let release: () => void = () => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/trpc/**", async route => { await gate; await route.continue(); });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Loading your demo workspace…" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to workspace" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  release();
  await expect(page.getByRole("heading", { name: "Work in focus" })).toBeVisible();
  await page.unroute("**/api/trpc/**");
  await page.route("**/api/trpc/**", route => route.fulfill({ status: 503, body: "Synthetic service failure" }));
  await page.getByRole("button", { name: "Refresh desk" }).click();
  await expect(page.getByRole("heading", { name: "The desk could not refresh." })).toBeVisible();
  await page.unroute("**/api/trpc/**");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("heading", { name: "The desk could not refresh." })).toHaveCount(0);
});
