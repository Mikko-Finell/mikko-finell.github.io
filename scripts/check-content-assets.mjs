import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const contentDirectory = fileURLToPath(new URL("../src/content/", import.meta.url));
const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
const themedImagePattern =
  /!\[[^\]]*\]\((\/images\/[^\s)]+\.light\.[^\s)]+)(?:\s+[^)]*)?\)/g;
const missingVariants = [];

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

    try {
      await access(join(publicDirectory, darkSource.slice(1)));
    } catch {
      missingVariants.push(`${entry}: ${darkSource}`);
    }
  }
}

if (missingVariants.length > 0) {
  console.error(
    `Missing dark-theme image variant:\n${missingVariants.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Content asset check passed.");
}
