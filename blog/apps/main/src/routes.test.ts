import { describe, expect, test } from "vite-plus/test";
import { PostListPage } from "./pages/PostListPage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import { TopPage } from "./pages/TopPage.tsx";
import { isPostListPath, renderPath, staticPaths } from "./routes.tsx";

describe("renderPath", () => {
  test("/ はトップ、/posts/ は一覧、/posts/<slug>/ は記事になる", () => {
    expect(renderPath("/")?.type).toBe(TopPage);
    expect(renderPath("/posts/")?.type).toBe(PostListPage);
    expect(renderPath("/posts/hello-world/")?.type).toBe(PostPage);
  });

  test("末尾の / が無くても同じページになる", () => {
    expect(renderPath("/posts")?.type).toBe(PostListPage);
    expect(renderPath("/posts/hello-world")?.type).toBe(PostPage);
  });

  test("静的 HTML として書き出すパスには、どれもページがある", () => {
    expect(staticPaths.filter((path) => renderPath(path) === undefined)).toEqual([]);
  });

  test("ルートに無いパスなら undefined を返す", () => {
    expect(renderPath("/nope")).toBeUndefined();
  });

  test("記事が無いパスなら undefined を返す", () => {
    expect(renderPath("/posts/no-such-post/")).toBeUndefined();
  });
});

describe("isPostListPath", () => {
  test("一覧のパスだけ true を返す", () => {
    expect(isPostListPath("/posts/")).toBe(true);
    expect(isPostListPath("/posts")).toBe(true);
    expect(isPostListPath("/")).toBe(false);
    expect(isPostListPath("/posts/hello-world/")).toBe(false);
  });
});
