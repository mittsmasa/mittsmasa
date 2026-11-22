import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    // Panda の設定と生成物は packages/ui が持つ。
    // transform で、css() の呼び出しをビルド時にクラス名の文字列へ置き換える
    pandacss({
      cwd: new URL("../../packages/ui", import.meta.url).pathname,
      transform: true,
    }),
    react(),
  ],
  build: {
    // 書体は文字の範囲ごとに 200 個以上に分かれている。小さいものを CSS に埋め込むと、
    // 使わない範囲のぶんまで全ページで読み込むことになるので、ファイルのまま置く
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
});
