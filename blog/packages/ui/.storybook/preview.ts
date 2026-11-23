import type { Preview } from "@storybook/react-vite";
import "@blog/ui/styles.css";

const preview = {
  parameters: {
    layout: "fullscreen",
    viewport: {
      options: {
        mobile: { name: "モバイル", styles: { width: "390px", height: "844px" }, type: "mobile" },
        pc: { name: "PC", styles: { width: "1280px", height: "800px" }, type: "desktop" },
      },
    },
  },
  initialGlobals: {
    viewport: { value: "mobile", isRotated: false },
  },
} satisfies Preview;

export default preview;
