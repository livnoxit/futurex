import { writeFileSync } from "node:fs";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-cache, no-store, must-revalidate",
  Pragma: "no-cache",
  Expires: "0",
} as const;

function applyNoCacheHeaders(
  req: { url?: string },
  res: { setHeader: (name: string, value: string) => void },
  next: () => void,
) {
  const url = req.url?.split("?")[0] ?? "";
  if (url === "/" || url === "/index.html") {
    for (const [name, value] of Object.entries(NO_CACHE_HEADERS)) {
      res.setHeader(name, value);
    }
  }
  next();
}

function noCacheIndexHtmlPlugin(): Plugin {
  return {
    name: "no-cache-index-html",
    configureServer(server) {
      server.middlewares.use(applyNoCacheHeaders);
    },
    configurePreviewServer(server) {
      server.middlewares.use(applyNoCacheHeaders);
    },
    closeBundle() {
      const distDir = join(import.meta.dirname, "dist");
      const noCacheBlock = Object.entries(NO_CACHE_HEADERS)
        .map(([name, value]) => `  ${name}: ${value}`)
        .join("\n");

      writeFileSync(
        join(distDir, "_headers"),
        `# Hashed assets — long cache
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# SPA entry — never cache
/index.html
${noCacheBlock}

/
${noCacheBlock}
`,
        "utf8",
      );

      writeFileSync(
        join(distDir, "index.html.cache-control"),
        NO_CACHE_HEADERS["Cache-Control"],
        "utf8",
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), noCacheIndexHtmlPlugin()],
  server: {
    host: true,
    port: 5175,
  },
});
