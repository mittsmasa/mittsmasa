import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { App } from "./App.tsx";

export { staticPaths } from "./routes.tsx";

/**
 * 指定したパスのページを HTML の文字列にする。
 *
 * @param path URL の pathname
 * @returns `#root` の中に入れる HTML
 */
export async function renderToHtml(path: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );
  return new Response(prelude).text();
}
