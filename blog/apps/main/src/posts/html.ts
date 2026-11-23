import { marked } from "marked";

/**
 * Markdown の本文を HTML に変換する。
 *
 * ビルドのとき（build/posts-plugin.ts）だけ使う。ブラウザで動くコードからは import しない。
 * import すると、marked がブラウザのバンドルに入る。
 *
 * 出力はサニタイズしない。marked は出力をサニタイズせず、この HTML は
 * `dangerouslySetInnerHTML` でそのまま描画される。入力が `content/posts` にある
 * 自分の記事だけなので、サニタイズしないことにした。他者の PR で記事を受け入れるように
 * なったら、または生の HTML を含む記事をマージする前に、DOMPurify などで出力を処理する。
 *
 * @param body frontmatter を除いた Markdown
 */
export function toPostHtml(body: string): string {
  return marked.parse(body, { async: false });
}
