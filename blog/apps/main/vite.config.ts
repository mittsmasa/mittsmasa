import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { postsPlugin } from "./build/postsPlugin.ts";

export default defineConfig({
  plugins: [react(), postsPlugin()],
});
