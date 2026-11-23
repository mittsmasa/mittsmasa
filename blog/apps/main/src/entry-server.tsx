import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { App } from "./app.tsx";
import { renderPath } from "./routes.tsx";

export { staticPaths } from "./routes.tsx";

export async function renderToHtml(path: string): Promise<string> {
  if (renderPath(path) === undefined) {
    throw new Error(`${path}: 当たるページがありません`);
  }
  const { prelude } = await prerender(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
