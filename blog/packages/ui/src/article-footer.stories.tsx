import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleFooter } from "./article-footer.tsx";
import { AuthorNote } from "./author-note.tsx";
import { PostPager } from "./post-pager.tsx";
import { TextLink } from "./text-link.tsx";

const meta = {
  component: ArticleFooter,
  args: {
    children: (
      <>
        <AuthorNote name="mittsmasa" />
        <PostPager
          newer={{ href: "/posts/newer/", title: "View Transition で遷移をつなぐ" }}
          older={{ href: "/posts/older/", title: "自作ルーターの小さな作り" }}
        />
        <TextLink href="/posts/">一覧にもどる</TextLink>
      </>
    ),
  },
} satisfies Meta<typeof ArticleFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
