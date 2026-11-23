/** slug ごとの、本文の読み込み方 */
type BodyLoaders = ReadonlyMap<string, () => Promise<string>>;

export type BodyCache = {
  /**
   * 本文を読み込む。同じ slug には同じ Promise を返すので、描画の中で `use` に渡せる。
   * 失敗した Promise も、`forgetFailed` を呼ぶまで同じものを返す。
   *
   * @throws `loaders` に無い slug を渡したとき
   */
  load: (slug: string) => Promise<string>;
  /** 失敗した読み込みを捨てる。次の `load` は読み込み直す。成功したもの、読み込み中のものは残す */
  forgetFailed: () => void;
};

type Entry = {
  body: Promise<string>;
  failed: boolean;
};

export function createBodyCache(loaders: BodyLoaders): BodyCache {
  const entries = new Map<string, Entry>();

  return {
    load(slug) {
      const cached = entries.get(slug);
      if (cached) return cached.body;

      const loader = loaders.get(slug);
      if (!loader) {
        throw new Error(`${slug}: 公開している記事にありません`);
      }
      const entry: Entry = { body: loader(), failed: false };
      // 失敗した Promise を消さずに残す。消すと、描画をやり直すたびに読み込み直してしまう
      entry.body.catch(() => {
        entry.failed = true;
      });
      entries.set(slug, entry);
      return entry.body;
    },
    forgetFailed() {
      for (const [slug, entry] of entries) {
        if (entry.failed) entries.delete(slug);
      }
    },
  };
}
