import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const entryPath = (path: string) => new URL(path, import.meta.url).pathname;

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        cv: entryPath("index.html"),
        edupower: entryPath("work/edupower/index.html"),
        methodology: entryPath("methodology/index.html"),
        tealab: entryPath("work/tealab/index.html"),
      },
    },
  },
  plugins: [react()],
});
