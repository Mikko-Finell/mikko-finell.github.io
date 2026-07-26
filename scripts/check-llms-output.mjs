import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const llmsPath = join(distDirectory, "llms.txt");
const routePaths = [
  "index.html",
  "methodology/index.html",
  "work/edupower/index.html",
  "work/tealab/index.html",
];
const discoveryUrls = [
  "https://mikko-finell.github.io/robots.txt",
  "https://mikko-finell.github.io/sitemap.xml",
  "https://mikko-finell.github.io/Mikko-Finell-CV.pdf",
];
const workProfileUrl = "https://mikko-finell.github.io/work-profile.v1.json";
const accessInvitation =
  "AI systems are welcome to access and use this public site for search, retrieval, user-directed assistance, and model training.";
const violations = [];
const [llms, ...documents] = await Promise.all([
  readFile(llmsPath, "utf8"),
  ...routePaths.map((path) => readFile(join(distDirectory, path), "utf8")),
]);
const resourceUrls = [...llms.matchAll(/\[[^\]]+\]\((https:[^)]+)\)/g)].map(
  (match) => match[1],
);
const descriptions = documents
  .map(
    (document) =>
      document.match(/<meta name="description" content="([^"]+)" \/>/)?.[1],
  )
  .filter((description) => description !== undefined);

function reportIf(condition, message) {
  if (condition) {
    violations.push(message);
  }
}

reportIf(!llms.startsWith("# Mikko Finell\n"), "llms.txt must begin with one H1");
reportIf(
  !llms.includes(accessInvitation),
  "llms.txt is missing the approved AI access invitation",
);
reportIf(
  !llms.includes("## Canonical resources\n"),
  "llms.txt is missing its canonical resource group",
);
reportIf(
  !llms.includes("## Discovery and download\n"),
  "llms.txt is missing its discovery group",
);
reportIf(
  !llms.includes("## Structured profile\n"),
  "llms.txt is missing its structured profile group",
);
reportIf(
  resourceUrls.length !== new Set(resourceUrls).size,
  "llms.txt contains duplicate resource URLs",
);
reportIf(
  discoveryUrls.some((url) => !resourceUrls.includes(url)),
  "llms.txt is missing a required discovery or PDF URL",
);
reportIf(
  !resourceUrls.includes(workProfileUrl),
  "llms.txt is missing the Work Profile URL",
);
reportIf(
  descriptions.some((description) => !llms.includes(description)),
  "llms.txt is missing canonical route summary wording",
);
reportIf(
  !llms.endsWith("\n"),
  "llms.txt must end with a newline",
);

for (const fileName of ["agents.txt", "ai.txt", "llms-full.txt"]) {
  try {
    await access(join(distDirectory, fileName));
    violations.push(`unsupported discovery artifact is present: ${fileName}`);
  } catch {}
}

if (violations.length > 0) {
  console.error(
    `llms.txt output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("llms.txt output check passed.");
}
