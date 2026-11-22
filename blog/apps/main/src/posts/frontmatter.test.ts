import { describe, expect, test } from "vite-plus/test";
import { parseFrontmatter } from "./frontmatter.ts";

describe("parseFrontmatter", () => {
  test("--- で挟まれた key: value を読み、残りを本文にする", () => {
    const source = "---\ntitle: Hello, world\ndate: 2026-11-22\n---\n\n本文です。\n";

    expect(parseFrontmatter(source)).toEqual({
      fields: { title: "Hello, world", date: "2026-11-22" },
      body: "\n本文です。\n",
    });
  });

  test("値に含まれる 2 つ目以降のコロンは、値の一部として残す", () => {
    const source = "---\ntitle: React: The Good Parts\n---\n";

    expect(parseFrontmatter(source).fields).toEqual({ title: "React: The Good Parts" });
  });

  test("キーと値の前後の空白を除く", () => {
    const source = "---\n  title :   Hello  \n---\n";

    expect(parseFrontmatter(source).fields).toEqual({ title: "Hello" });
  });

  test("改行が CRLF でも読める", () => {
    const source = "---\r\ntitle: Hello\r\n---\r\n本文\r\n";

    expect(parseFrontmatter(source)).toEqual({ fields: { title: "Hello" }, body: "本文\n" });
  });

  test("先頭が --- でなければ、全体を本文にする", () => {
    const source = "# 見出し\n\n本文\n";

    expect(parseFrontmatter(source)).toEqual({ fields: {}, body: source });
  });

  test("本文の途中にある --- は区切りとして扱わない", () => {
    const source = "---\ntitle: Hello\n---\n前半\n\n---\n\n後半\n";

    expect(parseFrontmatter(source).body).toBe("前半\n\n---\n\n後半\n");
  });

  test("閉じの --- が無ければエラーにする", () => {
    expect(() => parseFrontmatter("---\ntitle: Hello\n")).toThrow("閉じの ---");
  });

  test("key: value の形でない行があればエラーにする", () => {
    expect(() => parseFrontmatter("---\ntitle\n---\n")).toThrow("key: value");
  });
});
