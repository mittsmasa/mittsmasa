import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { PostPager } from "./post-pager.tsx";

const newer = { href: "/posts/newer/", title: "新しい記事" };
const older = { href: "/posts/older/", title: "古い記事" };

describe("PostPager", () => {
  test("新しいほうを「次の記事」、古いほうを「前の記事」として出す", () => {
    const html = renderToStaticMarkup(<PostPager newer={newer} older={older} />);

    expect(html).toMatch(/<a href="\/posts\/newer\/"[^>]*><span[^>]*>次の記事<\/span>/);
    expect(html).toMatch(/<a href="\/posts\/older\/"[^>]*><span[^>]*>前の記事<\/span>/);
  });

  test("片方だけなら、ある側だけを出す", () => {
    const html = renderToStaticMarkup(<PostPager older={older} />);

    expect(html).toContain("前の記事");
    expect(html).not.toContain("次の記事");
  });

  test("どちらも無ければ何も出さない", () => {
    expect(renderToStaticMarkup(<PostPager />)).toBe("");
  });
});
