/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../src/main/resources/static",
    watch: {
      include: "src/**",
      exclude: "node_modules/**, .git/**, dist/**, .vscode/**",
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@pages",
        replacement: path.resolve(path.join(__dirname, "/src/pages")),
      },
      {
        find: "@components",
        replacement: path.resolve(path.join(__dirname, "/src/components")),
      },
      {
        find: "@styles",
        replacement: path.resolve(path.join(__dirname, "/src/styles")),
      },
      {
        find: "@images",
        replacement: path.resolve(path.join(__dirname, "/public")),
      },
      {
        find: "@context",
        replacement: path.resolve(path.join(__dirname, "/src/context")),
      },
    ],
  },
});