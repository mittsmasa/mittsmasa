import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleFooter } from "./article-footer.tsx";
import { PostPager } from "./post-pager.tsx";

const newer = { href: "/posts/newer/", title: "View Transition で遷移をつなぐ" };
const older = { href: "/posts/older/", title: "自作ルーターの小さな作り" };

const meta = {
  component: PostPager,
  // 自分では幅を持たない。記事の下のまとまりの中に置く
  decorators: [(Story) => <ArticleFooter>{Story()}</ArticleFooter>],
  args: { newer, older },
} satisfies Meta<typeof PostPager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Both: Story = {};

/** PC は古いほうを左に、2 列で並べる */
export const BothPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

/** いちばん古い記事 */
export const NewerOnly: Story = {
  args: { older: undefined },
};

/** いちばん新しい記事。PC でも右の列に寄らない */
export const OlderOnlyPc: Story = {
  args: { newer: undefined },
  globals: { viewport: { value: "pc", isRotated: false } },
};
