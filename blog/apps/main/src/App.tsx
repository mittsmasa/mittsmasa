import { ErrorBoundary } from "./pages/ErrorBoundary.tsx";
import { Layout } from "./pages/Layout.tsx";
import { LoadErrorPage } from "./pages/LoadErrorPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { forgetFailedPostBodies } from "./posts/index.ts";
import { usePath } from "./router/index.ts";
import { renderPath } from "./routes.tsx";

type Props = {
  /** 最初に描画する URL の pathname。サーバーとブラウザで同じ値を渡す */
  path: string;
};

/** 描画できるページが無いパスへの遷移は、ブラウザの通常の読み込みに任せる */
function hasPage(path: string): boolean {
  return renderPath(path) !== undefined;
}

export function App({ path: initialPath }: Props) {
  const { path, pending, navigationCount } = usePath(initialPath, hasPage, forgetFailedPostBodies);
  return (
    <Layout pending={pending}>
      {/* 遷移のたびに key を変えて作り直す。同じパスへの再試行でも、失敗の表示から元に戻る */}
      <ErrorBoundary key={navigationCount} fallback={<LoadErrorPage path={path} />}>
        {renderPath(path) ?? <NotFoundPage />}
      </ErrorBoundary>
    </Layout>
  );
}
