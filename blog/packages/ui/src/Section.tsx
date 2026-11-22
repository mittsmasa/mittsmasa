import { useId, type ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  heading: string;
  children: ReactNode;
  /** 中身の下に、少しあけて置くもの。「すべての記事」のリンクなど */
  footer?: ReactNode;
};

/** 見出しと濃い線で区切ったまとまり */
export function Section({ heading, children, footer }: Props) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={css({ display: "flex", flexDirection: "column" })}
    >
      <h2
        id={headingId}
        className={css({
          margin: 0,
          paddingBottom: "12px",
          borderBottom: "1px solid token(colors.fg)",
          fontSize: "13px",
          lineHeight: "20px",
          fontWeight: 500,
          letterSpacing: "0.08em",
        })}
      >
        {heading}
      </h2>
      {children}
      {footer !== undefined && (
        <div className={css({ display: "flex", marginTop: "8px" })}>{footer}</div>
      )}
    </section>
  );
}
