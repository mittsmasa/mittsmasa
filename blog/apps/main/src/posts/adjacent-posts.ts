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
