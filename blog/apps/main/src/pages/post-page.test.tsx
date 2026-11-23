import type { ReactElement } from "react";
import { prerender } from "react-dom/static";
import { describe, expect, test } from "vite-plus/test";
import { PostPage } from "./post-page.tsx";

function post(slug: string) {
  return { slug, title: `${slug} の題`, date: "2026-11-22", excerpt: "" };
}

async function render(element: ReactElement): Promise<string> {
  const { prelude } = await prerender(element);
  return new Response(prelude).text();
}

function linkOf(html: string, label: string): string | undefined {
  return html
    .split("<a ")
    .map((rest) => rest.slice(0, rest.indexOf("</a>")))
    .find((link) => link.includes(label));
}

describe("PostPage", () => {
  test("題、日付、届いた本文を出す", async () => {
    const html = await render(
      <PostPage post={post("current")} body={Promise.resolve("<p>本文です。</p>")} />,
    );

    expect(html).toContain("current の題");
    expect(html).toContain("2026.11.22");
    expect(html).toContain("<p>本文です。</p>");
  });

  test("新しい記事を「次の記事」、古い記事を「前の記事」として、それぞれの記事へつなぐ", async () => {
    const html = await render(
      <PostPage
        post={post("current")}
        body={Promise.resolve("")}
        newer={post("newer")}
        older={post("older")}
      />,
    );

    const next = linkOf(html, "次の記事");
    expect(next).toContain('href="/posts/newer/"');
    expect(next).toContain("newer の題");
    const previous = linkOf(html, "前の記事");
    expect(previous).toContain('href="/posts/older/"');
    expect(previous).toContain("older の題");
  });

  test("前後の記事が無ければ、前後へのリンクを出さない", async () => {
    const html = await render(<PostPage post={post("current")} body={Promise.resolve("")} />);

    expect(html).not.toContain("次の記事");
    expect(html).not.toContain("前の記事");
  });

  test("一覧へ戻れる", async () => {
    const html = await render(<PostPage post={post("current")} body={Promise.resolve("")} />);

    expect(linkOf(html, "一覧にもどる")).toContain('href="/posts/"');
  });
});
