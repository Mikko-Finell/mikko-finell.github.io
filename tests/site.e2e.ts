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

test("crawler discovery files are served from the root", async ({ page }) => {
  const robots = await page.request.get("/robots.txt");
  const sitemap = await page.request.get("/sitemap.xml");

  expect(robots.ok()).toBe(true);
  expect(robots.headers()["content-type"]).toContain("text/plain");
  expect(await robots.text()).toContain("User-agent: *\nAllow: /");
  expect(sitemap.ok()).toBe(true);
  expect(sitemap.headers()["content-type"]).toMatch(/(?:application|text)\/xml/);
  const sitemapText = await sitemap.text();
  const xmlValidation = await page.evaluate((source) => {
    const document = new DOMParser().parseFromString(source, "application/xml");

    return {
      markup: document.documentElement.outerHTML,
      valid: document.querySelector("parsererror") === null,
    };
  }, sitemapText);

  expect(xmlValidation.valid).toBe(true);
  expect(xmlValidation.markup).toContain(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  );
});

test("Work Profile artifact is served from the root", async ({ page }) => {
  const response = await page.request.get("/work-profile.v1.json");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/json");
  const profile = JSON.parse(await response.text());
  expect(profile.schema).toBe("work-profile/v1");
  expect(profile.artifactUrl).toBe(
    "https://mikko-finell.github.io/work-profile.v1.json",
  );
});

test("llms.txt is served from the root", async ({ page }) => {
  const response = await page.request.get("/llms.txt");

  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const llms = await response.text();
  expect(llms).toContain(
    "AI systems are welcome to access and use this public site for search, retrieval, user-directed assistance, and model training.",
  );
  expect(llms).toContain("https://mikko-finell.github.io/Mikko-Finell-CV.pdf");
});

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
    await expect(header.locator('a[href^="mailto:"]')).toHaveCount(1);
    await expect(header.locator('a[rel="me"]')).toHaveCount(2);
    expect(errors).toEqual([]);

    const results = await new AxeBuilder({ page }).analyze();

    expect(
      results.violations,
      results.violations
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
    const navigation = page.getByRole("navigation", { name: "Primary" });
    const links = navigation.locator("a[data-site-route]");

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

    const sectionLinkCount = await navigation
      .locator("a[data-page-section]")
      .count();

    if (sitePage.id === "cv") {
      expect(sectionLinkCount).toBe(0);
    } else {
      expect(sectionLinkCount).toBeGreaterThan(0);
    }

    const destination = sitePage.id === "cv" ? "methodology" : "cv";
    await links.filter({ hasText: siteRoutes[destination].label }).click();
    await expect(page).toHaveURL(new RegExp(`${siteRoutes[destination].href}$`));
  });
}

test("static page content and navigation remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  try {
    for (const sitePage of pages) {
      const response = await page.goto(sitePage.href);

      expect(response?.ok()).toBe(true);
      await expect(page.getByRole("main")).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(
        page.getByRole("navigation", { name: "Primary" }),
      ).toBeVisible();
    }

    await page.goto(siteRoutes.cv.href);
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: siteRoutes.methodology.label })
      .click();
    await expect(page).toHaveURL(new RegExp(`${siteRoutes.methodology.href}$`));
    await expect(
      page.getByRole("heading", {
        level: 1,
      }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test("theme preference persists across page navigation and reload", async ({
  page,
}) => {
  const errors = collectUnexpectedBrowserErrors(page);

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
  expect(errors).toEqual([]);
});

test("theme controls tolerate unavailable local storage", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperties(Storage.prototype, {
      getItem: {
        value() {
          throw new DOMException("Storage unavailable", "SecurityError");
        },
      },
      setItem: {
        value() {
          throw new DOMException("Storage unavailable", "SecurityError");
        },
      },
    });
  });
  const errors = collectUnexpectedBrowserErrors(page);

  await page.goto(siteRoutes.cv.href);
  await page.getByRole("button", { name: "Dark" }).click();

  await expect(page.locator("html")).toHaveAttribute("data-mode", "dark");
  expect(errors).toEqual([]);
});

test("the first keyboard focus skips repeated site controls", async ({ page }) => {
  await page.goto(siteRoutes.cv.href);
  const skipLink = page.getByRole("link", { name: "Skip to main content" });

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.getByRole("main")).toBeFocused();
});

