import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

function collectUnexpectedBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    errors.push(`page: ${error.message}`);
  });

  return errors;
}

test("loads the production build without unexpected browser errors", async ({
  page,
}) => {
  const errors = collectUnexpectedBrowserErrors(page);
  const response = await page.goto("/");

  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("primary fragment navigation reaches every declared target", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Primary" });
  const links = navigation.getByRole("link");
  const linkCount = await links.count();

  expect(linkCount).toBeGreaterThan(0);

  for (let index = 0; index < linkCount; index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute("href");

    expect(href).toMatch(/^#[a-z][a-z-]*$/);
    if (!href) {
      throw new Error("Primary navigation link is missing its target");
    }

    await link.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href)).toBeInViewport();
  }
});

test("shared disclosures expose and update accessible state", async ({
  page,
}) => {
  await page.goto("/");
  const disclosures = page.locator("button[aria-expanded][aria-controls]");
  const disclosureCount = await disclosures.count();

  expect(disclosureCount).toBeGreaterThan(0);

  for (let index = 0; index < disclosureCount; index += 1) {
    const disclosure = disclosures.nth(index);
    const controlledId = await disclosure.getAttribute("aria-controls");

    await expect(disclosure).toHaveAttribute("aria-expanded", "false");
    expect(controlledId).toBeTruthy();
    if (!controlledId) {
      throw new Error("Disclosure is missing aria-controls");
    }

    const details = page.locator(`[id=${JSON.stringify(controlledId)}]`);
    await expect(details).toBeHidden();
    await disclosure.press("Enter");
    await expect(disclosure).toHaveAttribute("aria-expanded", "true");
    await expect(disclosure).toHaveAccessibleName(/^Hide details for /);
    await expect(details).toBeVisible();
  }
});

test("color choices apply and persist", async ({ page }) => {
  await page.goto("/");

  const dark = page.getByRole("button", { name: "Dark" });

  await expect(dark).toHaveAttribute("aria-pressed", "false");
  await dark.click();
  await expect(dark).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
  await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("critical contact and external links remain usable", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('a[href^="mailto:"], a[href^="https://"]');
  const linkCount = await links.count();

  expect(linkCount).toBeGreaterThan(0);

  for (let index = 0; index < linkCount; index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute("href");

    await expect(link).toHaveAccessibleName(/\S/);
    expect(href).toMatch(/^(mailto:|https:\/\/).+/);
  }
});

test("has no serious or critical automated accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const unresolved = results.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );

  expect(
    unresolved,
    unresolved
      .map(
        (violation) =>
          `${violation.id}: ${violation.help} (${violation.nodes.length} node(s))`,
      )
      .join("\n"),
  ).toEqual([]);
});
