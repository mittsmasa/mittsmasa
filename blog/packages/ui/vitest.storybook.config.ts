import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { vrt } from "storybook-addon-vrt/vitest-plugin";
import { defineConfig, mergeConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [storybookTest({ storybookScript: "pnpm storybook --ci" }), vrt()],
    test: {
      name: "storybook",
      api: { host: "127.0.0.1", allowWrite: true },
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({ contextOptions: { reducedMotion: "reduce" } }),
        screenshotFailures: false,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
);
