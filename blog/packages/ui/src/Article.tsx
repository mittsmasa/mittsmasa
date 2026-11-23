import { css } from "../styled-system/css";
import { formatDate } from "./formatDate.ts";
import { PageTitle } from "./PageTitle.tsx";

type Props = {
  /** `YYYY-MM-DD` */
  date: string;
  title: string;
  /** 本文の HTML。信頼できる出どころのものだけを渡す。無害化はしない */
  html: string;
};

// 本文は Markdown から出た HTML で、要素にクラスを付けられない。要素を名指しして組む
const prose = css({
  display: "flex",
  flexDirection: "column",
  gap: "prose.gap",
  "& p, & ul, & ol, & blockquote": { margin: "none" },
  "& h2": {
    // 上の段落との間を広げ、下の段落との間を詰める
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
    // 左右の余白を打ち消して、端まで広げる
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
    // モバイルは左右の余白を打ち消して端まで、PC は本文の幅
    width: "proseImage",
    maxWidth: "none",
    marginInline: { base: "-gutter", md: "none" },
  },
});

/** 記事の日付、題、本文 */
export function Article({ date, title, html }: Props) {
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
      <div className={prose} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
