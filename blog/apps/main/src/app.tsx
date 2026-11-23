import { ErrorBoundary } from "./pages/error-boundary.tsx";
import { Layout } from "./pages/layout.tsx";
import { LoadErrorPage } from "./pages/load-error-page.tsx";
import { NotFoundPage } from "./pages/not-found-page.tsx";
import { forgetFailedPostBodies } from "./posts/index.ts";
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
  const { path, pending, navigationCount } = usePath(initialPath, hasPage, forgetFailedPostBodies);
  return (
    <Layout listLink={!isPostListPath(path)} pending={pending}>
      {/* 遷移のたびに key を変えて作り直す。同じパスへの再試行でも、失敗の表示から元に戻る */}
      <ErrorBoundary key={navigationCount} fallback={<LoadErrorPage path={path} />}>
        {renderPath(path) ?? <NotFoundPage />}
      </ErrorBoundary>
    </Layout>
  );
}