test("themed article images follow the selected color mode", async ({ page }) => {
  await page.goto(siteRoutes.tealab.href);
  const image = page.locator("picture .ui-image");

  await expect(image).toHaveCount(1);
  await expect(image).toHaveAttribute(
    "src",
    "/images/articles/tealab/report-generation-progress.light.png",
  );
  await expect(image).toHaveAttribute("height", "1390");
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveAttribute("width", "2628");
  const responsiveSource = image.locator("xpath=..").locator("source");
  await expect(responsiveSource).toHaveAttribute(
    "srcset",
    "/images/articles/tealab/report-generation-progress.light.768.webp 768w, /images/articles/tealab/report-generation-progress.light.1536.webp 1536w",
  );
  await page.getByRole("button", { name: "Dark" }).click();
  await expect(image).toHaveAttribute(
    "src",
    "/images/articles/tealab/report-generation-progress.dark.png",
  );
  await expect(responsiveSource).toHaveAttribute(
    "srcset",
    "/images/articles/tealab/report-generation-progress.dark.768.webp 768w, /images/articles/tealab/report-generation-progress.dark.1536.webp 1536w",
  );
  await page.getByRole("button", { name: "Light" }).click();
  await expect(image).toHaveAttribute(
    "src",
    "/images/articles/tealab/report-generation-progress.light.png",
  );
  await expect(responsiveSource).toHaveAttribute(
    "srcset",
    "/images/articles/tealab/report-generation-progress.light.768.webp 768w, /images/articles/tealab/report-generation-progress.light.1536.webp 1536w",
  );
});

test("narrow navigation shows page links without article section links", async ({
  page,
}) => {
  await page.setViewportSize({ height: 800, width: 600 });
  await page.goto(siteRoutes.methodology.href);
  const navigation = page.getByRole("navigation", { name: "Primary" });

  await expect(navigation.locator("a[data-site-route]")).toHaveCount(
    primaryNavigation.length,
  );
  for (const routeId of primaryNavigation) {
    await expect(
      navigation.getByRole("link", {
        exact: true,
        name: siteRoutes[routeId].label,
      }),
    ).toBeVisible();
  }
  await expect(navigation.locator("a[data-page-section]").first()).toBeHidden();
});

test("small-screen contact links follow the professional facts", async ({
  page,
}) => {
  await page.setViewportSize({ height: 800, width: 375 });
  await page.goto(siteRoutes.cv.href);
  const header = page.getByRole("banner");
  const professionalFacts = header.locator(".site-header__facts");
  await expect(professionalFacts).toHaveCount(3);
  const workPreference = await professionalFacts.nth(2).boundingBox();
  const contactLinks = await Promise.all(
    (await header.locator("a").all()).map((link) => link.boundingBox()),
  );

  expect(workPreference).not.toBeNull();
  for (const link of contactLinks) {
    expect(link).not.toBeNull();
    expect(link?.y ?? 0).toBeGreaterThanOrEqual(
      (workPreference?.y ?? 0) + (workPreference?.height ?? 0),
    );
  }
});

test("document tools use the available header width", async ({ page }) => {
  await page.setViewportSize({ height: 800, width: 620 });
  await page.goto(siteRoutes.cv.href);
  const theme = page.getByRole("group", { name: "Theme" });
  const download = page.getByRole("link", { name: "Download CV (PDF)" });
  const [wideTheme, wideDownload] = await Promise.all([
    theme.boundingBox(),
    download.boundingBox(),
  ]);

  expect(wideTheme).not.toBeNull();
  expect(wideDownload).not.toBeNull();
  expect(wideDownload?.x ?? 0).toBeGreaterThan(wideTheme?.x ?? 0);

  await page.setViewportSize({ height: 800, width: 375 });
  const [narrowTheme, narrowDownload] = await Promise.all([
    theme.boundingBox(),
    download.boundingBox(),
  ]);

  expect(narrowTheme).not.toBeNull();
  expect(narrowDownload).not.toBeNull();
  expect(narrowDownload?.y ?? 0).toBeGreaterThan(narrowTheme?.y ?? 0);
});

