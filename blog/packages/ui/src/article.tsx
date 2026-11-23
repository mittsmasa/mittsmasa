import { css } from "../styled-system/css";
import { formatDate } from "./format-date.ts";
import { PageTitle } from "./page-title.tsx";

type Props = {
  date: string;
  title: string;
  trustedHtml: string;
};

const prose = css({
  display: "flex",
  flexDirection: "column",
  gap: "prose.gap",
  "& p, & ul, & ol, & blockquote": { margin: "none" },
  "& h2": {
    marginTop: "prose.h2Top",
    marginBottom: "-prose.headingPull",
    paddingTop: "prose.h2PaddingTop",
    borderTop: "default",
    textStyle: "heading2",
  },
  "& h3": {
    marginTop: "prose.h3Top",
    marginBottom: "-prose.headingPull",
    textStyle: "heading3",
  },
  "& ul, & ol": { paddingLeft: "prose.listIndent" },
  "& li + li": { marginTop: "prose.listGap" },
  "& blockquote": {
    paddingLeft: "prose.quoteIndent",
    borderLeft: "quote",
    color: "fg.muted",
  },
  "& a": { textDecoration: "underline" },
  "& strong": { fontWeight: "emphasis" },
  "& pre": {
    marginBlock: "prose.preMargin",
    marginInline: "-gutter",
    paddingBlock: "prose.prePadding",
    paddingInline: "gutter",
    overflowX: "auto",
    background: "bg.code",
    fontFamily: "mono",
    textStyle: "code",
  },
  "& code": { fontFamily: "mono" },
  "& :not(pre) > code": {
    paddingBlock: "prose.inlineCodeY",
    paddingInline: "prose.inlineCodeX",
    background: "bg.code",
    textStyle: "inlineCode",
  },
  "& img": {
    display: "block",
    height: "auto",
    width: "proseImage",
    maxWidth: "none",
    marginInline: { base: "-gutter", md: "none" },
  },
});

export function Article({ date, title, trustedHtml }: Props) {
  return (
    <article
      className={css({
        maxWidth: "content",
        marginInline: "auto",
        paddingInline: "gutter",
        paddingTop: "article.top",
        textStyle: "body",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "article.headerGap",
          marginBottom: "article.headerBottom",
        })}
      >
        <time dateTime={date} className={css({ textStyle: "meta", color: "fg.muted" })}>
          {formatDate(date, "full")}
        </time>
        <PageTitle>{title}</PageTitle>
      </div>
      <div className={prose} dangerouslySetInnerHTML={{ __html: trustedHtml }} />
    </article>
  );
}
