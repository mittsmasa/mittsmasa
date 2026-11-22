/** 一覧ページのパス */
export const postListPath = "/";

/**
 * 記事ページの pattern（URLPattern の pathname の書き方）。
 *
 * 記事の URL の形は、これと `postPath` の 2 つで決まる。変えるときは両方をそろえる。
 */
export const postPattern = "/posts/:slug";

/**
 * 記事ページのパス。
 *
 * 静的 HTML を `posts/<slug>/index.html` に書き出すので、末尾に `/` を付ける。
 * 付けないと、静的ファイルのサーバーによっては別の HTML が返る。
 */
export function postPath(slug: string): string {
  return `/posts/${slug}/`;
}
