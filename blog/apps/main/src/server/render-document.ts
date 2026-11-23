import type { ReactNode } from "react";
import { createElement } from "react";
import { prerender } from "react-dom/static";

export type RenderedDocument = {
  head: string;
  body: string;
};

const DOCUMENT_START = "<!DOCTYPE html><html><head>";
const HEAD_END = '</head><body><div id="root">';
const DOCUMENT_END = "</div></body></html>";

export async function renderDocument(node: ReactNode): Promise<RenderedDocument> {
  const errors: unknown[] = [];
  const { prelude } = await prerender(
    createElement(
      "html",
      null,
      createElement("body", null, createElement("div", { id: "root" }, node)),
    ),
    {
      progressiveChunkSize: Number.POSITIVE_INFINITY,
      onError(error) {
        errors.push(error);
        console.error(error);
      },
    },
  );
  const html = await new Response(prelude).text();
  if (errors.length > 0) {
    throw new AggregateError(errors, `描画中に ${errors.length} 件のエラーが起きました`);
  }

  const headEnd = html.indexOf(HEAD_END);
  if (!html.startsWith(DOCUMENT_START) || headEnd === -1 || !html.endsWith(DOCUMENT_END)) {
    throw new Error(`描画結果が想定した文書の形ではありません: ${html.slice(0, 200)}`);
  }
  return {
    head: html.slice(DOCUMENT_START.length, headEnd),
    body: html.slice(headEnd + HEAD_END.length, -DOCUMENT_END.length),
  };
}
