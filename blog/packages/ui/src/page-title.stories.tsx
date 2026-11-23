import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageMain } from "./page-main.tsx";
import { PageTitle } from "./page-title.tsx";

const meta = {
  component: PageTitle,
  // 自分では幅を持たない。一覧の <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: { children: "Storybook とビジュアルリグレッションテストを入れた話" },
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
