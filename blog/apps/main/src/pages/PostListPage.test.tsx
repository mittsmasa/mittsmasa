import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { PostListPage } from "./PostListPage.tsx";

function post(slug: string, date: string) {
  return { slug, title: `${slug} の題`, date, excerpt: "", html: "" };
}

describe("PostListPage", () => {
  test("記事が 0 件なら、まだ記事が無いことを伝える", () => {
    const html = renderToStaticMarkup(<PostListPage posts={[]} />);

    expect(html).toContain("まだ記事がありません");
  });

  test("記事ごとに、月日の日付と記事ページへのリンクを出す", () => {
    const html = renderToStaticMarkup(<PostListPage posts={[post("hello-world", "2026-11-22")]} />);

    expect(html).toMatch(/<time dateTime="2026-11-22"[^>]*>11\.22<\/time>/);
    expect(html).toContain('href="/posts/hello-world/"');
    expect(html).toContain("hello-world の題");
  });

  test("年ごとの見出しで区切り、新しい年を先に出す", () => {
    const html = renderToStaticMarkup(
      <PostListPage posts={[post("b", "2026-01-05"), post("a", "2025-12-30")]} />,
    );

    const headings = [...html.matchAll(/<h2[^>]*>([^<]*)<\/h2>/g)].map((match) => match[1]);
    expect(headings).toEqual(["2026", "2025"]);
    expect(html.indexOf("b の題")).toBeLessThan(html.indexOf(">2025<"));
    expect(html.indexOf("a の題")).toBeGreaterThan(html.indexOf(">2025<"));
  });
});
