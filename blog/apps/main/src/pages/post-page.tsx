import { Article, ArticleFooter, AuthorNote, PostPager, TextLink } from "@blog/ui";
import { use } from "react";
import { postListPath, postPath } from "../paths.ts";
import type { PostMeta } from "../posts/index.ts";
import { AUTHOR_NAME, SITE_NAME } from "./site.ts";

type Props = {
  post: PostMeta;
  body: Promise<string>;
  newer?: PostMeta;
  older?: PostMeta;
};

function pagerLink(post: PostMeta | undefined) {
  return post && { href: postPath(post.slug), title: post.title };
}

export function PostPage({ post, body, newer, older }: Props) {
  const html = use(body);
  return (
    <>
      <title>{`${post.title} | ${SITE_NAME}`}</title>
      <main>
        <Article date={post.date} title={post.title} html={html} />
      </main>
      <ArticleFooter>
        <AuthorNote name={AUTHOR_NAME} />
        <PostPager newer={pagerLink(newer)} older={pagerLink(older)} />
        <TextLink href={postListPath}>一覧にもどる</TextLink>
      </ArticleFooter>
    </>
  );
}
