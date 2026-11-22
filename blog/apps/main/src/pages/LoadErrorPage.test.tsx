import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { LoadErrorPage } from "./LoadErrorPage.tsx";

describe("LoadErrorPage", () => {
  test("再試行のリンクが、渡したパスを指す", () => {
    const html = renderToStaticMarkup(<LoadErrorPage path="/posts/hello-world/" />);

    expect(html).toContain('<a href="/posts/hello-world/">もう一度読み込む</a>');
  });
});
