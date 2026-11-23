// クライアント用と SSR 用のビルドのあとに実行し、各ページの静的 HTML を dist/client に書き出す
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

// トップページの出力先がひな形と同じ index.html なので、書き出す前に読んでおく
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

  const file = join(clientDir, path === "/" ? "" : path.slice(1), "index.html");
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    template.replace(HEAD_PLACEHOLDER, () => head).replace(BODY_PLACEHOLDER, () => body),
  );
  console.log(`prerendered ${path}`);
}
