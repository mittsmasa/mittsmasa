import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageMain } from "./page-main.tsx";
import { PostRow } from "./post-row.tsx";
import { Section } from "./section.tsx";
import { TextLink } from "./text-link.tsx";

const meta = {
  component: Section,
  // 自分では幅を持たない。トップの <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: {
    heading: "これまで",
    children: (
      <>
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
        <PostRow
          href="/posts/a/"
          date="2026-10-02"
          title="自作ルーターの小さな作り"
          dateStyle="full"
        />
      </>
    ),
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

export const WithFooter: Story = {
  args: { footer: <TextLink href="/posts/">すべての記事</TextLink> },
};
