import { css } from "../styled-system/css";
import { formatDate } from "./format-date.ts";

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
        marginTop: "featured.top",
      })}
    >
      <time dateTime={date} className={css({ textStyle: "meta", color: "fg.muted" })}>
        {formatDate(date, "full")}
      </time>
      <h3
        className={css({
          marginTop: "featured.titleTop",
          marginBottom: "featured.titleBottom",
          textStyle: "featuredTitle",
        })}
      >
        <a href={href} className={css({ textDecoration: "none" })}>
          {title}
        </a>
      </h3>
      <p
        className={css({
          margin: "none",
          textStyle: "body",
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
          height: "tapTarget",
          marginTop: "featured.moreTop",
          textStyle: "smallLink",
        })}
      >
        {moreLabel}
      </a>
    </div>
  );
}
