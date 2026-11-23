import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { SiteHeader } from "./site-header.tsx";

describe("SiteHeader", () => {
  test("サイト名をトップへのリンクにする", () => {
    const html = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" topHref="/" />);

    expect(html).toMatch(/<a href="\/"[^>]*>みつぶろ<\/a>/);
  });

  test("listHref を渡すと「一覧」のリンクを出す", () => {
    const html = renderToStaticMarkup(
      <SiteHeader siteName="みつぶろ" topHref="/" listHref="/posts/" />,
    );

    expect(html).toMatch(/<a href="\/posts\/"[^>]*>一覧<\/a>/);
  });

  test("listHref を渡さなければ「一覧」のリンクを出さない", () => {
    const html = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" topHref="/" />);

    expect(html).not.toContain("一覧");
  });

  test("loading の間だけ、status に「読み込み中…」を出す", () => {
    const idle = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" topHref="/" />);
    const loading = renderToStaticMarkup(<SiteHeader siteName="みつぶろ" topHref="/" loading />);

    expect(idle).toMatch(/<p role="status"[^>]*><\/p>/);
    expect(loading).toMatch(/<p role="status"[^>]*>読み込み中…<\/p>/);
  });
});
