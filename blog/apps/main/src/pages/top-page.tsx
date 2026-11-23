import { FeaturedPost, Lead, PageMain, PostRow, Section, SiteFooter, TextLink } from "@blog/ui";
import { postListPath, postPath } from "../paths.ts";
import type { PostMeta } from "../posts/index.ts";
import { COPYRIGHT, SITE_LEAD, SITE_NAME } from "./site.ts";

const RECENT_COUNT = 4;

type Props = {
  posts: readonly PostMeta[];
};

export function TopPage({ posts }: Props) {
  const [latest, ...rest] = posts;
  const recent = rest.slice(0, RECENT_COUNT);
  return (
    <>
      <title>{SITE_NAME}</title>
      <PageMain>
        <Lead>{SITE_LEAD}</Lead>
        {latest === undefined ? (
          <Lead>まだ記事がありません</Lead>
        ) : (
          <Section heading="最新">
            <FeaturedPost
              href={postPath(latest.slug)}
              date={latest.date}
              title={latest.title}
              excerpt={latest.excerpt}
              moreLabel="つづきを読む"
            />
          </Section>
        )}
        {recent.length > 0 && (
          <Section
            heading="これまで"
            footer={<TextLink href={postListPath}>すべての記事</TextLink>}
          >
            {recent.map((post) => (
              <PostRow
                key={post.slug}
                href={postPath(post.slug)}
                date={post.date}
                title={post.title}
                dateStyle="full"
              />
            ))}
          </Section>
        )}
      </PageMain>
      <SiteFooter>{COPYRIGHT}</SiteFooter>
    </>
  );
}
