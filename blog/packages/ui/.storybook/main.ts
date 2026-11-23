import { defineMain } from "@storybook/react-vite/node";

// Vite の設定は、このパッケージの vite.config.ts を builder が自動で読む
export default defineMain({
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-vitest"],
});
