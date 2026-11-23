import { css } from "../styled-system/css";

type Props = {
  siteName: string;
  topHref: string;
  listHref?: string;
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
