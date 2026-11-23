import { describe, expect, test } from "vite-plus/test";
import { assertSlug, toImageObject } from "./upload-image.ts";

const HELLO = new TextEncoder().encode("hello");

describe("toImageObject", () => {
  test("キーは slug と中身の SHA-256 の先頭 12 桁で作り、/images/ を付けた Markdown を返す", () => {
    expect(toImageObject("a-b", "/tmp/Screenshot 1.png", HELLO)).toEqual({
      key: "a-b/2cf24dba5fb0.png",
      contentType: "image/png",
      markdown: "![](/images/a-b/2cf24dba5fb0.png)",
    });
  });

  test("拡張子は小文字にそろえ、jpeg も image/jpeg として受ける", () => {
    expect(toImageObject("a-b", "photo.JPEG", HELLO)).toMatchObject({
      key: "a-b/2cf24dba5fb0.jpeg",
      contentType: "image/jpeg",
    });
  });

  test("SVG は同じオリジンでスクリプトが動きうるので受けない", () => {
    expect(() => toImageObject("a-b", "icon.svg", HELLO)).toThrow("icon.svg");
  });
});

describe("assertSlug", () => {
  test.each(["Bad Slug", "", "a/b", "日本語"])("%j は slug として受けない", (slug) => {
    expect(() => assertSlug(slug)).toThrow("slug");
  });

  test("英小文字と数字とハイフンだけの slug は受ける", () => {
    expect(() => assertSlug("hello-world-2")).not.toThrow();
  });
});
