import { defineConfig } from "@pandacss/dev";

// 値は Design キャンバス「ブログ モバイルモック」に出てくるものだけを置く
export default defineConfig({
  presets: ["@pandacss/preset-base"],
  preflight: false,
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/**/*.test.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  theme: {
    // モバイルと PC を切り替える幅。デザインに指定が無く、ユーザーと決めた値
    breakpoints: { md: "768px" },
    tokens: {
      colors: {
        bg: { value: "#ffffff" },
        fg: { value: "#222222" },
        fgSub: { value: "#444444" },
        fgMuted: { value: "#6b6b6b" },
        line: { value: "#e5e5e5" },
        codeBg: { value: "#f6f6f5" },
      },
      fonts: {
        body: { value: "'Zen Kaku Gothic New', sans-serif" },
        mono: { value: "'IBM Plex Mono', ui-monospace, monospace" },
      },
    },
    semanticTokens: {
      sizes: {
        // 本文の幅。左右の余白を含む
        content: { value: { base: "640px", md: "688px" } },
      },
      spacing: {
        // 本文の左右の余白
        gutter: { value: { base: "16px", md: "24px" } },
      },
    },
    textStyles: {
      // 日付
      meta: { value: { fontSize: "13px", lineHeight: "20px", letterSpacing: "0.06em" } },
      // 「書いた人」「前の記事」などのラベル
      label: { value: { fontSize: "12px", lineHeight: "20px", letterSpacing: "0.08em" } },
      // 「一覧」「すべての記事」などの小さいリンク
      smallLink: { value: { fontSize: "13px", letterSpacing: "0.04em" } },
    },
  },
  globalCss: {
    "*, *::before, *::after": { boxSizing: "border-box" },
    body: {
      margin: 0,
      background: "bg",
      color: "fg",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
    },
    a: { color: "fg" },
    "a:hover": { color: "fgMuted" },
    ":focus-visible": { outline: "2px solid token(colors.fg)", outlineOffset: "2px" },
  },
});
