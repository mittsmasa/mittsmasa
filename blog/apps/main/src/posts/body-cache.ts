type BodyLoaders = ReadonlyMap<string, () => Promise<string>>;

export type BodyCache = {
  load: (slug: string) => Promise<string>;
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
