import { access, readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const contentDirectory = fileURLToPath(new URL("../src/content/", import.meta.url));
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const themedImagePattern =
  /!\[[^\]]*\]\((\/images\/[^\s)]+\.light\.[^\s)]+)(?:\s+[^)]*)?\)/g;
const missingVariants = [];
const missingResponsiveVariants = [];
const publicDotfiles = [];

async function collectDotfiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);

    if (entry.name.startsWith(".")) {
      publicDotfiles.push(entryPath);
    }

    if (entry.isDirectory()) {
      await collectDotfiles(entryPath);
    }
  }
}

await collectDotfiles(publicDirectory);

for (const entry of await readdir(contentDirectory)) {
  if (!entry.endsWith(".md")) {
    continue;
  }

  const sourcePath = join(contentDirectory, entry);
  const source = await readFile(sourcePath, "utf8");

  for (const match of source.matchAll(themedImagePattern)) {
    const lightSource = match[1];

    if (!lightSource) {
      continue;
    }

    const darkSource = lightSource.replace(".light.", ".dark.");
    const responsiveSources = [
      lightSource.replace(".png", ".768.webp"),
      lightSource.replace(".png", ".1536.webp"),
      darkSource.replace(".png", ".768.webp"),
      darkSource.replace(".png", ".1536.webp"),
    ];

    try {
      await access(join(publicDirectory, darkSource.slice(1)));
    } catch {
      missingVariants.push(`${entry}: ${darkSource}`);
    }

    for (const responsiveSource of responsiveSources) {
      try {
        const details = await stat(
          join(publicDirectory, responsiveSource.slice(1)),
        );

        if (details.size === 0) {
          missingResponsiveVariants.push(`${entry}: ${responsiveSource}`);
        }
      } catch {
        missingResponsiveVariants.push(`${entry}: ${responsiveSource}`);
      }
    }
  }
}

if (missingVariants.length > 0) {
  console.error(
    `Missing dark-theme image variant:\n${missingVariants.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else if (missingResponsiveVariants.length > 0) {
  console.error(
    `Missing responsive WebP image variant:\n${missingResponsiveVariants.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else if (publicDotfiles.length > 0) {
  console.error(
    `Public assets must not include dotfiles:\n${publicDotfiles.map((path) => `- ${path}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Content asset check passed.");
}
