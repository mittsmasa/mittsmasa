import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // トークンと部品のスタイルは @blog/ui から来る。
  // @blog/ui が `panda lib` で出した dist/panda/ を読むので、@blog/ui のソースは include に入れない
  designSystem: "@blog/ui",
  include: ["./src/**/*.{ts,tsx}"],
});
