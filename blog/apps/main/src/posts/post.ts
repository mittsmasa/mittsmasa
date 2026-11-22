/** frontmatter から読む、記事ごとの情報 */
export type PostFrontmatter = {
  title: string;
  /** 公開日。`YYYY-MM-DD` */
  date: string;
};

/** 一覧に出す情報。本文は含まない */
export type PostMeta = PostFrontmatter & {
  /** URL に使う識別子。Markdown のファイル名から拡張子を除いたもの */
  slug: string;
};

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/**
 * frontmatter の値を検査して、記事ごとの情報にする。
 *
 * @param name エラーに出す、記事の名前
 * @param fields `parseFrontmatter` が返す `fields`
 * @throws `title` が無いとき、`date` が `YYYY-MM-DD` でないとき
 */
export function toPostFrontmatter(name: string, fields: Record<string, string>): PostFrontmatter {
  const { title, date } = fields;
  if (!title) {
    throw new Error(`${name}: frontmatter に title がありません`);
  }
  if (!date || !DATE_FORMAT.test(date)) {
    throw new Error(`${name}: frontmatter の date は YYYY-MM-DD で書いてください`);
  }
  return { title, date };
}

/** ファイルパスから slug（ファイル名から拡張子を除いたもの）を作る */
export function slugOf(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/, "");
}

/**
 * Markdown のファイルごとの frontmatter から、記事の一覧を作る。
 *
 * @param frontmatters ファイルパスと、検査済みの frontmatter の対応
 * @returns 新しい順に並んだ記事
 */
export function toPosts(frontmatters: Record<string, PostFrontmatter>): PostMeta[] {
  return Object.entries(frontmatters)
    .map(([filePath, frontmatter]) => ({ slug: slugOf(filePath), ...frontmatter }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
