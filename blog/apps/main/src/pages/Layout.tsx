import { Suspense, ViewTransition, type ReactNode } from "react";
import { postListPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";

type Props = {
  /** 次のページの描画を待っている間、true を渡す */
  pending: boolean;
  children: ReactNode;
};

export function Layout({ pending, children }: Props) {
  return (
    <>
      <header>
        <a href={postListPath}>{SITE_NAME}</a>
        {pending && <p role="status">読み込み中…</p>}
      </header>
      <main>
        {/* key を付けない。遷移の間は前のページを残し、切り替わるときにクロスフェードする */}
        <ViewTransition>
          <Suspense fallback={<p>読み込み中…</p>}>{children}</Suspense>
        </ViewTransition>
      </main>
    </>
  );
}
