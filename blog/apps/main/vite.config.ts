import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { postsPlugin } from "./build/posts-plugin.ts";

export default defineConfig({
  plugins: [pandacss({ transform: true, codegen: false }), react(), postsPlugin()],
  build: {
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
});
