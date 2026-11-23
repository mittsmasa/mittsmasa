export type YearGroup<P> = {
  year: string;
  posts: P[];
};

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
