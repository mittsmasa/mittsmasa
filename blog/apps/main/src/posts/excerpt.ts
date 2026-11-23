import { marked, type Token } from "marked";

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
