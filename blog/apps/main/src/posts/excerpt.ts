import { marked, type Token } from "marked";

/** 記法を除いた文字だけを取り出す。画像と改行のトークンは文字を持たない */
function plainText(tokens: readonly Token[]): string {
  return tokens
    .map((token) => {
      if (token.type === "image" || token.type === "br") {
        return "";
      }
      if ("tokens" in token && token.tokens) {
        return plainText(token.tokens);
      }
      return "text" in token && typeof token.text === "string" ? token.text : "";
    })
    .join("");
}

/**
 * 記事の抜粋を作る。文字のある最初の段落を、記法を除いた文字にする。画像だけの段落は飛ばす。
 *
 * ビルドのとき（build/postsPlugin.ts）だけ使う。ブラウザで動くコードからは import しない。
 * import すると、marked がブラウザのバンドルに入る。
 *
 * @param body frontmatter を除いた Markdown
 * @returns 文字のある段落が 1 つも無ければ空文字
 */
export function toExcerpt(body: string): string {
  for (const token of marked.lexer(body)) {
    if (token.type === "paragraph" && "tokens" in token && token.tokens) {
      const text = plainText(token.tokens)
        .replace(/\s*\n\s*/g, " ")
        .trim();
      if (text !== "") {
        return text;
      }
    }
  }
  return "";
}
