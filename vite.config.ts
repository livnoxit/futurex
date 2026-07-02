import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
  },
  build: {
    target: "es2020",
    cssMinify: true,
    sourcemap: false,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "vendor-react",
              test: /node_modules\/react(?:-dom)?\//,
              priority: 30,
            },
            {
              name: "vendor-router",
              test: /node_modules\/react-router(?:-dom)?\//,
              priority: 25,
            },
            {
              name: "vendor-motion",
              test: /node_modules\/framer-motion\//,
              priority: 20,
            },
            {
              name: "vendor-form",
              test: /node_modules\/(react-hook-form|@hookform\/resolvers|zod)\//,
              priority: 15,
            },
            {
              name: "vendor-ui",
              test: /node_modules\/(lucide-react|sonner)\//,
              priority: 10,
            },
          ],
        },
        minify: {
          compress: {
            dropConsole: true,
            dropDebugger: true,
          },
        },
      },
    },
  },
});
