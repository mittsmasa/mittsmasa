import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { PostRow } from "./PostRow.tsx";

describe("PostRow", () => {
  test("行の全体を記事へのリンクにし、日付を機械が読める形でも持つ", () => {
    const html = renderToStaticMarkup(
      <PostRow href="/posts/a/" date="2026-11-02" title="題" dateStyle="full" />,
    );

    expect(html).toMatch(/^<a href="\/posts\/a\/"/);
    expect(html).toMatch(/<time dateTime="2026-11-02"[^>]*>2026\.11\.02<\/time>/);
    expect(html).toContain("題");
  });

  test("dateStyle が monthDay なら、日付を月日だけで出す", () => {
    const html = renderToStaticMarkup(
      <PostRow href="/posts/a/" date="2026-11-02" title="題" dateStyle="monthDay" />,
    );

    expect(html).toMatch(/<time dateTime="2026-11-02"[^>]*>11\.02<\/time>/);
  });
});
