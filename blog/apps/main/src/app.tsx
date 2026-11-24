import { ErrorBoundary } from "./pages/error-boundary.tsx";
import { Layout } from "./pages/layout.tsx";
import { LoadErrorPage } from "./pages/load-error-page.tsx";
import { NotFoundPage } from "./pages/not-found-page.tsx";
import { forgetFailedPostBodies } from "./posts/index.ts";
import { usePath } from "./router/index.ts";
import { renderPath } from "./routes.tsx";

type Props = {
  path: string;
};

function hasPage(path: string): boolean {
  return renderPath(path) !== undefined;
}

export function App({ path: initialPath }: Props) {
  const { path, pending, navigationCount } = usePath(initialPath, hasPage, forgetFailedPostBodies);
  return (
    <Layout pending={pending}>
      <ErrorBoundary key={navigationCount} fallback={<LoadErrorPage path={path} />}>
        {renderPath(path) ?? <NotFoundPage />}
      </ErrorBoundary>
    </Layout>
  );
}
