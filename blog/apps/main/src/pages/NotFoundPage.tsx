import { postListPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";

export function NotFoundPage() {
  return (
    <>
      <title>{`Not Found | ${SITE_NAME}`}</title>
      <h1>Not Found</h1>
      <p>
        <a href={postListPath}>記事の一覧へ</a>
      </p>
    </>
  );
}
