import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import {
  primaryNavigation,
  siteRoutes,
  type SiteRouteId,
} from "../src/site/routes";

const pages = primaryNavigation.map((id) => ({ id, ...siteRoutes[id] }));

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

for (const sitePage of pages) {
  test(`${sitePage.href} loads directly with valid document semantics`, async ({
    page,
  }) => {
    const errors = collectUnexpectedBrowserErrors(page);
    const response = await page.goto(sitePage.href);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const header = page.getByRole("banner");
    await expect(
      header.getByText("AI-First Software Architect / Full-Stack Developer", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(header.getByText("Finland", { exact: true })).toBeVisible();
    await expect(
      header.getByRole("link", { name: "mikko.finell@gmail.com" }),
    ).toBeVisible();
    expect(errors).toEqual([]);

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

  test(`${sitePage.href} exposes canonical global navigation`, async ({
    page,
  }) => {
    await page.goto(sitePage.href);
    const links = page.getByRole("navigation", { name: "Primary" }).getByRole("link");

    await expect(links).toHaveCount(primaryNavigation.length);
    expect(await links.evaluateAll((items) => items.map((item) => item.getAttribute("href")))).toEqual(
      primaryNavigation.map((id) => siteRoutes[id].href),
    );

    for (const routeId of primaryNavigation) {
      const link = links.filter({ hasText: siteRoutes[routeId].label });

      if (routeId === sitePage.id) {
        await expect(link).toHaveAttribute("aria-current", "page");
      } else {
        await expect(link).not.toHaveAttribute("aria-current", "page");
      }
    }

    const destination = sitePage.id === "cv" ? "methodology" : "cv";
    await links.filter({ hasText: siteRoutes[destination].label }).click();
    await expect(page).toHaveURL(new RegExp(`${siteRoutes[destination].href}$`));
  });
}

test("theme preference persists across page navigation and reload", async ({
  page,
}) => {
  await page.goto(siteRoutes.cv.href);
  await page.getByRole("button", { name: "Dark" }).click();
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: siteRoutes.methodology.label })
    .click();

  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
  await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("CV exposes compact content and supporting-page links without disclosures", async ({
  page,
}) => {
  await page.goto(siteRoutes.cv.href);

  await expect(page.locator("details, summary, [aria-expanded]")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Working methodology" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Delivery" })).toHaveCount(0);
  await expect(page.getByText("The degree remains incomplete", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "Print / Save as PDF" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: /Edupower account/ })).toHaveCount(2);
  await expect(page.getByRole("link", { name: /Tealab case study/ })).toHaveAttribute(
    "href",
    siteRoutes.tealab.href,
  );
});

test("methodology page presents the complete topics without disclosures", async ({
  page,
}) => {
  await page.goto(siteRoutes.methodology.href);

  await expect(page.getByRole("heading", { level: 1, name: "Working methodology" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Delivery" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Application UI design" })).toBeVisible();
  await expect(page.locator("details, summary, [aria-expanded]")).toHaveCount(0);
});

for (const routeId of ["edupower", "tealab"] as const satisfies readonly SiteRouteId[]) {
  test(`${siteRoutes[routeId].href} is a safe work placeholder`, async ({ page }) => {
    await page.goto(siteRoutes[routeId].href);

    await expect(page.getByRole("heading", { level: 1, name: siteRoutes[routeId].label })).toBeVisible();
    await expect(page.getByText("Case study in preparation.", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional experience" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Working methodology" })).toHaveCount(0);
  });
}

test("print media keeps CV content and hides website controls", async ({ page }) => {
  await page.goto(siteRoutes.cv.href);
  await page.emulateMedia({ media: "print" });

  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
  await expect(page.getByRole("group", { name: "Mode" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Print / Save as PDF" })).toBeHidden();
  await expect(page.getByRole("link", { name: /Edupower account/ }).first()).toBeHidden();
  await expect(page.getByRole("heading", { level: 1, name: "Mikko Finell" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Professional experience" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Working methodology" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Education and relevant background" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Contact", exact: true }),
  ).toBeVisible();
});
