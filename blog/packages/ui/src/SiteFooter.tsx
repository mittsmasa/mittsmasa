import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

export function SiteFooter({ children }: Props) {
  return (
    <footer
      className={css({
        maxWidth: "content",
        marginInline: "auto",
        paddingInline: "gutter",
        paddingTop: { base: "44px", md: "64px" },
        paddingBottom: { base: "40px", md: "56px" },
        fontSize: "12px",
        lineHeight: "20px",
        letterSpacing: "0.06em",
        color: "fgMuted",
      })}
    >
      {children}
    </footer>
  );
}
