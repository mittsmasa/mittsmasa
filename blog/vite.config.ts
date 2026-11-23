import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    projects: ["apps/*", "packages/*"],
  },
  lint: {
    jsPlugins: ["./lint-plugins/no-comments.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "unicorn/filename-case": ["error", { case: "kebabCase" }],
      "blog/no-comments": "error",
    },
  },
});
