import type { ReactNode } from "react";
import { css } from "../styled-system/css";

type Props = {
  children: ReactNode;
};

/** ページの題（h1） */
export function PageTitle({ children }: Props) {
  return (
    <h1
      className={css({
        margin: "none",
        textStyle: "pageTitle",
      })}
    >
      {children}
    </h1>
  );
}
