import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteHeader } from "./site-header.tsx";

const meta = {
  component: SiteHeader,
  args: { siteName: "みつぶろ", topHref: "/", listHref: "/posts/" },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

/** 一覧のページでは、一覧へのリンクを出さない */
export const WithoutListLink: Story = {
  args: { listHref: undefined },
};

export const Loading: Story = {
  args: { loading: true },
};
