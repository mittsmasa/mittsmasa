import { describe, expect, test } from "vite-plus/test";
import { toPostHtml } from "./html.ts";

describe("toPostHtml", () => {
  test("Markdown の本文を HTML に変換する", () => {
    expect(toPostHtml("\n最初の**記事**です。\n")).toBe(
      "<p>最初の<strong>記事</strong>です。</p>\n",
    );
  });
});
