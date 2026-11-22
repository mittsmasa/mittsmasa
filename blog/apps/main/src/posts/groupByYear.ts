export type YearGroup<P> = {
  /** `YYYY` */
  year: string;
  posts: P[];
};

/**
 * 記事を公開した年ごとにまとめる。
 *
 * @param posts 新しい順に並んだ記事。`date` は `YYYY-MM-DD`
 * @returns 新しい年から並んだまとまり。まとまりの中の順は `posts` のまま
 */
export function groupByYear<P extends { date: string }>(posts: readonly P[]): YearGroup<P>[] {
  const groups: YearGroup<P>[] = [];
  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const last = groups.at(-1);
    if (last?.year === year) {
      last.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }
  return groups;
}
