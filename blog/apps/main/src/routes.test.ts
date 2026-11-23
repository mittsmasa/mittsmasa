import { describe, expect, test } from "vite-plus/test";
import { PostListPage } from "./pages/post-list-page.tsx";
import { PostPage } from "./pages/post-page.tsx";
import { TopPage } from "./pages/top-page.tsx";
import { postListPath, topPath } from "./paths.ts";
import { isPostListPath, renderPath, staticPaths } from "./routes.tsx";

const postPaths = staticPaths.filter((path) => path !== topPath && path !== postListPath);

describe("renderPath", () => {
  test("/ はトップ、/posts/ は一覧、記事のパスは記事になる", () => {
    expect(renderPath("/")?.type).toBe(TopPage);
    expect(renderPath("/posts/")?.type).toBe(PostListPage);
    expect(postPaths.map((path) => renderPath(path)?.type)).toEqual(postPaths.map(() => PostPage));
  });

  test("末尾の / が無くても同じページになる", () => {
    const withoutSlash = postPaths.map((path) => path.slice(0, -1));

    expect(renderPath("/posts")?.type).toBe(PostListPage);
    expect(withoutSlash.map((path) => renderPath(path)?.type)).toEqual(
      withoutSlash.map(() => PostPage),
    );
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
    expect(isPostListPath("/posts/some-post/")).toBe(false);
  });
});
