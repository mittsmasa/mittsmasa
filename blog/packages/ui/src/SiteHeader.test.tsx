import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { SiteHeader } from "./SiteHeader.tsx";

describe("SiteHeader", () => {
  test("サイト名をトップへのリンクにする", () => {
    const html = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" homeHref="/" />);

    expect(html).toMatch(/<a href="\/"[^>]*>みつぶろ<\/a>/);
  });

  test("listHref を渡すと「一覧」のリンクを出す", () => {
    const html = renderToStaticMarkup(
      <SiteHeader siteName="みつぶろ" homeHref="/" listHref="/posts/" />,
    );

    expect(html).toMatch(/<a href="\/posts\/"[^>]*>一覧<\/a>/);
  });

  test("listHref を渡さなければ「一覧」のリンクを出さない", () => {
    const html = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" homeHref="/" />);

    expect(html).not.toContain("一覧");
  });
});
