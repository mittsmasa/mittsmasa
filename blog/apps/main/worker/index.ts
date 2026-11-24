export type StoredImage = {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
};

export type ImageBucket = {
  get(key: string): Promise<StoredImage | null>;
};

export type ImageCache = {
  match(key: string): Promise<Response | undefined>;
  put(key: string, response: Response): Promise<void>;
};

export type ImageSource = {
  bucket: ImageBucket;
  cache: ImageCache;
  waitUntil(promise: Promise<unknown>): void;
};

type AssetsFetcher = {
  fetch(request: Request): Promise<Response>;
};

type Env = {
  IMAGES: ImageBucket;
  ASSETS: AssetsFetcher;
};

type ExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
};

const IMAGE_PATH_PREFIX = "/images/";
const IMAGE_CACHE_NAME = "images";

export async function serveImage(request: Request, source: ImageSource): Promise<Response> {
  const url = new URL(request.url);
  const key = url.pathname.slice(IMAGE_PATH_PREFIX.length);
  if (key === "") {
    return new Response("Not Found", { status: 404 });
  }

  const cacheKey = `${url.origin}${url.pathname}`;
  const cached = await source.cache.match(cacheKey);
  if (cached) {
    return cached;
  }

  const object = await source.bucket.get(key);
  if (!object) {
    return new Response("Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  const response = new Response(object.body, { headers });
  source.waitUntil(source.cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (new URL(request.url).pathname.startsWith(IMAGE_PATH_PREFIX)) {
      return serveImage(request, {
        bucket: env.IMAGES,
        cache: await caches.open(IMAGE_CACHE_NAME),
        waitUntil: (promise) => ctx.waitUntil(promise),
      });
    }
    return env.ASSETS.fetch(request);
  },
};
