import { describe, expect, test } from "vite-plus/test";
import { formatDate } from "./format-date.ts";

describe("formatDate", () => {
  test("full は年月日を . でつなぐ", () => {
    expect(formatDate("2026-11-08", "full")).toBe("2026.11.08");
  });

  test("monthDay は月日だけにする", () => {
    expect(formatDate("2026-11-08", "monthDay")).toBe("11.08");
  });
});
