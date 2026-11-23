import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleFooter } from "./article-footer.tsx";
import { AuthorNote } from "./author-note.tsx";

const meta = {
  component: AuthorNote,
  // 自分では幅を持たない。記事の下のまとまりの中に置く
  decorators: [(Story) => <ArticleFooter>{Story()}</ArticleFooter>],
  args: { name: "mittsmasa" },
} satisfies Meta<typeof AuthorNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};
