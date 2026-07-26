import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const distDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const artifactPath = join(distDirectory, "work-profile.v1.json");
const sourcePath = fileURLToPath(
  new URL("../src/content/work-profile.ts", import.meta.url),
);
const expectedArtifactUrl = "https://mikko-finell.github.io/work-profile.v1.json";
const violations = [];
const artifactSource = await readFile(artifactPath, "utf8");
const canonicalSource = await readFile(sourcePath, "utf8");
let profile;

try {
  profile = JSON.parse(artifactSource);
} catch {
  violations.push("Work Profile artifact is not valid JSON");
}

if (profile) {
  const { contentDigest, ...profileContent } = profile;
  const digest = `sha256:${createHash("sha256")
    .update(JSON.stringify(profileContent))
    .digest("hex")}`;
  const expectedKeys = [
    "schema",
    "profileRevision",
    "provenance",
    "identity",
    "targetRoles",
    "capabilities",
    "technologySignals",
    "workPreferences",
    "evidenceReferences",
    "artifactUrl",
    "contentDigest",
  ];

  if (JSON.stringify(Object.keys(profile)) !== JSON.stringify(expectedKeys)) {
    violations.push("Work Profile artifact has unsupported top-level fields");
  }

  if (profile.schema !== "work-profile/v1" || profile.profileRevision !== 1) {
    violations.push("Work Profile artifact has an incorrect schema or revision");
  }

  if (profile.artifactUrl !== expectedArtifactUrl) {
    violations.push("Work Profile artifact has an incorrect public URL");
  }

  if (contentDigest !== digest) {
    violations.push("Work Profile artifact has an incorrect content digest");
  }

  if (
    profile.provenance?.canonicalContent?.join(",") !==
    "src/content/cv.ts,src/content/work-profile.ts"
  ) {
    violations.push("Work Profile artifact has incomplete provenance");
  }

  if (
    !Array.isArray(profile.identity?.languages) ||
    typeof profile.targetRoles?.primary !== "string" ||
    !Array.isArray(profile.targetRoles?.secondary) ||
    !Array.isArray(profile.targetRoles?.excluded) ||
    !Array.isArray(profile.capabilities?.primary) ||
    !Array.isArray(profile.capabilities?.supporting) ||
    !Array.isArray(profile.technologySignals?.search) ||
    !Array.isArray(profile.technologySignals?.context) ||
    typeof profile.workPreferences?.remoteOnly !== "boolean" ||
    !Array.isArray(profile.workPreferences?.workingHourRegions) ||
    profile.workPreferences?.engagementTypes !== "unrestricted" ||
    profile.workPreferences?.commitmentDuration !== "unrestricted" ||
    profile.workPreferences?.compensation !== "not-disclosed" ||
    !Array.isArray(profile.evidenceReferences)
  ) {
    violations.push("Work Profile artifact has an invalid profile shape");
  }

  const requiredStrings = [
    profile.identity?.name,
    profile.identity?.title,
    profile.identity?.location,
    profile.identity?.workEligibility,
    profile.targetRoles?.primary,
  ];
  const requiredStringArrays = [
    profile.targetRoles?.secondary,
    profile.targetRoles?.excluded,
    profile.capabilities?.primary,
    profile.capabilities?.supporting,
    profile.technologySignals?.search,
    profile.technologySignals?.context,
    profile.workPreferences?.workingHourRegions,
  ];

  if (
    requiredStrings.some(
      (value) => typeof value !== "string" || value.trim().length === 0,
    ) ||
    requiredStringArrays.some(
      (values) =>
        !Array.isArray(values) ||
        values.length === 0 ||
        values.some(
          (value) => typeof value !== "string" || value.trim().length === 0,
        ),
    ) ||
    !Array.isArray(profile.identity?.languages) ||
    profile.identity.languages.some(
      (language) =>
        typeof language?.name !== "string" ||
        language.name.trim().length === 0 ||
        typeof language?.proficiency !== "string" ||
        language.proficiency.trim().length === 0,
    ) ||
    !Array.isArray(profile.evidenceReferences) ||
    profile.evidenceReferences.some(
      (reference) =>
        typeof reference?.label !== "string" ||
        reference.label.trim().length === 0 ||
        typeof reference?.href !== "string" ||
        reference.href.trim().length === 0,
    )
  ) {
    violations.push("Work Profile artifact has incomplete profile values");
  }

  if (
    ["email", "introduction", "experience", "education"].some(
      (field) => field in profile,
    )
  ) {
    violations.push("Work Profile artifact exposes unsupported CV fields");
  }

  if (`${JSON.stringify(profile, null, 2)}\n` !== artifactSource) {
    violations.push("Work Profile artifact is not deterministically formatted");
  }
}

if (
  !canonicalSource.includes('import { cvContent } from "./cv";') ||
  canonicalSource.includes('name: "Mikko Finell"') ||
  canonicalSource.includes('location: "Finland"')
) {
  violations.push("Work Profile source must derive CV facts without duplicating them");
}

if (violations.length > 0) {
  console.error(
    `Work Profile output check failed:\n${violations.map((item) => `- ${item}`).join("\n")}`,
  );
  process.exitCode = 1;
} else {
  console.log("Work Profile output check passed.");
}
