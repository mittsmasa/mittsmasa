export type PostFrontmatter = {
  title: string;
  date: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  excerpt: string;
};

export type PostMetaSource = Omit<PostMeta, "slug">;

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

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

export function slugOf(filePath: string): string {
  return filePath.slice(filePath.lastIndexOf("/") + 1).replace(/\.md$/, "");
}

export function toPosts(sources: Record<string, PostMetaSource>): PostMeta[] {
  return Object.entries(sources)
    .map(([filePath, source]) => ({ slug: slugOf(filePath), ...source }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
