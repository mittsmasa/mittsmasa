import type { PostFrontmatter, PostMeta } from "./post.ts";

export type { PostMeta };

// 読むのは content/posts だけ。下書きを置く content/drafts は対象に入れない。
// ?meta と ?body は build/postsPlugin.ts が作る
const frontmatters = import.meta.glob<PostFrontmatter>("../../../../content/posts/*.md", {
  query: "?meta",
  import: "default",
  eager: true,
});
// 本文は記事ごとに別のチャンクになり、呼ぶまで読み込まれない
const bodyLoaders = import.meta.glob<string>("../../../../content/posts/*.md", {
  query: "?body",
  import: "default",
});

function slugOf(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/, "");
}

/** 公開している記事。新しい順 */
export const posts: PostMeta[] = Object.entries(frontmatters)
  .map(([filePath, frontmatter]) => ({ slug: slugOf(filePath), ...frontmatter }))
  .sort((a, b) => b.date.localeCompare(a.date));

export function findPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

const bodyLoaderOf = new Map(
  Object.entries(bodyLoaders).map(([filePath, load]) => [slugOf(filePath), load]),
);
const bodies = new Map<string, Promise<string>>();

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

/**
 * 記事の本文（HTML）を読み込む。
 * 同じ slug には同じ Promise を返すので、描画の中で `use` に渡せる。
 *
 * @throws 公開している記事に無い slug を渡したとき
 */
export function loadPostBody(slug: string): Promise<string> {
  const cached = bodies.get(slug);
  if (cached) return cached;

  const load = bodyLoaderOf.get(slug);
  if (!load) {
    throw new Error(`${slug}: 公開している記事にありません`);
  }
  const body = waitForDevDelay()
    .then(load)
    .catch((error: unknown) => {
      // 失敗した Promise を持ち続けると、次に開いたときも同じ失敗を返してしまう
      bodies.delete(slug);
      throw error;
    });
  bodies.set(slug, body);
  return body;
}
