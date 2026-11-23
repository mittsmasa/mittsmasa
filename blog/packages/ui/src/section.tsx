import { useId, type ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  heading: string;
  children: ReactNode;
  footer?: ReactNode;
};

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
          margin: "none",
          paddingBottom: "section.headingBottom",
          borderBottom: "strong",
          textStyle: "sectionHeading",
        })}
      >
        {heading}
      </h2>
      {children}
      {footer !== undefined && (
        <div className={css({ display: "flex", marginTop: "section.footerTop" })}>{footer}</div>
      )}
    </section>
  );
}
