import { describe, expect, test } from "vite-plus/test";
import { matchRoute } from "./match-route.ts";

const list = { pattern: "/" };
const post = { pattern: "/posts/:slug" };
const routes = [list, post];

describe("matchRoute", () => {
  test("パターンと同じパスに当たる", () => {
    expect(matchRoute(routes, "/")).toEqual({ route: list, params: {} });
  });

  test(":name の部分を params に入れる", () => {
    expect(matchRoute(routes, "/posts/hello-world")).toEqual({
      route: post,
      params: { slug: "hello-world" },
    });
  });

  test("末尾に / が付いていても同じルートに当たる", () => {
    expect(matchRoute(routes, "/posts/hello-world/")).toEqual({
      route: post,
      params: { slug: "hello-world" },
    });
  });

  test("パーセントエンコードされた params は、デコードして返す", () => {
    const path = "/posts/%E6%97%A5%E6%9C%AC%E8%AA%9E%20%E3%81%AE%E8%A8%98%E4%BA%8B";

    expect(matchRoute(routes, path)?.params).toEqual({ slug: "日本語 の記事" });
  });

  test("エンコードしていない ASCII 以外や空白のパスも、同じ params になる", () => {
    expect(matchRoute(routes, "/posts/日本語 の記事")?.params).toEqual({ slug: "日本語 の記事" });
  });

  test("パーセントエンコードが壊れたパスは、当たらないものとして扱う", () => {
    expect(matchRoute(routes, "/posts/bad%E3")).toBeUndefined();
  });

  test("パラメータは / をまたがない", () => {
    expect(matchRoute(routes, "/posts/2026/hello")).toBeUndefined();
  });

  test("どのパターンにも当たらなければ undefined を返す", () => {
    expect(matchRoute(routes, "/nope")).toBeUndefined();
  });

  test("複数のパターンに当たるときは、先に書いたルートを返す", () => {
    const first = { pattern: "/posts/:slug" };
    const second = { pattern: "/posts/:id" };

    expect(matchRoute([first, second], "/posts/a")?.route).toBe(first);
  });
});
