import { describe, expect, test } from "vite-plus/test";
import { toPost, toPosts } from "./post.ts";

describe("toPost", () => {
  test("frontmatter の title と date を持ち、本文を HTML に変換した記事を作る", () => {
    const source = "---\ntitle: Hello, world\ndate: 2026-11-22\n---\n\n最初の**記事**です。\n";

    expect(toPost("hello-world", source)).toEqual({
      slug: "hello-world",
      title: "Hello, world",
      date: "2026-11-22",
      excerpt: "最初の記事です。",
      html: "<p>最初の<strong>記事</strong>です。</p>\n",
    });
  });

  test("title が無ければ、どの記事かわかるエラーにする", () => {
    const source = "---\ndate: 2026-11-22\n---\n本文\n";

    expect(() => toPost("no-title", source)).toThrow("no-title: frontmatter に title がありません");
  });

  test("date が無ければエラーにする", () => {
    const source = "---\ntitle: Hello\n---\n本文\n";

    expect(() => toPost("no-date", source)).toThrow("no-date: frontmatter の date");
  });

  test("date が YYYY-MM-DD でなければエラーにする", () => {
    const source = "---\ntitle: Hello\ndate: 2026/11/22\n---\n本文\n";

    expect(() => toPost("bad-date", source)).toThrow("bad-date: frontmatter の date");
  });
});

describe("toPosts", () => {
  const source = (date: string) => `---\ntitle: Hello\ndate: ${date}\n---\n本文\n`;

  test("ファイル名から拡張子を除いたものを slug にする", () => {
    const posts = toPosts({ "../content/posts/hello-world.md": source("2026-11-22") });

    expect(posts.map((post) => post.slug)).toEqual(["hello-world"]);
  });

  test("date の新しい順に並べる", () => {
    const posts = toPosts({
      "posts/older.md": source("2026-11-01"),
      "posts/newest.md": source("2026-11-22"),
      "posts/middle.md": source("2026-11-10"),
    });

    expect(posts.map((post) => post.slug)).toEqual(["newest", "middle", "older"]);
  });
});
