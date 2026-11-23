import { createBodyCache } from "./body-cache.ts";
import { slugOf, toPosts, type PostMeta, type PostMetaSource } from "./post.ts";

export type { PostMeta };

// 読むのは content/posts だけ。下書きを置く content/drafts は対象に入れない。
// ?meta と ?body は build/posts-plugin.ts が作る
const metaSources = import.meta.glob<PostMetaSource>("../../../../content/posts/*.md", {
  query: "?meta",
  import: "default",
  eager: true,
});
// 本文は記事ごとに別のチャンクになり、呼ぶまで読み込まれない
const bodyLoaders = import.meta.glob<string>("../../../../content/posts/*.md", {
  query: "?body",
  import: "default",
});

/** 公開している記事。新しい順 */
export const posts: PostMeta[] = toPosts(metaSources);

export function findPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * 検証用の細工。開発サーバーで `VITE_POST_BODY_DELAY_MS` を指定すると、本文の読み込みをその時間だけ遅らせる。
 * 遷移中の表示を目で確かめるためのもので、本番のビルドには入らない。
 */
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

/**
 * 記事の本文（HTML）を読み込む。
 * 同じ slug には同じ Promise を返すので、描画の中で `use` に渡せる。
 * 失敗した Promise も、`forgetFailedPostBodies` を呼ぶまで同じものを返す。
 *
 * @throws 公開している記事に無い slug を渡したとき
 */
export const loadPostBody: (slug: string) => Promise<string> = bodyCache.load;

/** 失敗した本文の読み込みを捨てる。次の `loadPostBody` は読み込み直す。描画の外で呼ぶ */
export const forgetFailedPostBodies: () => void = bodyCache.forgetFailed;
