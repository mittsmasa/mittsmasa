import { marked } from "marked";

/**
 * Markdown の本文を HTML に変換する。
 *
 * ビルドのとき（build/postsPlugin.ts）だけ使う。ブラウザで動くコードからは import しない。
 * import すると、marked がブラウザのバンドルに入る。
 *
 * @param body frontmatter を除いた Markdown
 */
export function toPostHtml(body: string): string {
  return marked.parse(body, { async: false });
}
