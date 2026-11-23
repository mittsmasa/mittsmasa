import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeaturedPost } from "./featured-post.tsx";
import { PageMain } from "./page-main.tsx";

const meta = {
  component: FeaturedPost,
  // 自分では幅を持たない。トップの <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: {
    href: "/posts/hello-world/",
    date: "2026-11-18",
    title: "ブログを作り直しました",
    excerpt:
      "長く使っていたブログの仕組みを、Vite と React で作り直しました。記事は Markdown のまま、ページはビルドのときに HTML に書き出します。",
    moreLabel: "つづきを読む",
  },
} satisfies Meta<typeof FeaturedPost>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
