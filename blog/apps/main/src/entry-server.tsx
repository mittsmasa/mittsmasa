import { StrictMode } from "react";
import { App } from "./app.tsx";
import { renderPath } from "./routes.tsx";
import { renderDocument, type RenderedDocument } from "./server/render-document.ts";

export { staticPaths } from "./routes.tsx";

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
