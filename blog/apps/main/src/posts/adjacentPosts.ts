/**
 * 並んだ記事の中で、指定した記事の前後を返す。
 *
 * @param posts 新しい順に並んだ記事
 * @returns `newer` は 1 つ新しい記事、`older` は 1 つ古い記事。端では無い側を持たない。`slug` の記事が無ければ空
 */
export function adjacentPosts<P extends { slug: string }>(
  posts: readonly P[],
  slug: string,
): { newer?: P; older?: P } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) {
    return {};
  }
  const newer = posts[index - 1];
  const older = posts[index + 1];
  return { ...(newer && { newer }), ...(older && { older }) };
}
