import { describe, expect, test } from "vite-plus/test";
import { matchRoute } from "./matchRoute.ts";

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
