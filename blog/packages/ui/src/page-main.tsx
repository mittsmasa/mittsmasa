import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

export function PageMain({ children }: Props) {
  return (
    <main
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "page.gap",
        maxWidth: "content",
        marginInline: "auto",
        paddingInline: "gutter",
        paddingTop: "page.top",
      })}
    >
      {children}
    </main>
  );
}
