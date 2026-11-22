import { describe, expect, test } from "vite-plus/test";
import { postPath, postPattern } from "./paths.ts";
import { matchRoute } from "./router/index.ts";

describe("postPath", () => {
  test("postPattern に当たり、渡した slug が params に戻る", () => {
    const routes = [{ pattern: postPattern }];

    expect(matchRoute(routes, postPath("hello-world"))?.params).toEqual({ slug: "hello-world" });
  });

  test("ASCII 以外や空白を含む slug も、同じ slug が params に戻る", () => {
    const routes = [{ pattern: postPattern }];

    expect(matchRoute(routes, postPath("日本語 の記事"))?.params).toEqual({
      slug: "日本語 の記事",
    });
  });
});
