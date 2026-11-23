import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const BUCKET_NAME = "mittsmasa-blog-images";
export const CACHE_CONTROL = "public, max-age=31536000, immutable";

const SLUG_FORMAT = /^[a-z0-9-]+$/;
const HASH_LENGTH = 12;
const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
};

export type ImageUpload = {
  key: string;
  contentType: string;
  markdown: string;
};

export function assertSlug(slug: string): void {
  if (!SLUG_FORMAT.test(slug)) {
    throw new Error(`slug は ${SLUG_FORMAT.source} の形で渡してください: ${slug}`);
  }
}

export function toImageUpload(slug: string, fileName: string, bytes: Uint8Array): ImageUpload {
  assertSlug(slug);
  const extension = extname(fileName).toLowerCase();
  const contentType = CONTENT_TYPES[extension];
  if (!contentType) {
    throw new Error(
      `${fileName}: 上げられるのは ${Object.keys(CONTENT_TYPES).join(" / ")} だけです`,
    );
  }
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, HASH_LENGTH);
  const key = `${slug}/${hash}${extension}`;
  return { key, contentType, markdown: `![](/images/${key})` };
}

function run(command: string, args: string[], input = ""): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["pipe", "pipe", "inherit"] });
    let stdout = "";
    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
      } else {
        reject(new Error(`${command} が終了コード ${code} で終わりました`));
      }
    });
    child.stdin.end(input);
  });
}

async function readClipboardImage(workDir: string): Promise<string> {
  const copiedFile = await run("osascript", [
    "-e",
    "POSIX path of (the clipboard as «class furl»)",
  ]).catch(() => undefined);
  if (copiedFile) {
    return copiedFile.trim();
  }

  const pasted = join(workDir, "clipboard.png");
  await run("osascript", [
    "-e",
    `set target to open for access (POSIX file "${pasted}") with write permission`,
    "-e",
    "write (the clipboard as «class PNGf») to target",
    "-e",
    "close access target",
  ]).catch(() => {
    throw new Error("クリップボードに画像もファイルもありません");
  });
  return pasted;
}

async function main(): Promise<void> {
  const [slug = "", file] = process.argv.slice(2);
  assertSlug(slug);

  const workDir = await mkdtemp(join(tmpdir(), "upload-image-"));
  try {
    const path = file ?? (await readClipboardImage(workDir));
    const image = toImageUpload(slug, path, await readFile(path));

    const wrangler = fileURLToPath(new URL("../node_modules/.bin/wrangler", import.meta.url));
    await run(wrangler, [
      "r2",
      "object",
      "put",
      `${BUCKET_NAME}/${image.key}`,
      "--file",
      path,
      "--content-type",
      image.contentType,
      "--cache-control",
      CACHE_CONTROL,
      "--remote",
    ]);

    await run("pbcopy", [], image.markdown);
    console.log(image.markdown);
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

if (import.meta.main) {
  try {
    await main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
