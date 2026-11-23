import { css } from "../styled-system/css";
import { formatDate, type DateStyle } from "./format-date.ts";

type Props = {
  href: string;
  date: string;
  title: string;
  dateStyle: DateStyle;
};

const dateBase = css({
  textStyle: "rowDate",
  color: "fg.muted",
});

const dateColumn: Record<DateStyle, string> = {
  full: css({ md: { flex: "none", width: "dateColumn.full" } }),
  monthDay: css({ md: { flex: "none", width: "dateColumn.monthDay" } }),
};

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
