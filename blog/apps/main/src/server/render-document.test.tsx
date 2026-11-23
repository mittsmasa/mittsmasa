import { Suspense, use, useId } from "react";
import { prerender } from "react-dom/static";
import { describe, expect, test, vi } from "vite-plus/test";
import { renderDocument } from "./render-document.ts";

function Labeled() {
  const id = useId();
  return <p id={id}>本文</p>;
}

function Page({ data }: { data: Promise<string> }) {
  const text = use(data);
  return (
    <>
      <title>題</title>
      <meta name="description" content="説明" />
      <Labeled />
      <p>{text}</p>
    </>
  );
}

function App({ data }: { data: Promise<string> }) {
  return (
    <div>
      <Labeled />
      <Suspense fallback="読み込み中">
        <Page data={data} />
      </Suspense>
    </div>
  );
}

function Broken(): never {
  throw new Error("壊れた");
}

describe("renderDocument", () => {
  test("title と meta は head に入り、#root には入らない", async () => {
    const { head, body } = await renderDocument(<App data={Promise.resolve("届いた")} />);

    expect(head).toContain("<title>題</title>");
    expect(head).toContain('<meta name="description" content="説明"/>');
    expect(body).not.toContain("<title");
    expect(body).not.toContain("<meta");
    expect(body).toContain("届いた");
  });

  // クライアントは #root に App だけを hydrateRoot する。useId の値がずれるとハイドレーションが合わない
  test("#root の中身は、App だけを描いたときと同じになる", async () => {
    const data = Promise.resolve("届いた");
    const { prelude } = await prerender(<App data={data} />);
    const alone = await new Response(prelude).text();

    const { head, body } = await renderDocument(<App data={data} />);

    expect(head + body).toBe(alone);
  });

  // React は既定では、大きな Suspense の中身を #root の外（</body> の直前）に出して描く
  test("Suspense の中身が大きくても、中身はすべて #root に入る", async () => {
    const long = "あ".repeat(20_000);

    const { body } = await renderDocument(<App data={Promise.resolve(long)} />);

    expect(body).toContain(long);
    expect(body).not.toContain("<template");
  });

  test("Suspense の中でエラーが起きると reject する", async () => {
    // React の onError の既定と同じく console.error にも出すので、テストの出力から外す
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      renderDocument(
        <Suspense fallback="読み込み中">
          <Broken />
        </Suspense>,
      ),
    ).rejects.toSatisfy(
      (error) => error instanceof AggregateError && error.errors[0]?.message === "壊れた",
    );

    consoleError.mockRestore();
  });
});
