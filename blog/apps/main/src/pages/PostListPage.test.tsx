import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { PostListPage } from "./PostListPage.tsx";

describe("PostListPage", () => {
  test("記事が 0 件なら、まだ記事が無いことを伝える", () => {
    const html = renderToStaticMarkup(<PostListPage posts={[]} />);

    expect(html).toContain("まだ記事がありません");
  });

  test("記事ごとに、日付と記事ページへのリンクを出す", () => {
    const html = renderToStaticMarkup(
      <PostListPage
        posts={[{ slug: "hello-world", title: "Hello, world", date: "2026-11-22", html: "" }]}
      />,
    );

    expect(html).toContain(">2026-11-22</time>");
    expect(html).toContain('href="/posts/hello-world/"');
    expect(html).toContain(">Hello, world</a>");
  });
});
