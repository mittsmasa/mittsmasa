import type { ReactNode } from "react";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { PostListPage } from "./pages/PostListPage.tsx";
import { PostPage } from "./pages/PostPage.tsx";
import { postListPath, postPath } from "./paths.ts";
import { findPost, loadPostBody, posts } from "./posts/index.ts";
import type { RouteParams } from "./router/index.ts";

export type AppRoute = {
  /** URLPattern の pathname の書き方 */
  pattern: string;
  render: (params: RouteParams) => ReactNode;
};

export const routes: readonly AppRoute[] = [
  {
    pattern: postListPath,
    render: () => <PostListPage posts={posts} />,
  },
  {
    pattern: "/posts/:slug",
    render: ({ slug }) => {
      const post = slug === undefined ? undefined : findPost(slug);
      return post ? <PostPage post={post} body={loadPostBody(post.slug)} /> : <NotFoundPage />;
    },
  },
];

/** 静的 HTML として書き出すパスの一覧 */
export const staticPaths: readonly string[] = [
  postListPath,
  ...posts.map((post) => postPath(post.slug)),
];
