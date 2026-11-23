import { css } from "../styled-system/css";

type Props = {
  siteName: string;
  /** トップのパス */
  topHref: string;
  /** 一覧のパス。渡さなければ「一覧」のリンクを出さない */
  listHref?: string;
  /** 次のページを読み込んでいる間、true を渡す。「読み込み中…」を出す */
  loading?: boolean;
};

const headerLink = css({
  display: "flex",
  alignItems: "center",
  height: "tapTarget",
  textDecoration: "none",
});

export function SiteHeader({ siteName, topHref, listHref, loading = false }: Props) {
  return (
    <header
      className={css({
        // 線は、モバイルでは本文の幅、PC では画面の幅いっぱい
        maxWidth: { base: "content", md: "none" },
        marginInline: "auto",
        borderBottom: "strong",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "header",
          maxWidth: "content",
          marginInline: "auto",
          paddingInline: "gutter",
        })}
      >
        <a href={topHref} className={`${headerLink} ${css({ textStyle: "siteName" })}`}>
          {siteName}
        </a>
        {/* 読み上げソフトに変化が伝わるよう、要素は常に置いて中身だけを入れ替える */}
        <p
          role="status"
          className={css({
            margin: "none",
            marginLeft: "header.gap",
            marginRight: "auto",
            textStyle: "label",
            color: "fg.muted",
          })}
        >
          {loading ? "読み込み中…" : ""}
        </p>
        {listHref !== undefined && (
          <a
            href={listHref}
            className={`${headerLink} ${css({ paddingLeft: "header.gap", textStyle: "smallLink" })}`}
          >
            一覧
          </a>
        )}
      </div>
    </header>
  );
}
