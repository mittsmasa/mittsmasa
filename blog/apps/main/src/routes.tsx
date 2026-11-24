import type { ReactElement } from "react";
import { PostListPage } from "./pages/post-list-page.tsx";
import { PostPage } from "./pages/post-page.tsx";
import { TopPage } from "./pages/top-page.tsx";
import { postListPath, postListPattern, postPath, postPattern, topPath } from "./paths.ts";
import { adjacentPosts } from "./posts/adjacent-posts.ts";
import { findPost, loadPostBody, posts } from "./posts/index.ts";
import { matchRoute, type RouteParams } from "./router/index.ts";

type AppRoute = {
  pattern: string;
  render: (params: RouteParams) => ReactElement | undefined;
};

const routes: readonly AppRoute[] = [
  {
    pattern: topPath,
    render: () => <TopPage posts={posts} />,
  },
  {
    pattern: postListPattern,
    render: () => <PostListPage posts={posts} />,
  },
  {
    pattern: postPattern,
    render: ({ slug }) => {
      const post = slug === undefined ? undefined : findPost(slug);
      return (
        post && (
          <PostPage
            post={post}
            body={loadPostBody(post.slug)}
            {...adjacentPosts(posts, post.slug)}
          />
        )
      );
    },
  },
];

export function renderPath(path: string): ReactElement | undefined {
  const matched = matchRoute(routes, path);
  return matched?.route.render(matched.params);
}

export const staticPaths: readonly string[] = [
  topPath,
  postListPath,
  ...posts.map((post) => postPath(post.slug)),
];
