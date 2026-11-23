import { createBodyCache } from "./body-cache.ts";
import { slugOf, toPosts, type PostMeta, type PostMetaSource } from "./post.ts";

export type { PostMeta };

const metaSources = import.meta.glob<PostMetaSource>("../../../../content/posts/*.md", {
  query: "?meta",
  import: "default",
  eager: true,
});
const bodyLoaders = import.meta.glob<string>("../../../../content/posts/*.md", {
  query: "?body",
  import: "default",
});

export const posts: PostMeta[] = toPosts(metaSources);

export function findPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

async function waitForDevDelay(): Promise<void> {
  if (import.meta.env.DEV) {
    const ms = Number(import.meta.env.VITE_POST_BODY_DELAY_MS ?? 0);
    if (ms > 0) {
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
}

const bodyCache = createBodyCache(
  new Map(
    Object.entries(bodyLoaders).map(([filePath, load]) => [
      slugOf(filePath),
      () => waitForDevDelay().then(load),
    ]),
  ),
);

export const loadPostBody: (slug: string) => Promise<string> = bodyCache.load;

export const forgetFailedPostBodies: () => void = bodyCache.forgetFailed;
