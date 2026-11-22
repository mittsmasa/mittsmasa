export type RouteParams = Record<string, string | undefined>;

export type RouteMatch<R> = {
  route: R;
  /** パターンの `:name` に当たった値 */
  params: RouteParams;
};

/** 末尾の `/` を除く。`/` 自体はそのまま返す */
function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * パスに当たる最初のルートを返す。
 *
 * @param routes `pattern` は URLPattern の pathname の書き方（`/posts/:slug` など）
 * @param path URL の pathname。末尾の `/` の有無は区別しない
 * @returns 当たるルートが無ければ `undefined`
 */
export function matchRoute<R extends { pattern: string }>(
  routes: readonly R[],
  path: string,
): RouteMatch<R> | undefined {
  const pathname = normalizePath(path);
  for (const route of routes) {
    const result = new URLPattern({ pathname: route.pattern }).exec({ pathname });
    if (result) {
      return { route, params: result.pathname.groups };
    }
  }
  return undefined;
}
