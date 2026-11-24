import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { SiteHeader } from "./site-header.tsx";

const props = {
  siteName: "みつぶろ",
  topHref: "/",
  darkMode: false,
  onDarkModeChange: () => {},
};

describe("SiteHeader", () => {
  test("サイト名をトップへのリンクにする", () => {
    const html = renderToStaticMarkup(<SiteHeader {...props} />);

    expect(html).toMatch(/<a href="\/"[^>]*>みつぶろ<\/a>/);
  });

  test("loading の間だけ、status に「読み込み中…」を出す", () => {
    const idle = renderToStaticMarkup(<SiteHeader {...props} />);
    const loading = renderToStaticMarkup(<SiteHeader {...props} loading />);

    expect(idle).toMatch(/<p role="status"[^>]*><\/p>/);
    expect(loading).toMatch(/<p role="status"[^>]*>読み込み中…<\/p>/);
  });

  test("ダークモードの切り替えボタンが、aria-pressed で今の状態を出す", () => {
    const light = renderToStaticMarkup(<SiteHeader {...props} />);
    const dark = renderToStaticMarkup(<SiteHeader {...props} darkMode />);

    const toggle = (html: string) => html.match(/<button[^>]*aria-label="ダークモード"[^>]*>/)?.[0];

    expect(toggle(light)).toContain('aria-pressed="false"');
    expect(toggle(dark)).toContain('aria-pressed="true"');
  });
});
