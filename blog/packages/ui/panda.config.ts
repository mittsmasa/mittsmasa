import { defineConfig } from "@pandacss/dev";
import presetBase from "@pandacss/preset-base";

export default defineConfig({
  presets: [presetBase],
  preflight: false,
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/**/*.test.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "styled-system",
  strictTokens: true,
  utilities: {
    extend: {
      fontSize: { values: { inherit: "inherit" } },
      lineHeight: { values: { inherit: "inherit" } },
      letterSpacing: { values: { inherit: "inherit" } },
    },
  },
  theme: {
    breakpoints: { md: "768px" },
    semanticTokens: {
      colors: {
        bg: {
          default: { value: { base: "#ffffff", _dark: "#141414" } },
          code: { value: { base: "#f6f6f5", _dark: "#1e1e1d" } },
        },
        fg: {
          default: { value: { base: "#222222", _dark: "#e8e8e6" } },
          sub: { value: { base: "#444444", _dark: "#c4c4c2" } },
          muted: { value: { base: "#6b6b6b", _dark: "#9b9b99" } },
        },
        border: {
          default: { value: { base: "#e5e5e5", _dark: "#2f2f2e" } },
          strong: { value: { base: "#222222", _dark: "#e8e8e6" } },
        },
      },
      fonts: {
        body: { value: "'Zen Kaku Gothic New', sans-serif" },
        mono: { value: "'IBM Plex Mono', ui-monospace, monospace" },
      },
      fontWeights: {
        emphasis: { value: "500" },
      },
      borders: {
        none: { value: "none" },
        default: { value: "1px solid {colors.border.default}" },
        strong: { value: "1px solid {colors.border.strong}" },
        quote: { value: "2px solid {colors.border.default}" },
        focus: { value: "2px solid {colors.border.strong}" },
      },
      sizes: {
        content: { value: { base: "640px", md: "688px" } },
        tapTarget: { value: "44px" },
        icon: { value: "20px" },
        header: { value: { base: "52px", md: "56px" } },
        dateColumn: {
          full: { value: "88px" },
          monthDay: { value: "48px" },
        },
        proseImage: { value: { base: "calc(100% + {spacing.gutter} * 2)", md: "100%" } },
      },
      spacing: {
        none: { value: "0" },
        gutter: { value: { base: "16px", md: "24px" } },
        focusOffset: { value: "2px" },
        page: {
          top: { value: { base: "28px", md: "48px" } },
          gap: { value: { base: "40px", md: "48px" } },
        },
        article: {
          top: { value: { base: "28px", md: "56px" } },
          headerGap: { value: { base: "8px", md: "10px" } },
          headerBottom: { value: { base: "28px", md: "40px" } },
        },
        prose: {
          gap: { value: { base: "20px", md: "22px" } },
          h2Top: { value: { base: "12px", md: "18px" } },
          h2PaddingTop: { value: { base: "20px", md: "24px" } },
          h3Top: { value: "8px" },
          headingPull: { value: "6px" },
          listIndent: { value: "1.5em" },
          listGap: { value: "8px" },
          quoteIndent: { value: "16px" },
          preMargin: { value: { base: "4px", md: "6px" } },
          prePadding: { value: { base: "16px", md: "20px" } },
          inlineCodeX: { value: "4px" },
          inlineCodeY: { value: "2px" },
        },
        footer: {
          top: { value: { base: "44px", md: "64px" } },
          bottom: { value: { base: "40px", md: "56px" } },
          gap: { value: { base: "32px", md: "40px" } },
        },
        author: {
          top: { value: { base: "20px", md: "24px" } },
          gap: { value: "6px" },
        },
        featured: {
          top: { value: { base: "20px", md: "24px" } },
          titleTop: { value: { base: "6px", md: "8px" } },
          titleBottom: { value: { base: "12px", md: "14px" } },
          moreTop: { value: "4px" },
        },
        row: {
          gap: { value: { base: "2px", md: "24px" } },
          paddingBlock: { value: { base: "12px", md: "13px" } },
        },
        pager: {
          gap: { value: "2px" },
          columnGap: { value: "24px" },
          paddingBlock: { value: "16px" },
          itemPaddingBlock: { value: { base: "12px", md: "0" } },
        },
        section: {
          headingBottom: { value: "12px" },
          footerTop: { value: "8px" },
        },
        header: {
          gap: { value: "16px" },
          iconPull: { value: "12px" },
        },
      },
    },
    textStyles: {
      pageTitle: {
        value: {
          fontSize: { base: "24px", md: "30px" },
          lineHeight: { base: 1.4167, md: 1.4667 },
          fontWeight: 500,
        },
      },
      featuredTitle: {
        value: {
          fontSize: { base: "22px", md: "26px" },
          lineHeight: { base: 1.4546, md: 1.5385 },
          fontWeight: 500,
        },
      },
      heading2: {
        value: {
          fontSize: { base: "19px", md: "22px" },
          lineHeight: { base: 1.579, md: 1.5455 },
          fontWeight: 500,
        },
      },
      heading3: {
        value: {
          fontSize: { base: "17px", md: "19px" },
          lineHeight: { base: 1.6471, md: 1.579 },
          fontWeight: 500,
        },
      },
      body: {
        value: {
          fontSize: { base: "16px", md: "17px" },
          lineHeight: { base: 1.75, md: 1.8 },
        },
      },
      rowTitle: {
        value: {
          fontSize: { base: "16px", md: "17px" },
          lineHeight: { base: 1.625, md: 1.5295 },
        },
      },
      lead: {
        value: {
          fontSize: { base: "14px", md: "15px" },
          lineHeight: { base: 1.8572, md: 1.7334 },
        },
      },
      code: {
        value: {
          fontSize: { base: "13px", md: "14px" },
          lineHeight: { base: 1.6154, md: 1.6429 },
        },
      },
      inlineCode: { value: { fontSize: "0.9em" } },
      rowDate: {
        value: {
          fontSize: { base: "12px", md: "13px" },
          lineHeight: { base: 1.6667, md: 2 },
          letterSpacing: "0.06em",
        },
      },
      subTitle: { value: { fontSize: "15px", lineHeight: 1.6 } },
      authorName: { value: { fontSize: "15px", lineHeight: 1.6, fontWeight: 500 } },
      siteName: { value: { fontSize: "15px", fontWeight: 500, letterSpacing: "0.04em" } },
      sectionHeading: {
        value: { fontSize: "13px", lineHeight: 1.5385, fontWeight: 500, letterSpacing: "0.08em" },
      },
      meta: { value: { fontSize: "13px", lineHeight: 1.5385, letterSpacing: "0.06em" } },
      label: { value: { fontSize: "12px", lineHeight: 1.6667, letterSpacing: "0.08em" } },
      smallLink: { value: { fontSize: "13px", letterSpacing: "0.04em" } },
      footnote: { value: { fontSize: "12px", lineHeight: 1.6667, letterSpacing: "0.06em" } },
    },
  },
  globalCss: {
    "*, *::before, *::after": { boxSizing: "border-box" },
    ".dark": { colorScheme: "dark" },
    body: {
      margin: "none",
      background: "bg.default",
      color: "fg.default",
      fontFamily: "body",
      WebkitFontSmoothing: "antialiased",
    },
    a: { color: "fg.default", textDecorationSkipInk: "all" },
    "a:hover": { color: "fg.muted" },
    ":focus-visible": { outline: "focus", outlineOffset: "focusOffset" },
  },
});
