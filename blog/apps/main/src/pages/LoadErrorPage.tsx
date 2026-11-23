import { Lead, PageMain, PageTitle, TextLink } from "@blog/ui";
import { SITE_NAME } from "./site.ts";

type Props = {
  /** 再試行のリンクの行き先。今のページの pathname */
  path: string;
};

export function LoadErrorPage({ path }: Props) {
  return (
    <>
      <title>{`表示できませんでした | ${SITE_NAME}`}</title>
      <PageMain>
        <PageTitle>表示できませんでした</PageTitle>
        <Lead>ページの読み込みに失敗しました。通信の状態を確かめて、もう一度試してください。</Lead>
        {/* 今と同じパスへの遷移。ルーターが受け取り、失敗した読み込みをやり直す */}
        <TextLink href={path}>もう一度読み込む</TextLink>
        <Lead>それでも表示されないときは、ブラウザでページを再読み込みしてください。</Lead>
      </PageMain>
    </>
  );
}
