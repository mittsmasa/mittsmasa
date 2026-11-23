import { describe, expect, test } from "vite-plus/test";
import { transitionTypeOf } from "./transition-type.ts";

describe("transitionTypeOf", () => {
  test("新しい履歴に進む遷移は navigation-push", () => {
    expect(transitionTypeOf({ navigationType: "push", fromIndex: 0, toIndex: -1 })).toBe(
      "navigation-push",
    );
  });

  test("今の履歴を置き換える遷移は navigation-replace", () => {
    expect(transitionTypeOf({ navigationType: "replace", fromIndex: 2, toIndex: -1 })).toBe(
      "navigation-replace",
    );
  });

  test("読み直しは navigation-reload", () => {
    expect(transitionTypeOf({ navigationType: "reload", fromIndex: 2, toIndex: 2 })).toBe(
      "navigation-reload",
    );
  });

  test("行き先の履歴が今より前なら navigation-back", () => {
    expect(transitionTypeOf({ navigationType: "traverse", fromIndex: 2, toIndex: 0 })).toBe(
      "navigation-back",
    );
  });

  test("行き先の履歴が今より後なら navigation-forward", () => {
    expect(transitionTypeOf({ navigationType: "traverse", fromIndex: 1, toIndex: 2 })).toBe(
      "navigation-forward",
    );
  });
});
