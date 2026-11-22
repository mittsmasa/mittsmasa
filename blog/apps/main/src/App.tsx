import { Layout } from "./pages/Layout.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { usePath } from "./router/index.ts";
import { isPostListPath, renderPath } from "./routes.tsx";

type Props = {
  /** 最初に描画する URL の pathname。サーバーとブラウザで同じ値を渡す */
  path: string;
};

/** 描画できるページが無いパスへの遷移は、ブラウザの通常の読み込みに任せる */
function hasPage(path: string): boolean {
  return renderPath(path) !== undefined;
}

export function App({ path: initialPath }: Props) {
  const path = usePath(initialPath, hasPage);
  return <Layout listLink={!isPostListPath(path)}>{renderPath(path) ?? <NotFoundPage />}</Layout>;
}
