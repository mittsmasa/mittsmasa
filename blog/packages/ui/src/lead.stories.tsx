import type { Meta, StoryObj } from "@storybook/react-vite";
import { Lead } from "./lead.tsx";
import { PageMain } from "./page-main.tsx";

const meta = {
  component: Lead,
  // 自分では幅を持たない。トップの <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: {
    children:
      "日々の開発で考えたことや、試してみたことを書いています。気になった所だけ、拾い読みしてもらえたらうれしいです。",
  },
} satisfies Meta<typeof Lead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
