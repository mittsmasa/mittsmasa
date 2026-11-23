import pandacss from "@pandacss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

// Storybook（起動したディレクトリの vite.config を読む）と単体テストが使う
export default defineConfig({
  plugins: [
    // panda.config.ts から CSS を出す。styled-system は prepare の panda codegen が作るので、ここでは作らない
    pandacss({ transform: true, codegen: false }),
    react(),
  ],
});
