export const topPath = "/";

export const postListPattern = "/posts";

export const postListPath = "/posts/";

export const postPattern = "/posts/:slug";

export function postPath(slug: string): string {
  return `/posts/${slug}/`;
}
