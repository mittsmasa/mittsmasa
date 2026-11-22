import { marked } from "marked";
import { parseFrontmatter } from "./frontmatter.ts";

export type Post = {
  /** URL に使う識別子。Markdown のファイル名から拡張子を除いたもの */
  slug: string;
  title: string;
  /** 公開日。`YYYY-MM-DD` */
  date: string;
  /** Markdown の本文を変換した HTML */
  html: string;
};

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Markdown のソースから記事を作る。
 *
 * @param slug 記事の識別子
 * @param source frontmatter 付きの Markdown
 * @throws frontmatter に `title` が無いとき、`date` が `YYYY-MM-DD` でないとき
 */
export function toPost(slug: string, source: string): Post {
  const { fields, body } = parseFrontmatter(source);
  const { title, date } = fields;
  if (!title) {
    throw new Error(`${slug}: frontmatter に title がありません`);
  }
  if (!date || !DATE_FORMAT.test(date)) {
    throw new Error(`${slug}: frontmatter の date は YYYY-MM-DD で書いてください`);
  }
  return { slug, title, date, html: marked.parse(body, { async: false }) };
}

function slugOf(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/, "");
}

/**
 * Markdown のファイルの集まりから、記事の一覧を作る。
 *
 * @param sources ファイルパスと、frontmatter 付きの Markdown の対応。slug はファイル名から拡張子を除いたもの
 * @returns 新しい順に並んだ記事
 * @throws `toPost` と同じ
 */
export function toPosts(sources: Record<string, string>): Post[] {
  return Object.entries(sources)
    .map(([filePath, source]) => toPost(slugOf(filePath), source))
    .sort((a, b) => b.date.localeCompare(a.date));
}
