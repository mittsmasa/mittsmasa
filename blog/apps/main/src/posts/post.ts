import { marked } from "marked";

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

/**
 * Markdown の本文を HTML に変換する。
 *
 * @param body frontmatter を除いた Markdown
 */
export function toPostHtml(body: string): string {
  return marked.parse(body, { async: false });
}
