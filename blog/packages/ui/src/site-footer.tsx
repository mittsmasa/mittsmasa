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
        paddingTop: "footer.top",
        paddingBottom: "footer.bottom",
        textStyle: "footnote",
        color: "fg.muted",
      })}
    >
      {children}
    </footer>
  );
}
