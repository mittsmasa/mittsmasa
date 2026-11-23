import type { Plugin } from "vite-plus";
import { toExcerpt } from "../src/posts/excerpt.ts";
import { parseFrontmatter } from "../src/posts/frontmatter.ts";
import { toPostHtml } from "../src/posts/html.ts";
import { toPostFrontmatter, type PostMetaSource } from "../src/posts/post.ts";

export function postsPlugin(): Plugin {
  return {
    name: "blog-posts",
    transform: {
      filter: { id: /\.md\?/ },
      handler(code, id) {
        const [file = "", query = ""] = id.split("?");
        if (!file.endsWith(".md")) return undefined;

        const params = new URLSearchParams(query);
        if (params.has("meta")) {
          const name = file.slice(file.lastIndexOf("/") + 1);
          const { fields, body } = parseFrontmatter(code);
          const meta: PostMetaSource = {
            ...toPostFrontmatter(name, fields),
            excerpt: toExcerpt(body),
          };
          return { code: `export default ${JSON.stringify(meta)};`, map: null, moduleType: "js" };
        }
        if (params.has("body")) {
          const html = toPostHtml(parseFrontmatter(code).body);
          return { code: `export default ${JSON.stringify(html)};`, map: null, moduleType: "js" };
        }
        return undefined;
      },
    },
  };
}
