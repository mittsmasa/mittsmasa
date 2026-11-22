import { toPost, type Post } from "./post.ts";

export type { Post };

// 読むのは content/posts だけ。下書きを置く content/drafts は対象に入れない
const sources = import.meta.glob<string>("../../../../content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function slugOf(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/, "");
}

/** 公開している記事。新しい順 */
export const posts: Post[] = Object.entries(sources)
  .map(([filePath, source]) => toPost(slugOf(filePath), source))
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
