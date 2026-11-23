import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { vrt } from "storybook-addon-vrt/vitest-plugin";
import { defineConfig, mergeConfig } from "vite-plus";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [storybookTest({ storybookScript: "pnpm storybook --ci" }), vrt()],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        api: { host: "127.0.0.1", allowWrite: true },
        screenshotFailures: false,
        instances: [{ browser: "chromium", context: { reducedMotion: "reduce" } }],
      },
    },
  }),
);
