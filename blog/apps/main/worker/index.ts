export type ImageObject = {
  body: ReadableStream;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
};

export type ImageBucket = {
  get(key: string): Promise<ImageObject | null>;
};

type AssetsFetcher = {
  fetch(request: Request): Promise<Response>;
};

type Env = {
  IMAGES: ImageBucket;
  ASSETS: AssetsFetcher;
};

const IMAGE_PATH_PREFIX = "/images/";

export async function serveImage(request: Request, bucket: ImageBucket): Promise<Response> {
  const key = new URL(request.url).pathname.slice(IMAGE_PATH_PREFIX.length);
  const object = key === "" ? null : await bucket.get(key);
  if (!object) {
    return new Response("Not Found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
}

export default {
  fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname.startsWith(IMAGE_PATH_PREFIX)) {
      return serveImage(request, env.IMAGES);
    }
    return env.ASSETS.fetch(request);
  },
};
