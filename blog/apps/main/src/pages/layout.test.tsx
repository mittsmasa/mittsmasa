import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { Layout } from "./layout.tsx";

describe("Layout", () => {
  test("遷移の読み込み中は、ページの中身を data-navigation-pending の付いた要素で包む", () => {
    const html = renderToStaticMarkup(
      <Layout pending>
        <p>中身</p>
      </Layout>,
    );

    expect(html).toContain('<div data-navigation-pending=""><p>中身</p></div>');
  });

  test("読み込み中でなければ、data-navigation-pending を付けない", () => {
    const html = renderToStaticMarkup(
      <Layout pending={false}>
        <p>中身</p>
      </Layout>,
    );

    expect(html).toContain("<p>中身</p>");
    expect(html).not.toContain("data-navigation-pending");
  });
});
