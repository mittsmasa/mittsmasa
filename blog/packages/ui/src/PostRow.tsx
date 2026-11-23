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
  textStyle: "rowDate",
  color: "fg.muted",
});

// PC では日付を列にそろえる。列の幅は表記の長さで決まる
const dateColumn: Record<DateStyle, string> = {
  full: css({ md: { flex: "none", width: "dateColumn.full" } }),
  monthDay: css({ md: { flex: "none", width: "dateColumn.monthDay" } }),
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
        gap: "row.gap",
        paddingBlock: "row.paddingBlock",
        borderBottom: "default",
        textDecoration: "none",
      })}
    >
      <time dateTime={date} className={`${dateBase} ${dateColumn[dateStyle]}`}>
        {formatDate(date, dateStyle)}
      </time>
      <span className={css({ textStyle: "rowTitle" })}>{title}</span>
    </a>
  );
}
