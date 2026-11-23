export type RouteParams = Record<string, string | undefined>;

export type RouteMatch<R> = {
  route: R;
  params: RouteParams;
};

function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

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
