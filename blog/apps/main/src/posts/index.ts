import { toPosts, type Post } from "./post.ts";

export type { Post };

// 読むのは content/posts だけ。下書きを置く content/drafts は対象に入れない
const sources = import.meta.glob<string>("../../../../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/** 公開している記事。新しい順 */
export const posts: Post[] = toPosts(sources);

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
