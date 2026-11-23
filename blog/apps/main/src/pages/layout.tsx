import { Lead, PageMain, SiteHeader } from "@blog/ui";
import { Suspense, ViewTransition, type ReactNode } from "react";
import { postListPath, topPath } from "../paths.ts";
import { SITE_NAME } from "./site.ts";
import { useDelayed } from "./use-delayed.ts";

/** 遷移がこの時間（ミリ秒）より長くかかったときだけ、読み込み中の表示を出す */
const PENDING_DELAY_MS = 200;

type Props = {
  /** ヘッダーに「一覧」のリンクを出すか。一覧ページ自身では出さない */
  listLink: boolean;
  /** 次のページの描画を待っている間、true を渡す */
  pending: boolean;
  children: ReactNode;
};

export function Layout({ listLink, pending, children }: Props) {
  const showsPending = useDelayed(pending, PENDING_DELAY_MS);
  return (
    <>
      <SiteHeader
        siteName={SITE_NAME}
        topHref={topPath}
        listHref={listLink ? postListPath : undefined}
        loading={showsPending}
      />
      {/* key を付けない。遷移の間は前のページを残し、切り替わるときにクロスフェードする */}
      <ViewTransition>
        <Suspense
          fallback={
            <PageMain>
              <Lead>読み込み中…</Lead>
            </PageMain>
          }
        >
          {children}
        </Suspense>
      </ViewTransition>
    </>
  );
}
