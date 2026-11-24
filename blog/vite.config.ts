import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  test: {
    projects: ["apps/*", "packages/*", "lint-plugins"],
  },
  lint: {
    plugins: ["eslint", "typescript", "unicorn", "oxc"],
    jsPlugins: ["./lint-plugins/no-comments.ts", "./lint-plugins/panda.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "blog/no-comments": "error",
      "panda/no-escape-hatch": "error",
    },
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
