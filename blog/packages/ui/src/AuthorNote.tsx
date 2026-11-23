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
        gap: "6px",
        paddingTop: { base: "20px", md: "24px" },
        borderTop: "1px solid token(colors.fg)",
      })}
    >
      <div className={css({ textStyle: "label", color: "fgMuted" })}>書いた人</div>
      <div className={css({ fontSize: "15px", lineHeight: "24px", fontWeight: 500 })}>{name}</div>
    </div>
  );
}
