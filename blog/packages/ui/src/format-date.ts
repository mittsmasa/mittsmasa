export type DateStyle = "full" | "monthDay";

export function formatDate(date: string, style: DateStyle): string {
  const [year, month, day] = date.split("-");
  return style === "full" ? `${year}.${month}.${day}` : `${month}.${day}`;
}