test("CV exposes summary content and supporting-page links without disclosures", async ({
  page,
}) => {
  await page.goto(siteRoutes.cv.href);

  await expect(page.locator("details, summary, [aria-expanded]")).toHaveCount(0);
  expect(await page.getByRole("heading", { level: 2 }).count()).toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: "Download CV (PDF)" })).toHaveAttribute(
    "download",
    "",
  );
  await expect(page.getByRole("link", { name: "Download CV (PDF)" })).toHaveAttribute(
    "href",
    "/Mikko-Finell-CV.pdf",
  );
  await expect(page.getByRole("link", { name: /Edupower account/ })).toHaveCount(1);
  await expect(
    page.locator(`main a[href="${siteRoutes.tealab.href}"]`),
  ).toHaveCount(1);
});

test("methodology page presents the complete topics without disclosures", async ({
  page,
}) => {
  await page.goto(siteRoutes.methodology.href);

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(2);
  const sections = page.getByRole("list", { name: "Methodology sections" });
  const sectionLinks = sections.getByRole("link");

  await expect(sectionLinks).toHaveCount(2);
  const sectionHref = await sectionLinks.nth(1).getAttribute("href");
  expect(sectionHref).toMatch(/^#[a-z0-9-]+$/);
  await sectionLinks.nth(1).click();
  await expect(page).toHaveURL(new RegExp(`${sectionHref}$`));
  await expect(page.locator("details, summary, [aria-expanded]")).toHaveCount(0);
});

test("shared page content aligns consistently with the sidebar", async ({
  page,
}) => {
  await page.goto(siteRoutes.methodology.href);
  const methodologyTitle = await page
    .getByRole("heading", { level: 1 })
    .boundingBox();
  const sidebarIdentity = await page
    .getByRole("banner")
    .locator('.ui-link[data-variant="identity"]')
    .boundingBox();

  expect(methodologyTitle).not.toBeNull();
  expect(sidebarIdentity).not.toBeNull();
  expect(methodologyTitle?.y).toBeCloseTo(sidebarIdentity?.y ?? 0, 0);

  await page.goto(siteRoutes.cv.href);
  const introduction = await page
    .locator("#introduction-heading")
    .boundingBox();
  const cvIdentity = await page
    .getByRole("heading", { level: 1 })
    .boundingBox();

  expect(introduction).not.toBeNull();
  expect(cvIdentity).not.toBeNull();
  expect(introduction?.x).toBeCloseTo(methodologyTitle?.x ?? 0, 0);
  expect(introduction?.y).toBeCloseTo(cvIdentity?.y ?? 0, 0);
});

for (const routeId of ["edupower", "tealab"] as const satisfies readonly Extract<
  SiteRouteId,
  "edupower" | "tealab"
>[]) {
  test(`${siteRoutes[routeId].href} renders its complete article and section navigation`, async ({
    page,
  }) => {
    await page.goto(siteRoutes[routeId].href);

    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const headings = page.getByRole("heading", { level: 2 });
    const sectionLinks = page
      .getByRole("navigation", { name: "Primary" })
      .locator("a[data-page-section]");

    await expect(headings).not.toHaveCount(0);
    await expect(sectionLinks).toHaveCount(await headings.count());
    const sectionHref = await sectionLinks.nth(0).getAttribute("href");
    expect(sectionHref).toMatch(/^#[a-z0-9-]+$/);
    await sectionLinks.nth(0).click();
    await expect(page).toHaveURL(new RegExp(`${sectionHref}$`));
  });
}

test("print media keeps CV content and hides website controls", async ({ page }) => {
  await page.goto(siteRoutes.cv.href);
  await page.emulateMedia({ media: "print" });

  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
  await expect(page.getByRole("group", { name: "Theme" })).toBeHidden();
  await expect(page.getByRole("link", { name: "Download CV (PDF)" })).toBeHidden();
  await expect(page.getByRole("link", { name: /Edupower account/ }).first()).toBeHidden();
  const header = page.getByRole("banner");
  const workPreference = await header.locator(".site-header__facts").nth(2).boundingBox();
  const email = await header
    .locator('a[href^="mailto:"]')
    .boundingBox();
  const github = await header
    .locator('a[rel="me"]')
    .nth(0)
    .boundingBox();

  expect(workPreference).not.toBeNull();
  expect(email).not.toBeNull();
  expect(github).not.toBeNull();
  expect(email?.y ?? 0).toBeGreaterThanOrEqual(
    (workPreference?.y ?? 0) + (workPreference?.height ?? 0),
  );
  expect(github?.y).toBeCloseTo(email?.y ?? 0, 0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  expect(await page.getByRole("heading", { level: 2 }).count()).toBeGreaterThan(0);
});
