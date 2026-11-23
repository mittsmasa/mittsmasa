import { css } from "../styled-system/css";

type Props = {
  name: string;
};

export function AuthorNote({ name }: Props) {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "author.gap",
        paddingTop: "author.top",
        borderTop: "strong",
      })}
    >
      <div className={css({ textStyle: "label", color: "fg.muted" })}>書いた人</div>
      <div className={css({ textStyle: "authorName" })}>{name}</div>
    </div>
  );
}
