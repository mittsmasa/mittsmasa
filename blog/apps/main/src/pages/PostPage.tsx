import type { Post } from "../posts/index.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  post: Post;
};

export function PostPage({ post }: Props) {
  return (
    <article>
      <title>{`${post.title} | ${SITE_NAME}`}</title>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{post.date}</time>
      {/* html はリポジトリ内の Markdown を変換したもの。外部からの入力は通らない */}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
