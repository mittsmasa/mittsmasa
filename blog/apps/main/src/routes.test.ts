import { describe, expect, test } from "vite-plus/test";
import { renderPath, staticPaths } from "./routes.tsx";

describe("renderPath", () => {
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
