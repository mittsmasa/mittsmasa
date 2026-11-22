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
  height: "44px",
  textDecoration: "none",
});

export function SiteHeader({ siteName, topHref, listHref, loading = false }: Props) {
  return (
    <header
      className={css({
        // 線は、モバイルでは本文の幅、PC では画面の幅いっぱい
        maxWidth: { base: "content", md: "none" },
        marginInline: "auto",
        borderBottom: "1px solid token(colors.fg)",
      })}
    >
      <div
        className={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: { base: "52px", md: "56px" },
          maxWidth: "content",
          marginInline: "auto",
          paddingInline: "gutter",
        })}
      >
        <a
          href={topHref}
          className={`${headerLink} ${css({ fontSize: "15px", fontWeight: 500, letterSpacing: "0.04em" })}`}
        >
          {siteName}
        </a>
        {/* 読み上げソフトに変化が伝わるよう、要素は常に置いて中身だけを入れ替える */}
        <p
          role="status"
          className={css({
            margin: 0,
            marginLeft: "16px",
            marginRight: "auto",
            fontSize: "12px",
            lineHeight: "20px",
            letterSpacing: "0.08em",
            color: "fgMuted",
          })}
        >
          {loading ? "読み込み中…" : ""}
        </p>
        {listHref !== undefined && (
          <a
            href={listHref}
            className={`${headerLink} ${css({ paddingLeft: "16px", textStyle: "smallLink" })}`}
          >
            一覧
          </a>
        )}
      </div>
    </header>
  );
}
