import { Layout } from "./pages/Layout.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { matchRoute, usePath } from "./router/index.ts";
import { routes } from "./routes.tsx";

type Props = {
  /** 最初に描画する URL の pathname。サーバーとブラウザで同じ値を渡す */
  path: string;
};

export function App({ path: initialPath }: Props) {
  const { path, pending } = usePath(initialPath);
  const matched = matchRoute(routes, path);
  return (
    <Layout pending={pending}>
      {matched ? matched.route.render(matched.params) : <NotFoundPage />}
    </Layout>
  );
}
