import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { SiteHeader } from "./site-header.tsx";

const meta = {
  component: SiteHeader,
  args: {
    siteName: "みつぶろ",
    topHref: "/",
    listHref: "/posts/",
    darkMode: false,
    onDarkModeChange: fn(),
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultPc: Story = {
  globals: { viewport: { value: "pc", isRotated: false } },
};

export const WithoutListLink: Story = {
  args: { listHref: undefined },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Dark: Story = {
  args: { darkMode: true },
  beforeEach: () => {
    document.documentElement.classList.add("dark");
    return () => {
      document.documentElement.classList.remove("dark");
    };
  },
};

export const DarkPc: Story = {
  ...Dark,
  globals: { viewport: { value: "pc", isRotated: false } },
};

export const ToggleDarkMode: Story = {
  play: async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "ダークモード" }));
    await expect(args.onDarkModeChange).toHaveBeenCalledWith(true);
  },
};
