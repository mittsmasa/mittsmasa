import type { Plugin } from "vite-plus";
import { parseFrontmatter } from "../src/posts/frontmatter.ts";
import { toPostFrontmatter, toPostHtml } from "../src/posts/post.ts";

/**
 * Markdown の記事を、ビルドのときに 2 通りのモジュールへ変換する。
 *
 * - `*.md?meta`: frontmatter の `{ title, date }`
 * - `*.md?body`: 本文を変換した HTML の文字列
 *
 * 一覧に要る情報と本文を別のモジュールにして、本文だけを後から読み込めるようにする。
 */
export function postsPlugin(): Plugin {
  return {
    name: "blog-posts",
    transform(code, id) {
      const [file = "", query = ""] = id.split("?");
      if (!file.endsWith(".md")) return undefined;

      const params = new URLSearchParams(query);
      if (params.has("meta")) {
        const name = file.slice(file.lastIndexOf("/") + 1);
        const frontmatter = toPostFrontmatter(name, parseFrontmatter(code).fields);
        return { code: `export default ${JSON.stringify(frontmatter)};`, map: null };
      }
      if (params.has("body")) {
        const html = toPostHtml(parseFrontmatter(code).body);
        return { code: `export default ${JSON.stringify(html)};`, map: null };
      }
      return undefined;
    },
  };
}
