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
  gap: { base: "20px", md: "22px" },
  lineHeight: { base: 1.75, md: 1.8 },
  "& p, & ul, & ol, & blockquote": { margin: 0 },
  "& h2": {
    // 上の段落との間を広げ、下の段落との間を詰める
    margin: { base: "12px 0 -6px", md: "18px 0 -6px" },
    paddingTop: { base: "20px", md: "24px" },
    borderTop: "1px solid token(colors.line)",
    fontSize: { base: "19px", md: "22px" },
    lineHeight: { base: "30px", md: "34px" },
    fontWeight: 500,
  },
  "& h3": {
    margin: "8px 0 -6px",
    fontSize: { base: "17px", md: "19px" },
    lineHeight: { base: "28px", md: "30px" },
    fontWeight: 500,
  },
  "& ul, & ol": { paddingLeft: "1.5em" },
  "& li + li": { marginTop: "8px" },
  "& blockquote": {
    paddingLeft: "16px",
    borderLeft: "2px solid token(colors.line)",
    color: "fgMuted",
  },
  "& a": { textDecoration: "underline" },
  "& strong": { fontWeight: 500 },
  "& pre": {
    // 左右の余白を打ち消して、端まで広げる
    marginBlock: { base: "4px", md: "6px" },
    marginInline: "-gutter",
    paddingBlock: { base: "16px", md: "20px" },
    paddingInline: "gutter",
    overflowX: "auto",
    background: "codeBg",
    fontFamily: "mono",
    fontSize: { base: "13px", md: "14px" },
    lineHeight: { base: "21px", md: "23px" },
  },
  "& code": { fontFamily: "mono" },
  "& :not(pre) > code": { padding: "2px 4px", background: "codeBg", fontSize: "0.9em" },
  "& img": {
    display: "block",
    height: "auto",
    // モバイルは左右の余白を打ち消して端まで、PC は本文の幅
    width: { base: "calc(100% + token(spacing.gutter) * 2)", md: "100%" },
    maxWidth: "none",
    marginInline: { base: "-gutter", md: "0" },
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
        paddingTop: { base: "28px", md: "56px" },
        fontSize: { base: "16px", md: "17px" },
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: { base: "8px", md: "10px" },
          marginBottom: { base: "28px", md: "40px" },
        })}
      >
        <time dateTime={date} className={css({ textStyle: "meta", color: "fgMuted" })}>
          {formatDate(date, "full")}
        </time>
        <PageTitle>{title}</PageTitle>
      </div>
      <div className={prose} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
