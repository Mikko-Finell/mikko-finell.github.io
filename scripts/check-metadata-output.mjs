import { readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const siteOrigin = "https://mikko-finell.github.io";
const socialPreviewUrl = `${siteOrigin}/social-preview.png`;
const pages = [
  { href: "/", canonicalUrl: `${siteOrigin}/` },
  { href: "/methodology/", canonicalUrl: `${siteOrigin}/methodology/` },
  { href: "/work/edupower/", canonicalUrl: `${siteOrigin}/work/edupower/` },
  { href: "/work/tealab/", canonicalUrl: `${siteOrigin}/work/tealab/` },
];
const violations = [];
const titles = new Set();
const descriptions = new Set();

function outputPath(href) {
  return href === "/"
    ? join(distDirectory, "index.html")
    : join(distDirectory, href.slice(1), "index.html");
}

function headMarkup(document) {
  return document.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
}

function contentValue(head, attribute, name) {
  const expression = new RegExp(
    `<meta\\s+${attribute}="${name}"\\s+content="([^"]*)"\\s*\\/>`,
  );
  return head.match(expression)?.[1];
}

function expectValue(value, expectation, message) {
  if (!expectation(value)) {
    violations.push(message);
  }
}

for (const page of pages) {
  const document = await readFile(outputPath(page.href), "utf8");
  const head = headMarkup(document);
  const title = head.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = contentValue(head, "name", "description");

  expectValue(title, (value) => Boolean(value), `${page.href} is missing a title`);
  expectValue(
    description,
    (value) => Boolean(value),
    `${page.href} is missing a description`,
  );
  if (title) {
    titles.add(title);
  }
  if (description) {
    descriptions.add(description);
  }
  expectValue(
    head.includes(`<link rel="canonical" href="${page.canonicalUrl}" />`),
    Boolean,
    `${page.href} has an incorrect canonical URL`,
  );

  for (const [attribute, name, expected] of [
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", page.canonicalUrl],
    ["property", "og:image", socialPreviewUrl],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", socialPreviewUrl],
  ]) {
    expectValue(
      contentValue(head, attribute, name),
      (value) => value === expected,
      `${page.href} has incorrect ${name} metadata`,
    );
  }

  expectValue(
    contentValue(head, "property", "og:type"),
    (value) => value === "website",
    `${page.href} has incorrect og:type metadata`,
  );
  expectValue(
    contentValue(head, "name", "twitter:card"),
    (value) => value === "summary_large_image",
    `${page.href} has incorrect twitter:card metadata`,
  );

  expectValue(
    head.includes('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'),
    Boolean,
    `${page.href} is missing the favicon`,
  );
  expectValue(
    head.includes('<meta name="color-scheme" content="light dark" />'),
    Boolean,
    `${page.href} is missing color-scheme metadata`,
  );
}

if (titles.size !== pages.length || descriptions.size !== pages.length) {
  violations.push("page titles and descriptions must be unique per route");
}

const cvDocument = await readFile(outputPath("/"), "utf8");
const structuredData = headMarkup(cvDocument).match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
)?.[1];

try {
  const profilePage = JSON.parse(structuredData ?? "");
  const person = profilePage.mainEntity;

  if (
    profilePage["@type"] !== "ProfilePage" ||
    person?.["@type"] !== "Person" ||
    person.name !== "Mikko Finell" ||
    person.jobTitle !== "AI-First Software Architect / Full-Stack Developer" ||
    person.homeLocation?.name !== "Finland" ||
    JSON.stringify(person.sameAs) !==
      JSON.stringify([
        "https://github.com/mikko-finell",
        "https://www.linkedin.com/in/mikko-finell",
      ])
  ) {
    violations.push("CV structured profile data does not match visible identity facts");
  }
} catch {
  violations.push("CV structured profile data is not valid JSON");
}

for (const page of pages.slice(1)) {
  const document = await readFile(outputPath(page.href), "utf8");

  if (headMarkup(document).includes('type="application/ld+json"')) {
    violations.push(`${page.href} includes profile structured data intended for the CV`);
  }
}

if (violations.length > 0) {
  console.error(
    `Metadata output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Metadata output check passed.");
}
