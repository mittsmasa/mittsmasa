import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { vrt } from "storybook-addon-vrt/vitest-plugin";
import { defineConfig, mergeConfig } from "vite-plus";
// 中身は @vitest/browser-playwright の再エクスポート。vite-plus では optional peer なので、
// package.json の devDependencies に入れてある @vitest/browser-playwright を外さない
import { playwright } from "vite-plus/test/browser-playwright";
import viteConfig from "./vite.config.ts";

// ストーリーをブラウザで描くテストと、storybook-addon-vrt の撮影。
// blog/vite.config.ts の test.projects には入れない。入れると、CI の `vp test` が Chromium を要求するため。
// `svrt run -- --config vitest.storybook.config.ts` で走らせる
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      // configDir は既定の .storybook（このパッケージで Vitest を起動する前提）
      storybookTest({ storybookScript: "pnpm storybook --ci" }),
      vrt(),
    ],
    test: {
      // svrt は `--project storybook` を付けて Vitest を呼ぶ
      name: "storybook",
      // storybook-addon-vrt は、ブラウザから Vitest の API サーバー経由で PNG を書く。
      // @storybook/addon-vitest は、ここで明示しないと書き込みを止める（configureVitest で allowWrite を false にする）。
      // サーバーはループバックだけで待ち受け、コマンドの実行（allowExec）は許可しない。
      // Vitest 5 では browser.api ではなく、ここに書く
      api: { host: "127.0.0.1", allowWrite: true },
      browser: {
        enabled: true,
        headless: true,
        // reducedMotion は、インスタンスごとの設定ではなく provider の contextOptions で渡す
        provider: playwright({ contextOptions: { reducedMotion: "reduce" } }),
        // Chromium で、失敗時のスクリーンショットが後続のストーリーの書体を変えるため切る（storybook-addon-vrt の README）
        screenshotFailures: false,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
);
