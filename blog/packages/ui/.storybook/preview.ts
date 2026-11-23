import type { Preview } from "@storybook/react-vite";
// アプリ（apps/main の entry-client.tsx）と同じ入口で読む
import "@blog/ui/styles.css";

const preview = {
  parameters: {
    // コンポーネントはページの中に置く前提で、自分で左右の余白を持つ。Storybook の余白を足さない
    layout: "fullscreen",
    viewport: {
      // デザインのアートボードの幅
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
