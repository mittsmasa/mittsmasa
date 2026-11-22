import { SITE_NAME } from "./site.ts";

type Props = {
  /** 再試行のリンクの行き先。今のページの pathname */
  path: string;
};

export function LoadErrorPage({ path }: Props) {
  return (
    <>
      <title>{`表示できませんでした | ${SITE_NAME}`}</title>
      <h1>表示できませんでした</h1>
      <p>ページの読み込みに失敗しました。通信の状態を確かめて、もう一度試してください。</p>
      <p>
        {/* 今と同じパスへの遷移。ルーターが受け取り、失敗した読み込みをやり直す */}
        <a href={path}>もう一度読み込む</a>
      </p>
      <p>それでも表示されないときは、ブラウザでページを再読み込みしてください。</p>
    </>
  );
}
