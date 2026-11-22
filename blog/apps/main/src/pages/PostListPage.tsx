import { postPath } from "../paths.ts";
import type { Post } from "../posts/index.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  /** 表示する順に並んだ記事 */
  posts: readonly Post[];
};

export function PostListPage({ posts }: Props) {
  return (
    <>
      <title>{SITE_NAME}</title>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>まだ記事がありません</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <time dateTime={post.date}>{post.date}</time>{" "}
              <a href={postPath(post.slug)}>{post.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
