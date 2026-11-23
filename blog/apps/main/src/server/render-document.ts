import type { ReactNode } from "react";
import { createElement } from "react";
import { prerender } from "react-dom/static";

/** 描画した文書を、ひな形の `<head>` と `#root` に入れる単位に分けたもの */
export type RenderedDocument = {
  /** `<head>` の中身。React が文書の head に置く要素（`<title>` など） */
  head: string;
  /** `#root` の中身。クライアントが hydrateRoot するもの */
  body: string;
};

const DOCUMENT_START = "<!DOCTYPE html><html><head>";
const HEAD_END = '</head><body><div id="root">';
const DOCUMENT_END = "</div></body></html>";

/**
 * `node` を `#root` の中身として静的 HTML に描画する。
 *
 * React は `<title>` などを文書の head に置くので、`<html>` から描いて head と `#root` を分ける。
 * `<head>` は書かない。書くと `<body>` の兄弟になり、`useId` の値がクライアントの描画とずれる。
 * 書かなければ React が head を足し、`#root` の中身は `node` だけを描いたときと同じになる。
 *
 * @throws 描画中にエラーが起きたとき。Suspense の中の復帰できるエラーも含める。
 *   そのままだと、中身の欠けた HTML が書き出されるため
 * @throws 描画結果が想定した文書の形でないとき
 */
export async function renderDocument(node: ReactNode): Promise<RenderedDocument> {
  const errors: unknown[] = [];
  const { prelude } = await prerender(
    createElement(
      "html",
      null,
      createElement("body", null, createElement("div", { id: "root" }, node)),
    ),
    {
      // 既定では、大きな Suspense の中身を #root の外（</body> の直前）に出し、スクリプトで差し込む。
      // 静的 HTML では分ける必要が無いので、中身はその場に描かせる
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
