import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageMain } from "./page-main.tsx";
import { PostRow } from "./post-row.tsx";

const meta = {
  component: PostRow,
  // 自分では幅を持たない。一覧の <main> の中に置く
  decorators: [(Story) => <PageMain>{Story()}</PageMain>],
  args: {
    href: "/posts/hello-world/",
    date: "2026-11-18",
    title: "ブログを作り直しました",
    dateStyle: "full",
  },
} satisfies Meta<typeof PostRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const FullPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

/** 年で区切った一覧の中では、年を省く */
export const MonthDay: Story = {
  args: { dateStyle: "monthDay" },
};

export const MonthDayPc: Story = {
  args: { dateStyle: "monthDay" },
  globals: { viewport: { value: "pc", isRotated: false } },
};

/** 題が折り返すとき、日付の列がずれない */
export const LongTitlePc: Story = {
  args: {
    title:
      "Storybook と storybook-addon-vrt を入れて、コンポーネントの見た目の変化を PR ごとに確かめられるようにした話",
  },
  globals: { viewport: { value: "pc", isRotated: false } },
};
