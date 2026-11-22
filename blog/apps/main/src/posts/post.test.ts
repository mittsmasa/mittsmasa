import { describe, expect, test } from "vite-plus/test";
import { toPost } from "./post.ts";

describe("toPost", () => {
  test("frontmatter の title と date を持ち、本文を HTML に変換した記事を作る", () => {
    const source = "---\ntitle: Hello, world\ndate: 2026-11-22\n---\n\n最初の**記事**です。\n";

    expect(toPost("hello-world", source)).toEqual({
      slug: "hello-world",
      title: "Hello, world",
      date: "2026-11-22",
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
