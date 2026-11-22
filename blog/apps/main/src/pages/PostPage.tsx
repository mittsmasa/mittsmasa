import { use } from "react";
import type { PostMeta } from "../posts/index.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  post: PostMeta;
  /** 本文の HTML。届くまで、いちばん近い Suspense が待つ */
  body: Promise<string>;
};

export function PostPage({ post, body }: Props) {
  const html = use(body);
  return (
    <article>
      <title>{`${post.title} | ${SITE_NAME}`}</title>
      <h1>{post.title}</h1>
      <time dateTime={post.date}>{post.date}</time>
      {/* html はリポジトリ内の Markdown を変換したもの。外部からの入力は通らない */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
