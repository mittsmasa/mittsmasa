import { describe, expect, test } from "vite-plus/test";
import { toExcerpt } from "./excerpt.ts";

describe("toExcerpt", () => {
  test("最初の段落だけを抜き出す", () => {
    expect(toExcerpt("書き出しの段落。\n\n二つ目の段落。")).toBe("書き出しの段落。");
  });

  test("見出しや箇条書きが先にあっても、最初の段落を選ぶ", () => {
    expect(toExcerpt("## 見出し\n\n- 項目\n\n本文の段落。")).toBe("本文の段落。");
  });

  test("強調、リンク、文中のコードは、記法を除いて文字だけ残す", () => {
    expect(toExcerpt("**強い**言葉と[リンク](https://example.com)と`code`。")).toBe(
      "強い言葉とリンクとcode。",
    );
  });

  test("記号を HTML の実体参照に変えない", () => {
    expect(toExcerpt("A & B < C")).toBe("A & B < C");
  });

  test("段落の中の改行は空白 1 つにする", () => {
    expect(toExcerpt("one\ntwo")).toBe("one two");
  });

  test("段落が無ければ空文字を返す", () => {
    expect(toExcerpt("## 見出しだけ")).toBe("");
  });
});
