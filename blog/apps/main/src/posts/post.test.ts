import { describe, expect, test } from "vite-plus/test";
import { toPostFrontmatter, toPosts } from "./post.ts";

describe("toPostFrontmatter", () => {
  test("title と date を取り出す", () => {
    expect(
      toPostFrontmatter("hello-world", { title: "Hello, world", date: "2026-11-22", tag: "x" }),
    ).toEqual({ title: "Hello, world", date: "2026-11-22" });
  });

  test("title が無ければ、どの記事かわかるエラーにする", () => {
    expect(() => toPostFrontmatter("no-title", { date: "2026-11-22" })).toThrow(
      "no-title: frontmatter に title がありません",
    );
  });

  test("date が無ければエラーにする", () => {
    expect(() => toPostFrontmatter("no-date", { title: "Hello" })).toThrow(
      "no-date: frontmatter の date",
    );
  });

  test("date が YYYY-MM-DD でなければエラーにする", () => {
    expect(() => toPostFrontmatter("bad-date", { title: "Hello", date: "2026/11/22" })).toThrow(
      "bad-date: frontmatter の date",
    );
  });
});

describe("toPosts", () => {
  const source = (date: string) => ({ title: "Hello", date, excerpt: "" });

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
