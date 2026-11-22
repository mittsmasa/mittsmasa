import { describe, expect, test } from "vite-plus/test";
import { toPostFrontmatter, toPostHtml } from "./post.ts";

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

describe("toPostHtml", () => {
  test("Markdown の本文を HTML に変換する", () => {
    expect(toPostHtml("\n最初の**記事**です。\n")).toBe(
      "<p>最初の<strong>記事</strong>です。</p>\n",
    );
  });
});
