import { StrictMode } from "react";
import { App } from "./app.tsx";
import { renderPath } from "./routes.tsx";
import { renderDocument, type RenderedDocument } from "./server/render-document.ts";

export { staticPaths } from "./routes.tsx";

/**
 * 指定したパスのページを HTML の文字列にする。
 *
 * @param path URL の pathname
 * @returns `<head>` に入れる HTML と、`#root` の中に入れる HTML
 * @throws パスに当たるページが無いとき。Not Found の HTML を黙って書き出さないため
 * @throws 描画中にエラーが起きたとき（`renderDocument` を参照）
 */
export async function renderToHtml(path: string): Promise<RenderedDocument> {
  if (renderPath(path) === undefined) {
    throw new Error(`${path}: 当たるページがありません`);
  }
  return renderDocument(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
}
