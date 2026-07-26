import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const distDirectory = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const outputPath = join(distDirectory, "Mikko-Finell-CV.pdf");
const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".png": "image/png",
};

function contentType(pathname) {
  const extension = pathname.slice(pathname.lastIndexOf("."));
  return contentTypes[extension] ?? "application/octet-stream";
}

function requestedFile(pathname) {
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const filePath = resolve(distDirectory, normalize(relativePath));

  if (!filePath.startsWith(`${distDirectory}/`)) {
    return null;
  }

  return filePath;
}

const server = createServer(async (request, response) => {
  const filePath = requestedFile(new URL(request.url ?? "/", "http://localhost").pathname);

  if (!filePath) {
    response.writeHead(403).end();
    return;
  }

  try {
    const file = await stat(filePath);

    if (!file.isFile()) {
      response.writeHead(404).end();
      return;
    }

    response.writeHead(200, { "Content-Type": contentType(filePath) });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolveServer) => server.listen(0, "127.0.0.1", resolveServer));

try {
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("PDF server did not expose a local port");
  }

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    const response = await page.goto(`http://127.0.0.1:${address.port}/`, {
      waitUntil: "networkidle",
    });

    if (!response?.ok()) {
      throw new Error("PDF source page did not load successfully");
    }

    await page.locator("main").waitFor();
    await page.pdf({
      format: "A4",
      outline: true,
      path: outputPath,
      preferCSSPageSize: true,
      printBackground: true,
      tagged: true,
    });
  } finally {
    await browser.close();
  }
} finally {
  await new Promise((resolveServer) => server.close(resolveServer));
}
