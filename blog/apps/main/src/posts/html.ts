import { marked } from "marked";

export function toPostHtml(body: string): string {
  return marked.parse(body, { async: false });
}
