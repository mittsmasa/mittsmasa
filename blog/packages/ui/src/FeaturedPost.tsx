import { css } from "../styled-system/css";
import { formatDate } from "./formatDate.ts";

type Props = {
  href: string;
  /** `YYYY-MM-DD` */
  date: string;
  title: string;
  excerpt: string;
  /** 記事へのリンクの文言。「つづきを読む」など */
  moreLabel: string;
};

/** 抜粋つきで大きく見せる記事。`Section` の中に置く */
export function FeaturedPost({ href, date, title, excerpt, moreLabel }: Props) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        marginTop: { base: "20px", md: "24px" },
      })}
    >
      <time dateTime={date} className={css({ textStyle: "meta", color: "fgMuted" })}>
        {formatDate(date, "full")}
      </time>
      <h3
        className={css({
          marginTop: { base: "6px", md: "8px" },
          marginBottom: { base: "12px", md: "14px" },
          fontSize: { base: "22px", md: "26px" },
          lineHeight: { base: "32px", md: "40px" },
          fontWeight: 500,
        })}
      >
        <a href={href} className={css({ textDecoration: "none" })}>
          {title}
        </a>
      </h3>
      <p
        className={css({
          margin: 0,
          fontSize: { base: "16px", md: "17px" },
          lineHeight: { base: 1.75, md: 1.8 },
        })}
      >
        {excerpt}
      </p>
      <a
        href={href}
        className={css({
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          height: "44px",
          marginTop: "4px",
          textStyle: "smallLink",
        })}
      >
        {moreLabel}
      </a>
    </div>
  );
}
