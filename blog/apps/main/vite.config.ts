import { fileURLToPath } from "node:url";
import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    // Panda の設定と生成物は packages/ui が持つ。
    // transform で、css() の呼び出しをビルド時にクラス名の文字列へ置き換える
    pandacss({
      cwd: fileURLToPath(new URL("../../packages/ui", import.meta.url)),
      transform: true,
    }),
    react(),
  ],
});
