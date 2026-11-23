import { describe, expect, test } from "vite-plus/test";
import { createBodyCache } from "./body-cache.ts";

function countingLoader(results: (string | Error)[]) {
  let calls = 0;
  const load = () => {
    const result = results[calls];
    calls += 1;
    return result instanceof Error ? Promise.reject(result) : Promise.resolve(result ?? "");
  };
  return { load, calls: () => calls };
}

describe("createBodyCache", () => {
  test("同じ slug には同じ Promise を返し、読み込みは 1 回だけ", async () => {
    const loader = countingLoader(["<p>hello</p>"]);
    const cache = createBodyCache(new Map([["hello", loader.load]]));

    const first = cache.load("hello");
    const second = cache.load("hello");

    expect(second).toBe(first);
    await expect(first).resolves.toBe("<p>hello</p>");
    expect(loader.calls()).toBe(1);
  });

  test("読み込み方が無い slug なら、どの slug かわかるエラーにする", () => {
    const cache = createBodyCache(new Map());

    expect(() => cache.load("no-such-post")).toThrow("no-such-post: 公開している記事にありません");
  });

  test("失敗したあとも同じ Promise を返し、読み込み直さない", async () => {
    const loader = countingLoader([new Error("offline"), "<p>hello</p>"]);
    const cache = createBodyCache(new Map([["hello", loader.load]]));

    const first = cache.load("hello");
    await expect(first).rejects.toThrow("offline");

    expect(cache.load("hello")).toBe(first);
    expect(loader.calls()).toBe(1);
  });

  test("forgetFailed のあとは、失敗した slug を読み込み直す", async () => {
    const loader = countingLoader([new Error("offline"), "<p>hello</p>"]);
    const cache = createBodyCache(new Map([["hello", loader.load]]));
    await expect(cache.load("hello")).rejects.toThrow("offline");

    cache.forgetFailed();

    await expect(cache.load("hello")).resolves.toBe("<p>hello</p>");
    expect(loader.calls()).toBe(2);
  });

  test("forgetFailed は、成功した読み込みを捨てない", async () => {
    const loader = countingLoader(["<p>hello</p>"]);
    const cache = createBodyCache(new Map([["hello", loader.load]]));
    const first = cache.load("hello");
    await first;

    cache.forgetFailed();

    expect(cache.load("hello")).toBe(first);
    expect(loader.calls()).toBe(1);
  });

  test("forgetFailed は、読み込み中のものを捨てない", () => {
    let calls = 0;
    const neverSettles = () => {
      calls += 1;
      return new Promise<string>(() => {});
    };
    const cache = createBodyCache(new Map([["hello", neverSettles]]));
    const first = cache.load("hello");

    cache.forgetFailed();

    expect(cache.load("hello")).toBe(first);
    expect(calls).toBe(1);
  });
});
