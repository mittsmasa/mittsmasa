import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const HEAD_PLACEHOLDER = "<!--app-head-->";
const BODY_PLACEHOLDER = "<!--app-html-->";
const LEADING_TITLE = /^<title>[\s\S]*?<\/title>/;

const dist = join(import.meta.dirname, "..", "dist");
const clientDir = join(dist, "client");

const { renderToHtml, staticPaths } = await import(
  pathToFileURL(join(dist, "server", "entry-server.js")).href
);

const template = await readFile(join(clientDir, "index.html"), "utf8");
for (const placeholder of [HEAD_PLACEHOLDER, BODY_PLACEHOLDER]) {
  if (!template.includes(placeholder)) {
    throw new Error(`index.html に ${placeholder} がありません`);
  }
}

for (const path of staticPaths) {
  const html = await renderToHtml(path);
  const title = LEADING_TITLE.exec(html)?.[0];
  if (title === undefined) {
    throw new Error(`${path}: 描画結果の先頭に <title> がありません`);
  }
  const body = html.slice(title.length);

  const file = join(clientDir, path === "/" ? "" : path.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    template.replace(HEAD_PLACEHOLDER, () => title).replace(BODY_PLACEHOLDER, () => body),
  );
  console.log(`prerendered ${path}`);
}
