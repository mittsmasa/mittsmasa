import { describe, expect, test } from "vite-plus/test";
import { adjacentPosts } from "./adjacent-posts.ts";

// 新しい順
const posts = [{ slug: "c" }, { slug: "b" }, { slug: "a" }];

describe("adjacentPosts", () => {
  test("あいだの記事には、新しい側と古い側の両方がある", () => {
    expect(adjacentPosts(posts, "b")).toEqual({ newer: { slug: "c" }, older: { slug: "a" } });
  });

  test("いちばん新しい記事には、古い側だけがある", () => {
    expect(adjacentPosts(posts, "c")).toEqual({ older: { slug: "b" } });
  });

  test("いちばん古い記事には、新しい側だけがある", () => {
    expect(adjacentPosts(posts, "a")).toEqual({ newer: { slug: "b" } });
  });

  test("記事が 1 件だけなら、どちらも無い", () => {
    expect(adjacentPosts([{ slug: "a" }], "a")).toEqual({});
  });

  test("一覧に無い slug なら、どちらも無い", () => {
    expect(adjacentPosts(posts, "nope")).toEqual({});
  });
});
