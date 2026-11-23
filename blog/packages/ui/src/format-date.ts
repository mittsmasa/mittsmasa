/** `full` は `2026.11.18`、`monthDay` は `11.18` */
export type DateStyle = "full" | "monthDay";

/**
 * 日付を画面に出す表記にする。
 *
 * @param date `YYYY-MM-DD`
 */
export function formatDate(date: string, style: DateStyle): string {
  const [year, month, day] = date.split("-");
  return style === "full" ? `${year}.${month}.${day}` : `${month}.${day}`;
}
