import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  designSystem: "@blog/ui",
  include: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      tokens: {
        durations: {
          pageFadeIn: { value: "180ms" },
          pageDim: { value: "120ms" },
        },
        easings: {
          pageFade: { value: "ease-out" },
        },
        opacity: {
          pagePending: { value: "0.45" },
        },
      },
      keyframes: {
        pageFadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  globalCss: {
    "::view-transition-group(.page)": { animation: "none" },
    "::view-transition-old(.page)": { animation: "none", opacity: "0" },
    "::view-transition-new(.page)": {
      animationName: "pageFadeIn",
      animationDuration: "pageFadeIn",
      animationTimingFunction: "pageFade",
    },
    "[data-navigation-pending]": {
      opacity: "pagePending",
      transitionProperty: "opacity",
      transitionDuration: "pageDim",
      transitionTimingFunction: "pageFade",
    },
    "html:active-view-transition-type(navigation-ua-visual)::view-transition-new(.page)": {
      animation: "none",
    },
    "@media (prefers-reduced-motion: reduce)": {
      "::view-transition-new(.page)": { animation: "none" },
      "[data-navigation-pending]": { transition: "none" },
    },
  },
});
