import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleFooter } from "./article-footer.tsx";
import { PostPager } from "./post-pager.tsx";

const newer = { href: "/posts/newer/", title: "View Transition で遷移をつなぐ" };
const older = { href: "/posts/older/", title: "自作ルーターの小さな作り" };

const meta = {
  component: PostPager,
  decorators: [(Story) => <ArticleFooter>{Story()}</ArticleFooter>],
  args: { newer, older },
} satisfies Meta<typeof PostPager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Both: Story = {};

export const BothPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

export const NewerOnly: Story = {
  args: { older: undefined },
};

export const OlderOnlyPc: Story = {
  args: { newer: undefined },
  globals: { viewport: { value: "pc", isRotated: false } },
};
