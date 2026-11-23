import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const HEAD_PLACEHOLDER = "<!--app-head-->";
const BODY_PLACEHOLDER = "<!--app-html-->";

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
  const { head, body } = await renderToHtml(path).catch((error) => {
    throw new Error(`${path}: 描画できませんでした`, { cause: error });
  });
  if (!head.includes("<title>")) {
    throw new Error(`${path}: <title> がありません`);
  }

  const file = join(clientDir, path === "/" ? "" : path.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    template.replace(HEAD_PLACEHOLDER, () => head).replace(BODY_PLACEHOLDER, () => body),
  );
  console.log(`prerendered ${path}`);
}
