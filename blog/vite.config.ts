import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    // アプリごとの vite.config.ts（プラグインを含む）でテストを走らせる
    projects: ["apps/*"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
