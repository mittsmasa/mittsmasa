import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";
import { postsPlugin } from "./build/postsPlugin.ts";

export default defineConfig({
  plugins: [
    // スタイルは @blog/ui の部品が持つ（panda.config.ts の designSystem）。
    // transform で、css() の呼び出しをビルド時にクラス名の文字列へ置き換える。
    // アプリのコードは css() を呼ばないので、アプリ用の styled-system は作らない
    pandacss({ transform: true, codegen: false }),
    react(),
    postsPlugin(),
  ],
  build: {
    // 書体は文字の範囲ごとに 200 個以上に分かれている。小さいものを CSS に埋め込むと、
    // 使わない範囲のぶんまで全ページで読み込むことになるので、ファイルのまま置く
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
});
