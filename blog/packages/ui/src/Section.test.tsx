import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { Section } from "./Section.tsx";

describe("Section", () => {
  test("section の名前が見出しになるよう、aria-labelledby で見出しを指す", () => {
    const html = renderToStaticMarkup(<Section heading="最新">中身</Section>);

    const labelledBy = /<section[^>]*aria-labelledby="([^"]+)"/.exec(html)?.[1];
    const headingId = /<h2[^>]*id="([^"]+)"[^>]*>最新<\/h2>/.exec(html)?.[1];
    expect(labelledBy).toBeTruthy();
    expect(headingId).toBe(labelledBy);
  });

  test("footer を渡すと中身の後ろに出す", () => {
    const html = renderToStaticMarkup(
      <Section heading="これまで" footer={<a href="/posts/">すべての記事</a>}>
        中身
      </Section>,
    );

    expect(html.indexOf("すべての記事")).toBeGreaterThan(html.indexOf("中身"));
  });
});
