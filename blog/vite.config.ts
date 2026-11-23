import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    // パッケージごとの vite.config.ts（プラグインを含む）でテストを走らせる
    projects: ["apps/*", "packages/*"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      // ファイル名はケバブケースにそろえる
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
    },
  },
});
