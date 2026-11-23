import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteFooter } from "./site-footer.tsx";

const meta = {
  component: SiteFooter,
  args: { children: "© 2026 みつぶろ" },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
