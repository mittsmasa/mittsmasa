import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeaturedPost } from "./featured-post.tsx";
import { Lead } from "./lead.tsx";
import { PageMain } from "./page-main.tsx";
import { PostRow } from "./post-row.tsx";
import { Section } from "./section.tsx";

/** トップの `<main>` と同じ並び。セクションの間と左右の余白を見る */
const meta = {
  component: PageMain,
  args: {
    children: (
      <>
        <Lead>日々の開発で考えたことや、試してみたことを書いています。</Lead>
        <Section heading="最新">
          <FeaturedPost
            href="/posts/d/"
            date="2026-11-18"
            title="ブログを作り直しました"
            excerpt="長く使っていたブログの仕組みを、Vite と React で作り直しました。"
            moreLabel="つづきを読む"
          />
        </Section>
        <Section heading="これまで">
          <PostRow
            href="/posts/c/"
            date="2026-11-10"
            title="Panda CSS の semantic token"
            dateStyle="full"
          />
          <PostRow
            href="/posts/b/"
            date="2026-10-28"
            title="View Transition で遷移をつなぐ"
            dateStyle="full"
          />
        </Section>
      </>
    ),
  },
} satisfies Meta<typeof PageMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
