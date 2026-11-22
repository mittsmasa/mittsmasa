import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vite-plus/test";
import { TopPage } from "./TopPage.tsx";

function post(slug: string, date: string) {
  return { slug, title: `${slug} の題`, date, excerpt: `${slug} の抜粋` };
}

/** `heading` の見出しを持つ section の HTML。無ければ `undefined` */
function sectionOf(html: string, heading: string): string | undefined {
  return html.split("<section").find((section) => section.includes(`>${heading}</h2>`));
}

// 新しい順
const posts = [
  post("f", "2026-06-01"),
  post("e", "2026-05-01"),
  post("d", "2026-04-01"),
  post("c", "2026-03-01"),
  post("b", "2026-02-01"),
  post("a", "2026-01-01"),
];

describe("TopPage", () => {
  test("いちばん新しい記事を、抜粋と記事へのリンクつきで「最新」に出す", () => {
    const latest = sectionOf(renderToStaticMarkup(<TopPage posts={posts} />), "最新");

    expect(latest).toContain("f の題");
    expect(latest).toContain("f の抜粋");
    expect(latest).toContain('href="/posts/f/"');
    expect(latest).not.toContain("e の題");
  });

  test("続く 4 件を「これまで」に出し、それより古い記事は出さない", () => {
    const html = renderToStaticMarkup(<TopPage posts={posts} />);
    const recent = sectionOf(html, "これまで");

    for (const slug of ["e", "d", "c", "b"]) {
      expect(recent).toContain(`${slug} の題`);
    }
    expect(recent).not.toContain("f の題");
    expect(html).not.toContain("a の題");
  });

  test("「これまで」から一覧へ行ける", () => {
    const recent = sectionOf(renderToStaticMarkup(<TopPage posts={posts} />), "これまで");

    expect(recent).toMatch(/<a href="\/posts\/"[^>]*>すべての記事<\/a>/);
  });

  test("記事が 1 件なら「これまで」を出さない", () => {
    const html = renderToStaticMarkup(<TopPage posts={[post("a", "2026-01-01")]} />);

    expect(html).toContain("a の題");
    expect(html).not.toContain("これまで");
  });

  test("記事が 0 件なら、まだ記事が無いことを伝える", () => {
    const html = renderToStaticMarkup(<TopPage posts={[]} />);

    expect(html).toContain("まだ記事がありません");
    expect(html).not.toContain("最新");
  });
});
