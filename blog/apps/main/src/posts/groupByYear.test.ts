import { describe, expect, test } from "vite-plus/test";
import { groupByYear } from "./groupByYear.ts";

describe("groupByYear", () => {
  test("年ごとにまとめ、年の順とまとまりの中の順は元の並びのままにする", () => {
    const posts = [{ date: "2026-11-18" }, { date: "2026-09-14" }, { date: "2025-12-30" }];

    expect(groupByYear(posts)).toEqual([
      { year: "2026", posts: [{ date: "2026-11-18" }, { date: "2026-09-14" }] },
      { year: "2025", posts: [{ date: "2025-12-30" }] },
    ]);
  });

  test("記事が無ければ、まとまりも無い", () => {
    expect(groupByYear([])).toEqual([]);
  });
});
