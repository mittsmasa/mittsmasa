import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    // パッケージごとの vite.config.ts（プラグインを含む）でテストを走らせる
    projects: ["apps/*", "packages/*"],
  },
  lint: {
    // plugins を書くと Oxlint の既定の一覧を置き換えるので、既定の 4 つを明記する
    plugins: ["eslint", "typescript", "unicorn", "oxc"],
    jsPlugins: ["./lint/panda.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      // ファイル名はケバブケースにそろえる
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "panda/no-escape-hatch": "error",
    },
    // overrides の plugins は、上の plugins に足される
    overrides: [
      {
        files: ["apps/**", "packages/ui/**"],
        plugins: ["react"],
      },
      {
        files: ["**/*.test.{ts,tsx}"],
        plugins: ["vitest"],
      },
    ],
  },
});
