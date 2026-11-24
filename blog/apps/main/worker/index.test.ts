import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import worker, {
  serveImage,
  type ImageBucket,
  type ImageCache,
  type ImageSource,
} from "./index.ts";

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

function memoryCache(): ImageCache & { storedKeys(): string[] } {
  const entries = new Map<string, { body: ArrayBuffer; headers: Headers; status: number }>();
  return {
    storedKeys: () => [...entries.keys()],
    async match(key) {
      const entry = entries.get(key);
      if (!entry) return undefined;
      return new Response(entry.body, { status: entry.status, headers: entry.headers });
    },
    async put(key, response) {
      entries.set(key, {
        body: await response.arrayBuffer(),
        headers: new Headers(response.headers),
        status: response.status,
      });
    },
  };
}

function sourceWith(bucket: ImageBucket, cache: ImageCache = memoryCache()) {
  const pending: Promise<unknown>[] = [];
  const source: ImageSource = {
    bucket,
    cache,
    waitUntil: (promise) => {
      pending.push(promise);
    },
  };
  return { source, settle: () => Promise.all(pending) };
}

const assets = {
  async fetch(request: Request) {
    return new Response(`asset:${new URL(request.url).pathname}`);
  },
};

const executionContext = { waitUntil: () => {} };

describe("serveImage", () => {
  test("/images/ を外したパスをキーとして引き、保存時のヘッダと ETag を付けて返す", async () => {
    const bucket = bucketWith({ "a-b/0123456789ab.png": "png-bytes" });
    const { source } = sourceWith(bucket);

    const response = await serveImage(
      new Request("https://blog.example/images/a-b/0123456789ab.png"),
      source,
    );

    expect(bucket.requestedKeys).toEqual(["a-b/0123456789ab.png"]);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
    expect(response.headers.get("etag")).toBe('"etag-of-a-b/0123456789ab.png"');
    expect(await response.text()).toBe("png-bytes");
  });

  test("一度返した画像は、次からバケットを引かずにキャッシュから同じ中身とヘッダで返す", async () => {
    const bucket = bucketWith({ "a-b/0123456789ab.png": "png-bytes" });
    const { source, settle } = sourceWith(bucket);
    const request = () => new Request("https://blog.example/images/a-b/0123456789ab.png");

    await (await serveImage(request(), source)).text();
    await settle();
    const second = await serveImage(request(), source);

    expect(bucket.requestedKeys).toEqual(["a-b/0123456789ab.png"]);
    expect(second.headers.get("content-type")).toBe("image/png");
    expect(second.headers.get("etag")).toBe('"etag-of-a-b/0123456789ab.png"');
    expect(await second.text()).toBe("png-bytes");
  });

  test("クエリ文字列を変えても同じキャッシュに当たり、バケットを引き直さない", async () => {
    const bucket = bucketWith({ "a-b/0123456789ab.png": "png-bytes" });
    const { source, settle } = sourceWith(bucket);

    await serveImage(new Request("https://blog.example/images/a-b/0123456789ab.png"), source);
    await settle();
    const response = await serveImage(
      new Request("https://blog.example/images/a-b/0123456789ab.png?v=2"),
      source,
    );

    expect(bucket.requestedKeys).toEqual(["a-b/0123456789ab.png"]);
    expect(await response.text()).toBe("png-bytes");
  });

  test("バケットに無いキーは 404 を返し、キャッシュに置かない", async () => {
    const cache = memoryCache();
    const { source, settle } = sourceWith(bucketWith({}), cache);

    const response = await serveImage(
      new Request("https://blog.example/images/a-b/missing.png"),
      source,
    );
    await settle();

    expect(response.status).toBe(404);
    expect(cache.storedKeys()).toEqual([]);
  });

  test("/images/ だけのパスはバケットを引かずに 404 を返す", async () => {
    const bucket = bucketWith({});
    const { source } = sourceWith(bucket);

    const response = await serveImage(new Request("https://blog.example/images/"), source);

    expect(response.status).toBe(404);
    expect(bucket.requestedKeys).toEqual([]);
  });
});

describe("worker.fetch", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("/images/ 以下は R2 から返す", async () => {
    vi.stubGlobal("caches", { open: async () => memoryCache() });
    const env = { IMAGES: bucketWith({ "a-b/0123456789ab.png": "png-bytes" }), ASSETS: assets };

    const response = await worker.fetch(
      new Request("https://blog.example/images/a-b/0123456789ab.png"),
      env,
      executionContext,
    );

    expect(await response.text()).toBe("png-bytes");
  });

  test("/images/ 以外は静的アセットに任せる", async () => {
    const env = { IMAGES: bucketWith({}), ASSETS: assets };

    const response = await worker.fetch(
      new Request("https://blog.example/posts/hello-world/"),
      env,
      executionContext,
    );

    expect(await response.text()).toBe("asset:/posts/hello-world/");
  });
});
