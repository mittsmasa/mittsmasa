import { Lead, PageMain, PostRow, Section, SiteFooter } from "@blog/ui";
import { postPath } from "../paths.ts";
import { groupByYear } from "../posts/groupByYear.ts";
import type { Post } from "../posts/index.ts";
import { COPYRIGHT, SITE_LEAD, SITE_NAME } from "./site.ts";

type Props = {
  /** 新しい順に並んだ記事 */
  posts: readonly Post[];
};

export function PostListPage({ posts }: Props) {
  return (
    <>
      <title>{`記事の一覧 | ${SITE_NAME}`}</title>
      <PageMain>
        <Lead>{SITE_LEAD}</Lead>
        {posts.length === 0 && <Lead>まだ記事がありません</Lead>}
        {groupByYear(posts).map((group) => (
          <Section key={group.year} heading={group.year}>
            {group.posts.map((post) => (
              <PostRow
                key={post.slug}
                href={postPath(post.slug)}
                date={post.date}
                title={post.title}
                dateStyle="monthDay"
              />
            ))}
          </Section>
        ))}
      </PageMain>
      <SiteFooter>{COPYRIGHT}</SiteFooter>
    </>
  );
}
