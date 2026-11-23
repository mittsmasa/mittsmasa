import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

/** トップと一覧の `<main>`。子を縦に並べ、セクションの間をあける */
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
