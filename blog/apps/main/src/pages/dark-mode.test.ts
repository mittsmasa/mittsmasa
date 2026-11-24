import { describe, expect, test } from "vite-plus/test";
import indexHtml from "../../index.html?raw";
import { DARK_CLASS, THEME_STORAGE_KEY } from "./dark-mode.ts";

describe("index.html のテーマ初期化スクリプト", () => {
  test("切り替えボタンと同じキーで保存値を読む", () => {
    expect(indexHtml).toContain(`localStorage.getItem("${THEME_STORAGE_KEY}")`);
  });

  test("切り替えボタンと同じクラスを html に当てる", () => {
    expect(indexHtml).toContain(`classList.toggle("${DARK_CLASS}", theme === "dark")`);
  });
});
