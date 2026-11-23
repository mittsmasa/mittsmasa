import { describe, expect, test } from "vite-plus/test";
import worker, { serveImage, type ImageBucket } from "./index.ts";

function bucketWith(objects: Record<string, string>): ImageBucket & { requestedKeys: string[] } {
  const requestedKeys: string[] = [];
  return {
    requestedKeys,
    async get(key) {
      requestedKeys.push(key);
      const content = objects[key];
      if (content === undefined) return null;
      return {
        body: new Blob([content]).stream(),
        httpEtag: `"etag-of-${key}"`,
        writeHttpMetadata(headers) {
          headers.set("content-type", "image/png");
          headers.set("cache-control", "public, max-age=31536000, immutable");
        },
      };
    },
  };
}

const assets = {
  async fetch(request: Request) {
    return new Response(`asset:${new URL(request.url).pathname}`);
  },
};

describe("serveImage", () => {
  test("/images/ を外したパスをキーとして引き、保存時のヘッダと ETag を付けて返す", async () => {
    const bucket = bucketWith({ "a-b/0123456789ab.png": "png-bytes" });

    const response = await serveImage(
      new Request("https://blog.example/images/a-b/0123456789ab.png"),
      bucket,
    );

    expect(bucket.requestedKeys).toEqual(["a-b/0123456789ab.png"]);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
    expect(response.headers.get("etag")).toBe('"etag-of-a-b/0123456789ab.png"');
    expect(await response.text()).toBe("png-bytes");
  });

  test("バケットに無いキーは 404 を返す", async () => {
    const response = await serveImage(
      new Request("https://blog.example/images/a-b/missing.png"),
      bucketWith({}),
    );

    expect(response.status).toBe(404);
  });

  test("/images/ だけのパスはバケットを引かずに 404 を返す", async () => {
    const bucket = bucketWith({});

    const response = await serveImage(new Request("https://blog.example/images/"), bucket);

    expect(response.status).toBe(404);
    expect(bucket.requestedKeys).toEqual([]);
  });
});

describe("worker.fetch", () => {
  test("/images/ 以下は R2 から返す", async () => {
    const env = { IMAGES: bucketWith({ "a-b/0123456789ab.png": "png-bytes" }), ASSETS: assets };

    const response = await worker.fetch(
      new Request("https://blog.example/images/a-b/0123456789ab.png"),
      env,
    );

    expect(await response.text()).toBe("png-bytes");
  });

  test("/images/ 以外は静的アセットに任せる", async () => {
    const env = { IMAGES: bucketWith({}), ASSETS: assets };

    const response = await worker.fetch(
      new Request("https://blog.example/posts/hello-world/"),
      env,
    );

    expect(await response.text()).toBe("asset:/posts/hello-world/");
  });
});
