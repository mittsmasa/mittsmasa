import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { postsPlugin } from "./build/posts-plugin.ts";

const imagesProxy = {
  "/images": { target: "https://mittsmasa-blog.mitts-3be.workers.dev", changeOrigin: true },
};

export default defineConfig({
  plugins: [pandacss({ transform: true, codegen: false }), react(), postsPlugin()],
  server: { proxy: imagesProxy },
  preview: { proxy: imagesProxy },
  build: {
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
});
