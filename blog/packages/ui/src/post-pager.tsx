import { css } from "../styled-system/css";

type PagerLink = {
  href: string;
  title: string;
};

type Props = {
  newer?: PagerLink;
  older?: PagerLink;
};

const link = css({
  display: "flex",
  flexDirection: "column",
  gap: "pager.gap",
  textDecoration: "none",
  paddingBlock: "pager.itemPaddingBlock",
  borderBottom: { base: "default", md: "none" },
  md: { gridRow: 1 },
});

const label = css({ textStyle: "label", color: "fg.muted" });
const title = css({ textStyle: "subTitle" });

export function PostPager({ newer, older }: Props) {
  if (newer === undefined && older === undefined) {
    return null;
  }
  return (
    <nav
      aria-label="前後の記事"
      className={css({
        display: { base: "flex", md: "grid" },
        flexDirection: "column",
        borderTop: "default",
        md: {
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "pager.columnGap",
          paddingBlock: "pager.paddingBlock",
          borderBottom: "default",
        },
      })}
    >
      {newer !== undefined && (
        <a
          href={newer.href}
          className={`${link} ${css({ md: { gridColumn: 2, textAlign: "right" } })}`}
        >
          <span className={label}>次の記事</span>
          <span className={title}>{newer.title}</span>
        </a>
      )}
      {older !== undefined && (
        <a href={older.href} className={`${link} ${css({ md: { gridColumn: 1 } })}`}>
          <span className={label}>前の記事</span>
          <span className={title}>{older.title}</span>
        </a>
      )}
    </nav>
  );
}
