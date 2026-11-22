import { css } from "../styled-system/css";
import { formatDate, type DateStyle } from "./formatDate.ts";

type Props = {
  href: string;
  /** `YYYY-MM-DD` */
  date: string;
  title: string;
  /** 日付の表記。年で区切った一覧の中では `monthDay` */
  dateStyle: DateStyle;
};

const dateBase = css({
  fontSize: { base: "12px", md: "13px" },
  lineHeight: { base: "20px", md: "26px" },
  letterSpacing: "0.06em",
  color: "fgMuted",
});

// PC では日付を列にそろえる。列の幅は表記の長さで決まる
const dateColumn: Record<DateStyle, string> = {
  full: css({ md: { flex: "0 0 88px" } }),
  monthDay: css({ md: { flex: "0 0 48px" } }),
};

/** 日付と題だけの記事の行。行の全体がリンク */
export function PostRow({ href, date, title, dateStyle }: Props) {
  return (
    <a
      href={href}
      className={css({
        display: "flex",
        flexDirection: { base: "column", md: "row" },
        alignItems: { md: "baseline" },
        gap: { base: "2px", md: "24px" },
        paddingBlock: { base: "12px", md: "13px" },
        borderBottom: "1px solid token(colors.line)",
        textDecoration: "none",
      })}
    >
      <time dateTime={date} className={`${dateBase} ${dateColumn[dateStyle]}`}>
        {formatDate(date, dateStyle)}
      </time>
      <span className={css({ fontSize: { base: "16px", md: "17px" }, lineHeight: "26px" })}>
        {title}
      </span>
    </a>
  );
}
