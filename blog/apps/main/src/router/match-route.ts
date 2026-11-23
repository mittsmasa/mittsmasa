export type RouteParams = Record<string, string | undefined>;

export type RouteMatch<R> = {
  route: R;
  /** パターンの `:name` に当たった値。パーセントエンコードはデコードしてある */
  params: RouteParams;
};

/** 末尾の `/` を除く。`/` 自体はそのまま返す */
function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * URLPattern の groups はパーセントエンコードされたまま返るので、デコードする。
 *
 * @returns デコードできない値（壊れたパーセントエンコード）があれば `undefined`
 */
function decodeParams(groups: RouteParams): RouteParams | undefined {
  try {
    return Object.fromEntries(
      Object.entries(groups).map(([name, value]) => [
        name,
        value === undefined ? undefined : decodeURIComponent(value),
      ]),
    );
  } catch {
    return undefined;
  }
}

/**
 * パスに当たる最初のルートを返す。
 *
 * @param routes `pattern` は URLPattern の pathname の書き方（`/posts/:slug` など）
 * @param path URL の pathname。末尾の `/` の有無は区別しない。エンコードの有無も区別しない
 * @returns 当たるルートが無ければ `undefined`。パーセントエンコードが壊れたパスも、当たらないものとして扱う
 */
export function matchRoute<R extends { pattern: string }>(
  routes: readonly R[],
  path: string,
): RouteMatch<R> | undefined {
  const pathname = normalizePath(path);
  for (const route of routes) {
    const result = new URLPattern({ pathname: route.pattern }).exec({ pathname });
    if (result) {
      const params = decodeParams(result.pathname.groups);
      return params && { route, params };
    }
  }
  return undefined;
}
