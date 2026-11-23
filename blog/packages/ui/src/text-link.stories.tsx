import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageMain } from "./page-main.tsx";
import { TextLink } from "./text-link.tsx";

const meta = {
  component: TextLink,
  // 自分では幅を持たない。トップの <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: { href: "/posts/", children: "すべての記事" },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
