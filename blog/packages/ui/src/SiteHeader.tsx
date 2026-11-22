import { css } from "../styled-system/css";

type Props = {
  siteName: string;
  /** トップのパス */
  homeHref: string;
  /** 一覧のパス。渡さなければ「一覧」のリンクを出さない */
  listHref?: string;
};

const headerLink = css({
  display: "flex",
  alignItems: "center",
  height: "44px",
  textDecoration: "none",
});

export function SiteHeader({ siteName, homeHref, listHref }: Props) {
  return (
    <header
      className={css({
        // 線は、モバイルでは本文の幅、PC では画面の幅いっぱい
        maxWidth: { base: "640px", md: "none" },
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
          href={homeHref}
          className={`${headerLink} ${css({ fontSize: "15px", fontWeight: 500, letterSpacing: "0.04em" })}`}
        >
          {siteName}
        </a>
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
