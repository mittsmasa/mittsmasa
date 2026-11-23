import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

export function ArticleFooter({ children }: Props) {
  return (
    <footer
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "footer.gap",
        maxWidth: "content",
        marginInline: "auto",
        paddingInline: "gutter",
        paddingTop: "footer.top",
        paddingBottom: "footer.bottom",
      })}
    >
      {children}
    </footer>
  );
}
